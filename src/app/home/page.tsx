"use client";
import React from "react";
import PageHeader from "../../components/PageHeader";
import PartyListSection from "./components/PartyListSection";

const HomePage = () => {
  return (
    <div className="bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      <PageHeader 
        title="Myparty"
        subtitle="내가 가입한 파티, 그리고 새로운 시작."
      />
      <PartyListSection />
    </div>
  );
};

export default HomePage;
