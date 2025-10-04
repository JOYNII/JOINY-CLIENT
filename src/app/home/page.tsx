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
    <div className="min-h-screen bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      <PageHeader 
        title="Myparty"
        subtitle="내가 가입한 파티, 그리고 새로운 시작."
      />

      {/* 2. 중앙 - 파티 목록 섹션 */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 tracking-tight">
          활성화된 파티 목록 ({myParties.length})
        </h2>

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

      {/* 3. 파티 추가 버튼 (하단 중앙) */}
      <div className="flex justify-center pt-8 border-t border-gray-200">
        <Link
          href="/theme"
          className="bg-black text-white px-10 py-4 rounded-xl shadow-2xl shadow-black/20 hover:bg-gray-700 transition-all duration-300 text-lg font-medium tracking-wide flex items-center space-x-2 transform hover:scale-[1.02]"
        >
          <svg
            className="w-5 h-5"
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
          <span>새 파티 시작하기</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
