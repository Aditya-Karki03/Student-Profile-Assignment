import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

export default function EnrolledCourses() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courses, SetCourses] = useState([
    {
      courseName: "",
      instructor: "",
      duration: "",
    },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newCourses = [...courses];
    newCourses[index][name] = value;
    SetCourses(newCourses);
  };

  const addCourse = (e) => {
    e.preventDefault();
    SetCourses([...courses, { courseName: "", instructor: "", duration: "" }]);
  };

  const removeCourse = (e) => {
    e.preventDefault();
    if (courses.length > 1) {
      const newCourses = [...courses];
      newCourses.pop();
      SetCourses(newCourses);
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    const headers = {
      authorization: localStorage.getItem("token"),
    };
    try {
      const response = await axios.post(
        "https://student-profile-assignment.onrender.com/api/v1/user/coursesInfo",
        {
          data: courses,
        },
        {
          headers,
        }
      );
      setLoading((prev) => !prev);
      if (response.status == 400) {
        toast.error("Something Went Wrong! Please Try Again", {
          position: "bottom-right",
        });
      } else {
        toast.success("Course Added Successfully!", {
          position: "bottom-right",
        });
      }
      navigate("/profileDetails");
    } catch (error) {
      setLoading((prev) => !prev);
      toast.error("Something Went Wrong! Please Try Again", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="min-h-screen w-screen dark:bg-gray-900">
      <h1 className="text-white font-bold text-xl flex justify-center pt-4">
        Enter your Enrolled Courses
      </h1>
      <div className="flex justify-center mt-4">
        <form className="w-1/2 space-y-4 md:space-y-6" action="#">
          {courses.map((course, index) => (
            <div key={index} className="space-y-4">
              <div>
                <label
                  htmlFor={`Course-${index}`}
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  name="courseName"
                  id={`Course-${index}`}
                  value={course.courseName}
                  onChange={(e) => handleInputChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Computer Science"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`Degree-${index}`}
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Instructor
                </label>
                <input
                  type="text"
                  name="instructor"
                  id={`Instructor-${index}`}
                  value={course.instructor}
                  onChange={(e) => handleInputChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Dr. John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`Attendance-${index}`}
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  id={`Duration-${index}`}
                  value={course.duration}
                  onChange={(e) => handleInputChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="6 months"
                  required
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              onClick={removeCourse}
              className="text-black bg-white w-10 rounded-md"
            >
              -
            </button>
            <button
              onClick={addCourse}
              className="text-black bg-white w-10 rounded-md"
            >
              +
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleSubmission}
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
