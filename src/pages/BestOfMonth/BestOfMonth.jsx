import '../Category/Category.scss';

import { useSelector } from 'react-redux';

import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ProductList from "../../components/ProductList/ProductList"
import leadingPreviewImage from "../../assets/img/cat_clothing_preview.jpg";

import { getMonthlyBest, cleanMonthlyBest } from '../../redux/monthlyBestReducer';
import {useTranslation} from "react-i18next";

const BestOfMonth = () => {
    const {t} = useTranslation();
    const monthlyBestState = useSelector(state => state.monthlyBestPage.monthlyBest);

    return (
        <>
            <Header />
            <section className='banner-top' style={{ backgroundImage: `url(${leadingPreviewImage})` }} />
            <ProductList
                title={t("bestOfMonth")}
                productsState={monthlyBestState}
                getFunc={getMonthlyBest}
                cleanFunc={cleanMonthlyBest}
            />
            <Footer />
        </>
    )
}

export default BestOfMonth
