import s from "../Pages.module.scss";
import { useEffect } from "react";

import {
  useWithdraw,
  useWaitForWithdraw,
  useTakeAll,
  useWaitTakeAll,
} from "../../helpers/contractWrite";

import { useAppContext } from "../../context/context";
import { Loader } from "../../components/Loader/Loader";
import { TransactionsForm } from "../../components/TransactionsForm/TransactionsForm";
import { formatEther, parseEther } from "viem";
import { toFixedDigits } from "../../helpers/mathHelpers";

export const Withdraw = () => {
  const {
    setTransactionStatus,
    setPayload,
    stakedBalance,
    rewards,
    // isWalletConnect,
  } = useAppContext();

  const formattedStakedBalance = stakedBalance // isWalletConnect
    ? toFixedDigits(Number(formatEther(stakedBalance)))
    : 0;

  const { writeWithdraw, dataWithdraw, withdrawIsLoading } = useWithdraw();
  const { takeAllWrite, takeAllData, takeAllIsLoading } = useTakeAll();

  const { withdrawLoading } = useWaitForWithdraw(dataWithdraw);
  const { takeAllLoading } = useWaitTakeAll(takeAllData);

  useEffect(() => {
    if (withdrawLoading) setTransactionStatus("withdraw_loading");
    if (takeAllLoading) setTransactionStatus("exit_loading");
  }, [withdrawLoading, takeAllLoading]);

  const handleSubmit = (amount) => {
    const payload = parseEther(amount);

    setPayload(payload);
    writeWithdraw({ args: [payload] });
  };

  const handleTakeAll = () => {
    setPayload(stakedBalance + rewards);
    takeAllWrite();
  };

  const isLoading = withdrawIsLoading || takeAllIsLoading;

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Withdraw</h2>
      </div>
      <TransactionsForm
        handleSubmit={handleSubmit}
        balance={formattedStakedBalance}
      />
      <div className={s.withdrow_buttons_box}>
        <button
          form="form"
          className={s.page_form_btn + " " + s.withdraw_btn}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader width={24} /> : "Withdraw"}
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
