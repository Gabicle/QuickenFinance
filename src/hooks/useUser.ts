import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/User";

export function useUser() {
  return useQuery<User, Error>({
    queryKey: ["me"],
  
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/me", {
        signal,
      
      });
      if (!res.ok) throw new Error(`Failed to load user: ${res.status}`);
      const data = await res.json();
    
     return data;
    },
   
    staleTime: 5 * 60 * 1000,     
    gcTime: 30 * 60 * 1000,      
    retry: 1,                   
    refetchOnWindowFocus: true,   
  });
}
