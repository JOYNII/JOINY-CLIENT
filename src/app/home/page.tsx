"use client";
import React from "react";
import Link from "next/link";
import PartyCard from "../../components/PartyCard";
import PageHeader from "../../components/PageHeader";

const myParties = [
  {
    id: "1",
    name: "주말 풋살 모임",
    members: 4,
    maxMembers: 6,
    description: "매주 토요일 즐거운 풋살!",
  },
  {
    id: "2",
    name: "스터디 그룹: Next.js",
    members: 3,
    maxMembers: 5,
    description: "Next.js 딥 다이브 스터디",
  },
  {
    id: "3",
    name: "저녁 러닝 크루",
    members: 8,
    maxMembers: 10,
    description: "퇴근 후 함께 뛰어요!",
  },
];

const HomePage = () => {
  return (
    <div className="bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      <PageHeader 
        title="Myparty"
        subtitle="내가 가입한 파티, 그리고 새로운 시작."
      />

      {/* 2. 중앙 - 파티 목록 섹션 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
            활성화된 파티 목록 ({myParties.length})
          </h2>
          <Link
            href="/theme"
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

        {myParties.length > 0 ? (
          // 블록 단위 그리드, 넓은 간격 유지
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {myParties.map((party) => (
              <PartyCard key={party.id} {...party} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600">아직 가입한 파티가 없습니다.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
