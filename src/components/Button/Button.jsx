import './Button.scss';
import { Link } from "react-router-dom";


const Button = ({ text, variant, color, fill, bold, className, size, to, target, children, style }) => {
    /*
    *   Text:
    *       Any text to place inside the button
    *
    *   Sizes:
    *       lg - Desktop 1920 and Desktop 1440
    *       md - iPad 768
    *       sm - iPhone 375
    *
    *   Color:
    *       dark-blue: #241E3C;
    *       pink: #E9456A;
    *       white: #FFFFFF;
    *       gold: #ECAE1;
    *
    *   Fill:
    *       true: filled to the given color
    *       false: adds border to the given color
    * */
    return (
        <>
            {to ? (
                <Link
                    to={to}
                    target={target}
                    className={`btn${color === 'pink' ? ' btn-pink' : color === 'gold' ? ' btn-gold' : color === 'grey' ? ' btn-grey' : ''}${fill ? ' btn-fill' : ''}${variant === ' large' || variant === 'lg' ? ' large' : ''}${className ? '' + className : ''}${bold ? ' bold' : ''}${size === 'lg' ? ' lg' : ''}`}
                    style={style}>
                    {children ? children : text}
                </Link>
            ) : (
                <button
                    className={`btn${color === 'pink' ? ' btn-pink' : color === 'gold' ? ' btn-gold' : color === 'grey' ? ' btn-grey' : ''}${fill ? ' btn-fill' : ''}${variant === ' large' || variant === 'lg' ? ' large' : ''}${className ? '' + className : ''}${bold ? ' bold' : ''}${size === 'lg' ? ' lg' : ''}`}
                    style={style}>
                    {children ? children : text}
                </button>
            )}
        </>
    )
}


export default Button;
