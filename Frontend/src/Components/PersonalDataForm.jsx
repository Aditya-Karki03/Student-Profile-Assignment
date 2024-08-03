import { useState } from "react";
import Spinner from "../Components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PersonalDataForm({
  fname,
  lname,
  age,
  email,
  phoneNo,
  id,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [personalData, setPersonalData] = useState({
    firstname: fname,
    lastname: lname,
    age: age,
    email: email,
    phoneNo: phoneNo,
    id: id,
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleSign(e) {
    e.preventDefault();
  }
  function handleCancelAndMoveToProfile(e) {
    e.preventDefault();
    navigate("/profileDetails");
  }

  async function handleUpdate(e) {
    e.preventDefault();
    console.log(personalData);
    try {
      setLoading((prev) => !prev);
      const headers = {
        authorization: localStorage.getItem("token"),
      };
      console.log(localStorage.getItem("token"));
      const response = await axios.put(
        `https://student-profile-assignment.onrender.com/api/v1/user/profile/?id=${id}&section=Personal`,
        {
          data: personalData,
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
    <div className="min-h-screen mt">
      <form className="space-y-4 md:space-y-6 p-3" onSubmit={handleSign}>
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
            value={personalData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="firstname"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your firstname
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            value={personalData.firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="lastname"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your lastname
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe"
            required
            value={personalData.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your age
          </label>
          <input
            type="text"
            name="age"
            id="age"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="19"
            required
            value={personalData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="phoneNo"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your contact number
          </label>
          <input
            type="text"
            name="phoneNo"
            id="phoneNo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="9863483095"
            required
            value={personalData.phoneNo}
            onChange={handleChange}
          />
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
            Back to Profile Page
          </button>
          <button
            type="submit"
            onClick={handleUpdate}
            className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {loading ? <Spinner /> : "Update"}
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}
