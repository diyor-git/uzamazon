import './Checkbox.scss';
import { useState } from 'react';


const Checkbox = ({ name, label, onChange, className, parentClassName, children, checked, ...rest }) => {

    const [checkboxValue, setCheckboxValue] = useState(false);

    const onCheckboxChange = () => {
        setCheckboxValue(!checkboxValue);
    };

    return (
        <div className={`checkbox-group${parentClassName ? ' ' + parentClassName : ''}`}>
            <input
                name={name}
                onChange={onChange ? onChange : onCheckboxChange}
                type="checkbox"
                checked={checked}
                {...rest}
            />
            <label className={`${className ? className : ''}`}>{children ? children : label}</label>
        </div>
    )
}

export default Checkbox;
