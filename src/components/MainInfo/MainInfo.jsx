import s from "./MainInfo.module.scss";
import { HelpBtn } from "../HelpBtn/HelpBtn";
import { usePrompt } from "../../hooks/usePrompt";
import { useAccount } from "wagmi";
import {
  calcPercent,
  calcEndingTime,
  toFixedDigits,
} from "../../helpers/mathHelpers";

import { formatEther } from "viem";
import { useEffect } from "react";
import { useAppContext } from "../../context/context";

import {
  useGetStakedBalance,
  useGetNumberOfRewards,
  useGetTotalAmountOfStakes,
  useGetTimeStampOfTheEnd,
  useGetUserRewards,
} from "../../helpers/contractRead";

export const MainInfo = () => {
  const { setStakedBalance, setRewards } = useAppContext();
  const { promptName, promptClass, handleShowPrompt, handleHidePrompt } =
    usePrompt();

  const { address } = useAccount();
  const numberOfRewards = useGetNumberOfRewards();
  const totalAmount = useGetTotalAmountOfStakes();
  const timeStamp = useGetTimeStampOfTheEnd();
  const stakedBalance = useGetStakedBalance(address);
  const userRewards = useGetUserRewards(address);

  const formattedStakedBalance = stakedBalance
    ? toFixedDigits(Number(formatEther(stakedBalance)))
    : 0;
  const formattedUserRewards = userRewards
    ? toFixedDigits(Number(formatEther(userRewards)))
    : 0;
  const percent = calcPercent(numberOfRewards, totalAmount);
  const days = calcEndingTime(timeStamp);

  useEffect(() => {
    if ((stakedBalance !== undefined) & (userRewards !== undefined)) {
      setStakedBalance(stakedBalance);
      setRewards(userRewards);
    }
  }, [stakedBalance, userRewards, setStakedBalance, setRewards]);

  return (
    <section className={s.hero}>
      <div className={s.hero_container}>
        <h1 className={s.hero_title}>StarRunner Token staking</h1>
        <ul className={s.hero_info}>
          <li className={s.hero_info_balance}>
            <span className={s.hero_amount}>
              {formattedStakedBalance ? formattedStakedBalance : "0.00"}
            </span>
            <span className={s.hero_stru}>STRU</span>{" "}
            <HelpBtn
              name="balance"
              handleShowPrompt={handleShowPrompt}
              handleHidePrompt={handleHidePrompt}
              promptName={promptName}
              promptClass={promptClass}
            />
            <span className={s.hero_info_desc}>Staked balance</span>
          </li>

          <li className={s.hero_info_apr}>
            <span className={s.hero_amount}>≈{percent ? percent : "0"}%</span>{" "}
            <HelpBtn
              name="apr"
              handleShowPrompt={handleShowPrompt}
              handleHidePrompt={handleHidePrompt}
              promptName={promptName}
              promptClass={promptClass}
            />
            <span className={s.hero_info_desc}>APR</span>
          </li>

          <li className={s.hero_info_days}>
            <span className={s.hero_amount}>{days ? days : "0"}</span>{" "}
            <span className={s.hero_info_desc}>Days</span>
          </li>

          <li className={s.hero_info_rewards}>
            <span className={s.hero_amount}>
              {formattedUserRewards ? formattedUserRewards : "0"}
            </span>{" "}
            <span className={s.hero_stru}>STRU</span>{" "}
            <HelpBtn
              name="rewards"
              handleShowPrompt={handleShowPrompt}
              handleHidePrompt={handleHidePrompt}
              promptName={promptName}
              promptClass={promptClass}
            />
            <span className={s.hero_info_desc}>Rewards</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
