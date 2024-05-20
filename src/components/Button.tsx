import { ButtonType } from "@/enums/enums";
import { FC } from "react";

interface Props {
  btnText: string;
  type: ButtonType;
  onClick?: (e: any) => any;
  isActive?: boolean;
  id?: string;
  disabled?: boolean;
}

const Button: FC<Props> = ({
  btnText,
  type,
  onClick,
  disabled,
  isActive,
  id,
}) => {
  return (
    <div>
      {type === ButtonType.primary && (
        <button
          id={id}
          className={isActive ? "btn-primary-active" : "btn-primary-disabled"}
          onClick={onClick}
          disabled={disabled}
        >
          {btnText}
        </button>
      )}
      {type === ButtonType.secondary && (
        <button
          className={`${
            isActive ? "btn-secondary-active" : "btn-primary-disabled"
          }`}
          onClick={onClick}
          disabled={disabled}
        >
          {btnText}
        </button>
      )}
    </div>
  );
};

export default Button;


