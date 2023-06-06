import './Search.scss';

import { useEffect } from 'react';
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import i18next from 'i18next'

import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import Carousel from '../../components/Carousel/Carousel';
import ProductList from '../../components/ProductList/ProductList';

import { getMonthlyBest } from '../../redux/monthlyBestReducer';
import { cleanSearchProduct, getSearchProduct } from "../../redux/productReducer";

import { useTranslation } from "react-i18next";
import { HeadingSkeleton } from '../../components/Skeletons/HeadingSkeleton';
import { CircleSkeleton } from '../../components/Skeletons/CircleSkeleton';



const Search = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    const history = useHistory();
    const { t } = useTranslation();

    let searchProducts = useSelector(state => state.productPage.searchProduct)
    let searchText = useSelector(state => state.productPage.searchText);
    const monthlyBest = useSelector(state => state.monthlyBestPage.monthlyBest);

    const params = new URLSearchParams(location.search);

    useEffect(() => {
        return () => {
            dispatch(cleanSearchProduct());
        }
    }, [params.get('search')])

    useEffect(() => {

        if (!params.get('search')) {
            history.replace('/');
        }
        i18next.on('languageChanged', () => {
            dispatch(getMonthlyBest());
        })

        dispatch(getMonthlyBest());
    }, [])

    const getSearchQuery = () => {
        return searchText ? searchText : params.get('search') ? params.get('search') : '';
    }


    return (
        <>
            <Header />
            <main className='container'>
                {searchProducts ? searchProducts.params && searchProducts.params.manufacturers.length !== 0 &&
                    (<>
                        <div className='titleSearch color-dark-blue mt-70px'>
                            <h2>{t("searchText")} "{getSearchQuery()}"</h2>
                        </div>
                        <div className='search-result-categories mt-45px mb-90px'>
                            {searchProducts && searchProducts.params.manufacturers.map(item =>
                                <div className='search-result-categories-card' key={item.id}>
                                    <Link to={`/manufacturer/${item.slug}`} className='search-result-categories-preview'
                                        style={{ backgroundImage: `url(${item.avatar})` }} />
                                    <Link to={`/manufacturer/${item.slug}`} className='roman-36px color-dark-blue'>{item.title}</Link>
                                </div>
                            )}
                        </div>
                    </>) : (
                    <>
                        <div className='titleSearch mt-70px'>
                            <HeadingSkeleton />
                        </div>
                        <div className='search-result-categories mt-45px mb-90px'>
                            {[...Array(5)].map((_, key) => (
                                <div className='search-result-categories-card' key={key}>
                                    <CircleSkeleton />
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <ProductList
                    title={`${t("searchRequest")} "${getSearchQuery()}"`}
                    productsState={searchProducts}
                    getFunc={getSearchProduct}
                    container={false}
                />
                <div className='bold-24px mb-25px color-dark-blue'>
                    {t("likeProducts")}
                </div>
                <Carousel items={monthlyBest ? monthlyBest.products : null} centered />
            </main>
            <Footer />
        </>
    )
}

export default Search;
