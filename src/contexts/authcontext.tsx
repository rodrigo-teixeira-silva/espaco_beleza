import { useEffect, useState } from "react";
import { UserDTO } from "@dtos/user.DTO";
import { createContext, ReactNode } from "react";
import { api } from "@services/api";
import { storageUserSave, storageUserGet } from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthcontextProvider({ children }: AuthContextProviderProps) {
  
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadingUserData() {
    try {
    const userLogged = await storageUserGet();

    if (userLogged) {
      setUser(userLogged);
     
    }
  }catch (error) {
  throw error;
  }finally{
    setIsLoadingUserStorageData(false);
  }
}

  useEffect(() => {
    loadingUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn,
      isLoadingUserStorageData,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// function useState(arg0: {
//   id: string;
//   name: string;
//   email: string;
//   avatar: string;
// }): [any, any] {
//   throw new Error("Function not implemented.");
// }
