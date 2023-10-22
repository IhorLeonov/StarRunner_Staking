import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useAppContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [isWalletConnect, setIsWalletConnect] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [struBalance, setStruBalance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [rewards, setRewards] = useState(0);

  const [status, setStatus] = useState("");
  const [isLoadingTransaction, setIsLoadingTransaction] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [payload, setPayload] = useState(0);

  return (
    <Context.Provider
      value={{
        isWalletConnect,
        setIsWalletConnect,
        struBalance,
        setStruBalance,
        stakedBalance,
        setStakedBalance,
        rewards,
        setRewards,
        status,
        setStatus,
        userAddress,
        setUserAddress,
        isLoadingTransaction,
        setIsLoadingTransaction,
        payload,
        setPayload,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </Context.Provider>
  );
};
