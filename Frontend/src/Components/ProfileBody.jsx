import { useNavigate } from "react-router-dom";
export default function ProfileBody({
  title,
  fname = "",
  lname = "",
  age = "",
  email = "",
  phoneNo = "",
  data = [],
}) {
  const navigate = useNavigate();

  function handleEdit(e, title) {
    e.preventDefault();
    console.log(title);
    navigate(`/editProfile/${title}`);
  }

  return (
    <div className="min-w-sm mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      {data.length == 0 && (
        <>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {"Name: " + fname + " " + lname}
          </p>
          <p className=" font-normal text-gray-700 dark:text-gray-400">
            {"Email: " + email}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {"Age: " + age}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {"Contact Number: " + phoneNo}
          </p>
        </>
      )}
      {data.length > 0 &&
        data.map((d, i) => {
          return (
            <div className="mb-3" key={i}>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {d.Institution
                  ? `Institution:${d.Institution}`
                  : `Course:${d.courseName}`}
              </p>
              <p className=" font-normal text-gray-700 dark:text-gray-400">
                {d.Degree
                  ? `Degree: ${d.Degree}`
                  : `Instructor:${d.instructor}`}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {d.yearsOfAttendance
                  ? `Years Of Attendance: ${d.yearsOfAttendance}`
                  : `Duration:${d.duration}`}
              </p>
            </div>
          );
        })}
      <button
        onClick={(e) => handleEdit(e, title)}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Edit
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
}
