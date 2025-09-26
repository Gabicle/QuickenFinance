import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
  imgUrl: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.id,
          firstName: data.name.split(" ")[0],
          lastName: data.name.split(" ")[1],
          type: "Basic Account",
          imgUrl: "/avatar-robert.jpg",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
