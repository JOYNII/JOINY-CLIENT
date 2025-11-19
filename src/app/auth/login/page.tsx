"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = () => {
    // Get the callbackUrl from query params, or default to '/home'
    const callbackUrl = searchParams.get("callbackUrl") || "/home";

    // Redirect to the callbackUrl with the user query param
    router.push(`${callbackUrl}?user=1`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <p className="mb-8">로그인하여 모든 서비스를 이용해보세요.</p>
      <button
        onClick={handleLogin}
        className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        '김조이'로 로그인하기 (시뮬레이션)
      </button>
    </div>
  );
}
