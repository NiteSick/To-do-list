import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import visibleIcon from "../../asset/visible.svg";
import notVisibleIcon from "../../asset/not-visible.svg";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import { Link } from "react-router-dom";
import { validateWithRegex } from "../../utils";
import ApiService from "../../Service/Axios";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const [errors, setErrors] = useState({
    usernameError: "",
    emailError: "",
    pwdError: "",
    pwdCheckError: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    setIsBtnDisabled(
      !formData.username ||
        !formData.password ||
        !formData.passwordCheck ||
        !!errors.usernameError ||
        !!errors.pwdError ||
        !!errors.pwdCheckError
    );
  }, [formData, errors]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await ApiService.post(
        "http://localhost:3500/api/register",

        {
          data: body,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("response", response);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleOnUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, username: value }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, usernameError: "Username is required" }));
      return;
    }

    const usernamePattern = /^[^\s]{8,20}$/;
    const errorMsg = validateWithRegex(
      value,
      usernamePattern,
      "Username must be 8–20 characters with no spaces"
    );
    setErrors((prev) => ({ ...prev, usernameError: errorMsg }));
  };

  const handleOnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, emailError: "Email is required" }));
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorMsg = validateWithRegex(
      value,
      emailPattern,
      "Must be a valid email"
    );
    setErrors((prev) => ({ ...prev, emailError: errorMsg }));
  };

  const handleOnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, password: value }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, pwdError: "Password is required" }));
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,}$/;
    const errorMsg = validateWithRegex(
      value,
      passwordPattern,
      "Password must have 8+ chars, a-z, A-Z, number, symbol, no spaces"
    );
    setErrors((prev) => ({ ...prev, pwdError: errorMsg }));
  };

  const handlePasswordRecheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, passwordCheck: value }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, pwdCheckError: "Password is required" }));
      return;
    }
    console.log(value, formData.password);

    if (value !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        pwdCheckError: "Recheck your password",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        pwdCheckError: "",
      }));
    }
  };

  return (
    <div className={styles.loginPanel}>
      <h3 className={styles.heading}>Create your account</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <TextInput
            inputLabel="Username"
            placeholder="Enter your username"
            required={true}
            type="text"
            value={formData.username}
            error={errors.usernameError}
            onChange={handleOnUsernameChange}
            id="username-sign-in-input"
          ></TextInput>
        </div>
        <div className={styles.inputContainer}>
          <TextInput
            inputLabel="Email"
            placeholder="Enter your Email"
            required={true}
            type="email"
            value={formData.email}
            error={errors.emailError}
            onChange={handleOnEmailChange}
            id="email-sign-in-input"
          ></TextInput>
        </div>
        <div className={styles.inputContainer}>
          <TextInput
            id="password-sign-in-input"
            inputLabel="Password"
            placeholder="Enter your password"
            required={true}
            type={isPasswordVisible ? "text" : "password"}
            value={formData.password}
            error={errors.pwdError}
            onChange={handleOnPasswordChange}
          >
            <button
              className={styles.visibleIconBtn}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                setIsPasswordVisible((prev) => !prev);
              }}
            >
              {isPasswordVisible ? (
                <img
                  src={notVisibleIcon}
                  alt="visible-eye-icon"
                  className={styles.eyeIcon}
                />
              ) : (
                <img
                  src={visibleIcon}
                  alt="visible-eye-icon"
                  className={styles.eyeIcon}
                />
              )}
            </button>
          </TextInput>
        </div>
        <div className={styles.inputContainer}>
          <TextInput
            inputLabel="Confirm password"
            placeholder="Confirm password"
            required={true}
            value={formData.passwordCheck}
            error={errors.pwdCheckError}
            type={"password"}
            onChange={handlePasswordRecheck}
            id="password-check-sign-in-input"
          ></TextInput>
        </div>

        <Button
          variant="primary"
          style={{ width: "100%", marginTop: "8px" }}
          type="submit"
          disabled={isBtnDisabled}
        >
          Submit
        </Button>
      </form>
      <Link className={styles.signUpRedirection} to="login">
        {"Already have a account. Login"}
      </Link>
    </div>
  );
};

export default SignIn;
