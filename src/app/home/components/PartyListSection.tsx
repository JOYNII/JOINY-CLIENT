"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import PartyCard from "../../../components/PartyCard"; // Adjust path as needed
import { getParties } from "../../../utils/mockApi"; // Adjust path as needed
import { Party } from "../../../types"; // Adjust path as needed

const PartyListSection = () => {
  const { data: parties, isLoading, error } = useQuery<Party[]>({
    queryKey: ['parties'],
    queryFn: getParties
  });

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
          활성화된 파티 목록 ({parties?.length || 0})
        </h2>
        <Link
          href="/invitation" // Changed from /theme to /invitation as per previous context
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition-all duration-300 text-sm font-semibold flex items-center space-x-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span>새 파티</span>
        </Link>
      </div>

      {isLoading && <p className="text-lg text-gray-600">파티 목록을 불러오는 중...</p>}
      {error && <p className="text-lg text-red-600">오류가 발생했습니다: {error.message}</p>}
      
      {parties && parties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {parties.map((party) => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
      ) : (
        !isLoading && <p className="text-lg text-gray-600">아직 가입한 파티가 없습니다.</p>
      )}
    </section>
  );
};

export default PartyListSection;
