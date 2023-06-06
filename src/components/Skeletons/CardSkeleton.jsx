import classes from "./Skeletons.module.scss";

export const CardSkeleton = ({ style, className }) => {
  return (
    <div
      className={`${classes.cardSkeleton}${className ? " " + className : ""}`}
      style={style}
    />
  );
};
