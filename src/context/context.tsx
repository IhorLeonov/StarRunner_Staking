import { createContext, useContext, useState } from "react";
import { AppContextProps, ContextProps } from "../constants/types";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = ({ children }: ContextProps) => {
  const [struBalance, setStruBalance] = useState<string>("");
  const [stakedBalance, setStakedBalance] = useState<bigint>(0n);
  const [rewards, setRewards] = useState<bigint>(0n);
  const [days, setDays] = useState<number>(0);

  const [status, setStatus] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [payload, setPayload] = useState<bigint>(0n);

  return (
    <AppContext.Provider
      value={{
        struBalance,
        setStruBalance,
        stakedBalance,
        setStakedBalance,
        rewards,
        setRewards,
        days,
        setDays,

        status,
        setStatus,
        transactionStatus,
        setTransactionStatus,
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
