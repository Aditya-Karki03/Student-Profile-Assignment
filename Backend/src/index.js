import express from "express";
import cors from "cors";
import signRouter from "./routes/Signing.js";
import eduRouter from "./routes/EducationalInfo.js";
import courseRouter from "./routes/CourseInfo.js";
import profileRouter from "./routes/Profile.js";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/api/v1/user", signRouter);

app.use("/api/v1/user/educationalInfo", eduRouter);

app.use("/api/v1/user/coursesInfo", courseRouter);

app.use("/api/v1/user/profile", profileRouter);

app.listen(port, () => {
  console.log(`Application is running at port ${port}`);
});
