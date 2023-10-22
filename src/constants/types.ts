// import { ChangeEvent, JSX } from "react";

export interface ContractWriteData {
  hash: `0x${string}` | undefined;
}

export type WriteStakeFunc = (args?: { args: number[] }) => void;

// export interface FilterProps {
//   filterValue: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
// }

// export interface LayoutProps {
//   children: JSX.Element | JSX.Element[];
// }
