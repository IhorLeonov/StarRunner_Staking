import stakeABI from "../constants/abis/stakeABI.json";
import struABI from "../constants/abis/struABI.json";
import { useContractRead } from "wagmi";

const { VITE_STAKE_ADDRESS, VITE_STRU_ADDRESS } = import.meta.env;

// reading STRU token balance, takes user address in args
export const useGetSTRUBalance = (address: string) => {
  const { data } = useContractRead({
    address: VITE_STRU_ADDRESS,
    abi: struABI,
    functionName: "balanceOf",
    args: [`${address}`],
    watch: true,
  });
  // return Number(data);
  return data;
};

// reading staked balance, takes user address in args
export const useGetStakedBalance = (address: string) => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "balanceOf",
    args: [`${address}`],
    watch: true,
  });
  return data;
};

// reading total number of rewards for the period
export const useGetNumberOfRewards = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "getRewardForDuration",
  });
  return data;
};

// reading the total amount of stakes made by all users
export const useGetTotalAmountOfStakes = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "totalSupply",
  });
  return data;
};

// reading the timestamp of the end of the reward distribution period
export const useGetTimeStampOfTheEnd = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "periodFinish",
  });
  return data;
};

// reading awailable amount rewards for user, takes user address in args
export const useGetUserRewards = (address: string) => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "earned",
    args: [`${address}`],
    watch: true,
  });
  return data;
};

// reading reward rate
export const useGetRewardRate = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "rewardRate",
  });
  return data;
};

// reading reward rate
export const useGetTotalSupply = () => {
  const { data } = useContractRead({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "totalSupply",
  });
  return data;
};

// checking allowance before staking, gets owner and spender address in args
export const useCheckAllowance = (userAddress: string) => {
  const { data } = useContractRead({
    address: VITE_STRU_ADDRESS,
    abi: struABI,
    functionName: "allowance",
    args: [userAddress, VITE_STAKE_ADDRESS],
    watch: true,
  });
  return data;
};
