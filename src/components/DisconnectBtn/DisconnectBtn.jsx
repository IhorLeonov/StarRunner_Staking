import s from "./DisconnectBtn.module.scss";
import { useAppContext } from "../../context/context";
import { Icon } from "../SelectIcons/SelectIcons";
import { useDisconnect } from "wagmi";

export const DisconnectBtn = () => {
  const { setIsWalletConnect } = useAppContext();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
    setIsWalletConnect(false);
  };

  return (
    <button type="button" className={s.dcnnct_btn} onClick={handleDisconnect}>
      <Icon name="logout" width={18} height={18} />
    </button>
  );
};
