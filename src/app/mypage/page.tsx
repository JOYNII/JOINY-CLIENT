"use client";
import React from "react";
import PageHeader from "../../components/PageHeader";
import { useUser } from "../../context/UserContext";

const MyPage = () => {
  const { user } = useUser();

  return (
    <div className="bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      <PageHeader 
        title="마이페이지"
        subtitle="내 정보를 확인하고 관리합니다."
      />
      <section className="mt-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">내 정보</h2>
          <p className="text-lg"><strong>이름:</strong> {user.name}</p>
          <p className="text-lg"><strong>ID:</strong> {user.id}</p>
          {/* 향후 여기에 추가적인 사용자 정보가 표시됩니다. */}
        </div>그
      </section>
    </div>
  );
};

export default MyPage;
