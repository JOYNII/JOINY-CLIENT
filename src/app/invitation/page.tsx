"use client";

import React from 'react';
import Link from 'next/link';

// Placeholder icons for better UI
const UserCircleIcon = () => (
  <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0012 11z" clipRule="evenodd"></path></svg>
);
const PhotoIcon = () => (
    <svg className="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);


export default function InvitationPage() {
  const hostName = "김조이"; 
  const friends = [ { id: 1, name: '김민준' }, { id: 2, name: '이서연' }, { id: 3, name: '박도윤' } ];

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      
      <header className="mb-12 md:mb-16">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-gray-900 leading-none">
          초대장 만들기
        </h1>
        <p className="mt-2 text-xl md:text-2xl text-gray-500 font-light">
          특별한 파티를 계획하고 친구들을 초대해보세요.
        </p>
      </header>

      <section className="max-w-3xl space-y-10">
        
        <div>
          <label className="text-lg font-semibold text-gray-700">주최자</label>
          <div className="mt-2 p-4 w-full bg-gray-200 rounded-lg text-gray-800 text-lg">
            {hostName}
          </div>
        </div>

        <div>
          <label htmlFor="party-name" className="text-lg font-semibold text-gray-700">파티명</label>
          <input type="text" id="party-name" placeholder="예: 2025 신년회" className="mt-2 block w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"/>
        </div>

        <div>
          <label htmlFor="party-date" className="text-lg font-semibold text-gray-700">일자</label>
          <input type="date" id="party-date" className="mt-2 block w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"/>
        </div>

        <div>
          <label htmlFor="party-description" className="text-lg font-semibold text-gray-700">설명</label>
          <textarea id="party-description" rows={4} placeholder="파티에 대한 설명을 자유롭게 적어주세요." className="mt-2 block w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"/>
        </div>

        <div>
          <label className="text-lg font-semibold text-gray-700">장소</label>
          <button type="button" className="mt-2 w-full p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg text-lg text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition flex items-center justify-center"><span>선택하기</span></button>
        </div>

        <div>
          <label htmlFor="party-food" className="text-lg font-semibold text-gray-700">음식</label>
          <input type="text" id="party-food" placeholder="예: 피자, 치킨, 음료 등" className="mt-2 block w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"/>
        </div>

        {/* 초대한 친구 목록 */}
        <div>
            <label className="text-lg font-semibold text-gray-700">초대한 친구</label>
            <div className="mt-2 space-y-3">
                {friends.map(friend => (
                    <div key={friend.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-4">
                            <UserCircleIcon />
                            <span className="text-lg font-medium text-gray-800">{friend.name}</span>
                        </div>
                        <button className="text-sm text-red-500 hover:text-red-700">삭제</button>
                    </div>
                ))}
            </div>
            <button type="button" className="mt-4 w-full p-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition">+ 친구 초대</button>
        </div>

        {/* 참가비 */}
        <div>
            <label htmlFor="participation-fee" className="text-lg font-semibold text-gray-700">참가비</label>
            <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-lg text-gray-500">₩</span>
                <input type="number" id="participation-fee" placeholder="금액 입력" className="pl-10 block w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"/>
            </div>
        </div>

        {/* 사진 업로드 공간 */}
        <div>
            <label className="text-lg font-semibold text-gray-700">오늘의 네컷</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white">
                <div className="text-center">
                    <PhotoIcon />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                            <span>파일 업로드</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">또는 드래그 앤 드롭</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="pt-8 flex items-center justify-start gap-4 border-t border-gray-200">
          <div className="relative px-10 py-4 bg-black text-white font-bold text-lg rounded-xl shadow-lg hover:bg-neutral-800 transition-colors transform hover:scale-105">
            초대장 저장
            <Link href="/home" className="absolute inset-0"></Link>
          </div>
          <button type="button" className="px-10 py-4 bg-white text-black border border-gray-300 font-bold text-lg rounded-xl shadow-sm hover:bg-gray-100 transition-colors">공유하기</button>
        </div>
      </section>
    </div>
  );
}
