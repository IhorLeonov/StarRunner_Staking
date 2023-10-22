import s from "./Loader.module.scss";
import { RotatingLines } from "react-loader-spinner";

export const Loader = ({ style, width, color = "white" }) => {
  return (
    <div className={s.loader_box} style={style}>
      <RotatingLines
        strokeColor={color}
        strokeWidth="5"
        animationDuration="0.75"
        width={width}
        visible={true}
      />
    </div>
  );
};
