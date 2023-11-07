import s from "./Prompt.module.scss";
import { FC } from "react";
import { PromptProps } from "../../constants/types";

const balanceString = "Staking rewards get allocated on this sum";
const aprString = "Displays the average for APR.";
const aprSecondString =
  "Interest rate is calculated for each amount of tokens.";
const rewardsString = "Rewards get allocated every second";

export const Prompt: FC<PromptProps> = ({ promptName, promptClass }) => {
  // const prompt = document.getElementById("prompt");
  // const rect = prompt?.getBoundingClientRect();
  // console.log(rect);

  return (
    <div id="prompt" className={s.prompt + " " + promptClass}>
      <h3 className={s.prompt_title}>{promptName}</h3>
      <p>
        <span>
          {(() => {
            switch (promptName) {
              case "balance":
                return balanceString;
              case "apr":
                return aprString;
              case "rewards":
                return rewardsString;
              default:
                return;
            }
          })()}
        </span>
        <br />
        <span>{promptName === "apr" && aprSecondString}</span>
      </p>
    </div>
  );
};
