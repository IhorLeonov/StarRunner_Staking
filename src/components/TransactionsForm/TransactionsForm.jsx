import s from "./TransactionsForm.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { yupSchema } from "../../helpers/yupSchema";
import { useAppContext } from "../../context/context";
import { parseEther } from "viem";

// disable change input value on scroll
document.addEventListener("wheel", function () {
  if (document.activeElement.type === "number") {
    document.activeElement.blur();
  }
});

export const TransactionsForm = ({ handleSubmit, balance }) => {
  // console.log(typeof balance, "balance");

  const { setInputValue } = useAppContext();
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
        handleSubmit(amount);
        setInputValue(0);
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
            onChange={(e) => {
              setInputValue(parseEther(e.target.value));
            }}
          >
            <Input
              className={s.form_input + " " + warningStyles()}
              type="text"
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
