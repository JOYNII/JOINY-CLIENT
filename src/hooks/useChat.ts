import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '../types';
import { ChatMessage } from '../app/party/[id]/components/Chat';

export function useChat(partyId: string, currentUser?: User | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!partyId) return;

    const socket = io("http://localhost:3001");
    socketRef.current = socket;

    socket.emit("join_room", partyId);

    const handleReceiveMessage = (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleRefetchPartyData = () => {
      console.log("Received refetch signal. Invalidating queries.");
      queryClient.invalidateQueries({ queryKey: ['party', partyId] });
      queryClient.invalidateQueries({ queryKey: ['parties'] });
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("refetch_party_data", handleRefetchPartyData);

    return () => {
      console.log("Cleaning up chat socket.");
      socket.off("receive_message", handleReceiveMessage);
      socket.off("refetch_party_data", handleRefetchPartyData);
      socket.disconnect();
    };
  }, [partyId, queryClient]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !socketRef.current || !currentUser) return;

    const message: ChatMessage = {
      user: currentUser,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit('send_message', { partyId, message });
    setNewMessage('');
  };

  return { messages, newMessage, setNewMessage, handleSendMessage, socketRef };
}
