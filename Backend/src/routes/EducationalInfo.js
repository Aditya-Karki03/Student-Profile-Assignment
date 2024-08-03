import express from "express";
import { educationalInfoValidation } from "../Utility/UserDataValidation.js";
import { EducationalData } from "../Utility/Schema&Model.js";
import connectDB from "../Utility/db.js";
import decodeToken from "../Utility/DecodeToken.js";
const eduRouter = express.Router();

eduRouter.post("/", async (req, res) => {
  try {
    const eduInfo = req.body;
    const { data } = eduInfo;
    const { authorization } = req.headers;

    const { success, message } = educationalInfoValidation(eduInfo);
    if (!success) {
      res.status(400);
      return res.json({
        msg: message,
      });
    }

    connectDB();
    const userId = decodeToken(authorization);
    const courses = await EducationalData.create({
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

export default eduRouter;
