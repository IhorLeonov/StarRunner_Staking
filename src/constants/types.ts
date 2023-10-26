import { ReactNode, Dispatch, SetStateAction } from "react";
import { WriteContractResult } from "wagmi/actions";

export interface isActiveProps {
  isActive: boolean;
}

export interface SelectIconProps {
  name: string;
  width: number;
  height: number;
}

export interface TransactionFormProps {
  balance: string;
  handleSubmit: (amount: string) => void;
}

export type WriteDataType = WriteContractResult;

export type WriteStakeFuncType = (args?: { args: bigint[] }) => void;

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
  days: number;
  setDays: Dispatch<SetStateAction<number>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  transactionStatus: string;
  setTransactionStatus: Dispatch<SetStateAction<string>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  payload: bigint;
  setPayload: Dispatch<SetStateAction<bigint>>;
}

export interface SubmitButtonProps {
  text: string;
  className: string;
  isLoading: boolean;
}

export interface PromptProps {
  promptName: string | null;
  promptClass: string | null;
}

export interface HelpBtnProps {
  name: string;
  promptName: string | null;
  promptClass: string | null;
  handleShowPrompt: (name: string) => void;
  handleHidePrompt: () => void;
}
