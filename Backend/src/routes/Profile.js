import express from "express";
import decodeToken from "../Utility/DecodeToken.js";
import connectDB from "../Utility/db.js";
import {
  CoursesData,
  EducationalData,
  StudentData,
} from "../Utility/Schema&Model.js";
const profileRouter = express.Router();

profileRouter.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const userId = decodeToken(authorization);
    console.log(userId);
    connectDB();
    const personalData = await StudentData.findById(userId);
    const educationalData = await EducationalData.findOne({
      userId,
    });
    const courseData = await CoursesData.findOne({
      userId,
    });
    return res.json({
      personalData,
      educationalData,
      courseData,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Something went wrong please try again!",
    });
  }
});

profileRouter.put("/", async (req, res) => {
  try {
    const updatedData = req.body;
  } catch (error) {}
});

export default profileRouter;
