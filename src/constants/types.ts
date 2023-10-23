import { ReactNode, Dispatch, SetStateAction } from "react";

export interface ContractWriteData {
  hash: `0x${string}` | undefined;
}

export type WriteStakeFunc = (args?: { args: number[] }) => void;

export interface ContextProps {
  children: ReactNode;
}

export interface AppContextProps {
  struBalance: string;
  setStruBalance: Dispatch<SetStateAction<string>>;
  stakedBalance: bigint;
  setStakedBalance: Dispatch<SetStateAction<bigint>>;
  rewards: bigint;
  setRewards: Dispatch<SetStateAction<bigint>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  transactionStatus: string;
  setTransactionStatus: Dispatch<SetStateAction<string>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  payload: bigint;
  setPayload: Dispatch<SetStateAction<bigint>>;
}

// export interface FilterProps {
//   filterValue: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
// }

// export interface LayoutProps {
//   children: JSX.Element | JSX.Element[];
// }
