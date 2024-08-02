import { useState, useEffect } from "react";
import ProfileBody from "../Components/ProfileBody";
import axios from "axios";

export default function ProfileDetails() {
  const [dataItems, setDataItems] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const headers = {
      authorization: localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:3000/api/v1/user/profile", { headers })
      .then((res) => setDataItems(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading((prev) => !prev));
  }, []);
  if (!loading) {
    console.log(dataItems);
  }
  return (
    <div className="m-3 ">
      <ProfileBody
        title="Personal"
        fname={dataItems?.personalData?.firstname}
        lname={dataItems?.personalData?.lastname}
        age={dataItems?.personalData?.age}
        email={dataItems?.personalData?.email}
        phoneNo={dataItems?.personalData?.phoneNo}
      />
      <ProfileBody title="Education" data={dataItems?.educationalData?.data} />
      <ProfileBody title="Courses" data={dataItems?.courseData?.data} />
    </div>
  );
}
