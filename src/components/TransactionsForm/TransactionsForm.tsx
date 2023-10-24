import s from "./TransactionsForm.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { yupSchema } from "../../helpers/yupSchema";
import { useAppContext } from "../../context/context";
import { parseEther } from "viem";
import { FC, ChangeEvent } from "react";
import { TransactionsFormProps } from "../../constants/types";

// disable change input value on scroll for input type number

// document.addEventListener("wheel", function () {
//   const e = document.activeElement as HTMLInputElement;
//   if ("blur" in e && "type" in e) {
//     e.blur();
//   }
// });

export const TransactionsForm: FC<TransactionsFormProps> = ({
  handleSubmit,
  balance,
}) => {
  const setInputValue = useAppContext()?.setInputValue;
  const { schema } = yupSchema(balance);

  // const input = document.querySelector("input");
  // const REGEXP = /[0-9/]+/;

  // if (input) {
  //   input.addEventListener("keydown", (event) => {
  //     if (!REGEXP.test(event.key)) {
  //       event.preventDefault();
  //     }
  //   });
  // }

  return (
    <Formik
      initialValues={{ amount: "" }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const { amount } = values;
        console.log(amount);

        handleSubmit(String(amount));
        if (setInputValue) setInputValue("0");
        actions.resetForm();
      }}
    >
      {({ touched, errors }) => {
        const warningStyles = () => {
          return touched.amount && errors.amount ? s.input_warning : "";
        };
        return (
          <Form
            id="form"
            className={s.form}
            onChange={(e: ChangeEvent<HTMLFormElement>) => {
              if (setInputValue)
                setInputValue(String(parseEther(e.target.value)));
            }}
          >
            <Input
              className={s.form_input + " " + warningStyles()}
              type="number"
              name="amount"
              placeholder="Enter stake amount"
              autoComplete="off"
            />
            <div className={s.form_error_box}>
              {touched.amount && errors.amount && (
                <p className={s.form_error}>{errors.amount}</p>
              )}
            </div>
            <p className={s.form_available}>
              Available:{" "}
              <span className={s.form_available_value}>
                {balance ? balance : "0"}{" "}
              </span>
              <span> STRU</span>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
};
