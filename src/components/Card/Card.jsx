import './Card.scss';

import React from 'react'
import { Link } from "react-router-dom";

import RatingStars from '../RatingStars/RatingStars';

const Card = React.memo(({ image, price, title, activeStars = 0, linkTo, className, sm }) => {
    return (
        <div className={`card ${className ? className : ''}`}>
            <Link to={linkTo ? linkTo : '/'} className='card-image'>
                <img src={image ? image : ''} alt='' />
            </Link>
            <div className={`card-body ${price === false ? 'sm' : ''}`}>
                {price && <div className='card-price'>${price ? price : ''}</div>}
                <Link to={linkTo ? linkTo : '/'} className='card-title'>{title ? title : ''}</Link>
                <div className='card-rating'>
                    <RatingStars allowHalf disabled={true} activeStars={activeStars} />
                </div>
            </div>
        </div>
    )
})

export default Card;
