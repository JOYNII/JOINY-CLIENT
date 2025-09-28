// src/components/PartyCard.tsx (생성/수정)

import React from "react";

interface PartyCardProps {
  id: string;
  name: string;
  members: number;
  maxMembers: number;
  description?: string;
}

const PartyCard: React.FC<PartyCardProps> = ({
  id,
  name,
  members,
  maxMembers,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col space-y-3 border border-gray-100">
      <h3 className="text-xl font-bold tracking-tight text-gray-900">{name}</h3>

      {description && (
        <p className="text-sm text-gray-500 flex-grow">{description}</p>
      )}

      <div className="pt-2">
        <p className="text-sm font-medium text-gray-600">
          인원: <span className="font-semibold text-gray-800">{members}</span> /{" "}
          {maxMembers}
        </p>
      </div>

      <button className="mt-4 self-start px-4 py-2 text-sm font-medium text-blue-600 border border-blue-100 bg-white hover:bg-blue-50 rounded-lg transition-colors duration-200 tracking-wide">
        파티 입장
      </button>
    </div>
  );
};

export default PartyCard;
