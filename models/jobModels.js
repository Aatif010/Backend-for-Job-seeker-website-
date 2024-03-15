import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide job title"],
    minLength: [3, "job title must contain at least 3 characters"],
    maxLength: [50, "job title cannot exceed 50 characters"],
  },
  description: {
    type: String,
    required: [true, "please provide job title"],
    minLength: [3, "job description must contain at least 3 characters"],
    maxLength: [350, "job title cannot exceed 350 characters"],
  },
  category: {
    type: String,
    required: [true, "job category is required"],
  },
  country: {
    type: String,
    required: [true, "job country is required"],
  },
  city: {
    type: String,
    required: [true, "job city is required"],
  },
  location: {
    type: String,
    required: [true, "please provide exact location"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "fixed salary must contain at least 4 digit"],
    maxLength: [9, "salary cannot exceed 9 digit"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "salary must contain at least 4 digit"],
    maxLength: [9, "salary cannot exceed 9 digit"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "salary must contain at least 4 digit"],
    maxLength: [9, "salary cannot exceed 9 digit"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
export const Job = mongoose.model("Job", jobSchema);
