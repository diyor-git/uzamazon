import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';

const DatePicker = ({ label, height, noShadow, placeholder, borderRadius, parentClassName, error, className, children, defaultValue, disabledDate, ...rest }) => {

    const customFormat = date => `${date.format('DD.MM.YYYY')}`;

    const disableFuture = (current) => {
        let today = new Date();
        return current && current > moment(today, 'DD.MM.YYYY');
    }

    return (
        <div className={`w-100 ${noShadow ? '' : 'shadow'} ${borderRadius ? `br-${borderRadius}px` : 'br-5px'} ${parentClassName ? parentClassName : ''} input-container ${error ? 'input-error' : ''}`}>
            <label>{label}</label>
            <AntDatePicker
                bordered={true}
                format={customFormat}
                placeholder={placeholder ? placeholder : ''}
                allowClear={false}
                showToday={false}
                defaultValue={defaultValue ? moment(defaultValue, 'YYYY-MM-DD') : false}
                suffixIcon={
                    <svg viewBox="0 0 21 21" fill="none" stroke="#828282" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.9819 2.87256H4.74547C2.67691 2.87256 1 4.54946 1 6.61803V15.9817C1 18.0503 2.67691 19.7272 4.74547 19.7272H15.9819C18.0505 19.7272 19.7274 18.0503 19.7274 15.9817V6.61803C19.7274 4.54946 18.0505 2.87256 15.9819 2.87256Z"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.61816 1V4.74547" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.1091 1V4.74547" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 8.49072H19.7274" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
                className={`${className ? className : ''}`}
                disabledDate={disabledDate === 'future' ? disableFuture : false}
                {...rest} />
            { error && (
                <span className='error-field'>
                    {error.type === 'required' && 'Пожалуйста заполните это поле'}
                    {error.type !== 'required' && error.type === 'minLength' && 'Введите как минимум 8 символов'}
                    {!error.type && error.non_field_errors && error.non_field_errors[0]}
                </span>
            )}
        </div>
    )
}

export default DatePicker
