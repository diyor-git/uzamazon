import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Input from "react-phone-number-input/input";

const PhoneNumberInput = ({
  withCountrySelect,
  shadow,
  borderRadius,
  value,
  label,
  disabled,
  onChange,
  error,
  parentClassName,
  className,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div
      className={`w-100 ${shadow ? "shadow" : ""} ${
        borderRadius ? `br-${borderRadius}px` : "br-2px"
      } ${parentClassName ? parentClassName : ""} input-container ${
        error ? "input-error" : ""
      }`}
    >
      {label ? <label>{label}</label> : ""}
      {withCountrySelect ? (
        <PhoneInput
          value={value ? value : inputValue}
          onChange={setInputValue}
          international
          defaultCountry="UZ"
          countryCallingCodeEditable={false}
          className={`${className ? className : ""}`}
          {...rest}
        />
      ) : (
        <Input
          international
          withCountryCallingCode
          value={
            value ? (value.charAt(0) === "+" ? value : `+${value}`) : inputValue
          }
          onChange={onChange ? onChange : setInputValue}
          disabled={disabled}
          className={`${className ? className : ""}`}
          {...rest}
        />
      )}
      {error && (
        <span className="error-field">
          {error.type === "required" && "Пожалуйста заполните это поле"}
          {!error.type && error.non_field_errors && error.non_field_errors[0]}
          {(!error.type &&
            error.message === "User with this phone has been already created" &&
            "Аккаунт с данным номером уже создан") ||
            error.message}
        </span>
      )}
    </div>
  );
};

export default PhoneNumberInput;
