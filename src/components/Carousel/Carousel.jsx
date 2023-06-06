import './Carousel.scss';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import { useRef } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import useWindowSize from '../../hooks/useWindowSize';


import Grid from '../Grid/Grid';
import Card from "../Card/Card";
import { CardSkeleton } from '../Skeletons/CardSkeleton';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Carousel = ({
    items,
    slidesPerView,
    noPriceCards,
    className,
    request,
    sm,
    infinite = true,
    centered = true,
    gridOnSm,
    xxl,
    xl
}) => {
    const size = useWindowSize();

    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const settings = {
        spaceBetween: size.width <= 375 ? 10 : 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 'auto',
        loopedSlides: 20,
        direction: 'horizontal',
        mousewheel: {
            releaseOnEdges: true,
        },
        loop: infinite,
        freeModeMomentumVelocityRatio: 0.3,
        centeredSlides: centered,
        updateOnWindowResize: false
    }
    return (

        <>
            {size.width <= 768 && gridOnSm ?
                <Grid items={items} noPriceCards={noPriceCards}></Grid> :
                <div className={`carousel ${sm ? 'sm' : ''}`}>
                    <button className={`direction left`} ref={prevRef}>
                        <svg width="12" height="21" viewBox="0 0 12 21" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.4678 17.7818L4.39668 10.4902L11.4678 3.19858C11.6365 3.02459 11.7704 2.81804 11.8617 2.59071C11.953 2.36339 12 2.11974 12 1.87369C12 1.62763 11.953 1.38398 11.8617 1.15666C11.7704 0.929331 11.6365 0.722777 11.4678 0.548789C11.2991 0.374802 11.0988 0.236787 10.8783 0.142625C10.6579 0.0484638 10.4216 -3.66652e-09 10.183 0C9.94436 3.66652e-09 9.70808 0.0484638 9.48763 0.142625C9.26718 0.236787 9.06687 0.374802 8.89814 0.548789L0.533069 9.17471C-0.17769 9.90763 -0.17769 11.0916 0.533069 11.8245L8.89814 20.4504C9.06674 20.6246 9.26701 20.7628 9.48748 20.8572C9.70795 20.9515 9.94429 21 10.183 21C10.4217 21 10.658 20.9515 10.8785 20.8572C11.0989 20.7628 11.2992 20.6246 11.4678 20.4504C12.1603 19.7175 12.1786 18.5148 11.4678 17.7818Z" />
                        </svg>
                    </button>
                    <button className={`direction right`} ref={nextRef}>
                        <svg width="12" height="21" viewBox="0 0 12 21" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.532195 17.7818L7.60332 10.4902L0.532195 3.19858C0.363469 3.02459 0.229628 2.81804 0.138314 2.59071C0.047 2.36339 3.55565e-09 2.11974 0 1.87369C-3.55564e-09 1.62763 0.047 1.38398 0.138314 1.15666C0.229628 0.929331 0.363469 0.722777 0.532195 0.548789C0.700922 0.374802 0.901229 0.236787 1.12168 0.142625C1.34213 0.0484638 1.57841 -3.66652e-09 1.81703 0C2.05564 3.66652e-09 2.29192 0.0484638 2.51237 0.142625C2.73282 0.236787 2.93313 0.374802 3.10186 0.548789L11.4669 9.17471C12.1777 9.90763 12.1777 11.0916 11.4669 11.8245L3.10186 20.4504C2.93326 20.6246 2.73299 20.7628 2.51252 20.8572C2.29205 20.9515 2.05571 21 1.81703 21C1.57834 21 1.342 20.9515 1.12153 20.8572C0.901065 20.7628 0.700797 20.6246 0.532195 20.4504C-0.160338 19.7175 -0.178563 18.5148 0.532195 17.7818Z" />
                        </svg>
                    </button>
                    <Swiper
                        onInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.on();
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        initialSlide={4}
                        {...settings}
                    >
                        {items ? items.map((card, key) => (
                            <SwiperSlide key={key}>
                                <Card
                                    key={`${key}_${card.slug}`}
                                    image={card.image}
                                    price={noPriceCards ? false : card.price}
                                    title={card.title}
                                    activeStars={card.rate}
                                    linkTo={`/product/${card.slug}`}
                                />
                            </SwiperSlide>
                        )) : [1, 2, 3, 4, 5, 6, 7].map((c, key) => (
                            <SwiperSlide key={key}>
                                <CardSkeleton className='my-10px mx-10px'/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            }
        </>
    )
}

export default Carousel;
