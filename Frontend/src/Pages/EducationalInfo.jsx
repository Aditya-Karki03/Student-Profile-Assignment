import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner";

export default function EducationalInfo() {
  const [loading, setLoading] = useState(false);
  const [institutes, setInstitutes] = useState([
    { name: "", degree: "", attendance: "" },
  ]);
  const naviage = useNavigate();

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInstitutes = [...institutes];
    newInstitutes[index][name] = value;
    setInstitutes(newInstitutes);
  };

  const addInstitution = (e) => {
    e.preventDefault();
    setInstitutes([...institutes, { name: "", degree: "", attendance: "" }]);
  };

  const removeInstitution = (e) => {
    e.preventDefault();
    if (institutes.length > 1) {
      setInstitutes(institutes.slice(0, -1));
    }
  };
  if (institutes.length > 0) {
    console.log(institutes);
  }
  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    const headers = {
      authorization: localStorage.getItem("token"),
    };
    try {
      const response = await axios.post(
        "https://student-profile-assignment.onrender.com/api/v1/user/educationalInfo",
        {
          data: institutes,
        },
        {
          headers,
        }
      );
      setLoading((prev) => !prev);
      console.log(response);
      if (response.status == "400") {
        toast.error("Something went wrong! Please Try again!", {
          position: "bottom-right",
        });
      } else {
        toast.success("Data added Successfully!!", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      setLoading((prev) => !prev);
      console.log(error);
      toast.error("Something went wrong! Please Try again!", {
        position: "bottom-right",
      });
    }
    // naviage("/enrolledCourses");
  };

  return (
    <div className="h-screen w-screen dark:bg-gray-900">
      <h1 className="text-white font-bold text-xl flex justify-center pt-4">
        Enter your Educational Information
      </h1>
      <div className="flex justify-center mt-4">
        <form className="w-1/2 space-y-4 md:space-y-6" action="#">
          {institutes.map((institute, index) => (
            <div key={index} className="space-y-4">
              <div>
                <label
                  htmlFor={`Institution-${index}`}
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Institution Name
                </label>
                <input
                  type="text"
                  name="name"
                  id={`Institution-${index}`}
                  value={institute.name}
                  onChange={(e) => handleInputChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kalinga Institute Of Industrial Technology"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`Degree-${index}`}
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  id={`Degree-${index}`}
                  value={institute.degree}
                  onChange={(e) => handleInputChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="B.Tech"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`Attendance-${index}`}
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Years Of Attendance
                </label>
                <input
                  type="text"
                  name="attendance"
                  id={`Attendance-${index}`}
                  value={institute.attendance}
                  onChange={(e) => handleInputChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="4 Years"
                  required
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              onClick={removeInstitution}
              className="text-black bg-white w-10 rounded-md"
            >
              -
            </button>
            <button
              onClick={addInstitution}
              className="text-black bg-white w-10 rounded-md"
            >
              +
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={(e) => handleSubmission(e)}
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
