import s from "./Notification.module.scss";
import { useAppContext } from "../../context/context";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import crossIcon from "../../assets/icons/cross.svg";
import tickIcon from "../../assets/icons/tick.svg";
import { formatEther } from "viem";

export const Notification = () => {
  const location = useLocation();
  const {
    status,
    setStatus,
    transactionStatus,
    setTransactionStatus,
    payload,
  } = useAppContext();

  const tokenAmount = Number(formatEther(payload)).toFixed(2);

  // close notification
  useEffect(() => {
    if (status.includes("success") || status.includes("error")) {
      setTimeout(() => {
        setStatus("");
      }, 5000);
    }
  }, [status]);

  // close notification if user change route
  useEffect(() => {
    setStatus("");
    setTransactionStatus("");
  }, [location]);

  return (
    <div className={s.notify}>
      {/*  showing loader  */}
      {transactionStatus && !status && <div className={s.notify_loader} />}
      {/*  showing success img  */}
      {status.includes("success") && (
        <div className={s.notify_circle_success}>
          <img src={tickIcon} alt="Tick icon" />
        </div>
      )}
      {/*  showing error img  */}
      {status.includes("error") && (
        <div className={s.notify_circle_error}>
          <img src={crossIcon} alt="Cross icon" />
        </div>
      )}
      <p className={s.notify_desc}>
        {/* showing transaction in process messages */}
        {transactionStatus === "approve_loading" && (
          <>
            Approving{" "}
            <span className={s.notify_accent}>{tokenAmount} STRU </span>{" "}
            <span className={s.notify_string}>before Staking</span>
          </>
        )}
        {transactionStatus === "stake_loading" && !status && (
          <>
            Adding <span className={s.notify_accent}>{tokenAmount}</span> STRU
            to Staking
          </>
        )}
        {transactionStatus === "withdraw_loading" && (
          <>
            Withdrawing <span className={s.notify_accent}>{tokenAmount}</span>{" "}
            STRU
          </>
        )}
        {transactionStatus === "exit_loading" && (
          <>
            Withdrawing <span className={s.notify_accent}>{tokenAmount}</span>{" "}
            STRU
          </>
        )}
        {transactionStatus === "claim_loading" && (
          <>
            Adding <span className={s.notify_accent}>{tokenAmount}</span> STRU
            to wallet
          </>
        )}
        {/* showing error and success messages */}
        {status === "error" && (
          <>
            <span className={s.notify_accent}>
              Connection Error<span className={s.notify_dot}>. </span>
            </span>
            <span className={s.notify_string}>Please try again</span>
          </>
        )}
        {status === "success_approve" && (
          <>
            <span className={s.notify_accent}>{tokenAmount} STRU </span>{" "}
            successfully approved
          </>
        )}
        {status === "success_stake" && (
          <>
            <span className={s.notify_accent}>{tokenAmount} STRU </span>{" "}
            successfully{" "}
            <span className={s.notify_string}>added to Staking</span>
          </>
        )}
        {status === "success_withdraw" && (
          <>
            <span className={s.notify_accent}>{tokenAmount} STRU </span>
            successfully{" "}
            <span className={s.notify_string}>added to wallet</span>
          </>
        )}
        {status === "success_exit" && (
          <>
            <span className={s.notify_accent}>{tokenAmount} STRU </span>{" "}
            successfully{" "}
            <span className={s.notify_string}>added to wallet</span>
          </>
        )}
        {status === "success_claim" && (
          <>
            <span className={s.notify_accent}>{tokenAmount} STRU </span>{" "}
            successfully{" "}
            <span className={s.notify_string}>added to wallet</span>
          </>
        )}
      </p>
    </div>
  );
};
