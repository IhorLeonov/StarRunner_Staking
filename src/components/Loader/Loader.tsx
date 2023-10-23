import { FC } from "react";
import s from "./Loader.module.scss";
import { RotatingLines } from "react-loader-spinner";

interface LoaderProps {
  style: object;
  width: string;
  color: string;
}

export const Loader: FC<LoaderProps> = ({ style, width, color = "white" }) => {
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
