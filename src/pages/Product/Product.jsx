import classes from './Product.module.scss'

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { message } from 'antd';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { getCategory, getCategoryList } from "../../redux/categoryReducer";
import {
    addProductsCart,
    cleanProductDetail,
    cleanReviewDetail,
    getCartLength,
    getProductDetail,
    getReviewDetail,
    addBuySingleProduct
} from "../../redux/productReducer";

import Preloader from "../../components/Preloader/Preloader";
import RatingStars from "../../components/RatingStars/RatingStars";
import Carousel from "../../components/Carousel/Carousel";
import RatingBlock from "../../components/RatingBlock/RatingBlock";
import Review from "../../components/Review/Review";
import Comment from "../../components/Comment/Comment";
import i18next from 'i18next'
import banner from '../../assets/img/productBanner.png'
import { useTranslation } from "react-i18next";
import { getMonthlyBest } from "../../redux/monthlyBestReducer";
import { TextSkeleton } from '../../components/Skeletons/TextSkeleton';
import { HeadingSkeleton } from '../../components/Skeletons/HeadingSkeleton';

const Product = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    let slug = useParams();

    let product = useSelector(state => state.productPage.productDetail);

    const [monthlyBest, setMonthlyBest] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { t } = useTranslation();
    const category = useSelector(state => state.categoryPage.category);
    const login = useSelector(state => state.profilePage.login.token);
    // const rating = useSelector(state => state.productPage.reviewDetail);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    useEffect(() => {
        i18next.on('languageChanged', () => {
            dispatch(getProductDetail(slug.name))
            dispatch(getReviewDetail(slug.name))
            dispatch(getCategory('electronics'))
        })
        dispatch(getProductDetail(slug.name))
        dispatch(getReviewDetail(slug.name))
        dispatch(getCategory('electronics'))
        window.scrollTo({ top: 0, left: 0 })
        return () => {
            dispatch(cleanReviewDetail());
            dispatch(cleanProductDetail());
        }
    }, [dispatch, slug.name]);

    useEffect(() => {
        setMonthlyBest(category);
    }, [category])
    let addCart = () => {
        dispatch(addProductsCart(request)).then(() => {
            dispatch(getCartLength())
            message.success(`${t("product:addProduct")}`)
        })
    }
    let viewCart = (productPrice) => {
        dispatch(addBuySingleProduct(productPrice));
        history.push('/purchase');
    }

    let request = {
        id: product.id,
        quantity: quantity
    }

    return (
        <>
            <div className={classes.productPage} >
                <Header />
                {product ? (
                    <div className="container">
                        <div className={classes.breadCrumbs}>
                            <p onClick={() => {
                                history.push(`/category/${product.category.slug}`)
                            }}>{product.category.title} </p>/
                    <p>{product.subcategory.title} </p>/
                    <p onClick={() => {
                                history.push(`/category/${product.category.slug}?product_type=${product.product_type.id}`)
                            }}>{!product.product_type ? '' : product.product_type.title} </p>
                        </div>
                        <div className={classes.productTitle}>
                            <div className={classes.photo}>
                                <img src={product.image} alt="Product Preview" />
                            </div>
                            <div className={classes.title}>
                                <h2>{product.title}</h2>
                                <RatingStars disabled={true} activeStars={product.rate} />
                                <div className={classes.manufacturer}>
                                    <h4>{t("manufacturer")}:</h4>
                                    <span onClick={() => {
                                        history.push(`/category/${product.category.slug}?manufacturer=${product.manufacturer.id}`)
                                    }}>
                                        {!product.manufacturer ? '' : product.manufacturer.title}
                                    </span>
                                </div>
                                <div className={classes.price}>
                                    <h2>${product.price}</h2>
                                    {/* NOTE: {product.description} here?? */}
                                    <p>97% Rayon, 3% Spandex <br />
                                Imported <br />
                                Machine Wash <br />
                                Supersoft French terry will make these casual jogger-style sweatpants a <br /> go-to for
                                everyday lounge-wear
                                Features an elasticized waistband with drawstring
                            </p>
                                </div>
                                <div className={classes.buy}>
                                    <div className={classes.quantity}>
                                        <h4>{t("quantity")}:</h4>
                                        <div className={classes.quantityTotal}>
                                            <button onClick={() => {
                                                if (quantity >= 2) {
                                                    setQuantity(quantity - 1)
                                                }
                                            }}>
                                                <svg width="10" viewBox="0 0 10 2" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 1H10" stroke="#E9456A" strokeWidth="1.5" />
                                                </svg>

                                            </button>
                                            <span>{quantity}</span>
                                            <button onClick={() => {
                                                setQuantity(quantity + 1)
                                            }}>
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 0V10" stroke="#E9456A" strokeWidth="1.5" />
                                                    <path d="M0 5.18506H10" stroke="#E9456A" strokeWidth="1.5" />
                                                </svg>

                                            </button>
                                        </div>
                                    </div>
                                    <div className={classes.buyPrice}>
                                        <h4>{t("cost")}:</h4><span>${parseFloat(product.price * quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className={classes.buyButton}>
                                    <button
                                        onClick={() => viewCart(parseFloat(product.price * quantity).toFixed(2))}
                                        className={classes.orangeButton}
                                    >
                                        {t("buy")}
                                    </button>
                                    <button onClick={addCart} className={classes.pinkButton}>{t("addCart")}</button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.carousel}>
                            <h4>{t("likeProducts")}</h4>
                            <Carousel items={monthlyBest ? monthlyBest.products : null} centered />
                        </div>
                        <div className={classes.banner}>
                            <img src={banner} alt="Баннер" />
                        </div>
                        <div className={classes.characteristics}>
                            <div className={classes.description}>
                                <h3>{t("product:characteristics")}</h3>
                                <p>{product.characteristics}</p>
                                <br />
                                <p>{product.description}</p>
                            </div>
                            <RatingBlock slug={slug.name} />
                        </div>
                        <Review slug={slug.name} />
                        {login && <Comment slug={slug.name} />}
                        {/* <div className={classes.category}>
                    <CategoryList/>
                </div> */}
                    </div>
                ) : (
                    <div className="container">
                        <div className={classes.breadCrumbs}>
                        </div>
                        <div className={classes.productTitle}>
                            <div className={classes.photo} />
                            <div className={classes.title}>
                                <h2>
                                    <HeadingSkeleton style={{ maxWidth: '90%' }} />
                                    <br />
                                    <HeadingSkeleton style={{ maxWidth: '60%' }} />
                                    <br />
                                    <HeadingSkeleton style={{ maxWidth: '30%' }} />
                                    <br />
                                </h2>
                                <RatingStars disabled={true} activeStars={product.rate} />
                                <div className={classes.manufacturer}>
                                    <h4>{t("manufacturer")}:</h4>
                                    <span style={{ width: '100px' }}>
                                        <TextSkeleton />
                                    </span>
                                </div>
                                <div className={classes.price}>
                                    <h2>
                                        <HeadingSkeleton style={{ maxWidth: '30%' }} />
                                    </h2>
                                    <p>
                                        <TextSkeleton />
                                        <br />
                                        <TextSkeleton />
                                        <br />
                                        <TextSkeleton />
                                    </p>
                                </div>
                                <div className={classes.buy}>
                                    <div className={classes.quantity}>
                                        <h4>{t("quantity")}:</h4>
                                        <div className={classes.quantityTotal}>
                                            <button onClick={() => {
                                                if (quantity >= 2) {
                                                    setQuantity(quantity - 1)
                                                }
                                            }}>
                                                <svg width="10" viewBox="0 0 10 2" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 1H10" stroke="#E9456A" strokeWidth="1.5" />
                                                </svg>

                                            </button>
                                            <span>{quantity}</span>
                                            <button onClick={() => {
                                                setQuantity(quantity + 1)
                                            }}>
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 0V10" stroke="#E9456A" strokeWidth="1.5" />
                                                    <path d="M0 5.18506H10" stroke="#E9456A" strokeWidth="1.5" />
                                                </svg>

                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.buyButton}>
                                    <button
                                        onClick={() => viewCart(parseFloat(product.price * quantity).toFixed(2))}
                                        className={classes.orangeButton}
                                    >
                                        {t("buy")}
                                    </button>
                                    <button onClick={addCart} className={classes.pinkButton}>{t("addCart")}</button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.carousel}>
                            <h4>{t("likeProducts")}</h4>
                            <Carousel items={monthlyBest ? monthlyBest.products : null} centered />
                        </div>
                        <div className={classes.banner}>
                            <img src={banner} alt="Баннер" />
                        </div>
                        <div className={classes.characteristics}>
                            <div className={classes.description}>
                                <h3>{t("product:characteristics")}</h3>
                                <p>
                                    <TextSkeleton style={{ maxWidth: '90%' }} />
                                    <TextSkeleton style={{ maxWidth: '90%' }} />
                                    <TextSkeleton style={{ maxWidth: '90%' }} />
                                    <TextSkeleton style={{ maxWidth: '90%' }} />
                                    <TextSkeleton style={{ maxWidth: '80%' }} />
                                    <TextSkeleton style={{ maxWidth: '60%' }} />
                                </p>
                            </div>
                            <RatingBlock slug={slug.name} />
                        </div>
                    </div>
                )}

                <Footer />
            </div >
        </>
    )
}

export default Product
