import s from "../Pages.module.scss";
import { useAppContext } from "../../context/context";
import { useAccount } from "wagmi";
import { currentStamp, calcTotalRate } from "../../helpers/mathHelpers";
import { useEffect, useMemo } from "react";
import { Loader } from "../../components/Loader/Loader";
import { TransactionsForm } from "../../components/TransactionsForm/TransactionsForm";
import { parseEther } from "viem";

import {
  useCheckAllowance,
  useGetTimeStampOfTheEnd,
  useGetRewardRate,
  useGetTotalSupply,
} from "../../helpers/contractRead";

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
  const stakedBalance = context?.stakedBalance;
  const payload = context?.payload ? context?.payload : 0n;
  const inputValue = context?.inputValue;

  const { address } = useAccount();

  const allowance = useCheckAllowance(String(address));
  const periodFinish = Number(useGetTimeStampOfTheEnd());
  const remaining = periodFinish - currentStamp;
  const rewardRate = Number(useGetRewardRate());
  const totalAvailble = remaining * rewardRate;
  const totalSupply = Number(useGetTotalSupply());

  const { writeApprove, apprWriteLoading, apprData } = useApproveStaking();
  const { writeStake, stakeWriteLoading, stakeData } = useStakeToken();

  const { apprLoading } = useWaitForApprove(apprData, writeStake, payload);
  const { stakeLoading } = useWaitForStake(stakeData);

  const totalRate = useMemo(() => {
    if (stakedBalance && inputValue) {
      return calcTotalRate(
        stakedBalance,
        totalAvailble,
        totalSupply,
        inputValue
      );
    }
  }, [stakedBalance, totalAvailble, totalSupply, inputValue]);

  useEffect(() => {
    if (apprLoading) context?.setTransactionStatus("approve_loading");
    if (stakeLoading) context?.setTransactionStatus("stake_loading");
  }, [apprLoading, stakeLoading]);

  const handleSubmit = (amount: string) => {
    const weiAmount = parseEther(amount);
    context?.setPayload(weiAmount);

    if (typeof allowance === "bigint" && allowance < weiAmount) {
      writeApprove({ args: [VITE_STAKE_ADDRESS, weiAmount] });
    } else writeStake({ args: [weiAmount] });
  };

  const isLoading = apprWriteLoading || stakeWriteLoading;

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
      <TransactionsForm
        handleSubmit={handleSubmit}
        balance={struBalance !== undefined ? struBalance : ""}
      />
      <button
        form="form"
        className={s.page_form_btn + " " + s.stake_btn}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Loader width="24" /> : "Stake"}
      </button>
    </div>
  );
};
