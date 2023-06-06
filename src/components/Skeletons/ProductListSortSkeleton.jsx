import classes from './Skeletons.module.scss';

export const ProductListSortSkeleton = ({ className }) => {
    return (
        <div className={`${classes.productListSortSkeleton}${className ? ' ' + className : ''}`}></div>
    )
}
