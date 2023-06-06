import classes from './Skeletons.module.scss';

export const CircleSkeleton = ({ size, className }) => {
    return (
        <div className={`${classes.circleSkeleton}${className ? ' ' + className : ''}`} style={size ? { width: `${size}px`, height: `${size}px` } : null} />
    )
}
