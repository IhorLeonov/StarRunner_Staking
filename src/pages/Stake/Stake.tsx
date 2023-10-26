import s from "../Pages.module.scss";
import { useAppContext } from "../../context/context";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { parseEther } from "viem";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { useGetTotalRate } from "../../hooks/useGetTotalRate";
import { useCheckAllowance } from "../../helpers/contractRead";

import {
  useStakeToken,
  useApproveStaking,
  useWaitForApprove,
  useWaitForStake,
} from "../../helpers/contractWrite";

const { VITE_STAKE_ADDRESS } = import.meta.env;

export const Stake = () => {
  const context = useAppContext();
  const struBalance = context?.struBalance;
  const payload = context?.payload ? context?.payload : 0n;
  const totalRate = useGetTotalRate();

  const { address } = useAccount();
  const allowance = useCheckAllowance(String(address));
  const { writeApprove, apprWriteLoading, apprData } = useApproveStaking();
  const { writeStake, stakeWriteLoading, stakeData } = useStakeToken();
  const { apprLoading } = useWaitForApprove(apprData, writeStake, payload);
  const { stakeLoading } = useWaitForStake(stakeData);
  const isLoading = apprWriteLoading || stakeWriteLoading;

  useEffect(() => {
    if (apprLoading) context?.setTransactionStatus("approve_loading");
    if (stakeLoading) context?.setTransactionStatus("stake_loading");
  }, [apprLoading, stakeLoading, context]);

  const handleSubmit = (amount: string) => {
    const weiAmount = parseEther(amount);
    context?.setPayload(weiAmount);

    if (typeof allowance === "bigint" && allowance < weiAmount) {
      writeApprove({ args: [VITE_STAKE_ADDRESS, weiAmount] });
    } else writeStake({ args: [weiAmount] });
  };

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Stake</h2>
        <p>
          <span className={s.page_rate_title}>Reward rate: </span>
          <span className={s.page_rate_value}>
            {totalRate ? totalRate : "0"}
          </span>
          <span className={s.page_rate_desc}> STRU/WEEK</span>
        </p>
      </div>
      <TransactionForm
        handleSubmit={handleSubmit}
        balance={struBalance !== undefined ? struBalance : ""}
      />
      <SubmitButton
        text="Stake"
        className={"stake_btn"}
        isLoading={isLoading}
      />
    </div>
  );
};
