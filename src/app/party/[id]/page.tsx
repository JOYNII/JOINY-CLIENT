"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import PageHeader from "../../../components/PageHeader";
import { getPartyById, joinParty, getCurrentUser } from "../../../utils/mockApi";
import { Party, User } from "../../../types";

interface ChatMessage {
  user: User;
  text: string;
  timestamp: string;
}

export default function PartyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = params;
  const currentUser = getCurrentUser();
  const socketRef = useRef<Socket | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const { data: party, isLoading, error } = useQuery<Party | undefined>({
    queryKey: ['party', id],
    queryFn: () => getPartyById(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (!id) return;

    // Connect to the socket server
    const socket = io("http://localhost:3001");
    socketRef.current = socket;

    // Join the party room
    socket.emit("join_room", id);

    // Listen for incoming messages
    socket.on("receive_message", (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [id]);

  const { mutate: toggleJoinLeave, isPending: isJoinLeavePending } = useMutation({
    mutationFn: () => joinParty(id as string, currentUser.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parties'] });
      queryClient.invalidateQueries({ queryKey: ['party', id] });
    },
    onError: (error) => {
      alert(`오류가 발생했습니다: ${error.message}`);
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !socketRef.current) return;

    const message: ChatMessage = {
      user: currentUser,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit("send_message", { partyId: id, message });
    setNewMessage("");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>파티 정보를 불러오는 중...</p></div>;
  }

  if (error || !party) {
    return <div className="min-h-screen flex items-center justify-center"><p>파티를 찾을 수 없거나 오류가 발생했습니다.</p></div>;
  }
  
  const isMember = party.members.some(member => member.id === currentUser.id);
  let themeText = party.theme === "christmas" ? "(크리스마스 ver)" : party.theme === "reunion" ? "(동창회 ver)" : "";

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 p-6 md:p-12 lg:p-20">
      <PageHeader title={`Invitation ${themeText}`} subtitle={`'${party.partyName}' 파티에 초대합니다!`} />

      <section className="max-w-3xl mx-auto space-y-8">
        {/* Party Details Section */}
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
            <h3 className="font-semibold text-gray-800 mb-4">참여 인원 ({party.members.length} / {party.maxMembers})</h3>
            <div className="flex flex-wrap gap-4">
              {party.members.map(member => (
                <div key={member.id} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{member.name}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Join/Leave Button */}
        <div className="flex justify-center">
          <button onClick={() => toggleJoinLeave()} disabled={isJoinLeavePending} className={`px-8 py-3 font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:cursor-not-allowed ${isMember ? "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400" : "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400"}`}>
            {isJoinLeavePending ? "처리 중..." : (isMember ? "파티 나가기" : "파티 참여하기")}
          </button>
        </div>

        {/* Chat Section */}
        {isMember && (
          <div className="bg-white p-8 rounded-xl shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-800">파티 채팅</h3>
            <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.user.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-xs ${msg.user.id === currentUser.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <div className="font-bold text-sm">{msg.user.name}</div>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="메시지를 입력하세요..."
              />
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors">
                전송
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
