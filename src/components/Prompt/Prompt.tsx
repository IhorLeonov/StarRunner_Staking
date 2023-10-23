import { FC } from "react";
import s from "./Prompt.module.scss";

const balanceString = "Staking rewards get allocated on this sum";
const aprString = "Displays the average for APR.";
const aprSecondString =
  "Interest rate is calculated for each amount of tokens.";
const rewardsString = "Rewards get allocated every second";

interface PromptProps {
  promptName: string | null;
  promptClass: string | null;
}

export const Prompt: FC<PromptProps> = ({ promptName, promptClass }) => {
  return (
    <div className={s.prompt + " " + promptClass}>
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
        <span>
          {(() => {
            switch (promptName) {
              case "apr":
                return aprSecondString;
              default:
                return;
            }
          })()}
        </span>
      </p>
    </div>
  );
};
