import './Grid.scss';
import Card from "../Card/Card";
import { CardSkeleton } from '../Skeletons/CardSkeleton';
import useWindowSize from '../../hooks/useWindowSize';
import { useState } from 'react';

const Grid = ({ items, noPriceCards, style, className }) => {
    const size = useWindowSize();
    const [gridProductAmount, setGridProductAmount] = useState(() => {
        if (size.width > 1440) {
            return 20;
        }
        if (size.width <= 1400 && size.width > 768) {
            return 16;
        }
        if (size.width <= 768 && size.width > 375) {
            return 12
        }
        if (size.width <= 375) {
            return 8
        }
        return 16
    });
    return (
        <>
            <div className={`grid${className ? ' ' + className : ''}`} style={style}>
                {items ? items.map((card, key) => (
                    <div className='grid-child' key={key}>
                        <Card
                            key={`${key}_${card && card.slug}`}
                            image={card.image}
                            price={noPriceCards ? false : card.price}
                            title={card.title}
                            activeStars={card.rate}
                            linkTo={`/product/${card.slug}`}
                        />
                    </div>
                )) :
                    [...Array(gridProductAmount)].map((_, key) => (
                        <CardSkeleton key={key} style={{maxWidth: 'unset'}} />
                    ))
                }
                {items && items.length <= 1 && <div className='filler'></div>}
                {items && items.length <= 2 && <div className='filler'></div>}
                {items && items.length <= 3 && <div className='filler'></div>}
                {items && items.length <= 4 && <div className='filler'></div>}
            </div>
        </>

    )
}


export default Grid;
