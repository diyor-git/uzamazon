import classes from './RatingBlock.module.scss'
import RatingStars from "../RatingStars/RatingStars";
import { Progress } from "antd";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { getReviewDetail } from "../../redux/productReducer";
import { useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import { useTranslation } from "react-i18next";

const RatingBlock = ({ slug }) => {
    const dispatch = useDispatch()
    const login = useSelector(state => state.profilePage.login.token)
    const rating = useSelector(state => state.productPage.reviewDetail)
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(getReviewDetail(slug))
    }, [dispatch, slug]);

    return (
        <div className={classes.rating}>
            {rating ? (
                <>
                    <h4>{t("rating")}</h4>
                    <div className={classes.stars}>
                        <RatingStars disabled={true} allowHalf activeStars={rating.rate} /> <p>{rating.rate} {t("product:outOf")} 5</p>
                    </div>
                    <p className={classes.reviews}>{rating.count} {t("product:reviews")}</p>
                    <div className={classes.ratingBar}>
                        <p>1 {t("product:star")}</p> <Progress status='normal' percent={rating.star_1} />
                    </div>
                    <div className={classes.ratingBar}>
                        <p>2 {t("product:stars")}</p> <Progress status='normal' percent={rating.star_2} />
                    </div>
                    <div className={classes.ratingBar}>
                        <p>3 {t("product:stars")}</p> <Progress status='normal' percent={rating.star_3} />
                    </div>
                    <div className={classes.ratingBar}>
                        <p>4 {t("product:stars")}</p> <Progress status='normal' percent={rating.star_4} />
                    </div>
                    <div className={classes.ratingBar}>
                        <p>5 {t("product:5stars")}</p> <Progress status='normal' percent={rating.star_5} />
                    </div>
                    <HashLink smooth to={!login ? '/login' : '#feedback'}>
                        <button className={classes.pinkButton}>{t("product:feedback")}</button>
                    </HashLink>
                </>
            ) : (<div>

            </div>)

            }
        </div>
    )
}

export default RatingBlock