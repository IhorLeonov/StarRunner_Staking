import s from "../Pages.module.scss";
import { useEffect } from "react";
import { useAppContext } from "../../context/context";
import { Loader } from "../../components/Loader/Loader";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { formatEther, parseEther } from "viem";
import { toFixedDigits } from "../../helpers/mathHelpers";

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

  const isLoading = withdrawIsLoading || takeAllIsLoading;

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
      <div className={s.withdrow_buttons_box}>
        <button
          form="form"
          className={s.page_form_btn + " " + s.withdraw_btn}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader width="24" /> : "Withdraw"}
        </button>
        <button
          className={s.page_form_btn + " " + s.withdraw_btn_all}
          type="button"
          onClick={handleTakeAll}
        >
          withdraw all & Claim rewards
        </button>
      </div>
    </div>
  );
};
