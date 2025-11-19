"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function PleaseLogin() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSimulatedLogin = () => {
    // Simulate login by redirecting to the current path with a user query param
    router.push(`${pathname}?user=1`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <Image
        src="/Myparty_icon.png"
        alt="Myparty Icon"
        width={80}
        height={80}
        className="mb-6"
      />
      <h1 className="text-2xl font-bold mb-2">마이파티</h1>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={handleSimulatedLogin}
          className="w-full flex items-center justify-center px-6 py-4 font-bold text-black bg-yellow-300 rounded-lg hover:bg-yellow-400 transition-colors shadow-md text-lg"
        >
          <span className="mr-2 text-2xl">K</span>
          카카오톡으로 계속하기
        </button>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleSimulatedLogin}
            className="text-blue-500 text-sm hover:underline"
          >
            이메일로 로그인
          </button>

          <button
            onClick={handleSimulatedLogin}
            className="text-blue-500 text-sm hover:underline"
          >
            이메일로 회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
