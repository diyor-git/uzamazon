import classes from "./SignUp.module.scss";

import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import banner from "../../../assets/img/signup_banner1.png";
import logo from "../../../assets/logo.svg";

import Checkbox from "../../../components/Checkbox/Checkbox";
import PhoneNumberInput from "../../../components/Input/PhoneNumberInput";
import Input from "../../../components/Input/Input";
import DatePicker from "../../../components/Input/DatePicker";

// import { registerAcc } from "../../../redux/profileReducer";
import Select from "../../../components/Select/Select";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/client";
import { REGISTRATION } from "../../../graphql/mutations/Registration";
import moment from "moment";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const [signUp, { error }] = useMutation(REGISTRATION);
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [dobError, setDobError] = useState();
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  let { from } = location.state || { from: { pathname: "" } };

  let token = useSelector((state) => state.profilePage.login.token);

  const [errorReg, setErrorReg] = useState("");

  const onSubmit = (data) => {
    if (data && data.username.charAt(0) === "+") {
      data.username = data.username.slice(1);
    }
    const date = new Date(data.dob);
    const offset = date.getTimezoneOffset();
    data.dob = new Date(date.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];

    signUp({
      variables: {
        email: email,
        password1: password1,
        password2: password2,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        gender: gender,
        dob: dob,
      },
    }).then((data) => {
      setDobError(data.data.register.errors && data.data.register.errors.dob);
      setEmailError(
        data.data.register.errors && data.data.register.errors.email
      );
      setPhoneNumberError(
        data.data.register.errors && data.data.register.errors.phoneNumber
      );
      setFirstNameError(
        data.data.register.errors && data.data.register.errors.nonFieldErrors
      );
      setLastNameError(
        data.data.register.errors && data.data.register.errors.nonFieldErrors
      );
      setPassword(
        data.data.register.errors && data.data.register.errors.password2
      );

      if (data.data.register.success == true) {
        console.log(data);
        localStorage.setItem("Token", data.data.register.token);
        history.push("/login");
      }
    });

    // dispatch(registerAcc(data)).then(({ data: regData, error }) => {
    //   if (regData) {
    //     history.push({
    //       pathname: "/signup/confirm",
    //       state: { username: data.username },
    //     });
    //   }
    //   if (error) {
    //     setErrorReg(error);
    //   }
    // });
  };

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
    setValue("gender", "man");
    setValue("last_name", "");
  }, [setValue]);

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
            <h2>{t("registration")}</h2>
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
                    name={"first_name"}
                    parentClassName={classes.inputContainer}
                    {...field}
                    label={t("forms:name")}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setFirstName(e.target.value);
                      setFirstNameError("");
                    }}
                    value={firstName}
                  />
                )}
                name={"first_name"}
                control={control}
                rules={{ required: true }}
              />
              <div className={classes.errorsDiv}>
                {!firstNameError
                  ? ""
                  : firstNameError.map((el) => {
                      return (
                        <span className={classes.errors}>{el.message}</span>
                      );
                    })}
              </div>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Input
                    type="text"
                    noShadow
                    borderRadius="2"
                    error={error}
                    parentClassName={classes.inputContainer}
                    {...field}
                    name={"last_name"}
                    label="Фамилия"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setLastName(e.target.value);
                      setLastNameError("");
                    }}
                    value={lastName}
                  />
                )}
                name={"last_name"}
                control={control}
                rules={{ required: true }}
              />
              <div className={classes.errorsDiv}>
                {!lastNameError
                  ? ""
                  : lastNameError.map((el) => {
                      return (
                        <span className={classes.errors}>{el.message}</span>
                      );
                    })}
              </div>
              <Controller
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    noShadow
                    borderRadius="3"
                    label={t("forms:dateBirth")}
                    name={"dob"}
                    error={error}
                    defaultValue={value ? value : false}
                    parentClassName={classes.inputContainer}
                    onChange={(e) => {
                      onChange(moment(e).format("YYYY-MM-DD"));
                      setDob(moment(e).format("YYYY-MM-DD"));
                      setDobError("");
                    }}
                    disabledDate="future"
                  />
                )}
                name={"dob"}
                control={control}
                rules={{ required: true }}
              />
              <div className={classes.errorsDiv}>
                {!dobError
                  ? ""
                  : dobError.map((el) => {
                      return (
                        <span className={classes.errors}>{el.message}</span>
                      );
                    })}
              </div>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <PhoneNumberInput
                    borderRadius="2"
                    type="tel"
                    error={error || errorReg}
                    label={t("forms:phone")}
                    parentClassName={`${classes.inputContainer}`}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setPhoneNumber(e);
                      setPhoneNumberError("");
                    }}
                    value={phoneNumber}
                  />
                )}
                name={"username"}
                control={control}
                rules={{ required: true }}
              />
              <div className={classes.errorsDiv}>
                {!phoneNumberError
                  ? ""
                  : phoneNumberError.map((el) => {
                      return (
                        <span className={classes.errors}>{el.message}</span>
                      );
                    })}
              </div>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Input
                    type="email"
                    noShadow
                    borderRadius="2"
                    error={error}
                    name={"email"}
                    parentClassName={classes.inputContainer}
                    {...field}
                    label={"Email"}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    value={email}
                  />
                )}
                name={"email"}
                control={control}
                rules={{ required: true }}
              />
              <div className={classes.errorsDiv}>
                {!emailError
                  ? ""
                  : emailError.map((el) => {
                      return (
                        <span className={classes.errors}>{el.message}</span>
                      );
                    })}
              </div>
              <Controller
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Select
                    label={t("forms:gender")}
                    options={[
                      { value: "M", label: `${t("forms:male")}` },
                      { value: "F", label: `${t("forms:female")}` },
                      { value: "", label: `${t("forms:none")}` },
                    ]}
                    svgClassName="stroke-grey-3"
                    defaultValue={{ value: "" }}
                    parentClassName={`${classes.selectContainer}`}
                    className="w-100 bc-grey-4 h-40px"
                    error={error}
                    name={"gender"}
                    onChange={(e) => {
                      setGender(e.value);
                      setValue(e.value);
                    }}
                  />
                )}
                name={"gender"}
                control={control}
                rules={{ required: true }}
              />
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Input
                    noShadow
                    borderRadius="2"
                    error={error}
                    type="password"
                    name={"password1"}
                    parentClassName={classes.inputContainer}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPassword1(e.target.value);
                    }}
                    value={password1}
                    label={
                      <>
                        {t("forms:password")}
                        <span>{t("forms:minPassword")}</span>
                      </>
                    }
                  />
                )}
                name={"password1"}
                control={control}
                rules={{ required: true, minLength: 8 }}
              />
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <Input
                    noShadow
                    borderRadius="2"
                    label={t("forms:repeatPassword")}
                    error={error}
                    name={"password2"}
                    type="password"
                    parentClassName={classes.inputContainer}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPassword2(e.target.value);
                      setPassword("");
                    }}
                    value={password2}
                  />
                )}
                name={"password2"}
                control={control}
                rules={{
                  required: true,
                  validate: (value) =>
                    value ===
                    watch("password1", "" || `${t("forms:passMismatch")}`),
                }}
              />
              <div className={classes.errorsDiv}>
                {!password
                  ? ""
                  : password.map((el) => {
                      return (
                        <span className={classes.errors}>{el.message}</span>
                      );
                    })}
              </div>
              <Controller
                render={({ field }) => (
                  <Checkbox
                    parentClassName={classes.check}
                    className={`${
                      errors.checkbox && errors.checkbox.type === "required"
                        ? "alert"
                        : ""
                    }`}
                    {...field}
                  >
                    {t("forms:disclaimer")}
                  </Checkbox>
                )}
                name={"checkbox"}
                control={control}
                rules={{ required: true }}
              />
              <button type="submit">{t("forms:registration")}</button>
              <div className={classes.signup}>
                <Link to="/login">
                  <p>{t("forms:haveAcc")}</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
