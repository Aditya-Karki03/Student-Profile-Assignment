import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./Spinner";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function EducationAndCourseForm({
  nameOrCourse: nameOrCourse,
  degreeOrInstructor: degreeOrInstructor,
  attendanceOrDuration: attendanceOrDuration,
  label1,
  label2,
  label3,
  title,
  id,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [learningData, setLearningData] = useState({
    nameOrCourse: nameOrCourse,
    degreeOrInstructor: degreeOrInstructor,
    attendanceOrDuration: attendanceOrDuration,
  });
  function handleInputChange(e) {
    const { name, value } = e.target;
    setLearningData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCancelAndMoveToProfile(e) {
    e.preventDefault();
    navigate("/profileDetails");
  }

  async function handleUpdate(e) {
    e.preventDefault();
    console.log(learningData);
    try {
      setLoading((prev) => !prev);
      const headers = {
        authorization: localStorage.getItem("token"),
      };
      const response = await axios.put(
        `https://student-profile-assignment.onrender.com/api/v1/user/profile/?id=${id}&section=${title}`,
        {
          data: learningData,
        },
        {
          headers,
        }
      );
      if (response.status == "400") {
        setLoading((prev) => !prev);
        toast.error("Something Went Wrong!! Please try again!", {
          position: "bottom-right",
        });
      } else {
        setLoading((prev) => !prev);
        toast.success("Data Updated Successfully");
      }
    } catch (error) {
      setLoading((prev) => !prev);
      console.log(error);
      toast.error("Something Went Wrong!! Please try again!", {
        position: "bottom-right",
      });
    }
  }

  return (
    <form className="space-y-4 md:space-y-6 p-3">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            {label1}
          </label>
          <input
            type="text"
            name="nameOrCourse"
            value={learningData.nameOrCourse}
            onChange={(e) => handleInputChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Kalinga Institute Of Industrial Technology"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            {label2}
          </label>
          <input
            type="text"
            name="degreeOrInstructor"
            value={learningData.degreeOrInstructor}
            onChange={(e) => handleInputChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="B.Tech"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            {label3}
          </label>
          <input
            type="text"
            name="attendanceOrDuration"
            value={learningData.attendanceOrDuration}
            onChange={(e) => handleInputChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="4 Years"
            required
          />
        </div>
      </div>

      <div className="flex justify-between px-4">
        <button
          onClick={handleCancelAndMoveToProfile}
          type="submit"
          className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Cancel
        </button>
        <button
          onClick={handleCancelAndMoveToProfile}
          type="submit"
          className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Move Back To Profile
        </button>
        <button
          onClick={handleUpdate}
          type="submit"
          className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {loading ? <Spinner /> : "Update"}
        </button>
      </div>

      <ToastContainer />
    </form>
  );
}
