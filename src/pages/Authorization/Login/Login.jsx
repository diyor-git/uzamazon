import classes from "./Login.module.scss";

import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Route } from "react-router-dom";

import PhoneNumberInput from "../../../components/Input/PhoneNumberInput";
import Input from "../../../components/Input/Input";

import banner from "../../../assets/img/authorization_banner.png";
import logo from "../../../assets/logo.svg";

import { cleanError, getLogin } from "../../../redux/profileReducer";
import { useTranslation } from "react-i18next";
import { LOGIN } from "../../../graphql/mutations/Login";
import { useMutation } from "@apollo/client";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "" } };

  const { control, handleSubmit } = useForm();

  let token = useSelector((state) => state.profilePage.login.token);
  let loginErrorState = useSelector((state) => state.profilePage.error);
  const [loginError, setLoginError] = useState(null);
  const [username, setUsername] = useState("");

  const [errorLogin, setErrorLogin] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [tokenAuth] = useMutation(LOGIN);

  const { t } = useTranslation();
  useEffect(() => {
    if (token) {
      if (from.pathname !== "") {
        history.push(from);
      } else {
        history.length > 2 ? history.goBack() : history.push("/");
      }
    }
  }, [history, from, token]);

  useEffect(() => {
    if (
      loginErrorState &&
      loginErrorState.non_field_errors &&
      loginErrorState.non_field_errors[0] === "User account is disabled."
    ) {
      history.push({
        pathname: "/signup/confirm",
        state: { username: username },
      });
    }
    setLoginError(loginErrorState);
  }, [history, loginErrorState, username]);

  useEffect(() => {
    return () => {
      dispatch(cleanError());
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    tokenAuth({
      variables: {
        email: email,
        password: password,
      },
    }).then((datas) => {
      if (!datas.data.tokenAuth.errors) {
        localStorage.setItem("userId", datas.data.tokenAuth.user.id);
        localStorage.setItem("Token", datas.data.tokenAuth.token);
        history.push('/')
      } else {
        setErrorLogin(
          datas.data.tokenAuth.errors &&
            datas.data.tokenAuth.errors.nonFieldErrors
        );
      }
    });
    if (data.username.charAt(0) === "+") {
      data.username = data.username.slice(1);
    }
  };

  return (
    <div className={classes.loginPage}>
      <div className={classes.bannerWrapper}>
        <div
          className={classes.banner}
          style={{ backgroundImage: `url(${banner})` }}
        />
      </div>
      <div className={classes.loginWrapper}>
        <div className={classes.loginContainer}>
          <div className={classes.title}>
            <h2>{t("login")}</h2>
            <Link to="/">
              <img
                src={logo}
                className="user-select-none user-drag-none"
                alt="Logo"
              />
            </Link>
          </div>
          <div className={classes.loginForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Input
                    type="text"
                    noShadow
                    borderRadius="2"
                    error={error}
                    name={"email"}
                    parentClassName={classes.inputContainer}
                    {...field}
                    label="Email"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                )}
                name={"email"}
                control={control}
                rules={{ required: true }}
              />
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Input
                    type="password"
                    noShadow
                    borderRadius="2"
                    className="inp"
                    error={error}
                    name={"password"}
                    parentClassName={classes.inputContainer}
                    {...field}
                    label={t("forms:password")}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPassword(e.target.value);
                      setErrorLogin("");
                    }}
                    value={password}
                  />
                )}
                name={"password"}
                control={control}
                rules={{ required: true }}
              />
              <div className={classes.errorsDiv}>
                {!errorLogin
                  ? ""
                  : errorLogin.map((el) => {
                      return (
                        <span className={classes.errors}>{el.message}</span>
                      );
                    })}
              </div>
              <button type="submit">{t("forms:signIn")}</button>
              <div className={classes.signup}>
                <Link to="/signup">
                  <p>{t("forms:noAcc")}</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
