
import React, { createContext, useContext, useState } from "react";
import { AuthContext } from '@contexts/authcontext'

// type User = {
//   id: string;
//   email: string;
// };

// type AuthContextData = {
//   user: User | null;
//   signIn: (email: string, password: string) => Promise<void>;
//   signOut: () => void;
// };

// const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);

//   async function signIn(email: string, password: string) {
  
//     const fakeUser = { id: "1", email };
//     setUser(fakeUser);
//   }

//   function signOut() {
//     setUser(null);
//   }

//   return (
//     <AuthContext.Provider value={{ user, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
