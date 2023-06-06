import classes from './Comment.module.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Avatar, message, Upload } from "antd";
import RatingStars from "../RatingStars/RatingStars";
import { getProfile } from '../../redux/profileReducer';
import Clip from '../../assets/img/clip.svg'
import { createReview, getReviewDetail, getReviewList } from "../../redux/productReducer";
import { useTranslation } from "react-i18next";

const Comment = ({ slug }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, getValues, reset } = useForm();

    const [comment, setComment] = useState('');
    const [stars, setStars] = useState(0);
    const [fileList, setFileList] = useState('');

    let handleChange = info => {
        setFileList([...info.fileList])
    };

    const upload = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        maxCount: 4,
        customRequest: () => { },
        onChange: handleChange,
        multiple: true,
    };
    const profile = useSelector(state => state.profilePage.profile);

    useEffect(() => {
        if (!profile) {
            dispatch(getProfile());
        }
    }, [dispatch, profile])

    let changeStar = (data) => {
        setStars(data)
    }
    const { t } = useTranslation();
    const onSubmit = (comment, e) => {
        let request = {
            ...comment,
            stars,
            image_1: fileList[0] && fileList[0].originFileObj,
            image_2: fileList[1] && fileList[1].originFileObj,
            image_3: fileList[2] && fileList[2].originFileObj,
            image_4: fileList[3] && fileList[3].originFileObj,
        }
        dispatch(getReviewDetail(slug));
        dispatch(createReview(slug, request)).then((res) => {
            reset()
            message.success(`${t("reviewSent")}`)
            dispatch(getReviewList(slug))
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            setFileList('')
        })
    }
    return (
        <div id='feedback' className={classes.feedback}>
            <div className={classes.avatar}>
                <Avatar size={{ xs: 65, sm: 100, md: 100, lg: 100, xl: 100, xxl: 115 }} src={profile && profile.avatar}
                    icon={<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M216.5 110C216.5 168.818 168.818 216.5 110 216.5C51.1817 216.5 3.5 168.818 3.5 110C3.5 51.1816 51.1816 3.5 110 3.5C168.818 3.5 216.5 51.1817 216.5 110Z"
                            fill="white" stroke="#EBEBEB" strokeWidth="7" />
                        <path opacity="0.3" fillRule="evenodd" clipRule="evenodd"
                            d="M110 123.728C91.6729 123.728 55.0879 132.925 55.0879 151.184V164.912H164.912V151.184C164.912 132.925 128.327 123.728 110 123.728ZM110 110C125.169 110 137.456 97.7132 137.456 82.5438C137.456 67.3744 125.169 55.0879 110 55.0879C94.8304 55.0879 82.5438 67.3744 82.5438 82.5438C82.5438 97.7132 94.8304 110 110 110Z"
                            fill="#BCBCBC" />
                    </svg>} />
            </div>
            <div className={classes.feedbackContainer}>
                <h4>{t("product:yourReview")}</h4>
                <div className={classes.rating}>
                    <p>{t("product:yourMark")}</p><RatingStars changeStar={changeStar} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea placeholder={t("product:review")} {...register("comment")} onChange={(e) => setComment(e.target.value)} />
                    <Upload {...upload} fileList={fileList}>
                        <img className={classes.clip} src={Clip} alt="Clip" />
                    </Upload>
                    <button
                        disabled={!stars || !comment}
                        type='submit'
                    >
                        {t("product:publish")}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Comment