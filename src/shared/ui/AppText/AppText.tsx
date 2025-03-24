import { ReactNode } from "react";
import s from "./AppText.module.scss";

type AppTextTagNam = "p" | "h2" | "h3" | "h4" | "h5";
interface AppTextProps {
  children: ReactNode;
  TagName?: AppTextTagNam;
  className?: string;
}
export const AppText = ({
  children,
  TagName = "p",
  className,
}: AppTextProps) => {
  return (
    <TagName className={`${s.appText} ${className ? className : ""}`}>
      {children}
    </TagName>
  );
};
