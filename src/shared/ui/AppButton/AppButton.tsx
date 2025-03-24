import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./AppButton.module.scss";
type AppButtonVariant = "clear" | "filled" | "outlined";
type AppButtonSize = "s" | "l";
interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  disabled?: boolean;
  tag?: boolean;
  isActive?: boolean;
  className?: string;
}
export const AppButton = ({
  children,
  className,
  variant = "filled",
  tag = false,
  isActive = false,
  disabled = false,
  size = "l",
  ...otherProps
}: AppButtonProps) => {
  if (tag) {
    return (
      <button
        {...otherProps}
        className={`${s.appButtonTag} ${isActive ? s.isActive : ""} ${
          className ? className : ""
        }
  `}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      {...otherProps}
      className={`${s.appButton} ${s[variant]} ${s[size]} ${
        disabled ? s.disabled : ""
      } ${className ? className : ""}
    `}
    >
      {children}
    </button>
  );
};
