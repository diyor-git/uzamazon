import './RatingStarts.scss';
import { Rate } from 'antd';
import Star from "./Star";

const RatingStars = ({ changeStar, activeStars, className, allowHalf, disabled, ...rest }) => {
    return (
        <>
            <Rate
                onChange={(data) => { changeStar(data) }}
                className={className} allowHalf={allowHalf ? allowHalf : false}
                disabled={disabled}
                defaultValue={activeStars ? activeStars : 0}
                character={<Star />}
                {...rest}
            />
        </>
    );
}

export default RatingStars;
