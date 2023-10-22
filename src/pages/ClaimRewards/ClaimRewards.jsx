import s from "../Pages.module.scss";
import { useEffect } from "react";
import {
  useClaimRewards,
  useWaitClaimRewards,
} from "../../helpers/contractWrite";
import { Loader } from "../../components/Loader/Loader";
import { useAppContext } from "../../context/context";
import { formatEther } from "viem";
import { toFixedDigits } from "../../helpers/mathHelpers";

export const ClaimRewards = () => {
  const {
    setPayload,
    setIsLoadingTransaction,
    rewards,
    //  isWalletConnect
  } = useAppContext();

  const { writeClaim, dataClaim, claimIsLoading } = useClaimRewards();
  const { claimLoading } = useWaitClaimRewards(dataClaim);

  const formattedRewards = rewards // isWalletConnect
    ? toFixedDigits(Number(formatEther(rewards)))
    : 0;

  useEffect(() => {
    if (claimLoading) setIsLoadingTransaction("claim_loading");
  }, [claimLoading]);

  const handleClick = () => {
    setPayload(rewards);
    writeClaim();
  };

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Claim rewards</h2>
      </div>
      <p className={s.claim_available}>
        Available:{" "}
        <span className={s.claim_available_value}>
          {rewards ? formattedRewards : "0.00"}
        </span>
        <span> STRU</span>
      </p>
      <button
        className={s.page_form_btn + " " + s.claim_btn}
        type="button"
        onClick={handleClick}
        disabled={claimIsLoading || rewards === 0n}
      >
        {claimIsLoading ? <Loader width={24} /> : "Claim rewards"}
      </button>
    </div>
  );
};
