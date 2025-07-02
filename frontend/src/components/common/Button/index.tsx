import React, { FC } from "react";
import styles from "./index.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  disabled = false,
  onClick,
  ...props
}) => {
  const classNames = [styles.button];
  if (variant === "secondary") {
    classNames.push(styles.secondary);
  } else {
    classNames.push(styles.primary);
  }
  if (disabled) {
    classNames.push(styles.disabled);
  }
  if (className) classNames.push(className);
  return (
    <button className={classNames.join(" ")} {...props} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
