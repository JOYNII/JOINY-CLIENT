"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../../components/PageHeader";
import { getPartyById, joinParty, getCurrentUser } from "../../../utils/mockApi";
import { Party, User } from "../../../types";

export default function PartyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = params;
  const currentUser = getCurrentUser();

  const { data: party, isLoading, error } = useQuery<Party | undefined>({
    queryKey: ['party', id],
    queryFn: () => getPartyById(id as string),
    enabled: !!id, // Only run the query if the id exists
  });

  const { mutate: toggleJoinLeave, isPending: isJoinLeavePending } = useMutation({
    mutationFn: () => joinParty(id as string, currentUser.id),
    onSuccess: () => {
      // Refetch both the list of parties for the home page and this specific party
      queryClient.invalidateQueries({ queryKey: ['parties'] });
      queryClient.invalidateQueries({ queryKey: ['party', id] });
    },
    onError: (error) => {
      alert(`오류가 발생했습니다: ${error.message}`);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>파티 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !party) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>파티를 찾을 수 없거나 오류가 발생했습니다.</p>
      </div>
    );
  }
  
  const isMember = party.members.some(member => member.id === currentUser.id);

  let themeText = "";
  if (party.theme === "christmas") {
    themeText = "(크리스마스 ver)";
  } else if (party.theme === "reunion") {
    themeText = "(동창회 ver)";
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      <PageHeader
        title={`Invitation ${themeText}`}
        subtitle={`'${party.partyName}' 파티에 초대합니다!`}
      />

      <section className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="font-semibold text-gray-500">주최자</div>
            <div>{party.hostName}</div>

            <div className="font-semibold text-gray-500">파티명</div>
            <div>{party.partyName}</div>

            <div className="font-semibold text-gray-500">일자</div>
            <div>{party.partyDate}</div>
            
            <div className="font-semibold text-gray-500">장소</div>
            <div>{party.place}</div>

            <div className="font-semibold text-gray-500">음식</div>
            <div>{party.partyFood}</div>

            <div className="font-semibold text-gray-500">회비</div>
            <div>{party.fee}</div>
            
            <div className="md:col-span-2 font-semibold text-gray-500">설명</div>
            <div className="md:col-span-2 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">{party.partyDescription}</div>
          </div>
          
          <div className="pt-6 border-t">
            <h3 className="font-semibold text-gray-800 mb-4">
              참여 인원 ({party.members.length} / {party.maxMembers})
            </h3>
            <div className="flex flex-wrap gap-4">
              {party.members.map(member => (
                <div key={member.id} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {member.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => toggleJoinLeave()}
            disabled={isJoinLeavePending}
            className={`px-8 py-3 font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:cursor-not-allowed ${
              isMember 
                ? "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400" 
                : "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400"
            }`}
          >
            {isJoinLeavePending ? "처리 중..." : (isMember ? "파티 나가기" : "파티 참여하기")}
          </button>
        </div>
      </section>
    </div>
  );
}
