// src/utils/mockApi.ts
import { Party, User } from '../types';

// --- Mock Data ---

const CURRENT_USER: User = { id: 'user1', name: '김조이' };

const initialParties: Party[] = [
  {
    id: '1',
    partyName: '주말 풋살 모임',
    partyDescription: '매주 토요일 즐거운 풋살!',
    members: [CURRENT_USER],
    maxMembers: 6,
    theme: 'christmas',
    hostName: '김조이',
    partyDate: '2025-12-20',
    place: '서울 월드컵경기장',
    partyFood: '치킨과 맥주',
    fee: 10000,
  },
  {
    id: '2',
    partyName: '스터디 그룹: Next.js',
    partyDescription: 'Next.js 딥 다이브 스터디',
    members: [{ id: 'user2', name: '박개발' }],
    maxMembers: 5,
    theme: 'reunion',
    hostName: '박개발',
    partyDate: '2025-11-30',
    place: '강남 스터디룸',
    partyFood: '커피와 샌드위치',
    fee: 5000,
  },
];

// --- Mock API ---

const getPartiesFromStorage = (): Party[] => {
  if (typeof window === 'undefined') return [];
  const storedData = sessionStorage.getItem('parties');
  if (storedData) {
    return JSON.parse(storedData);
  }
  // If no data in storage, initialize with initialParties
  sessionStorage.setItem('parties', JSON.stringify(initialParties));
  return initialParties;
};

const savePartiesToStorage = (parties: Party[]) => {
  sessionStorage.setItem('parties', JSON.stringify(parties));
};

// --- Exported Functions ---

export const getCurrentUser = (): User => {
  return CURRENT_USER;
};

export const getParties = async (): Promise<Party[]> => {
  console.log('Fetching all parties...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getPartiesFromStorage());
    }, 200); // Simulate network delay
  });
};

export const getPartyById = async (id: string): Promise<Party | undefined> => {
  console.log(`Fetching party with id: ${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const party = getPartiesFromStorage().find((p) => p.id === id);
      resolve(party);
    }, 200);
  });
};

export const createParty = async (partyData: Omit<Party, 'id' | 'members'>): Promise<Party> => {
  console.log('Creating new party...');
  return new Promise((resolve) => {
    setTimeout(() => {
      const parties = getPartiesFromStorage();
      const newParty: Party = {
        ...partyData,
        id: Date.now().toString(),
        members: [CURRENT_USER], // The creator automatically joins
      };
      const updatedParties = [...parties, newParty];
      savePartiesToStorage(updatedParties);
      resolve(newParty);
    }, 200);
  });
};

export const joinParty = async (partyId: string, userId: string): Promise<Party | undefined> => {
  console.log(`User ${userId} attempting to join party ${partyId}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const parties = getPartiesFromStorage();
      const partyIndex = parties.findIndex((p) => p.id === partyId);

      if (partyIndex === -1) {
        return reject(new Error('Party not found'));
      }

      const party = parties[partyIndex];

      if (party.members.length >= party.maxMembers) {
        return reject(new Error('Party is full'));
      }

      if (party.members.some((member) => member.id === userId)) {
        // User is already in the party, so we'll treat this as leaving
        const updatedMembers = party.members.filter((member) => member.id !== userId);
        parties[partyIndex].members = updatedMembers;
        savePartiesToStorage(parties);
        resolve(parties[partyIndex]);
        return;
      }
      
      const user: User = userId === CURRENT_USER.id ? CURRENT_USER : { id: userId, name: `User ${userId}`};

      const updatedMembers = [...party.members, user];
      parties[partyIndex].members = updatedMembers;
      savePartiesToStorage(parties);
      resolve(parties[partyIndex]);
    }, 200);
  });
};

export const leaveParty = async (partyId: string, userId: string): Promise<Party | undefined> => {
    console.log(`User ${userId} attempting to leave party ${partyId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const parties = getPartiesFromStorage();
            const partyIndex = parties.findIndex((p) => p.id === partyId);

            if (partyIndex === -1) {
                return reject(new Error('Party not found'));
            }

            const party = parties[partyIndex];
            const updatedMembers = party.members.filter(member => member.id !== userId);

            // Prevent host from leaving if they are the last person
            if (party.hostName === getCurrentUser().name && updatedMembers.length === 0) {
                // Or maybe we allow it and the party gets deleted? For now, let's prevent it.
                // return reject(new Error('Host cannot leave the party as the last member.'));
            }

            parties[partyIndex].members = updatedMembers;
            savePartiesToStorage(parties);
            resolve(parties[partyIndex]);
        }, 200);
    });
};
