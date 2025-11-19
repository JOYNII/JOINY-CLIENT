"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../../components/PageHeader";
import { getPartyById, getCurrentUser } from "../../../../mock/mockApi";
import { Party } from "../../../types";
import PartyDetails from "./components/PartyDetails";
import PartyMembers from "./components/PartyMembers";
import JoinLeaveButton from "./components/JoinLeaveButton";
import Chat from "./components/Chat";

import { useChat } from "../../../hooks/useChat";

export default function PartyDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = params;

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: party, error, isLoading } = useQuery<Party, Error>({
    queryKey: ['party', id],
    queryFn: () => getPartyById(id as string),
    enabled: !!id,
  });

  const {
    socketRef,
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
  } = useChat(id as string, currentUser?.id);

  const isMember = useMemo(() => {
    if (!party || !currentUser) return false;
    return party.members.some(member => member.id === currentUser.id);
  }, [party, currentUser]);

  const { mutate: toggleJoinLeave, isPending: isJoinLeavePending } = useMutation({
    mutationFn: () => {
      if (!socketRef.current) {
        return Promise.reject(new Error("Socket not connected"));
      }
      if (!currentUser) {
        return Promise.reject(new Error("User not logged in"));
      }
      socketRef.current.emit("toggle_join_leave", { partyId: id, userId: currentUser.id });
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['party', id] });
      queryClient.invalidateQueries({ queryKey: ['parties'] });

      if (isMember && party?.members.length === 1) {
        console.log("Last member left, party deleted. Redirecting to home.");
        const queryString = searchParams.toString();
        router.push(queryString ? `/home?${queryString}` : '/home');
      }
    },
    onError: (error: Error) => {
      alert(`오류가 발생했습니다: ${error.message}`);
    }
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>파티 정보를 불러오는 중...</p></div>;
  }

  if (error || (!party && !isLoading)) {
    return <div className="min-h-screen flex items-center justify-center"><p>파티를 찾을 수 없거나 오류가 발생했습니다.</p></div>;
  }
  
  if (!party) {
    return null;
  }

  let themeText = party.theme === "christmas" ? "(크리스마스 ver)" : party.theme === "reunion" ? "(동창회 ver)" : "";

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      <PageHeader title={`Invitation ${themeText}`} subtitle={`'${party.partyName}' 파티에 초대합니다!`} />

      <section className="max-w-3xl mx-auto space-y-8">
        <PartyDetails party={party} />
        
        <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <PartyMembers party={party} />
        </div>

        <JoinLeaveButton 
          isMember={isMember}
          isPending={isJoinLeavePending}
          onClick={() => {
            toggleJoinLeave();
          }}
        />

        {isMember && (
          <Chat 
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            currentUser={currentUser}
          />
        )}
      </section>
    </div>
  );
}
