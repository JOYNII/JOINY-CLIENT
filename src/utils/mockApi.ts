// src/utils/mockApi.ts
import { Party, User } from '../types';
import { io } from 'socket.io-client';

// --- Shared Socket Instance ---
// This is a simplified approach for a mock environment.
// In a real app, you'd manage this more robustly (e.g., in a context).
const socket = io('http://localhost:3001');


// --- Mock Data (used for initial user, etc.) ---

const MOCK_USERS: User[] = [
  { id: 'user1', name: '김조이' },
  { id: 'user2', name: '박개발' },
  { id: 'user3', name: '최디자' },
];

const CURRENT_USER: User = MOCK_USERS[0]; // Default user

// The initialParties data is now primarily managed by the server.
const initialParties: Party[] = [
  // This is now just for reference, server holds the true state.
];


// --- Exported Functions ---

export const getCurrentUser = (): User => {
  if (typeof window === 'undefined') return CURRENT_USER;
  
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('user');
  
  if (userId) {
    const userIndex = parseInt(userId, 10) - 1;
    if (userIndex >= 0 && userIndex < MOCK_USERS.length) {
      return MOCK_USERS[userIndex];
    }
  }
  
  return CURRENT_USER;
};

export const getParties = async (): Promise<Party[]> => {
  console.log('Fetching all parties via socket...');
  return new Promise((resolve) => {
    socket.emit('get_all_parties');
    socket.once('all_parties', (parties: Party[]) => {
      console.log('Received all parties from server.');
      resolve(parties);
    });
  });
};

export const getPartyById = async (id: string): Promise<Party | undefined> => {
  console.log(`Fetching party with id: ${id} via socket...`);
  const parties = await getParties();
  const party = parties.find((p) => p.id === id);
  return party;
};

// The functions below are now legacy as the logic is on the server.
// They are kept to prevent breaking other parts of the app that might use them.

export const createParty = async (partyData: Omit<Party, 'id' | 'members'>): Promise<Party> => {
  console.log('Creating new party...');
  return new Promise((resolve) => {
    // This logic is now on the server. This function is deprecated.
    resolve({} as Party); 
  });
};

export const joinParty = async (partyId: string, userId: string): Promise<Party | undefined> => {
  console.log(`User ${userId} attempting to join party ${partyId}`);
  return new Promise((resolve, reject) => {
    // This logic is now on the server. This function is deprecated.
    resolve(undefined);
  });
};

export const leaveParty = async (partyId: string, userId: string): Promise<Party | undefined> => {
    console.log(`User ${userId} attempting to leave party ${partyId}`);
    return new Promise((resolve, reject) => {
        // This logic is now on the server. This function is deprecated.
        resolve(undefined);
    });
};
