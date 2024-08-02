import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  phoneNo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const educationalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  degree: {
    type: String,
    required: true,
    trim: true,
  },
  attendance: {
    type: String,
    required: true,
    trim: true,
  },
});
const multiEducationalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  data: [educationalSchema],
});

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
});

const coursesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    // ref: 'StudentData'
  },
  data: [courseSchema],
});

export const CoursesData = mongoose.model("CoursesData", coursesSchema);
export const EducationalData = mongoose.model(
  "EducationalData",
  multiEducationalSchema
);
export const StudentData = mongoose.model("StudentData", studentSchema);
