import { useParams } from "react-router-dom";
import UsePersonalInfo from "../Hooks/usePersonalInfo";
import PersonalDataForm from "../Components/PersonalDataForm";
import EducationAndCourseForm from "../Components/Education&CourseForm";
import Spinner from "../Components/Spinner";

export default function EditProfile() {
  const { section } = useParams();
  const { loading, dataItems } = UsePersonalInfo(section);
  if (loading && dataItems == null) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <Spinner />
      </div>
    );
  }
  const { personalData, educationalData, courseData } = dataItems;
  console.log(section);
  //<EducationAndCourseForm name={} degree={} attendance={}/>
  return (
    <div className="bg-black min-h-screen">
      {section == "Personal" && (
        <PersonalDataForm
          fname={personalData.firstname}
          lname={personalData.lastname}
          age={personalData.age}
          email={personalData.email}
          phoneNo={personalData.phoneNo}
          id={personalData._id}
        />
      )}
      {section == "Education" &&
        educationalData.data.length > 0 &&
        educationalData.data.map((ed, i) => {
          return (
            <EducationAndCourseForm
              key={ed._id}
              id={ed._id}
              title="Education"
              nameOrCourse={ed.name}
              degreeOrInstructor={ed.degree}
              attendanceOrDuration={ed.attendance}
              label1="Institution Name"
              label2="Degree"
              label3="Years Of Attendance"
            />
          );
        })}
      {section == "Courses" &&
        courseData.data.length > 0 &&
        courseData.data.map((c, i) => {
          return (
            <EducationAndCourseForm
              key={c._id}
              id={c._id}
              title="Courses"
              nameOrCourse={c.courseName}
              degreeOrInstructor={c.instructor}
              attendanceOrDuration={c.duration}
              label1="Course Name"
              label2="Instructor"
              label3="Duration"
            />
          );
        })}
    </div>
  );
}
