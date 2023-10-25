import s from "../Pages.module.scss";
import styles from "./Withdraw.module.scss";
import { useEffect } from "react";
import { useAppContext } from "../../context/context";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { formatEther, parseEther } from "viem";
import { toFixedDigits } from "../../helpers/mathHelpers";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";

import {
  useWithdraw,
  useWaitForWithdraw,
  useTakeAll,
  useWaitTakeAll,
} from "../../helpers/contractWrite";

export const Withdraw = () => {
  const context = useAppContext();
  const stakedBalance = context?.stakedBalance;
  const rewards = context?.rewards;

  const formattedStakedBalance = stakedBalance
    ? toFixedDigits(Number(formatEther(stakedBalance)))
    : "";

  const { writeWithdraw, dataWithdraw, withdrawIsLoading } = useWithdraw();
  const { takeAllWrite, takeAllData, takeAllIsLoading } = useTakeAll();
  const { withdrawLoading } = useWaitForWithdraw(dataWithdraw);
  const { takeAllLoading } = useWaitTakeAll(takeAllData);
  const isLoading = withdrawIsLoading || takeAllIsLoading;

  useEffect(() => {
    if (withdrawLoading) context?.setTransactionStatus("withdraw_loading");
    if (takeAllLoading) context?.setTransactionStatus("exit_loading");
  }, [withdrawLoading, takeAllLoading]);

  const handleSubmit = (amount: string) => {
    const payload = parseEther(amount);

    context?.setPayload(payload);
    writeWithdraw({ args: [payload] });
  };

  const handleTakeAll = () => {
    if (stakedBalance && rewards) {
      context?.setPayload(stakedBalance + rewards);
    }
    takeAllWrite();
  };

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Withdraw</h2>
      </div>
      <TransactionForm
        handleSubmit={handleSubmit}
        balance={
          formattedStakedBalance !== undefined ? formattedStakedBalance : ""
        }
      />
      <div className={styles.withdrow_buttons_box}>
        <SubmitButton
          text="Withdraw"
          className={"withdraw_btn"}
          isLoading={isLoading}
        />
        <button
          className={s.page_submit_btn + " " + styles.withdraw_btn_all}
          type="button"
          onClick={handleTakeAll}
        >
          withdraw all & Claim rewards
        </button>
      </div>
    </div>
  );
};
