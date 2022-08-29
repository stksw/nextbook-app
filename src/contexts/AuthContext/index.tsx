import { createContext, useContext } from 'react';
import useSWR from 'swr';
import signin from 'services/auth/signin';
import signout from 'services/auth/signout';
import { ApiContext, User } from 'types';

type AuthContextType = {
  authUser?: User;
  isLoading: boolean;
  signin: (username: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  mutate: (
    data?: User | Promise<User>,
    shouldRevalidate?: boolean,
  ) => Promise<User | undefined>;
};

type AuthContextProviderProps = {
  context: ApiContext;
  authUser?: User;
};

const AuthContext = createContext<AuthContextType>({
  authUser: undefined,
  isLoading: false,
  signin: async () => Promise.resolve(),
  signout: async () => Promise.resolve(),
  mutate: async () => Promise.resolve(undefined),
});

export const useAuthContext = (): AuthContextType => {
  return useContext<AuthContextType>(AuthContext);
};

const AuthContextProvider = ({
  context,
  authUser,
  children,
}: React.PropsWithChildren<AuthContextProviderProps>) => {
  const { data, error, mutate } = useSWR<User>(
    `${context.apiRootUrl.replace(/\$/g, '')}/users/me`,
  );

  const handleSignin = async (username: string, password: string) => {
    await signin(context, { username, password });
    await mutate(); // 成功したら/users/meを呼びだしてコンテキストを保存
  };

  const handleSignout = async () => {
    await signout(context);
    await mutate(); // 成功したら/users/meを呼びだしてコンテキストを保存
  };

  const isLoading = !data && !error;

  return (
    <AuthContext.Provider
      value={{
        authUser: data ?? authUser,
        isLoading,
        signin: handleSignin,
        signout: handleSignout,
        mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
