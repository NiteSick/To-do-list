import React from "react";
import styles from "./index.module.css";

interface Props {
  children?: React.ReactNode;
  inputLabel?: string;
  type?: string;
  placeholder?: string;
  testId?: string;
  width?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  [key: string]: any;
}

const TextInput: React.FC<Props> = ({
  children,
  inputLabel,
  type = "text",
  placeholder = "",
  testId,
  width,
  error,
  disabled,
  required,
  id,
  ...restProps
}) => {
  return (
    <>
      {inputLabel && (
        <label className={styles.label} htmlFor={id}>
          <div className={styles.labelWrapper}>{inputLabel}</div>
          {required && <span className={styles.labelRequired}>*</span>}
        </label>
      )}
      <div
        className={`${styles.inputWrapper} 
          ${error ? styles.error : ""} 
          ${disabled ? styles.disabled : ""}`}
        style={{ width }}
      >
        <input
          className={styles.styledInput}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          data-testid={testId || "inputField"}
          id={id}
          {...restProps}
        />
        {children}
      </div>
      {error && <span className={styles.error1}>{error}</span>}
    </>
  );
};

export default TextInput;
