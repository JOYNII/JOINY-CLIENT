// src/components/PartyCard.tsx

import React from "react";
import Link from "next/link";
import InviteButton from "../app/home/components/InviteButton";
import { Party } from "../types";

interface PartyCardProps {
  party: Party;
}

const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
  const { id, partyName, partyDescription, members, maxMembers } = party;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col space-y-3 border border-gray-100">
      <h3 className="text-xl font-bold tracking-tight text-gray-900">{partyName}</h3>

      {partyDescription && (
        <p className="text-sm text-gray-500 flex-grow">{partyDescription}</p>
      )}

      <div className="pt-2">
        <p className="text-sm font-medium text-gray-600">
          인원: <span className="font-semibold text-gray-800">{members.length}</span> /{" "}
          {maxMembers}
        </p>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <Link href={`/party/${id}`} passHref>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-100 bg-white hover:bg-blue-50 rounded-lg transition-colors duration-200 tracking-wide">
            파티 입장
          </button>
        </Link>
        <InviteButton />
      </div>
    </div>
  );
};

export default PartyCard;
