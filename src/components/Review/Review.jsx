import classes from './Review.module.scss'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import RatingStars from "../RatingStars/RatingStars";
import Preloader from "../Preloader/Preloader";
import { Avatar, Pagination } from "antd";

import { getReviewList } from "../../redux/productReducer";
import useWindowSize from '../../hooks/useWindowSize';


const Review = ({ slug }) => {
    const dispatch = useDispatch()
    const size = useWindowSize();

    const reviewList = useSelector(state => state.productPage.reviewList);
    const { t } = useTranslation();

    const [page, setPage] = useState(1);

    const [pageSize, setPageSize] = useState(() => {
        if (size.width > 1440) {
            return 4;
        }
        if (size.width <= 1400 && size.width > 375) {
            return 3;
        }
        if (size.width <= 375) {
            return 2
        }
        return 3;
    })

    useEffect(() => {
        dispatch(getReviewList(slug, `?page=${page}&page_size=${pageSize}`))
    }, [dispatch, slug, page, pageSize]);

    if (!reviewList) {
        return <Preloader />
    }


    return (
        <div>
            <div className={classes.reviews}>
                {!!reviewList.count && <h4>{t("product:testimonials")}</h4>}
                {reviewList ? (
                    <>
                        {reviewList.products.map(r => (
                            <div className={classes.review}>
                                <div className={classes.avatar}>
                                    <Avatar size={{ xs: 65, sm: 70, md: 70, lg: 70, xl: 70, xxl: 75 }} src={r.avatar}
                                        icon={<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M216.5 110C216.5 168.818 168.818 216.5 110 216.5C51.1817 216.5 3.5 168.818 3.5 110C3.5 51.1816 51.1816 3.5 110 3.5C168.818 3.5 216.5 51.1817 216.5 110Z"
                                                fill="white" stroke="#EBEBEB" strokeWidth="7" />
                                            <path opacity="0.3" fillRule="evenodd" clipRule="evenodd"
                                                d="M110 123.728C91.6729 123.728 55.0879 132.925 55.0879 151.184V164.912H164.912V151.184C164.912 132.925 128.327 123.728 110 123.728ZM110 110C125.169 110 137.456 97.7132 137.456 82.5438C137.456 67.3744 125.169 55.0879 110 55.0879C94.8304 55.0879 82.5438 67.3744 82.5438 82.5438C82.5438 97.7132 94.8304 110 110 110Z"
                                                fill="#BCBCBC" />
                                        </svg>} />
                                </div>
                                <div className={classes.reviewContainer}>
                                    <div className={classes.title}>
                                        <h5>{r.full_name}</h5>
                                        <p>{r.created_at}</p>
                                    </div>
                                    <RatingStars disabled={true} activeStars={r.stars} />
                                    <div className={classes.reviewText}>
                                        <p>{r.comment}</p>
                                        {r.image_1 &&
                                            <a href={r.image_1} target='_blank' rel='noreferrer'><img src={r.image_1} alt="Review" /></a>}
                                        {r.image_2 &&
                                            <a href={r.image_2} target='_blank' rel='noreferrer'><img src={r.image_2} alt="Review" /></a>}
                                        {r.image_3 &&
                                            <a href={r.image_3} target='_blank' rel='noreferrer'><img src={r.image_3} alt="Review" /></a>}
                                        {r.image_4 &&
                                            <a href={r.image_4} target='_blank' rel='noreferrer'><img src={r.image_4} alt="Review" /></a>}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className={classes.paginationWrapper}>
                            <Pagination
                                size="small"
                                current={parseInt(page)}
                                hideOnSinglePage
                                pageSize={pageSize}
                                total={reviewList.count}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    </>
                ) : <h2>Отзывов нет =(</h2>}
            </div>

        </div>
    )
}

export default Review