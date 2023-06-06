import classes from './Skeletons.module.scss';

export const HeadingSkeleton = ({className, ...rest}) => {
    return (
        <h1 className={classes.headingSkeleton} {...rest}></h1>
    )
}
