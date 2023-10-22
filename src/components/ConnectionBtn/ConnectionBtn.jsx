import s from "./ConnectionBtn.module.scss";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const ConnectionBtn = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <button type="button" className={s.cnnct_btn} onClick={openConnectModal}>
      Connect wallet
    </button>
  );
};
