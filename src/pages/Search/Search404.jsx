import classes from './Search404.module.scss'
import page404 from '../../assets/img/404.png'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import Button from '../../components/Button/Button';

const Search404 = () => {
    const { t } = useTranslation();
    return (
        <div className={classes.search404}>
            <Header />
            <div className={classes.content404}>
                <div className="container d-flex flex-column flex-items-center">
                    <img src={page404} alt="404" />
                    <Button to='/' color='pink'>{t('goToHome')}</Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Search404
