import classes from './Skeletons.module.scss';

export const TextSkeleton = ({ style, className }) => {
    return (
        <h4 className={`${classes.textSkeleton}${className ? ' ' + className : ''}`} style={style}></h4>
    )
}
