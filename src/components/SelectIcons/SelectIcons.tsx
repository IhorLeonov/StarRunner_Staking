import { FC } from "react";
import sprite from "../../assets/icons/sprite.svg";
import { SelectIconProps } from "../../constants/types";

export const Icon: FC<SelectIconProps> = ({ name, width, height }) => {
  return (
    <svg className="svg" width={width} height={height}>
      <use href={sprite + `#${name}`}></use>
    </svg>
  );
};
