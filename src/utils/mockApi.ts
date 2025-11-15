
import { Party, User } from '../types';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');



const MOCK_USERS: User[] = [
  { id: 'user1', name: '김조이' },
  { id: 'user2', name: '박개발' },
  { id: 'user3', name: '최디자' },
];

const CURRENT_USER: User = MOCK_USERS[0]; 

const initialParties: Party[] = [
];

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


export const createParty = async (partyData: Omit<Party, 'id' | 'members' | 'hostName'>): Promise<void> => {
  console.log('Emitting create_party event to server with data:', partyData);
  return new Promise((resolve) => {
    socket.emit('create_party', partyData);
    resolve();
  });
};

export const joinParty = async (partyId: string, userId: string): Promise<Party | undefined> => {
  console.log(`User ${userId} attempting to join party ${partyId}`);
  return new Promise((resolve, reject) => {
    resolve(undefined);
  });
};

export const leaveParty = async (partyId: string, userId: string): Promise<Party | undefined> => {
    console.log(`User ${userId} attempting to leave party ${partyId}`);
    return new Promise((resolve, reject) => {
        resolve(undefined);
    });
};
