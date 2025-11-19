"use client";

import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";

// Placeholder Components for content
const MyPartiesList = () => (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">내 파티 목록</h3>
    <p className="text-gray-600">참여 중인 파티 목록이 여기에 표시됩니다.</p>
    {/* 실제 파티 목록 렌더링 로직 */}
  </div>
);

const HistoryList = () => (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">활동 기록</h3>
    <p className="text-gray-600">과거 활동 기록이 여기에 표시됩니다.</p>
    {/* 실제 활동 기록 렌더링 로직 */}
  </div>
);

export default function LoggedInView() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"parties" | "history">("parties");

  if (!user) {
    return null;
  }

  return (
    <div className="p-4">
      {/* Single cohesive card for all content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Profile Section - now takes 25vh screen height and centers content */}
        <div className="flex items-center h-[25vh]">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center text-5xl font-bold text-blue-800 mr-4 flex-shrink-0">
            {user.name.charAt(0)}
          </div>

          {/* Welcome Message and Introduction */}
          <div>
            <p className="text-3xl font-semibold">
              {user.name}
              <br />
              {/* User Introduction Box (소갯말) */}
            </p>
            <div className="user-introduction-box flex-grow">
              <p className="text-gray-500 italic">
                현재 파티를 찾고 있어요! 함께 게임하실 분 환영합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* Tab Buttons Section - now centered */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setActiveTab("parties")}
            className={`px-4 py-2 rounded-lg shadow-md transition-colors ${
              activeTab === "parties"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            내 파티
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-lg shadow-md transition-colors ${
              activeTab === "history"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            기록
          </button>
        </div>

        {/* Conditional Content based on activeTab */}
        <div className="mt-6">
          {activeTab === "parties" && <MyPartiesList />}
          {activeTab === "history" && <HistoryList />}
        </div>
      </div>
    </div>
  );
}
