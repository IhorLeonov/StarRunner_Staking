const oneDay = 86400;

export const currentStamp = Date.now() / 1000;

export const fromWei = (numb: number): number => {
  return numb / 10 ** 18;
};

export const calcPercent = (
  numberOfRewards: bigint,
  totalAmount: bigint
): number => {
  return Math.round((Number(numberOfRewards) * 100) / Number(totalAmount));
};

export const calcEndingTime = (timeStamp: bigint): number => {
  const days = Math.round((Number(timeStamp) - currentStamp) / oneDay);
  if (days > 0) {
    return days;
  } else return 0;
};

export const toFixedDigits = (value: number): string => {
  if (value >= 10) {
    return value.toFixed();
  } else if (value < 10 && value >= 1) {
    return value.toFixed(1);
  } else return value.toFixed(2);
};

export const formattAddress = (address: string): string => {
  return address?.slice(0, 17) + "...";
};
