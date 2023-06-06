import "./Main.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCategory,
  getCategory,
  getCategoryList,
} from "../../redux/categoryReducer";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import Button from "../../components/Button/Button";
import previewImage from "../../assets/img/main_preview.png";
import mainWelcomeBanner from "../../assets/img/main_welcome_banner.png";
import mainBottomBanner from "../../assets/img/main_bottom_banner.png";
import i18next from "i18next";
import { getMonthlyBest } from "../../redux/monthlyBestReducer";
import CategoryList from "../Category/CategoryList";
import logo from "../../assets/logo.svg";
import price from "../../assets/icons/price.svg";
import delivery from "../../assets/icons/delivery.svg";
import quality from "../../assets/icons/quality.svg";
import pay from "../../assets/icons/pay.svg";
import useWindowSize from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { USER_INFO } from "../../graphql/query/userInfo";
import { useQuery} from "@apollo/client";

const Main = () => {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const { t } = useTranslation();
  const monthlyBestState = useSelector(
    (state) => state.monthlyBestPage.monthlyBest
  );
  const categoryState = useSelector((state) => state.categoryPage.category);
  // const categoryListState = useSelector(state => state.categoryPage.categoryList);
  const login = useSelector((state) => state.profilePage.login.token);
  const { data, loading, refetch } = useQuery(USER_INFO, {
    id: localStorage.getItem("userId"),
  });

  useState(() => {
    console.log(data);
    refetch()
  })

  const [monthlyBest, setMonthlyBest] = useState(null);
  const [carouselBottom, setCarouselBottom] = useState(null);
  if (!data || data.user == null) {
    console.log("No User");
  } else {
    console.log(data);
  }
  useEffect(() => {
    i18next.on("languageChanged", () => {
      dispatch(getMonthlyBest());
      dispatch(getCategoryList());
      dispatch(getCategory("electronics"));
    });
    dispatch(getMonthlyBest());
    dispatch(getCategoryList());
    dispatch(getCategory("electronics"));
    window.scrollTo({ top: 0, left: 0 });

    return () => {
      dispatch(cleanCategory());
    };
  }, [dispatch]);

  useEffect(() => {
    setMonthlyBest(monthlyBestState);
  }, [monthlyBestState]);

  useEffect(() => {
    setCarouselBottom(categoryState);
  }, [categoryState]);

  return (
    <>
      <Header />
      <section
        className="mainBanner"
        style={{ backgroundImage: `url(${previewImage})` }}
      ></section>
      <main className="container">
        <section className="monthly-best-section">
          <div className="header-action-sm">
            <h1 className="header-action-name">{t("bestOfMonth")}</h1>
            <Link to="/best" className="header-action-link">
              {t("main:seeAll")}
            </Link>
          </div>
          <div className="carousel-wrapper">
            <Carousel
              gridOnSm
              noPriceCards
              items={monthlyBest ? monthlyBest.products : null}
              centered
            />
          </div>
        </section>
        {!login && (
          <section className="welcome-section">
            <div className="d-flex flex-column flex-items-center welcome-box">
              <div className=" d-flex flex-column flex-items-center welcome-box-inner">
                <div className="d-flex">
                  <svg
                    viewBox="0 0 85 85"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M42.5 42.5002C52.2801 42.5002 60.2084 34.5719 60.2084 24.7918C60.2084 15.0118 52.2801 7.0835 42.5 7.0835C32.72 7.0835 24.7917 15.0118 24.7917 24.7918C24.7917 34.5719 32.72 42.5002 42.5 42.5002Z"
                      stroke="#241E3C"
                      strokeWidth="5"
                    />
                    <path
                      d="M60.2083 77.9168H18.6504C17.6459 77.9171 16.6529 77.7036 15.7372 77.2907C14.8215 76.8778 14.0041 76.2749 13.3393 75.5219C12.6744 74.769 12.1773 73.8832 11.8809 72.9235C11.5845 71.9637 11.4957 70.9519 11.6202 69.9552L13.0015 58.891C13.3227 56.3205 14.5719 53.956 16.5142 52.2419C18.4565 50.5279 20.9581 49.5825 23.5486 49.5835H24.7917"
                      stroke="#241E3C"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M56.6666 56.6668L64.6354 63.7502L77.9166 49.5835"
                      stroke="#241E3C"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h1>{t("main:welcome")}</h1>
                <p>{t("main:purchases")}</p>
                <div className="d-flex flex-row w-100 welcome-box-actions">
                  <Button
                    to="/signup"
                    text={t("registration")}
                    color="pink"
                    bold
                    fill
                    variant="lg"
                  />
                  <Button
                    to="/login"
                    text={t("login")}
                    color="pink"
                    bold
                    variant="lg"
                  />
                </div>
              </div>
            </div>
            <div
              className="welcome-banner"
              style={{ backgroundImage: `url(${mainWelcomeBanner})` }}
            />
          </section>
        )}
        <section className="categories-section">
          <div className="header-action-sm">
            <h1 className="header-action-name">{t("categories")}</h1>
            {/* <Link to='/category' className='header-action-link'>Смотреть все</Link> */}
          </div>
          <CategoryList />
        </section>

        <section className="d-flex flex-items-center kadabra-desc">
          <div className="w-100 shadow desc">
            <div className="logo">
              <img
                src={logo}
                className="user-select-none user-drag-none"
                alt="Logo"
              />
            </div>
            <div className="icons">
              <div className="price">
                <img
                  src={price}
                  alt="Price"
                  className="user-select-none user-drag-none"
                />
                <p>{t("main:prices")}</p>
              </div>
              <div className="delivery">
                <img
                  src={delivery}
                  alt="Delivery"
                  className="user-select-none user-drag-none"
                />
                <p>{t("main:delivery")}</p>
              </div>
              <div className="quality">
                <img
                  src={quality}
                  alt="Quality"
                  className="user-select-none user-drag-none"
                />
                <p>{t("main:quality")}</p>
              </div>
              <div className="pay">
                <img
                  src={pay}
                  alt="Pay"
                  className="user-select-none user-drag-none"
                />
                <p>{t("main:pay")}</p>
              </div>
            </div>
          </div>
          {size.width > 1150 && (
            <div className="d-flex bg-dark-blue br-5px telegram">
              <h1>{t("main:telegram")}</h1>
              <Button
                to={{ pathname: "https://t.me/uzAmazonDelivery" }}
                target="_blank"
                color="grey"
              >
                <svg
                  width="23"
                  height="21"
                  viewBox="0 0 23 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.9965 0.371646C20.7256 0.391352 20.4598 0.454897 20.2093 0.559802H20.2059C19.9654 0.655146 18.8222 1.13608 17.084 1.86508L10.8555 4.4883C6.38612 6.36986 1.99271 8.22274 1.99271 8.22274L2.04503 8.20249C2.04503 8.20249 1.74212 8.30205 1.42571 8.5189C1.23024 8.64328 1.06204 8.80603 0.931276 8.9973C0.776026 9.22511 0.651151 9.57358 0.697557 9.93387C0.773495 10.5431 1.16837 10.9084 1.45187 11.1101C1.73874 11.3142 2.01212 11.4096 2.01212 11.4096H2.01887L6.1389 12.7976C6.32368 13.3907 7.3944 16.9108 7.65174 17.7217C7.80362 18.206 7.95128 18.5089 8.13606 18.7401C8.22549 18.8582 8.33012 18.9569 8.45584 19.0362C8.52119 19.0743 8.59088 19.1043 8.6634 19.1257L8.62121 19.1156C8.63387 19.1189 8.64399 19.1291 8.65328 19.1324C8.68703 19.1417 8.70981 19.1451 8.75284 19.1518C9.40506 19.3493 9.92903 18.9443 9.92903 18.9443L9.95856 18.9206L12.3911 16.7058L16.4681 19.8336L16.5609 19.8732C17.4106 20.2462 18.2712 20.0386 18.726 19.6724C19.1841 19.3037 19.3622 18.8321 19.3622 18.8321L19.3917 18.7561L22.5422 2.61602C22.6317 2.21777 22.6545 1.84483 22.5557 1.48286C22.4539 1.11653 22.2189 0.801458 21.8968 0.599458C21.6263 0.435024 21.3126 0.355656 20.9965 0.371646ZM20.9113 2.10133C20.9079 2.15449 20.918 2.14858 20.8944 2.25068V2.25996L17.7734 18.2321C17.7599 18.2549 17.7371 18.3047 17.6747 18.3545C17.6088 18.4068 17.5565 18.4397 17.2823 18.3309L12.2957 14.5078L9.28356 17.2534L9.91637 13.2118L18.0636 5.61808C18.3994 5.3059 18.2872 5.24008 18.2872 5.24008C18.3108 4.85702 17.7801 5.12786 17.7801 5.12786L7.50662 11.4923L7.50324 11.4754L2.57912 9.81743V9.81405L2.56646 9.81152C2.5751 9.80865 2.58355 9.80527 2.59178 9.8014L2.61878 9.7879L2.64493 9.77861C2.64493 9.77861 7.04171 7.92574 11.5111 6.04418C13.7487 5.10171 16.0032 4.15249 17.7371 3.42011C19.471 2.69196 20.7527 2.15786 20.8252 2.12918C20.8944 2.10218 20.8615 2.10218 20.9113 2.10218V2.10133Z"
                    fill="white"
                  />
                </svg>
                {t("main:goTo")}
              </Button>
              <h1>
                {t("main:telegramDesc")} <br /> {t("main:telegramDesc2")}
              </h1>
            </div>
          )}
        </section>
        {login && (
          <section className="mt-60px login-carousel">
            <div className="header-action-sm mb-10px">
              <h1>{t("likeProducts")}</h1>
              <Link to="/category" className="header-action-link">
                {t("main:seeAll")}
              </Link>
            </div>
            <div className="carousel-wrapper">
              <Carousel
                items={carouselBottom ? carouselBottom.products : null}
                centered
              />
            </div>
          </section>
        )}
        {size.width >= 768 && (
          <section
            className="banner-3"
            style={{ backgroundImage: `url(${mainBottomBanner})` }}
          />
        )}
        <section className="carousel-section">
          <div className="bg-pink br-5px data-block">
            <h1>{t("promoProducts")}</h1>
            <span>
              <span>-30% </span>
              {t("onlyUntil")} 05.05.2021
            </span>
          </div>
          <div className="carousel-wrapper">
            <Carousel
              noPriceCards
              centered={false}
              sm
              items={carouselBottom ? carouselBottom.products : null}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Main;
