import s from "../Pages.module.scss";
import styles from "./ClaimRewards.module.scss";
import { useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import { useAppContext } from "../../context/context";
import { formatEther } from "viem";
import { toFixedDigits } from "../../helpers/mathHelpers";

import {
  useClaimRewards,
  useWaitClaimRewards,
} from "../../helpers/contractWrite";

export const ClaimRewards = () => {
  const context = useAppContext();
  const rewards = context?.rewards;

  const { writeClaim, dataClaim, claimIsLoading } = useClaimRewards();
  const { claimLoading } = useWaitClaimRewards(dataClaim);

  const formattedRewards = rewards
    ? toFixedDigits(Number(formatEther(rewards)))
    : "0.00";

  useEffect(() => {
    if (claimLoading) context?.setTransactionStatus("claim_loading");
  }, [claimLoading]);

  const handleClick = () => {
    if (rewards) {
      context?.setPayload(rewards);
      writeClaim();
    }
  };

  const isLoading = claimIsLoading || rewards === 0n;

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Claim rewards</h2>
      </div>
      <p className={styles.claim_available}>
        Available:{" "}
        <span className={styles.claim_available_value}>{formattedRewards}</span>
        <span> STRU</span>
      </p>
      <button
        className={s.page_submit_btn + " " + styles.claim_btn}
        type="button"
        onClick={handleClick}
        disabled={isLoading}
      >
        {claimIsLoading ? <Loader width="24" /> : "Claim rewards"}
      </button>
    </div>
  );
};
