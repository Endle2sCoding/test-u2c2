import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from "react";
import s from "./AppInput.module.scss";
interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  type?: "text" | "number";
  value: string;
  changeInput: (value: string) => void;
  autoFocus?: boolean;
  onEnter?: () => void;
}
export const AppInput = ({
  placeholder = "Text",
  label = "Text",
  type = "text",
  disabled = false,
  value,
  changeInput,
  autoFocus,
  onEnter,
}: AppInputProps) => {
  const [error, setError] = useState("");
  return (
    <div className={s.appInputWrapper}>
      <label
        className={s.label}
        htmlFor="input"
      >
        {label}
      </label>

      {value ? <span className={s.rub}> </span> : null}
      <input
        autoFocus={autoFocus}
        type={type}
        value={value}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            onEnter?.();
          }
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          changeInput(
            e.currentTarget.value
              .replace(/[^0-9]/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          );
        }}
        id="input"
        disabled={disabled}
        className={`${s.appInput} ${value !== "" ? s.transparent : ""} ${
          disabled ? s.disabled : ""
        } ${error ? s.inputError : ""}`}
        placeholder={placeholder}
        onFocus={() => setError("")}
        onBlur={() => {
          if (value === "") {
            setError("Поле обязательно для заполнения");
          }
        }}
      />
      <div className={s.error}>{error}</div>
    </div>
  );
};
