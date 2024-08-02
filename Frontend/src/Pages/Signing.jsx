import { useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Signing() {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    age: "",
    phoneNo: "",
  });

  function handleClick() {
    setSignIn((prev) => !prev);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSign(e) {
    e.preventDefault();
    setLoading((prev) => !prev);
    try {
      if (signIn) {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/signin",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/profileDetails");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/signup",
          {
            email: formData.email,
            password: formData.password,
            firstname: formData.firstname,
            lastname: formData.lastname,
            age: formData.age,
            phoneNo: formData.phoneNo,
          }
        );
        const { token } = response.data;
        localStorage.setItem("token", token);
        setLoading((prev) => !prev);
        navigate("/educationalInfo");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading((prev) => !prev);
    }
  }

  return (
    <section
      className={`${
        signIn
          ? "bg-gray-50 h-screen dark:bg-gray-900"
          : "bg-gray-50 dark:bg-gray-900"
      }`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-full lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Educational Institute
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {signIn ? "Login" : "Create an account"}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSign}>
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {!signIn && (
                <>
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
                      value={formData.firstname}
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
                      value={formData.lastname}
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
                      value={formData.age}
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
                      value={formData.phoneNo}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <Spinner /> : signIn ? "Login" : "Create an account"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {signIn
                  ? "Do not have an account?"
                  : "Already have an account?"}
                <span
                  onClick={handleClick}
                  className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {signIn ? " Sign Up" : " Login here"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
