import './Category.scss';

import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

import { cleanCategory, getCategory } from '../../redux/categoryReducer';

import Header from "../../components/Header/Header";
import ProductList from "../../components/ProductList/ProductList"
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";


import bannerDefault from '../../assets/img/categoryBannerDefault.png'

const Category = () => {
    const { categoryName } = useParams();
    const categoryState = useSelector(state => state.categoryPage.category);
    const { t } = useTranslation();


    return (
        <>
            <Header />
            <section className='banner-top' style={{ backgroundImage: `url(${categoryState && categoryState.params && categoryState.params.info && categoryState.params.info.banner1 || bannerDefault})` }} />
            <div className='container'>
                <ProductList
                    pathName={categoryName}
                    productsState={categoryState}
                    getFunc={getCategory}
                    cleanFunc={cleanCategory}
                    container={false}
                />
                {
                    categoryState && categoryState.params && categoryState.params.info && categoryState.params.info.banner2 &&
                    <section className='banner-bottom' style={{ backgroundImage: `url(${categoryState.params.info.banner2})` }} />
                }
                <section className='carousel-section'>
                    <div className='bg-pink br-5px data-block'>
                        <h1>{t("promoProducts")}</h1>
                        <span><span>-30% </span>{t("onlyUntil")} 05.05.2021</span>
                    </div>
                    <div className='carousel-wrapper'>
                        <Carousel noPriceCards centered={false} sm
                            items={categoryState ? categoryState.products : null} />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Category;
