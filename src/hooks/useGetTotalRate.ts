import {
  useGetTimeStampOfTheEnd,
  useGetRewardRate,
  useGetTotalSupply,
} from "../helpers/contractRead";

import { useAppContext } from "../context/context";
import { currentStamp, fromWei } from "../helpers/mathHelpers";
import { useMemo, useState } from "react";

export const useGetTotalRate = () => {
  const [totalRate, setTotalRate] = useState<number>(0);

  const context = useAppContext();
  const stakedBalance = context?.stakedBalance;
  const inputValue = context?.inputValue;
  const days = context?.days;

  const periodFinish = Number(useGetTimeStampOfTheEnd());
  const remaining = periodFinish - currentStamp;
  const rewardRate = Number(useGetRewardRate());
  const totalAvailble = remaining * rewardRate;
  const totalSupply = Number(useGetTotalSupply());

  useMemo(() => {
    if (days && days > 0) {
      setTotalRate(
        Math.round(
          fromWei(
            (Number(stakedBalance) * totalAvailble) / totalSupply +
              Number(inputValue)
          )
        )
      );
    } else setTotalRate(0);
  }, [stakedBalance, totalAvailble, totalSupply, inputValue, days]);

  return totalRate;
};
