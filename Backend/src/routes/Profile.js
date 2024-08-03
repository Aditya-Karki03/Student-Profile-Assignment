import express from "express";
import decodeToken from "../Utility/DecodeToken.js";
import mongoose from "mongoose";
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
    const { id, section } = req.query;
    const { authorization } = req.headers;
    const userId = decodeToken(authorization);

    connectDB();
    if (section == "Personal") {
      const response = await StudentData.findByIdAndUpdate(id, {
        firstname: updatedData.data.firstname,
        lastname: updatedData.data.lastname,
        age: updatedData.data.age,
        email: updatedData.data.email,
        phoneNo: updatedData.data.phoneNo,
      });
      if (response) {
        return res.json({
          msg: "Updation Successfull",
        });
      }
      res.status(400);
      return res.json({
        msg: "Updation not Successfull!",
      });
    } else if (section == "Education") {
      const response = await EducationalData.updateOne(
        {
          userId: userId,
        },
        {
          $set: {
            "data.$[elem].name": updatedData.data.nameOrCourse,
            "data.$[elem].degree": updatedData.data.degreeOrInstructor,
            "data.$[elem].attendance": updatedData.data.attendanceOrDuration,
          },
        },
        {
          arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(id) }],
        }
      );
      if (response.modifiedCount == 0) {
        res.status(400);
        return res.json({
          msg: "Aw snap! Please try again!",
        });
      }
      return res.json({
        msg: "Updated Successfully",
      });
    } else if (section == "Courses") {
      const response = await CoursesData.updateOne(
        {
          userId: userId,
        },
        {
          $set: {
            "data.$[elem].courseName": updatedData.data.nameOrCourse,
            "data.$[elem].instructor": updatedData.data.degreeOrInstructor,
            "data.$[elem].duration": updatedData.data.attendanceOrDuration,
          },
        },
        {
          arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(id) }],
        }
      );
      if (response.modifiedCount == 0) {
        res.status(400);
        return res.json({
          msg: "Aw snap! Please try again!",
        });
      }
      return res.json({
        msg: "Updated Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    return res.json({
      msg: "Something went wrong! Please try again!",
    });
  }
});

export default profileRouter;
