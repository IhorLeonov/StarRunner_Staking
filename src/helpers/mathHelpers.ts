const oneDay = 86400;

export const currentStamp = Date.now() / 1000;

export const fromWei = (numb: number) => {
  return numb / 10 ** 18;
};

export const calcPercent = (numberOfRewards: bigint, totalAmount: bigint) => {
  return Math.round((Number(numberOfRewards) * 100) / Number(totalAmount));
};

export const calcEndingTime = (timeStamp: bigint) => {
  return Math.round((Number(timeStamp) - currentStamp) / oneDay);
};

export const calcTotalRate = (
  stakedBalance: bigint,
  totalAvailble: number,
  totalSupply: number,
  inputValue: string
) => {
  return Math.round(
    fromWei(
      (Number(stakedBalance) * totalAvailble) / totalSupply + Number(inputValue)
    )
  );
};

export const toFixedDigits = (value: number) => {
  if (value >= 10) {
    return value.toFixed();
  } else if (value < 10 && value >= 1) {
    return value.toFixed(1);
  } else return value.toFixed(2);
};

export const formattAddress = (address: string) => {
  return address?.slice(0, 17) + "...";
};
