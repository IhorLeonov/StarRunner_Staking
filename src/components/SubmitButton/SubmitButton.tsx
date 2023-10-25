import s from "./SubmitButton.module.scss";
import { Loader } from "../Loader/Loader";
import { FC } from "react";
import { SubmitButtonProps } from "../../constants/types";

export const SubmitButton: FC<SubmitButtonProps> = ({
  isLoading,
  className,
  text,
}) => {
  return (
    <button
      form="form"
      className={s.submit_form_btn + " " + className}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <Loader width="24" /> : text}
    </button>
  );
};
