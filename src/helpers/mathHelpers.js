const oneDay = 86400;

export const fromWei = (numb) => {
  return numb / 10 ** 18;
};

export const currentStamp = Date.now() / 1000;

export const calcPercent = (numberOfRewards, totalAmount) => {
  return Math.round((Number(numberOfRewards) * 100) / Number(totalAmount));
};

export const calcEndingTime = (timeStamp) => {
  return Math.round((Number(timeStamp) - currentStamp) / oneDay);
};

export const calcTotalRate = (
  stakedBalance,
  totalAvailble,
  totalSupply,
  inputValue
) => {
  return Math.round(
    fromWei(
      (Number(stakedBalance) * totalAvailble) / totalSupply + Number(inputValue)
    )
  );
};

export const toFixedDigits = (value) => {
  if (value >= 10) {
    return value.toFixed();
  } else if ((value < 10) & (value >= 1)) {
    return value.toFixed(1);
  } else return value.toFixed(2);
};

export const formattAddress = (address) => address?.slice(0, 17) + "...";
