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
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const userIdParam = searchParams.get("user");

      if (!userIdParam || userIdParam === "none") {
        setUser(null);
        return;
      }

      const userIndex = parseInt(userIdParam, 10) - 1;
      if (userIndex >= 0 && userIndex < MOCK_USERS.length) {
        setUser(MOCK_USERS[userIndex]);
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
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
