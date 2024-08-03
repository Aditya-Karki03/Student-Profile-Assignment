import { useState, useEffect } from "react";
import axios from "axios";

export default function UsePersonalInfo(section) {
  const [dataItems, setDataItems] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const headers = {
      authorization: localStorage.getItem("token"),
    };
    axios
      .get(
        "https://student-profile-assignment.onrender.com/api/v1/user/profile",
        { headers }
      )
      .then((res) => {
        setDataItems(res.data);
        setLoading((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        setLoading((prev) => !prev);
      });
  }, []);

  return {
    dataItems,
    loading,
  };
}
