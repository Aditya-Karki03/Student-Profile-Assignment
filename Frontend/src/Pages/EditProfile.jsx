import { useParams } from "react-router-dom";

export default function EditProfile() {
  const { title } = useParams();
  console.log(title);
  return (
    <div className="min-h-screen bg-black">{title == "Personal" && <></>}</div>
  );
}
