import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import visibleIcon from "../../asset/visible.svg";
import notVisibleIcon from "../../asset/not-visible.svg";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import { Link, useHistory } from "react-router-dom";
import { validateWithRegex } from "../../utils";
import ApiService from "../../service/Axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const [errors, setErrors] = useState({
    usernameError: "",
    pwdError: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await ApiService.post(`/auth`, body, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setAuth({
        accessToken: response?.data?.accessToken,
        user: response?.data?.user?.username,
      });

      history.push("/users");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    setIsBtnDisabled(
      !formData.username ||
        !formData.password ||
        !!errors.usernameError ||
        !!errors.pwdError
    );
  }, [formData, errors]);

  const handleOnUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, username: value }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, usernameError: "Username is required" }));
      return;
    }

    const usernamePattern = /^\S+$/;
    const errorMsg = validateWithRegex(
      value,
      usernamePattern,
      "Username must not contain spaces"
    );
    setErrors((prev) => ({ ...prev, usernameError: errorMsg }));
  };

  const handleOnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, password: value }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, pwdError: "Password is required" }));
      return;
    }

    const passwordPattern = /^\S+$/;
    const errorMsg = validateWithRegex(
      value,
      passwordPattern,
      "Password must not contain spaces"
    );
    setErrors((prev) => ({ ...prev, pwdError: errorMsg }));
  };

  return (
    <div className={styles.loginPanel}>
      <h3 className={styles.heading}>Enter Your login credencials</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <TextInput
            id="username-login-in-input"
            inputLabel="Username"
            placeholder="Enter your username"
            required={true}
            type="text"
            error={errors.usernameError}
            value={formData.username}
            onChange={handleOnUsernameChange}
          ></TextInput>
        </div>
        <div className={styles.inputContainer}>
          <TextInput
            id="password-login-in-input"
            inputLabel="Password"
            placeholder="Enter your password"
            required={true}
            value={formData.password}
            type={isPasswordVisible ? "text" : "password"}
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
        <Button
          variant="primary"
          style={{ width: "100%", marginTop: "8px" }}
          type="submit"
          disabled={isBtnDisabled}
        >
          Submit
        </Button>
      </form>
      <Link className={styles.signUpRedirection} to="signin">
        {"Doesn't have a account? Sign Up"}
      </Link>
    </div>
  );
};

export default Login;
