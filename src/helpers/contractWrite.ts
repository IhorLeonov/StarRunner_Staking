import stakeABI from "./abis/stakeABI.json";
import struABI from "./abis/struABI.json";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useAppContext } from "../context/context";
import { ContractWriteData, WriteStakeFunc } from "../constants/types";

const { VITE_STAKE_ADDRESS, VITE_STRU_ADDRESS } = import.meta.env;

// approving token amount before staking, gets stake address and token amount in args
export const useApproveStaking = () => {
  const setStatus = useAppContext()?.setStatus;
  // const { setStatus } = useAppContext();

  const {
    data: apprData,
    isLoading: apprWriteLoading,
    write: writeApprove,
  } = useContractWrite({
    address: VITE_STRU_ADDRESS,
    abi: struABI,
    functionName: "approve",

    onError() {
      if (setStatus) setStatus("error");
    },
  });

  return { writeApprove, apprData, apprWriteLoading };
};

// method for waitting useApproveStaking transaction, gets in approve writing hash, stake writing function and token amount in props
export const useWaitForApprove = (
  data: ContractWriteData | undefined,
  writeStake: WriteStakeFunc | undefined,
  amount: number
) => {
  const setStatus = useAppContext()?.setStatus;
  const setTransactionStatus = useAppContext()?.setTransactionStatus;
  // const { setStatus, setTransactionStatus } = useAppContext();

  const { isLoading: apprLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      if (setTransactionStatus && setStatus && writeStake) {
        setTransactionStatus("");
        setStatus("success_approve");
        writeStake({ args: [amount] });
      }
    },
    onError() {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("error");
      }
    },
  });

  return { apprLoading };
};

// send STRU token to stake, pass amount of staked token in args
export const useStakeToken = () => {
  const setStatus = useAppContext()?.setStatus;
  // const { setStatus } = useAppContext();

  const {
    data: stakeData,
    isLoading: stakeWriteLoading,
    write: writeStake,
  } = useContractWrite({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "stake",

    onError() {
      if (setStatus) setStatus("error");
    },
  });
  return { writeStake, stakeData, stakeWriteLoading };
};

// method for waitting useStakeToken transaction, gets in approve writing hash in props
export const useWaitForStake = (data: ContractWriteData) => {
  const setStatus = useAppContext()?.setStatus;
  const setTransactionStatus = useAppContext()?.setTransactionStatus;
  // const { setStatus, setTransactionStatus } = useAppContext();

  const { isLoading: stakeLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("success_stake");
        console.log("Successful stake", data);
      }
    },
    onError() {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("error");
      }
    },
  });

  return { stakeLoading };
};

// get STRU token from stake, pass desired amount of token in args
export const useWithdraw = () => {
  const setStatus = useAppContext()?.setStatus;
  // const { setStatus } = useAppContext();

  const {
    data: dataWithdraw,
    isLoading: withdrawIsLoading,
    write: writeWithdraw,
  } = useContractWrite({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "withdraw",
    onError() {
      if (setStatus) setStatus("error");
    },
  });
  return { writeWithdraw, dataWithdraw, withdrawIsLoading };
};

// method for waitting useWithdraw transaction
export const useWaitForWithdraw = (data: ContractWriteData) => {
  const setStatus = useAppContext()?.setStatus;
  const setTransactionStatus = useAppContext()?.setTransactionStatus;
  // const { setStatus, setTransactionStatus } = useAppContext();

  const { isLoading: withdrawLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("success_withdraw");
        console.log("Successful withdraw", data);
      }
    },
    onError() {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("error");
      }
    },
  });

  return { withdrawLoading };
};

// get rewards from stake
export const useClaimRewards = () => {
  const setStatus = useAppContext()?.setStatus;
  // const { setStatus } = useAppContext();

  const {
    data: dataClaim,
    isLoading: claimIsLoading,
    write: writeClaim,
  } = useContractWrite({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "claimReward",
    onError() {
      if (setStatus) setStatus("error");
    },
  });
  return { writeClaim, dataClaim, claimIsLoading };
};

// method for waitting useClaimRewards transaction
export const useWaitClaimRewards = (data: ContractWriteData) => {
  const setStatus = useAppContext()?.setStatus;
  const setTransactionStatus = useAppContext()?.setTransactionStatus;
  // const { setStatus, setTransactionStatus } = useAppContext();

  const { isLoading: claimLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("success_claim");
        console.log("Successful getting claim rewards", data);
      }
    },
    onError() {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("error");
      }
    },
  });

  return { claimLoading };
};

// take all (staked balance + rewards) from stake
export const useTakeAll = () => {
  const setStatus = useAppContext()?.setStatus;
  // const { setStatus } = useAppContext();

  const {
    data: takeAllData,
    isLoading: takeAllIsLoading,
    write: takeAllWrite,
  } = useContractWrite({
    address: VITE_STAKE_ADDRESS,
    abi: stakeABI,
    functionName: "exit",
    onError() {
      if (setStatus) setStatus("error");
    },
  });
  return { takeAllWrite, takeAllData, takeAllIsLoading };
};

// method for waitting useTakeAll transaction
export const useWaitTakeAll = (data: ContractWriteData) => {
  const setStatus = useAppContext()?.setStatus;
  const setTransactionStatus = useAppContext()?.setTransactionStatus;
  // const { setStatus, setTransactionStatus } = useAppContext();

  const { isLoading: takeAllLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("success_exit");
        console.log("Successful getting all staked balance", data);
      }
    },
    onError() {
      if (setTransactionStatus && setStatus) {
        setTransactionStatus("");
        setStatus("error");
      }
    },
  });
  return { takeAllLoading };
};
