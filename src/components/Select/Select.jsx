import { Select as AntSelect } from 'antd';
import './Select.scss';

const Select = ({
    value,
    onChange,
    noShadow,
    borderRadius,
    options,
    error,
    defaultValue,
    placeholder,
    label,
    svgClassName,
    parentClassName,
    className,
    children,
    ...rest
}) => {
    const Arrow =
        <svg className={`select-arrow ${svgClassName ? svgClassName : ''}`} stroke="#4F4F4F" width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.167 1.62484L8.50033 9.2915L0.833659 1.62484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;

    return (
        <div className={`select-container ${parentClassName ? parentClassName : ''}`}>
            {label &&
                <label>{label}</label>
            }
            <AntSelect
                suffixIcon={Arrow}
                labelInValue
                placeholder={placeholder}
                defaultValue={defaultValue ? defaultValue : null}
                onChange={onChange}
                className={`${className} ${error ? 'select-error' : ''}`}
                options={options}
                value={value}
            >
                {/* <Option value='cheap'>
                    {/* Цена: низкая-высокая
                </Option>
                <Option value='expensive'>
                    Цена: высокая-низкая
                </Option> */}
            </AntSelect>
            { error && (
                <span className='error-field'>
                    {error.type === 'required' && 'Пожалуйста заполните это поле'}
                    {error.type !== 'required' && error.type === 'minLength' && 'Введите как минимум 8 символов'}
                    {error.type !== 'required' && error.type === 'validate' && 'Пароли не совпадают'}
                    {!error.type && error === 'User with this phone has been already created' && 'Аккаунт с данным номером уже создан'}
                    {!error.type && error.non_field_errors && error.non_field_errors[0]}
                </span>
            )}
        </div>
    )
}


export default Select;
