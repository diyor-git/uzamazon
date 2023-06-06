import './Footer.scss';
import logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";
import Telegram from '../../assets/img/telegram.svg'
import Phone from '../../assets/img/phone.svg'
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation ();
    return (
        <footer>
            <div className='container footer-inner'>
                <div className='d-flex flex-justify-between flex-items-center'>
                    <div className='d-flex flex-items-center'>
                        <Link to='/' className='footer-brand'>
                            <img src={logo} alt='Kadabra' className='user-select-none user-drag-none' />
                        </Link>
                    </div>
                    <div className='d-flex flex-items-center footer-icons'>
                        <a href="tel:+99890 123 45 67"><img src={Phone} alt="Phone" /></a>
                        <a target='_blank' rel="noreferrer" href="https://t.me/uzAmazonDelivery"><img src={Telegram} alt="Telegram" /></a>
                    </div>
                </div>
                <nav>
                    <ul className='d-flex flex-row flex-justify-center'>
                        <li>
                            <Link to='/'>
                                {t("contacts")}
                            </Link>
                        </li>
                        <span className='vert-line' />
                        <li>
                            <Link to={{ pathname: 'https://t.me/uzAmazonDelivery' }} target="_blank">
                                {t("telegramChanel")}
                            </Link>
                        </li>
                        <span className='vert-line' />
                        <li>{t("offer")}</li>
                    </ul>
                    <span>
                        <a href="tel:+99890 123 45 67"> +99890 123 45 67</a>
                    </span>
                </nav>
            </div>
        </footer>
    )
}
export default Footer;
