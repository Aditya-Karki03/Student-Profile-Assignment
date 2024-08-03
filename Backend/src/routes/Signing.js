import express from "express";
import dotenv from "dotenv";
import connectDB from "../Utility/db.js";
import {
  userDataValidation,
  userSignInDataValidation,
} from "../Utility/UserDataValidation.js";
import { StudentData } from "../Utility/Schema&Model.js";
import { TokenGenerator } from "../Utility/Token.js";

dotenv.config();
const signRouter = express.Router();

signRouter.post("/signup", async (req, res) => {
  const userData = req.body;
  try {
    const { success, message } = userDataValidation(userData);
    if (!success) {
      return res.json({
        msg: message,
      });
    }
    connectDB();
    const student = await StudentData.create(userData);
    const userId = student._id.toString();
    const token = TokenGenerator(userId);

    return res.json({
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    return res.json({
      msg: "Something went wrong! Please Try again!",
    });
  }
});
signRouter.post("/signin", async (req, res) => {
  const userSignInData = req.body;
  const { success, message } = userSignInDataValidation(userSignInData);
  if (!success) {
    return res.json({
      msg: "Wrong Format Input! Please try again!",
    });
  }
  try {
    //find user in the database
    connectDB();
    const student = await StudentData.findOne({
      email: userSignInData.email,
    });
    if (student == null || student.password != userSignInData.password) {
      res.status(400);
      return res.json({
        msg: "No User found! Please try signing up!",
      });
    }
    const userId = student._id.toString();
    const Token = TokenGenerator(userId);
    return res.json({
      token: Token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Something went wrong please try again!",
    });
  }
});
export default signRouter;
