import User from "../../auth/models/user.model";
import JobPost from "../models/job-post.model";
import JobApplication from "../models/application.model";


export class JobApplicationService {
  constructor(
    private jobApplicationModel: typeof JobApplication = JobApplication,
    private jobPostModel: typeof JobPost = JobPost,
    private userModel: typeof User = User
  ) {}
}
