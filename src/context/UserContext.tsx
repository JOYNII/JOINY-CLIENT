"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { User } from "../types";

const MOCK_USERS: User[] = [
  { id: "user1", name: "김조이" },
  { id: "user2", name: "박개발" },
  { id: "user3", name: "최디자" },
];
const DEFAULT_USER: User = MOCK_USERS[0];

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const searchParams = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get("user");
    if (userId) {
      const userIndex = parseInt(userId, 10) - 1;
      if (userIndex >= 0 && userIndex < MOCK_USERS.length) {
        setUser(MOCK_USERS[userIndex]);
        return;
      }
    }
    const newParams = new URLSearchParams(window.location.search);
    if (!newParams.get("user")) {
      newParams.set("user", "1");
    }
    setUser(DEFAULT_USER);
  }, [searchParams]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
