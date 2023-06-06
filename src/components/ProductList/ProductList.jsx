import classes from "./ProductList.module.scss";

import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import queryString from "query-string";

import Grid from "../../components/Grid/Grid";
import Select from "../../components/Select/Select";
import Checkbox from "../../components/Checkbox/Checkbox";
import RatingStars from "../../components/RatingStars/RatingStars";
import Button from "../../components/Button/Button";

import { Collapse, Pagination } from "antd";
import i18next from "i18next";
import useWindowSize from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { HeadingSkeleton } from "../Skeletons/HeadingSkeleton";
import { TextSkeleton } from "../Skeletons/TextSkeleton";
import { ProductListSortSkeleton } from "../Skeletons/ProductListSortSkeleton";
import { CATEGORY } from "../../graphql/query/category";
import { useQuery } from "@apollo/client";

const ProductList = ({
  title,
  productsState,
  page: pageProp,
  getFunc,
  cleanFunc,
  pathName = "",
  container = true,
}) => {
  const size = useWindowSize();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { Panel } = Collapse;

  const [pageSize, setPageSize] = useState(() => {
    if (size.width > 1440) {
      return 20;
    }
    if (size.width <= 1400 && size.width > 768) {
      return 16;
    }
    if (size.width <= 768 && size.width > 375) {
      return 12;
    }
    if (size.width <= 375) {
      return 8;
    }
    return 16;
  });

  const [page, setPage] = useState(() => {
    const initialState = queryString.parse(location.search, {
      arrayFormat: "comma",
    }).page;
    return initialState ? initialState : 1;
  });

  const [productsInfo, setProductsInfo] = useState(null);

  const [checkboxesState, setCheckboxesState] = useState({
    product_type: [],
    manufacturer: [],
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    const initialState = queryString.parse(location.search, {
      arrayFormat: "comma",
    }).search;
    return { search: initialState };
  });

  const [queryParamsString, setQueryParamsString] = useState("");
  const [queryIsComplete, setQueryIsComplete] = useState(null);

  const [filterQueries, setFilterQueries] = useState("");
  const [sortByPriceQuery, setSortByPriceQuery] = useState(null);
  const [sortByStars, setSortByStars] = useState({});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minMaxPriceValues, setMinMaxPriceValues] = useState({
    min: "",
    max: "",
  });

  const setDeafultQueries = () => {
    setPage(1);

    setQueryParamsString("");
    setQueryIsComplete(null);

    setFilterQueries("");

    setSortByPriceQuery(null);
    setSortByStars({});
    setMaxPrice("");
    setMinPrice("");
    setMinMaxPriceValues({ min: "", max: "" });
    setCheckboxesState({
      product_type: [],
      manufacturer: [],
    });
  };

  // Get queryParams as initialValues of filtering states
  useEffect(() => {
    setQueryIsComplete(false);
    window.scrollTo({ top: 0, left: 0 });

    // Getting JSON of query values from search
    const initialValues = queryString.parse(location.search, {
      arrayFormat: "comma",
      sort: false,
    });

    const query = queryString.stringify(initialValues, {
      arrayFormat: "comma",
      skipNull: true,
      skipEmptyString: true,
      sort: false,
    });

    history.replace({
      search: query,
    });

    // Setting checkboxes using the data passed from query params (initialValues)
    const cs = checkboxesState;
    cs.product_type = initialValues.product_type
      ? typeof initialValues.product_type === "string"
        ? [initialValues.product_type]
        : initialValues.product_type
      : [];
    cs.manufacturer = initialValues.manufacturer
      ? typeof initialValues.manufacturer === "string"
        ? [initialValues.manufacturer]
        : initialValues.manufacturer
      : [];

    // Setting default values for sorting states
    setCheckboxesState(cs);
    setSortByStars({ stars: initialValues.stars });
    setSortByPriceQuery({ sort_by: initialValues.sort_by });
    setMaxPrice(initialValues.max_price);
    setMinPrice(initialValues.min_price);
    setMinMaxPriceValues({
      min: initialValues.min_price,
      max: initialValues.max_price,
    });

    setQueryIsComplete(true);

    return () => {
      cleanFunc && dispatch(cleanFunc());
      history.replace({
        search: "",
      });
      setDeafultQueries();
    };
  }, [location.pathname]);

  // useEffect(() => {
  //     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // }, [categoryName]);

  //Changing queryParamsSting on filtering changes
  useEffect(() => {
    const query = queryString.stringify(
      {
        ...searchQuery,
        ...sortByPriceQuery,
        ...checkboxesState,
        ...sortByStars,
        min_price: minMaxPriceValues.min,
        max_price: minMaxPriceValues.max,
      },
      {
        arrayFormat: "comma",
        skipNull: true,
        skipEmptyString: true,
        sort: false,
      }
    );
    setQueryParamsString(query);
    setQueryIsComplete(true);
  }, [
    filterQueries,
    sortByPriceQuery,
    checkboxesState,
    sortByStars,
    searchQuery,
    minMaxPriceValues,
    page,
    pageSize,
  ]);

  useEffect(() => {
    const state = queryString.parse(location.search, {
      arrayFormat: "comma",
    }).search;
    setSearchQuery({ search: state });
  }, [queryString.parse(location.search, { arrayFormat: "comma" }).search]);
  // Change history query params on queryParamsString change
  useEffect(() => {
    if (queryIsComplete) {
      history.replace({
        pathname: location.pathname,
        search:
          queryParamsString +
          `${queryParamsString && "&"}${page ? `page=${page}` : ""}`,
      });
      setQueryIsComplete(null);
    }
  }, [history, location.pathname, queryParamsString, queryIsComplete]);

  // Dispatch data from back-end
  useEffect(() => {
    const pageValue = queryString.parse(location.search, {
      arrayFormat: "comma",
    }).page;
    if (
      location.search !==
      `${location.search ? "&" : "?"}${pageValue ? "" : "page=1"}`
    ) {
      dispatch(
        getFunc(
          `${pathName}${location.search}${location.search ? "&" : "?"}${
            pageValue ? "" : "page=1&"
          }page_size=${pageSize ? pageSize : 15}`
        )
      );
      console.log(
        `${pathName}${location.search}${location.search ? "&" : "?"}${
          pageValue ? "" : "page=1&"
        }page_size=${pageSize ? pageSize : 15}`
      );
    }
  }, [dispatch, location.search, getFunc, pathName, pageSize]);

  useEffect(() => {
    i18next.on("languageChanged", () => {
      cleanFunc && cleanFunc();
      const pageValue = queryString.parse(location.search, {
        arrayFormat: "comma",
      }).page;
      if (
        location.search !==
        `${location.search ? "&" : "?"}${pageValue ? "" : "page=1"}`
      ) {
        dispatch(
          getFunc(
            `${pathName}${location.search}${location.search ? "&" : "?"}${
              pageValue ? "" : "page=1&"
            }page_size=${pageSize ? pageSize : 15}`
          )
        );
      }
    });
  }, []);

  useEffect(() => {
    if (productsState) {
      setProductsInfo(productsState);
    }
  }, [productsState]);

  //Sorting by Low to High pricing or Hight to Low pricing =W=
  const handleSelectChange = (value) => {
    setSortByPriceQuery({ sort_by: value.value });
  };

  // Filtering by Categories & Manufacturers of products (used checkboxState) =W=
  const handleCheckboxSort = (e, type, id) => {
    setPage(1);
    const cs = checkboxesState;
    if (cs[type].includes(id.toString())) {
      cs[type] = cs[type].filter((item) => item !== id.toString());
    } else {
      cs[type] = [...cs[type], id.toString()];
    }
    setCheckboxesState(cs);

    const q = queryString.stringify(cs, {
      arrayFormat: "comma",
      skipNull: true,
      skipEmptyString: true,
    });
    setFilterQueries(q);
  };

  // Filtering by Max Stats of products
  const handleSortByStars = (stars) => {
    sortByStars.stars === stars.toString()
      ? setSortByStars({})
      : setSortByStars({ stars: stars });
  };

  // Filtering by Min & Max Price of the products
  const handleCostSort = (e) => {
    e.preventDefault();
    setMinMaxPriceValues({
      min: minPrice ? minPrice : "",
      max: maxPrice ? maxPrice : "",
    });
  };

  // Set page on pagination change
  const handlePaginationChange = (page) => {
    window.scrollTo({ top: 310, left: 0, behavior: "smooth" });
    setPage(page);
  };
  const { t } = useTranslation();
  const { data, loading, refetch } = useQuery(CATEGORY);
  if (!data) {
    console.log("load");
  } else {
    console.log(data);
  }
  return (
    <>
      {productsState ? (
        <section
          className={`${container ? "container " : ""}${
            classes.productListContainer
          }`}
        >
          <div className={classes.productListHeader}>
            <h1>
              {title
                ? title
                : (productsInfo &&
                    productsInfo.params &&
                    productsInfo.params.info &&
                    productsInfo.params.info.title) ||
                  `${t("productList")}`}
            </h1>
            <div className={classes.productListHeaderActions}>
              <span>
                {t("category:shown")}{" "}
                {productsInfo && productsInfo.count
                  ? `${pageSize * (page - 1) + 1}-${
                      productsInfo && page * pageSize > productsInfo.count
                        ? productsInfo.count
                        : page * pageSize
                    } ${t("category:results")} ${
                      productsInfo && productsInfo.count
                    }`
                  : `0 ${t("category:noResults")}`}
              </span>
              <div
                className={`d-flex flex-items-center ${classes.productListHeaderSorting}`}
              >
                {t("category:sort")}
                <div className={classes.headerActionsSelect}>
                  <Select
                    options={[
                      { value: "cheap", label: `${t("category:sortMin")}` },
                      { value: "expensive", label: `${t("category:sortMax")}` },
                    ]}
                    defaultValue={
                      sortByPriceQuery &&
                      sortByPriceQuery.sort_by && {
                        value: sortByPriceQuery.sort_by,
                      }
                    }
                    onChange={handleSelectChange}
                    value={
                      sortByPriceQuery && sortByPriceQuery.sort_by
                        ? { value: sortByPriceQuery.sort_by }
                        : null
                    }
                    placeholder={t("category:selectSort")}
                    className="w-100"
                  />
                </div>
              </div>
              <div className={classes.productListSortingMobile}>
                <button>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.3299 0.857422H0.66991C0.21532 0.857422 -0.0685661 1.35283 0.159656 1.74805L4.47548 9.08457V13.5488C4.47548 13.8772 4.73895 14.1426 5.06552 14.1426H9.93426C10.2608 14.1426 10.5243 13.8772 10.5243 13.5488V9.08457L14.842 1.74805C15.0683 1.35283 14.7845 0.857422 14.3299 0.857422ZM9.19579 12.8066H5.80399V9.91211H9.19764V12.8066H9.19579ZM9.37391 8.4166L9.19764 8.72461H5.80214L5.62587 8.4166L1.94647 2.19336H13.0533L9.37391 8.4166Z"
                      fill="#E9456A"
                    />
                  </svg>
                  <span>{t("category:filters")}</span>
                </button>
                <div className={classes.productListSortingMobileCollapse}>
                  <Collapse
                    // expandIcon={({ isActive }) =>
                    //     <svg width="10" height="6" rotate={isActive ? 90 : 0} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //         <path d="M9.23242 0.55078L5.23242 4.55078L1.23242 0.55078" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round" />
                    //     </svg>
                    // }
                    className={classes.parentCollapse}
                    expandIconPosition="right"
                    accordion
                  >
                    <Panel header={t("categories")} key="1">
                      {productsInfo &&
                        productsInfo.params &&
                        productsInfo.params.subcategories && (
                          <Collapse className={classes.productListSort}>
                            <h3>{t("categories")}</h3>
                            {!data ? <h1>load</h1> :  data &&
                              data.products.result.map(
                                (subCategory, key) =>
                                  !!subCategory.product_types.length && (
                                    <Panel header={subCategory.title} key={key}>
                                      <ul>
                                        {subCategory.product_types.map(
                                          (productType, key) => (
                                            <li key={key}>
                                              <Checkbox
                                                name={productType.title}
                                                label={productType.title}
                                                parentClassName="d-flex flex-items-center"
                                                onChange={(e) =>
                                                  handleCheckboxSort(
                                                    e,
                                                    "product_type",
                                                    productType.id
                                                  )
                                                }
                                                checked={
                                                  checkboxesState &&
                                                  checkboxesState.product_type.includes(
                                                    productType.id.toString()
                                                  )
                                                }
                                              />
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </Panel>
                                  )
                              )}
                          </Collapse>
                        )}
                    </Panel>
                    <Panel header={t("manufacturers")} key="2">
                      {productsInfo &&
                        productsInfo.params &&
                        productsInfo.params.manufacturers && (
                          <div className={classes.productListSort}>
                            <h3>{t("manufacturers")}</h3>
                            <ul className={classes.p0}>
                              {productsInfo &&
                                productsInfo.params &&
                                productsInfo.params.manufacturers.map(
                                  (manufacturer, key) => (
                                    <li key={key}>
                                      <Checkbox
                                        name={manufacturer.title}
                                        label={manufacturer.title}
                                        onChange={(e) =>
                                          handleCheckboxSort(
                                            e,
                                            "manufacturer",
                                            manufacturer.id
                                          )
                                        }
                                        checked={
                                          checkboxesState &&
                                          checkboxesState.manufacturer.includes(
                                            manufacturer.id.toString()
                                          )
                                        }
                                      />
                                    </li>
                                  )
                                )}
                            </ul>
                          </div>
                        )}
                    </Panel>
                    <Panel header={t("price")} key="3">
                      <form className={classes.productListSort}>
                        <h3>{t("price")}</h3>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                          className="mb-10px"
                        >
                          <input
                            onChange={(e) =>
                              handleCostSort("min", e.target.value)
                            }
                            placeholder={t("category:min")}
                            type="text"
                            style={{
                              width: "100%",
                              height: "26px",
                              fontSize: "12px",
                              color: "#4F4F4F",
                              padding: "0px 10px",
                              marginRight: "10px",
                              border: "1px solid #828282",
                              borderRadius: "2px",
                            }}
                          />
                          <input
                            onChange={(e) =>
                              handleCostSort("max", e.target.value)
                            }
                            placeholder={t("category:max")}
                            type="text"
                            style={{
                              width: "100%",
                              height: "26px",
                              fontSize: "12px",
                              color: "#4F4F4F",
                              padding: "0px 10px",
                              border: "1px solid #828282",
                              borderRadius: "2px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "inline-flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <Button
                            text={t("category:apply")}
                            color="pink"
                            style={{
                              height: "30px",
                              width: "110px",
                              fontSize: "14px",
                            }}
                          />
                        </div>
                      </form>
                    </Panel>
                    <Panel header={t("rating")} key="4">
                      <h3>{t("rating")}</h3>
                      <ul className="p-1">
                        {[4, 3, 2, 1].map((id, key) => (
                          <li
                            key={key}
                            className={`${classes.stars}${
                              sortByStars.stars &&
                              sortByStars.stars === id.toString()
                                ? " " + classes.active
                                : ""
                            }`}
                            onClick={() => handleSortByStars(id.toString())}
                          >
                            <RatingStars
                              disabled
                              activeStars={id}
                              className="mr-10px"
                            />
                            <p>{t("category:higher")}</p>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.productListBody}>
            <div className={`${classes.productListSortWrapper} shadow`}>
              {/* NOTE: Perhaps add dynamic display of params by keys */}
              {productsInfo &&
                productsInfo.params &&
                productsInfo.params.subcategories &&
                !(
                  productsInfo.params.subcategories.length === 1 &&
                  productsInfo.params.subcategories[0].product_types.length ===
                    0
                ) && (
                  <div className={classes.productListSort}>
                    <h3>{t("categories")}</h3>
                    {productsInfo &&
                      productsInfo.params.subcategories.map(
                        (subCategory, key) =>
                          !!subCategory.product_types.length && (
                            <ul key={key}>
                              {subCategory.title}
                              {subCategory.product_types.map(
                                (productType, key) => (
                                  <li key={key}>
                                    <Checkbox
                                      name={productType.title}
                                      label={productType.title}
                                      onChange={(e) =>
                                        handleCheckboxSort(
                                          e,
                                          "product_type",
                                          productType.id
                                        )
                                      }
                                      checked={
                                        checkboxesState &&
                                        checkboxesState.product_type.includes(
                                          productType.id.toString()
                                        )
                                      }
                                    />
                                  </li>
                                )
                              )}
                            </ul>
                          )
                      )}
                  </div>
                )}
              {productsInfo &&
                productsInfo.params &&
                productsInfo.params.manufacturers &&
                productsInfo.params.manufacturers.length !== 0 && (
                  <div className={classes.productListSort}>
                    <h3>{t("manufacturers")}</h3>
                    <ul className={classes.p0}>
                      {productsInfo &&
                        productsInfo.params.manufacturers.map(
                          (manufacturer, key) => (
                            <li key={key}>
                              <Checkbox
                                name={manufacturer.title}
                                label={manufacturer.title}
                                onChange={(e) =>
                                  handleCheckboxSort(
                                    e,
                                    "manufacturer",
                                    manufacturer.id
                                  )
                                }
                                checked={
                                  checkboxesState &&
                                  checkboxesState.manufacturer.includes(
                                    manufacturer.id.toString()
                                  )
                                }
                              />
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                )}

              <div className={classes.productListSort}>
                <h3>{t("rating")}</h3>
                <ul className={classes.p0}>
                  {[4, 3, 2, 1].map((id, key) => (
                    <li
                      key={key}
                      className={`${classes.stars}${
                        sortByStars.stars && sortByStars.stars === id.toString()
                          ? " " + classes.active
                          : ""
                      }`}
                      onClick={() => handleSortByStars(id.toString())}
                    >
                      <RatingStars
                        disabled
                        activeStars={id}
                        className="mr-10px"
                      />
                      <p>{t("category:higher")}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                className={classes.productListSort}
                onSubmit={(e) => handleCostSort(e)}
              >
                <h3>{t("price")}</h3>
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  className="mb-10px"
                >
                  <input
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder={t("category:min")}
                    type="text"
                    value={minPrice}
                    style={{
                      width: "100%",
                      height: "26px",
                      fontSize: "12px",
                      color: "#4F4F4F",
                      padding: "0px 10px",
                      marginRight: "10px",
                      border: "1px solid #828282",
                      borderRadius: "2px",
                    }}
                  />
                  <input
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder={t("category:max")}
                    type="text"
                    defaultValue={maxPrice}
                    style={{
                      width: "100%",
                      height: "26px",
                      fontSize: "12px",
                      color: "#4F4F4F",
                      padding: "0px 10px",
                      border: "1px solid #828282",
                      borderRadius: "2px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    text={t("category:apply")}
                    color="pink"
                    type="submit"
                    style={{ height: "30px", width: "110px", fontSize: "14px" }}
                  />
                </div>
              </form>
            </div>
            <div className="w-100">
              {productsInfo &&
              productsInfo.params &&
              productsInfo.products.length === 0 ? (
                <div
                  className="d-flex flex-justify-center w-100 h-100"
                  style={{ marginTop: "5rem" }}
                >
                  (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ No products found. Please try to change
                  parameters. ✧ﾟ･: *ヽ(◕ヮ◕ヽ)
                </div>
              ) : (
                <>
                  <Grid items={productsInfo ? productsInfo.products : null} />
                  <div className={classes.productListPaginationWrapper}>
                    <Pagination
                      size="small"
                      current={parseInt(page)}
                      hideOnSinglePage
                      pageSize={pageSize}
                      total={productsInfo && productsInfo.count}
                      onChange={handlePaginationChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section
          className={`${container ? "container " : ""}${
            classes.productListContainer
          }`}
        >
          <div className={classes.productListHeader}>
            <HeadingSkeleton />
            <div className={classes.productListHeaderActions}>
              <span className="w-100">
                <TextSkeleton />
              </span>
              <div
                className={`d-flex flex-justify-end w-100 ${classes.productListHeaderSorting}`}
              >
                <TextSkeleton style={{ height: "28px" }} />
              </div>
              <div className={classes.productListSortingMobile}>
                <button>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.3299 0.857422H0.66991C0.21532 0.857422 -0.0685661 1.35283 0.159656 1.74805L4.47548 9.08457V13.5488C4.47548 13.8772 4.73895 14.1426 5.06552 14.1426H9.93426C10.2608 14.1426 10.5243 13.8772 10.5243 13.5488V9.08457L14.842 1.74805C15.0683 1.35283 14.7845 0.857422 14.3299 0.857422ZM9.19579 12.8066H5.80399V9.91211H9.19764V12.8066H9.19579ZM9.37391 8.4166L9.19764 8.72461H5.80214L5.62587 8.4166L1.94647 2.19336H13.0533L9.37391 8.4166Z"
                      fill="#E9456A"
                    />
                  </svg>
                  <span>{t("category:filters")}</span>
                </button>
                <div className={classes.productListSortingMobileCollapse}>
                  <Collapse
                    // expandIcon={({ isActive }) =>
                    //     <svg width="10" height="6" rotate={isActive ? 90 : 0} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //         <path d="M9.23242 0.55078L5.23242 4.55078L1.23242 0.55078" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round" />
                    //     </svg>
                    // }
                    expandIconPosition="right"
                    accordion
                  >
                    <Panel header={t("categories")} key="1">
                      {productsInfo &&
                        productsInfo.params &&
                        productsInfo.params.subcategories && (
                          <div className={classes.productListSort}>
                            <h3>{t("categories")}</h3>
                            {productsInfo &&
                              productsInfo.params.subcategories.map(
                                (subCategory, key) =>
                                  !!subCategory.product_types.length && (
                                    <ul key={key}>
                                      {subCategory.title}
                                      {subCategory.product_types.map(
                                        (productType, key) => (
                                          <li key={key}>
                                            <Checkbox
                                              name={productType.title}
                                              label={productType.title}
                                              parentClassName="d-flex flex-items-center"
                                              onChange={(e) =>
                                                handleCheckboxSort(
                                                  e,
                                                  "product_type",
                                                  productType.id
                                                )
                                              }
                                              checked={
                                                checkboxesState &&
                                                checkboxesState.product_type.includes(
                                                  productType.id.toString()
                                                )
                                              }
                                            />
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )
                              )}
                          </div>
                        )}
                    </Panel>
                    <Panel header={t("manufacturers")} key="2">
                      {productsInfo &&
                        productsInfo.params &&
                        productsInfo.params.manufacturers && (
                          <div className={classes.productListSort}>
                            <h3>{t("manufacturers")}</h3>
                            <ul className={classes.p0}>
                              {productsInfo &&
                                productsInfo.params &&
                                productsInfo.params.manufacturers.map(
                                  (manufacturer, key) => (
                                    <li key={key}>
                                      <Checkbox
                                        name={manufacturer.title}
                                        label={manufacturer.title}
                                        onChange={(e) =>
                                          handleCheckboxSort(
                                            e,
                                            "manufacturer",
                                            manufacturer.id
                                          )
                                        }
                                        checked={
                                          checkboxesState &&
                                          checkboxesState.manufacturer.includes(
                                            manufacturer.id.toString()
                                          )
                                        }
                                      />
                                    </li>
                                  )
                                )}
                            </ul>
                          </div>
                        )}
                    </Panel>
                    <Panel header={t("price")} key="3">
                      <form className={classes.productListSort}>
                        <h3>{t("price")}</h3>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                          className="mb-10px"
                        >
                          <input
                            onChange={(e) =>
                              handleCostSort("min", e.target.value)
                            }
                            placeholder={t("category:min")}
                            type="text"
                            style={{
                              width: "100%",
                              height: "26px",
                              fontSize: "12px",
                              color: "#4F4F4F",
                              padding: "0px 10px",
                              marginRight: "10px",
                              border: "1px solid #828282",
                              borderRadius: "2px",
                            }}
                          />
                          <input
                            onChange={(e) =>
                              handleCostSort("max", e.target.value)
                            }
                            placeholder={t("category:max")}
                            type="text"
                            style={{
                              width: "100%",
                              height: "26px",
                              fontSize: "12px",
                              color: "#4F4F4F",
                              padding: "0px 10px",
                              border: "1px solid #828282",
                              borderRadius: "2px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "inline-flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <Button
                            text={t("category:apply")}
                            color="pink"
                            style={{
                              height: "30px",
                              width: "110px",
                              fontSize: "14px",
                            }}
                          />
                        </div>
                      </form>
                    </Panel>
                    <Panel header={t("rating")} key="4">
                      <h3>{t("rating")}</h3>
                      <ul className="p-1">
                        {[4, 3, 2, 1].map((id, key) => (
                          <li
                            key={key}
                            className={`${classes.stars}${
                              sortByStars.stars &&
                              sortByStars.stars === id.toString()
                                ? " " + classes.active
                                : ""
                            }`}
                            onClick={() => handleSortByStars(id.toString())}
                          >
                            <RatingStars
                              disabled
                              activeStars={id}
                              className="mr-10px"
                            />
                            <p>{t("category:higher")}</p>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.productListBody}>
            <ProductListSortSkeleton
              className={classes.productListSortWrapper}
            />
            <div className="w-100">
              {productsInfo &&
              productsInfo.params &&
              productsInfo.products.length === 0 ? (
                "No products found with given params"
              ) : (
                <Grid items={null} style={{ marginBottom: "40px" }} />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductList;
