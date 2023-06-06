import "./Header.scss";

import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import Input from "../../components/Input/Input";
import i18next from "i18next";
import logo from "../../assets/logo.svg";

import { logOut } from "../../redux/profileReducer";
import { getCartLength, getSearchText } from "../../redux/productReducer";
import { useTranslation } from "react-i18next";
import useWindowSize from "../../hooks/useWindowSize";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const size = useWindowSize();

  const login = localStorage.getItem("Token")
  const cartLength = useSelector((state) => state.productPage.cartLength);

  const { control, handleSubmit } = useForm();

  let [openSubMenu, setOpenSubMenu] = useState(false);
  let [openMobileMenu, setMobileMenu] = useState(false);

  let logOutFunc = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userId");
    dispatch(logOut()).then(() => {
      history.push(`/`);
    });
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const onSubmit = (data) => {
    history.push(`/search?search=${data.search}`);
    dispatch(getSearchText(data.search));
  };
  useEffect(() => {
    dispatch(getCartLength());
  }, [dispatch]);

  useEffect(() => {
    if (openMobileMenu) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = null;
    };
  }, [openMobileMenu]);

  useEffect(() => {
    if (size.width > 375 && openMobileMenu) {
      document.body.style.overflow = null;
    }
    if (size.width <= 375 && openMobileMenu) {
      document.body.style.overflow = "hidden";
    }
  }, [size.width, openMobileMenu]);
  return (
    <>
      <header
        className={`${openMobileMenu ? "navbar-active" : ""}${
          size.width <= 600 ? " position-static" : ""
        }`}
      >
        <div className="header-inner">
          <div
            className={`d-flex flex-column header-main${
              size.width <= 600 ? " fixed" : ""
            } container`}
          >
            <div className="header-main-inner ">
              <div className="d-flex flex-items-center w-100">
                <Link to="/" className="header-brand">
                  <img
                    src={logo}
                    className="user-select-none user-drag-none"
                    alt="Kadabra"
                  />
                </Link>
                {size.width > 600 && (
                  <form
                    className={
                      location.pathname === "/" ? "home-form-search" : undefined
                    }
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Controller
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          type="search"
                          noShadow
                          placeholder={t("searchProducts")}
                          {...field}
                        >
                          <button>
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.9541 20.9546L16.2428 16.2348L20.9541 20.9546ZM18.8537 9.92704C18.8537 12.2946 17.9132 14.5653 16.2391 16.2394C14.565 17.9136 12.2944 18.8541 9.92683 18.8541C7.55929 18.8541 5.28872 17.9136 3.61461 16.2394C1.9405 14.5653 1 12.2946 1 9.92704C1 7.55944 1.9405 5.28882 3.61461 3.61467C5.28872 1.94053 7.55929 1 9.92683 1C12.2944 1 14.565 1.94053 16.2391 3.61467C17.9132 5.28882 18.8537 7.55944 18.8537 9.92704V9.92704Z"
                                stroke="#959595"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </Input>
                      )}
                      name={"search"}
                      control={control}
                      rules={{ required: true }}
                    />
                  </form>
                )}
              </div>
              <div className="header-actions">
                <ul className="d-flex flex-row flex-items-center">
                  <li className="basket">
                    <Link to="/cart">
                      <span className="basket-amount">{cartLength}</span>
                      <svg
                        width="32"
                        height="28"
                        viewBox="0 0 32 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.7373 19.8503H9.49549L10.562 17.7365L28.2831 17.7052C28.8824 17.7052 29.3961 17.2887 29.5031 16.7125L31.9572 3.34598C32.0214 2.99541 31.9251 2.63444 31.6897 2.36023C31.5733 2.22528 31.4282 2.11658 31.2643 2.04166C31.1005 1.96674 30.9219 1.9274 30.7408 1.92637L8.19708 1.85348L8.00446 0.971861C7.88318 0.40957 7.36239 0 6.77026 0H1.25917C0.925216 0 0.604942 0.129087 0.368802 0.358864C0.132662 0.588641 0 0.900285 0 1.22524C0 1.55019 0.132662 1.86184 0.368802 2.09161C0.604942 2.32139 0.925216 2.45048 1.25917 2.45048H5.75008L6.59191 6.34486L8.66436 16.1086L5.99621 20.3466C5.85765 20.5286 5.77419 20.7446 5.75528 20.9704C5.73637 21.1961 5.78276 21.4225 5.8892 21.6239C6.10322 22.0369 6.53483 22.2973 7.01282 22.2973H9.25293C8.77536 22.9145 8.51742 23.6662 8.51812 24.4388C8.51812 26.4034 10.159 28 12.1779 28C14.1969 28 15.8377 26.4034 15.8377 24.4388C15.8377 23.6648 15.5737 22.9116 15.1029 22.2973H20.8494C20.3718 22.9145 20.1139 23.6662 20.1146 24.4388C20.1146 26.4034 21.7554 28 23.7744 28C25.7933 28 27.4342 26.4034 27.4342 24.4388C27.4342 23.6648 27.1702 22.9116 26.6994 22.2973H30.7408C31.4328 22.2973 32 21.7489 32 21.072C31.9979 20.7474 31.864 20.4368 31.6274 20.2079C31.3909 19.979 31.0709 19.8504 30.7373 19.8503ZM8.72144 4.26925L29.2605 4.33519L27.2487 15.2964L11.1149 15.3242L8.72144 4.26925ZM12.1779 25.5356C11.5572 25.5356 11.0507 25.0428 11.0507 24.4388C11.0507 23.8349 11.5572 23.342 12.1779 23.342C12.7986 23.342 13.3051 23.8349 13.3051 24.4388C13.3051 24.7297 13.1863 25.0087 12.9749 25.2144C12.7636 25.4201 12.4769 25.5356 12.1779 25.5356ZM23.7744 25.5356C23.1537 25.5356 22.6472 25.0428 22.6472 24.4388C22.6472 23.8349 23.1537 23.342 23.7744 23.342C24.3951 23.342 24.9016 23.8349 24.9016 24.4388C24.9016 24.7297 24.7828 25.0087 24.5714 25.2144C24.36 25.4201 24.0733 25.5356 23.7744 25.5356Z"
                          fill="#241E3C"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      setOpenSubMenu(!openSubMenu);
                    }}
                    className="login"
                  >
                    <svg
                      width="30"
                      height="32"
                      viewBox="0 0 30 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0004 16C19.1104 16 22.4422 12.866 22.4422 9C22.4422 5.13401 19.1104 2 15.0004 2C10.8904 2 7.55859 5.13401 7.55859 9C7.55859 12.866 10.8904 16 15.0004 16Z"
                        stroke="#241E3C"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M22.4418 18.8H22.9657C24.0538 18.8003 25.1044 19.1744 25.92 19.8518C26.7356 20.5293 27.2601 21.4636 27.3951 22.4792L27.977 26.8528C28.0294 27.2469 27.992 27.6468 27.8675 28.0262C27.7429 28.4056 27.534 28.7557 27.2546 29.0534C26.9752 29.351 26.6317 29.5893 26.2469 29.7526C25.8621 29.9158 25.4448 30.0001 25.0226 30H4.97737C4.55525 30.0001 4.13793 29.9158 3.75311 29.7526C3.3683 29.5893 3.02479 29.351 2.74539 29.0534C2.46598 28.7557 2.25707 28.4056 2.13252 28.0262C2.00797 27.6468 1.97063 27.2469 2.02297 26.8528L2.60344 22.4792C2.73842 21.4632 3.2634 20.5285 4.07964 19.8509C4.89588 19.1734 5.94716 18.7997 7.03578 18.8H7.55819"
                        stroke="#241E3C"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {openSubMenu && (
                      <div className="submenu">
                        {login ? (
                          <ul>
                            <Link to="/profile">
                              <li>Мой аккаунт</li>
                            </Link>
                            <Link to="/become-vendor">
                              <li>{t("personalArea")}</li>
                            </Link>
                            <li onClick={logOutFunc}>{t("logout")}</li>
                          </ul>
                        ) : (
                          <ul>
                            <Link to="/login">
                              <li>{t("login")}</li>
                            </Link>
                            <Link to="/signup">
                              <li>{t("registration")}</li>
                            </Link>
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                  {i18n.language === "ru" && (
                    <li
                      className="language"
                      onClick={() => {
                        changeLanguage("uz");
                        i18next.on("languageChanged", function () {});
                      }}
                    >
                      Рус
                    </li>
                  )}
                  {i18n.language === "uz" && (
                    <li
                      className="language"
                      onClick={() => {
                        changeLanguage("en");
                        i18next.on("languageChanged", function () {});
                      }}
                    >
                      O’zb
                    </li>
                  )}
                  {i18n.language === "en" && (
                    <li
                      className="language"
                      onClick={() => {
                        changeLanguage("ru");
                        i18next.on("languageChanged", function () {});
                      }}
                    >
                      En
                    </li>
                  )}

                  <li
                    className="mobileMenu"
                    onClick={() => {
                      setMobileMenu(!openMobileMenu);
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 2C4 2.53043 3.78928 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4C1.46957 4 0.960859 3.78929 0.585786 3.41421C0.210713 3.03914 0 2.53043 0 2C0 1.46957 0.210713 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585786C3.78928 0.960859 4 1.46957 4 2Z"
                        fill="#241E3C"
                      />
                      <path
                        d="M4 9C4 9.53043 3.78928 10.0391 3.41421 10.4142C3.03914 10.7893 2.53043 11 2 11C1.46957 11 0.960859 10.7893 0.585786 10.4142C0.210713 10.0391 0 9.53043 0 9C0 8.46957 0.210713 7.96086 0.585786 7.58579C0.960859 7.21071 1.46957 7 2 7C2.53043 7 3.03914 7.21071 3.41421 7.58579C3.78928 7.96086 4 8.46957 4 9Z"
                        fill="#241E3C"
                      />
                      <path
                        d="M2 18C2.53043 18 3.03914 17.7893 3.41421 17.4142C3.78928 17.0391 4 16.5304 4 16C4 15.4696 3.78928 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14C1.46957 14 0.960859 14.2107 0.585786 14.5858C0.210713 14.9609 0 15.4696 0 16C0 16.5304 0.210713 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18Z"
                        fill="#241E3C"
                      />
                      <path
                        d="M11 2C11 2.53043 10.7893 3.03914 10.4142 3.41421C10.0391 3.78929 9.53043 4 9 4C8.46957 4 7.96086 3.78929 7.58579 3.41421C7.21071 3.03914 7 2.53043 7 2C7 1.46957 7.21071 0.960859 7.58579 0.585786C7.96086 0.210714 8.46957 0 9 0C9.53043 0 10.0391 0.210714 10.4142 0.585786C10.7893 0.960859 11 1.46957 11 2Z"
                        fill="#241E3C"
                      />
                      <path
                        d="M9 11C9.53043 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53043 11 9C11 8.46957 10.7893 7.96086 10.4142 7.58579C10.0391 7.21071 9.53043 7 9 7C8.46957 7 7.96086 7.21071 7.58579 7.58579C7.21071 7.96086 7 8.46957 7 9C7 9.53043 7.21071 10.0391 7.58579 10.4142C7.96086 10.7893 8.46957 11 9 11Z"
                        fill="#241E3C"
                      />
                      <path
                        d="M11 16C11 16.5304 10.7893 17.0391 10.4142 17.4142C10.0391 17.7893 9.53043 18 9 18C8.46957 18 7.96086 17.7893 7.58579 17.4142C7.21071 17.0391 7 16.5304 7 16C7 15.4696 7.21071 14.9609 7.58579 14.5858C7.96086 14.2107 8.46957 14 9 14C9.53043 14 10.0391 14.2107 10.4142 14.5858C10.7893 14.9609 11 15.4696 11 16Z"
                        fill="#241E3C"
                      />
                      <path
                        d="M16 4C16.5304 4 17.0391 3.78929 17.4142 3.41421C17.7893 3.03914 18 2.53043 18 2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0C15.4696 0 14.9609 0.210714 14.5858 0.585786C14.2107 0.960859 14 1.46957 14 2C14 2.53043 14.2107 3.03914 14.5858 3.41421C14.9609 3.78929 15.4696 4 16 4Z"
                        fill="#241E3C"
                      />
                      <path
                        d="M18 9C18 9.53043 17.7893 10.0391 17.4142 10.4142C17.0391 10.7893 16.5304 11 16 11C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9C14 8.46957 14.2107 7.96086 14.5858 7.58579C14.9609 7.21071 15.4696 7 16 7C16.5304 7 17.0391 7.21071 17.4142 7.58579C17.7893 7.96086 18 8.46957 18 9Z"
                        fill="#241E3C"
                      />
                      <path
                        d="M16 18C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16C18 15.4696 17.7893 14.9609 17.4142 14.5858C17.0391 14.2107 16.5304 14 16 14C15.4696 14 14.9609 14.2107 14.5858 14.5858C14.2107 14.9609 14 15.4696 14 16C14 16.5304 14.2107 17.0391 14.5858 17.4142C14.9609 17.7893 15.4696 18 16 18Z"
                        fill="#241E3C"
                      />
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
            {size.width <= 600 && (
              <div className="header-search">
                <form
                  className={
                    location.pathname === "/" ? "home-form-search" : undefined
                  }
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        type="search"
                        noShadow
                        placeholder={t("searchProducts")}
                        {...field}
                      >
                        <button>
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.9541 20.9546L16.2428 16.2348L20.9541 20.9546ZM18.8537 9.92704C18.8537 12.2946 17.9132 14.5653 16.2391 16.2394C14.565 17.9136 12.2944 18.8541 9.92683 18.8541C7.55929 18.8541 5.28872 17.9136 3.61461 16.2394C1.9405 14.5653 1 12.2946 1 9.92704C1 7.55944 1.9405 5.28882 3.61461 3.61467C5.28872 1.94053 7.55929 1 9.92683 1C12.2944 1 14.565 1.94053 16.2391 3.61467C17.9132 5.28882 18.8537 7.55944 18.8537 9.92704V9.92704Z"
                              stroke="#959595"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </Input>
                    )}
                    name={"search"}
                    control={control}
                    rules={{ required: true }}
                  />
                </form>
              </div>
            )}
          </div>

          <nav className="d-flex container">
            <ul className="d-flex flex-row">
              <li>
                <Link to="/best">{t("bestOfMonth")}</Link>
              </li>
              <span className="vert-line" />
              <li>
                <Link to="/category/electronics">{t("electronics")}</Link>
              </li>
              <span className="vert-line" />
              <li>
                <Link to="/category/clothing">{t("clothes")}</Link>
              </li>
              {/* <span className='vert-line' /> */}
              {/* <li>
                            <Link to='/category/sports-outdoors'>
                                Здоровье
                            </Link>
                        </li> */}
              {/* <span className='vert-line'/>
                        <li>
                            <Link to='/category/electronics'>
                                Косметика
                            </Link>
                        </li> */}
              <span className="vert-line" />
              <li>
                <Link to="/category/home-kitchen">{t("house")}</Link>
              </li>
            </ul>
          </nav>
          {openMobileMenu && (
            <div className="mobileMenuNav container">
              {login ? (
                <ul>
                  <li>
                    <Link to="/profile">
                      <li>Мой аккаунт</li>
                    </Link>
                    <Link to="/become-vendor">
                      <li>{t("personalArea")}</li>
                    </Link>
                  </li>
                  <li onClick={logOutFunc}>{t("logout")}</li>
                  {i18n.language === "ru" && (
                    <li
                      className="language"
                      onClick={() => {
                        changeLanguage("uz");
                        i18next.on("languageChanged", function () {});
                      }}
                    >
                      {t("language")} Русcкий
                    </li>
                  )}
                  {i18n.language === "uz" && (
                    <li
                      className="language"
                      onClick={() => {
                        changeLanguage("en");
                        i18next.on("languageChanged", function () {});
                      }}
                    >
                      {t("language")} O’zb
                    </li>
                  )}
                  {i18n.language === "en" && (
                    <li
                      className="language"
                      onClick={() => {
                        changeLanguage("ru");
                        i18next.on("languageChanged", function () {});
                      }}
                    >
                      {t("language")} English
                    </li>
                  )}
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link to="/login">{t("login")}</Link>
                  </li>
                  <li>
                    <Link to="/signup">{t("registration")}</Link>
                  </li>
                  <li className="mb-0">
                    {t("language")} <span>Русский</span>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
