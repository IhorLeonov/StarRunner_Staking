import s from "./Header.module.scss";
import ethLogo from "../../assets/icons/eth-logo.svg";
import struLogo from "../../assets/images/stru-logo.png";

import { Icon } from "../SelectIcons/SelectIcons";
import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { useGetSTRUBalance } from "../../helpers/contractRead";
import { useAppContext } from "../../context/context";
import { ConnectionBtn } from "../ConnectionBtn/ConnectionBtn";
import { formatEther } from "viem";
import { toFixedDigits, formattAddress } from "../../helpers/mathHelpers";
import { DisconnectBtn } from "../DisconnectBtn/DisconnectBtn";

export const Header = () => {
  const context = useAppContext(); // сначала создал обьект с контекстом,
  const setStruBalance = context?.setStruBalance; // потом извлек из него свойста
  const setIsWalletConnect = context?.setStruBalance; // и добавил проверку через "?"
  // const { setStruBalance, setIsWalletConnect } = useAppContext(); // <-- вместо этого

  const { isConnected, address } = useAccount();
  const { data: walletBalance } = useBalance({ address });

  const struBalance = useGetSTRUBalance(String(address)); // конвертировал к стирнге
  const formattedWalletBalance = toFixedDigits(
    Number(walletBalance?.formatted)
  );
  const formattedAddress = formattAddress(String(address)); // конвертировал к стирнге
  const formattedStruBalance =
    struBalance && typeof struBalance === "bigint" // добавил проверку на бигИнт
      ? toFixedDigits(Number(formatEther(struBalance)))
      : "0";

  useEffect(() => {
    if (isConnected && setStruBalance && setIsWalletConnect) {
      setStruBalance(formattedStruBalance);
      // setIsWalletConnect(true);
    }
  }, [formattedStruBalance, setIsWalletConnect, setStruBalance, isConnected]);

  return (
    <header className={s.header}>
      <div className={s.header_container}>
        <a href="https://dexola.com/" target="_blank" rel="noreferrer">
          <Icon name="logo" width={35} height={20} />
        </a>
        {isConnected ? (
          <div className={s.wallet_info}>
            <img className={s.stru_logo} src={struLogo} alt="STRU logo" />
            {formattedStruBalance ? formattedStruBalance : "0.00"} STRU
            <img className={s.eth_logo} src={ethLogo} alt="Ethereum logo" />
            {walletBalance ? formattedWalletBalance : "0.00"}{" "}
            {walletBalance?.symbol}
            <span className={s.wallet_adress}>|</span>
            <span className={s.wallet_adress}>
              {address ? formattedAddress : "unknown"}
            </span>
            <DisconnectBtn />
          </div>
        ) : (
          <div className={s.connect_btn_box}>
            <ConnectionBtn />
          </div>
        )}
      </div>
    </header>
  );
};
