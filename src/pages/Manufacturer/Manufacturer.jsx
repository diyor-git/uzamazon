import './Manufacturer.scss';

import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

import Header from "../../components/Header/Header";
import ProductList from "../../components/ProductList/ProductList"
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";

import { cleanManufacturer, getManufacturer } from '../../redux/manufacturerReducer';

import bannerDefault from '../../assets/img/categoryBannerDefault.png'

export const Manufacturer = () => {
    const { manufacturerName } = useParams();
    const manufacturerState = useSelector(state => state.manufacturerPage.manufacturer);
    const { t } = useTranslation();


    return (
        <>
            <Header />
            <section className='banner-top' style={{ backgroundImage: `url(${manufacturerState && manufacturerState.params && manufacturerState.params.info && manufacturerState.params.info.banner1 || bannerDefault})` }} />
            <div className='container'>
                <ProductList
                    pathName={manufacturerName}
                    productsState={manufacturerState}
                    getFunc={getManufacturer}
                    cleanFunc={cleanManufacturer}
                    container={false}
                />
                {
                    manufacturerState && manufacturerState.params && manufacturerState.params.info && manufacturerState.params.info.banner2 &&
                    <section className='banner-bottom' style={{ backgroundImage: `url(${manufacturerState.params.info.banner2})` }} />
                }
                <section className='carousel-section'>
                    <div className='bg-pink br-5px data-block'>
                        <h1>{t("promoProducts")}</h1>
                        <span><span>-30% </span>{t("onlyUntil")} 05.05.2021</span>
                    </div>
                    <div className='carousel-wrapper'>
                        <Carousel noPriceCards centered={false} sm
                            items={manufacturerState ? manufacturerState.products : null} />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}