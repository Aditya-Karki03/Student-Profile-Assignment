import { useState, useEffect } from "react";
import ProfileBody from "../Components/ProfileBody";
import UsePersonalInfo from "../Hooks/usePersonalInfo";
import Spinner from "../Components/Spinner";
import axios from "axios";

export default function ProfileDetails() {
  const { loading, dataItems } = UsePersonalInfo();

  if (loading && dataItems == null) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-3 min-h-screen bg-black">
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
