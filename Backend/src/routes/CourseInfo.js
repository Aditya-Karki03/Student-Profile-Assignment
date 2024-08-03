import express from "express";
import { coursesInfoValidation } from "../Utility/UserDataValidation.js";
import connectDB from "../Utility/db.js";
import decodeToken from "../Utility/DecodeToken.js";
import { CoursesData } from "../Utility/Schema&Model.js";
const courseRouter = express.Router();

courseRouter.post("/", async (req, res) => {
  try {
    const coursesInfo = req.body;
    const { data } = coursesInfo;
    const { authorization } = req.headers;

    const { success, message } = coursesInfoValidation(coursesInfo);
    if (!success) {
      res.status(400);
      return res.json({
        msg: message,
      });
    }

    connectDB();
    const userId = decodeToken(authorization);
    const courses = await CoursesData.create({
      userId,
      data,
    });
    return res.json({
      msg: "Done!!",
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    return res.json({
      msg: "Something went wrong!! Please try again!",
    });
  }
});

export default courseRouter;
