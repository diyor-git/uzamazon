import './Input.scss';

const Input = ({ placeholder, label, height, noShadow, borderRadius, error, parentClassName, className, children, ...rest }) => {

    return (
        <div className={`w-100 ${noShadow ? '' : 'shadow'} ${borderRadius ? `br-${borderRadius}px` : 'br-5px'} ${parentClassName ? parentClassName : ''} input-container ${error ? 'input-error' : ''}`}>
            {label && <label>{label}</label>}
            <input placeholder={placeholder} className={`${className ? className : ''}`} {...rest} />
            { error && (
                <span className='error-field'>
                    {error.type === 'required' && 'Пожалуйста заполните это поле'}
                    {error.type !== 'required' && error.type === 'minLength' && 'Введите как минимум 8 символов'}
                    {error.type !== 'required' && error.type === 'validate' && 'Пароли не совпадают'}
                    {!error.type && error.message === 'User with this phone has been already created' && 'Аккаунт с данным номером уже создан'}
                    {!error.type && error.non_field_errors && error.non_field_errors[0]}
                </span>
            )}
            {children}
        </div>
    )
}


export default Input;
