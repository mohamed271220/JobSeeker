import { Sequelize } from "sequelize-typescript";
import User from "../../auth/models/user.model";
import JobPost from "../models/job-post.model";
import JobApplication from "../models/application.model";
import { CustomError } from "../../../utils/CustomError";
import { isRepresentative } from "../../shared/utils/is-representative";
import JobPostQuestion from "../models/job-post-question.model";
import ApplicationAnswer from "../models/application-answer.model";

export class JobApplicationService {
  constructor(
    private sequelize: Sequelize,
    private jobApplicationModel: typeof JobApplication = JobApplication,
    private jobPostModel: typeof JobPost = JobPost,
    private userModel: typeof User = User,
    private jobPostQuestionModel: typeof JobPostQuestion = JobPostQuestion,
    private jobPostAnswerModel: typeof ApplicationAnswer = ApplicationAnswer
  ) {}

  private async validateJobPost(jobId: string): Promise<JobPost> {
    const jobPost = await this.jobPostModel.findByPk(jobId);
    if (!jobPost) {
      throw new CustomError("Job post not found", 404);
    }
    return jobPost;
  }

  private async validateUser(userId: string): Promise<User> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
  }

  private async validateApplication(
    applicationId: string
  ): Promise<JobApplication> {
    const application = await this.jobApplicationModel.findByPk(applicationId);
    if (!application) {
      throw new CustomError("Application not found", 404);
    }
    return application;
  }

  private async validateUserAuthorization(
    userId: string,
    companyId: string
  ): Promise<void> {
    const isUserValid = await isRepresentative(userId, companyId);
    if (!isUserValid) {
      throw new CustomError("Unauthorized", 401);
    }
  }

  private async validateJobPostAndUser(
    jobId: string,
    userId: string
  ): Promise<void> {
    await Promise.all([this.validateJobPost(jobId), this.validateUser(userId)]);
  }

  async applyToAJob(
    userId: string,
    jobId: string,
    questionAnswers: { question_id: string; answer: string }[]
  ): Promise<JobApplication> {
    const transaction = await this.sequelize.transaction();

    try {
      await this.validateJobPostAndUser(jobId, userId);

      const existingApplication = await this.jobApplicationModel.findOne({
        where: {
          job_post_id: jobId,
          user_id: userId,
        },
        transaction,
      });

      if (existingApplication) {
        throw new CustomError("Application already exists", 400);
      }

      const jobApplication = await this.jobApplicationModel.create(
        {
          user_id: userId,
          job_post_id: jobId,
        },
        { transaction }
      );

      const validAnswers = await Promise.all(
        questionAnswers.map(async (answer) => {
          const question = await this.jobPostQuestionModel.findByPk(
            answer.question_id,
            { transaction }
          );
          if (!question) {
            throw new CustomError(
              `Question with ID ${answer.question_id} not found`,
              404
            );
          }
          return {
            application_id: jobApplication.id,
            question_id: answer.question_id,
            answer: answer.answer,
          };
        })
      );

      await this.jobPostAnswerModel.bulkCreate(validAnswers, { transaction });

      await transaction.commit();
      return jobApplication;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAllApplications(
    userId: string,
    jobId: string,
    limit: number,
    offset: number
  ): Promise<JobApplication[]> {
    const jobPost = await this.validateJobPost(jobId);
    await this.validateUserAuthorization(userId, jobPost.company_id);

    return this.jobApplicationModel.findAll({
      where: {
        job_post_id: jobId,
      },
      limit,
      offset,
      include: [
        {
          model: this.userModel,
          as: "user",
        },
      ],
    });
  }

  async getApplication(
    userId: string,
    applicationId: string
  ): Promise<JobApplication | null> {
    const application = await this.validateApplication(applicationId);
    const jobPost = await this.validateJobPost(application.job_post_id);
    await this.validateUserAuthorization(userId, jobPost.company_id);

    return application;
  }

  async getAllApplicationsCurrentUser(
    userId: string
  ): Promise<JobApplication[]> {
    return this.jobApplicationModel.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: JobPost,
          as: "jobPost",
        },
      ],
    });
  }

  async getAllApplicationsCurrentUserInCompany(
    userId: string,
    companyId: string
  ): Promise<JobApplication[]> {
    return this.jobApplicationModel.findAll({
      where: {
        user_id: userId,
        company_id: companyId,
      },
      include: [
        {
          model: JobPost,
          as: "jobPost",
        },
      ],
    });
  }

  async rejectApplication(
    userId: string,
    applicationId: string,
    feedback: string
  ): Promise<JobApplication> {
    const application = await this.validateApplication(applicationId);
    const jobPost = await this.validateJobPost(application.job_post_id);
    await this.validateUserAuthorization(userId, jobPost.company_id);

    return application.update({
      reviewed: true,
      feedback,
    });
  }

  async acceptApplication(
    userId: string,
    applicationId: string
  ): Promise<JobApplication> {
    const application = await this.validateApplication(applicationId);
    const jobPost = await this.validateJobPost(application.job_post_id);
    await this.validateUserAuthorization(userId, jobPost.company_id);

    return application.update({
      reviewed: true,
    });
  }
}
