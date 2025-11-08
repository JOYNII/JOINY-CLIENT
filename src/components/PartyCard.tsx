// src/components/PartyCard.tsx (생성/수정)

import React from "react";
import InviteButton from "../app/home/components/InviteButton";

interface PartyCardProps {
  id: string;
  name: string;
  members: number;
  maxMembers: number;
  description?: string;
  showInviteButton?: boolean;
}

const PartyCard: React.FC<PartyCardProps> = ({
  id,
  name,
  members,
  maxMembers,
  description,
  showInviteButton = false,
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

      <div className="mt-4 flex items-center space-x-2">
        <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-100 bg-white hover:bg-blue-50 rounded-lg transition-colors duration-200 tracking-wide">
          파티 입장
        </button>
        <InviteButton />
      </div>
    </div>
  );
};

export default PartyCard;
