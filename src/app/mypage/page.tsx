"use client";

import React from "react";
import { useUser } from "../../context/UserContext";
import LoggedInView from "./components/LoggedInView";
import PleaseLogin from "../../components/PleaseLogin";

const MyPage = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return user ? <LoggedInView /> : <PleaseLogin />;
};

export default MyPage;
