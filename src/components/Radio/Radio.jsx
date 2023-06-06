import './Radio.scss';

const Radio = ({ items, name, defaultChecked, ...rest }) => {
    return (
        <>
            {items.map((item, key) => (
                <label className='radio-container'>
                    {item.title}
                    <input type='radio' value={key + 1} defaultChecked={item.title.toLowerCase() === defaultChecked} name={name ? name : 'radio'} {...rest} required={false} />
                    <span className='checkmark' />
                </label>
            ))}
        </>
    )
}

export default Radio
