import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobModels.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await jobs.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "job seeker ") {
    return next(
      new ErrorHandler(
        "job seeker is not allowed to access this resources!",
        400
      )
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    SalaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details", 400));
  }
  if (!SalaryFrom || (salaryTo && !fixedSalary)) {
    return next(
      new ErrorHandler("please provide either fixed salary or ranged salary")
    );
  }
  if (SalaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("cannot enter fixed salary and ranged salary together")
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    SalaryFrom,
    salaryTo,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "job posted successfully!",
    job,
  });
});

export const getmyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "job seeker ") {
    return next(
      new ErrorHandler(
        "job seeker is not allowed to access this resources!",
        400
      )
    );
  }
  const myJobs = await job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "job seeker ") {
    return next(
      new ErrorHandler(
        "job seeker is not allowed to access this resources!",
        400
      )
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("oops job not found", 400));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    job,
    message: "job updated successfully",
  });
});
export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "job seeker ") {
    return next(
      new ErrorHandler(
        "job seeker is not allowed to access this resources!",
        400
      )
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("oops job not found", 400));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "job deleted successfully",
  });
});
