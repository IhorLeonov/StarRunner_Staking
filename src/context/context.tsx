import { createContext, useContext, useState } from "react";
import { AppContextProps, ContextProps } from "../constants/types";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = ({ children }: ContextProps) => {
  // const [isWalletConnect, setIsWalletConnect] = useState<boolean>(false);
  // const [userAddress, setUserAddress] = useState<string>("");
  const [struBalance, setStruBalance] = useState<string>("");
  const [stakedBalance, setStakedBalance] = useState<bigint>(0n);
  const [rewards, setRewards] = useState<bigint>(0n);

  const [status, setStatus] = useState<string>("");
  const [isLoadingTransaction, setIsLoadingTransaction] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [payload, setPayload] = useState<bigint>(0n);

  return (
    <AppContext.Provider
      value={{
        // isWalletConnect,
        // setIsWalletConnect,
        // userAddress,
        // setUserAddress,
        struBalance,
        setStruBalance,
        stakedBalance,
        setStakedBalance,
        rewards,
        setRewards,

        status,
        setStatus,
        isLoadingTransaction,
        setIsLoadingTransaction,
        inputValue,
        setInputValue,
        payload,
        setPayload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
