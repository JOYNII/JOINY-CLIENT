"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getParties } from "../../../../mock/mockApi";
import PartyCard from "../../../components/PartyCard";

// Placeholder for HistoryList as it's not in scope for this change
const HistoryList = () => (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">활동 기록</h3>
    <p className="text-gray-600">과거 활동 기록이 여기에 표시됩니다.</p>
  </div>
);

export default function LoggedInView() {
  const [activeTab, setActiveTab] = useState<"parties" | "history">("parties");

  const { data: currentUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: allParties, isLoading: arePartiesLoading } = useQuery({
    queryKey: ["parties"],
    queryFn: getParties,
  });

  const myParties = useMemo(() => {
    if (!currentUser || !allParties) {
      return [];
    }
    return allParties.filter((party) =>
      party.members.some((member) => member.id === currentUser.id)
    );
  }, [currentUser, allParties]);

  if (isUserLoading) {
    return <div className="text-center p-8">사용자 정보를 불러오는 중...</div>;
  }
  
  if (!currentUser) {
    // This case might happen if getCurrentUser can return null/undefined
    // Or it can be a place for a login prompt.
    return null;
  }

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center h-[25vh]">
          <div className="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center text-5xl font-bold text-blue-800 mr-4 flex-shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <p className="text-3xl font-semibold">{currentUser.name}</p>
            <div className="user-introduction-box flex-grow mt-2">
              <p className="text-gray-500 italic">
                현재 파티를 찾고 있어요! 함께 게임하실 분 환영합니다.
              </p>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

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

        <div className="mt-6">
          {activeTab === "parties" && (
            <div>
              {arePartiesLoading ? (
                <p>파티 목록을 불러오는 중...</p>
              ) : myParties.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {myParties.map((party) => (
                    <PartyCard key={party.id} party={party} variant="compact" />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">아직 참여한 파티가 없습니다.</p>
              )}
            </div>
          )}
          {activeTab === "history" && <HistoryList />}
        </div>
      </div>
    </div>
  );
}
