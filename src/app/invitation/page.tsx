"use client";

import React, { useState } from "react";
import Link from "next/link";
import LocationSelector from "./components/LocationSelector";
import PlaceSection from "./components/PlaceSection";
import ImageUploader from './components/ImageUploader';
import FormField from "../../components/FormField";
import PageHeader from "../../components/PageHeader";
import FriendsSection from "./components/FriendsSection";
import FeeSelector from '../../components/FeeSelector';


export default function InvitationPage() {
  const [place, setPlace] = useState('');
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [hostName, setHostName] = useState('김조이');
  const [fee, setFee] = useState<number | string>('');

  const handleConfirmPlace = (selectedPlace: string) => {
    setPlace(selectedPlace);
    setIsSelectingLocation(false);
  };
  const friends = [
    { id: 1, name: "김민준" },
    { id: 2, name: "이서연" },
    { id: 3, name: "박도윤" },
  ];

  return (
    <>
      <div className="min-h-screen bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
        <PageHeader
          title="Invitation"
          subtitle="특별한 파티를 계획하고 친구들을 초대해보세요."
        />

        <section className="max-w-3xl space-y-10">
          <FormField
            label="주최자"
            id="host-name"
            type="text"
            value={hostName}
            disabled
          />

          <FormField
            label="파티명"
            id="party-name"
            type="text"
            placeholder="예: 2025 신년회"
          />

          <FormField label="일자" id="party-date" type="date" />

          <FormField
            as="textarea"
            label="설명"
            id="party-description"
            rows={4}
            placeholder="파티에 대한 설명을 자유롭게 적어주세요."
          />

          <PlaceSection
            place={place}
            onSelectClick={() => setIsSelectingLocation(true)}
          />

          <FormField
            label="음식"
            id="party-food"
            type="text"
            placeholder="예: 피자, 치킨, 음료 등"
          />

          <FriendsSection friends={friends} />

          <FeeSelector value={fee} onFeeChange={setFee} />

          <ImageUploader />

          <div className="pt-8 flex items-center justify-start gap-4 border-t border-gray-200">
            <div className="relative px-10 py-4 bg-black text-white font-bold text-lg rounded-xl shadow-lg hover:bg-neutral-800 transition-colors transform hover:scale-105">
              초대장 저장
              <Link href="/home" className="absolute inset-0"></Link>
            </div>
            <button
              type="button"
              className="px-10 py-4 bg-white text-black border border-gray-300 font-bold text-lg rounded-xl shadow-sm hover:bg-gray-100 transition-colors"
            >
              공유하기
            </button>
          </div>
        </section>
      </div>
      {isSelectingLocation && (
        <LocationSelector
          onConfirm={handleConfirmPlace}
          onCancel={() => setIsSelectingLocation(false)}
        />
      )}
    </>
  );
}