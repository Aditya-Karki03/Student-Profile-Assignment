import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected({ Component }) {
  const naviagte = useNavigate("/");
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      naviagte("/");
    }
  });
  return (
    <>
      <Component />
    </>
  );
}
