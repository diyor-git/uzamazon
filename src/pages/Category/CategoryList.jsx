import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import categoryPreviewDefault from "../../assets/img/categoryPreviewDefault.png";


const CategoryList = () => {
    

  const { t } = useTranslation();
  const categoryListState = useSelector(
    (state) => state.categoryPage.categoryList
  );


  return (
    <div className="main-categories">
      {categoryListState &&
        categoryListState.slice(0, 5).map((category) => (
          <Link
            to={`/category/${category.slug}`}
            className="category-card"
            key={category.id}
          >
            <div
              className="category-preview"
              style={{
                backgroundImage: `url(${
                  category.preview || categoryPreviewDefault
                })`,
                backgroundSize: "cover",
              }}
            />
            <div className="category-card-body">
              <h2>{category.title}</h2>
              <span>
                {category.count > 1 &&
                  `${t("main:more")} ${category.count} ${t("main:products")}`}
                {category.count === 1 &&
                  `${t("main:more")} ${category.count} ${t("main:product")}`}
                {category.count === 0 && `${t("main:noProducts")}`}
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default CategoryList;
