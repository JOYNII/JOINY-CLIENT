'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import KakaoMap from '../../../components/KakaoMap';

export default function LocationPage() {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    setSearchKeyword(keyword);
  };

  const handleSelectPlace = (placeName: string) => {
    setSelectedPlace(placeName);
  };

  const handleConfirmPlace = () => {
    if (selectedPlace) {
      const isConfirmed = window.confirm(
        `'${selectedPlace}'(으)로 장소를 설정하시겠습니까?`
      );
      if (isConfirmed) {
        router.push(`/invitation?place=${encodeURIComponent(selectedPlace)}#place-section`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      <header className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 leading-none">
          장소 선택
        </h1>
        <p className="mt-2 text-lg md:text-xl text-gray-500 font-light">
          파티 장소를 검색하고 지도에서 선택해주세요.
        </p>
      </header>

      <section className="max-w-3xl space-y-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="장소를 검색하세요"
            className="flex-grow p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-900"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            검색
          </button>
        </div>

        {selectedPlace && (
          <div className="p-4 bg-white border border-gray-300 rounded-lg flex items-center justify-between text-lg">
            <span className="text-gray-900">
              <strong>선택된 장소:</strong> {selectedPlace}
            </span>
            <button
              onClick={handleConfirmPlace}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              이 장소로 설정
            </button>
          </div>
        )}

        <div className="w-full h-[60vh] rounded-lg overflow-hidden shadow-md">
          <KakaoMap
            searchKeyword={searchKeyword}
            onPlaceSelect={handleSelectPlace}
          />
        </div>
      </section>
    </div>
  );
}
