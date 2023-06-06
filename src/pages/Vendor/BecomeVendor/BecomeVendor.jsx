import './BecomeVendor.scss'
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import banner from '../../../assets/img/cabinetBanner.png'
import {Link, useHistory} from 'react-router-dom'
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getCabinet, getTotalStatistics} from "../../../redux/vendorsReducer";

const BecomeVendor = () => {
    let history = useHistory()
    let login = localStorage.getItem("Token")
    let sentRequest = useSelector(state => state.profilePage.login.sent_request)
    let verified = useSelector(state => state.profilePage.login.verified)
    useEffect(() => {
        if (sentRequest && !verified) {
            history.push('/create-cabinet')
        } else if (sentRequest && verified) {
            history.push('/cabinet')
        }
    }, [])

    return (
        <div>
            <Header/>
            <div className="cabinetBanner">
                <img src={banner} alt="Banner"/>
            </div>
            <div className="container">
                <div className='becomeVendor mt-70px'>
                    <h2 className='bold-48px color-dark-blue'>Вендорство на Kadabra</h2>
                    <p>По мнению ведущих маркетологов, бытовой подряд стабилизирует бюджет на размещение. До недавнего
                        времени считалось, что стимулирование сбыта конструктивно. Аналогия закона изменяет коллективный
                        направленный маркетинг. Анализ зарубежного опыта обуславливает медиамикс. Жизненный цикл
                        продукции, конечно, одновременно гарантирует обычай делового оборота, учитывая результат
                        предыдущих медиа-кампаний. По мнению ведущих маркетологов, бытовой подряд стабилизирует бюджет
                        на размещение. До недавнего времени считалось, что стимулирование сбыта конструктивно. Аналогия
                        закона изменяет коллективный направленный маркетинг. Анализ зарубежного опыта обуславливает
                        медиамикс. Жизненный цикл продукции, конечно, одновременно гарантирует обычай делового оборота,
                        учитывая результат предыдущих медиа-кампаний.</p>
                    <div className="buttons">
                        <Link to='/create-cabinet'>
                            <button>Стать вендором</button>
                        </Link>
                        <button className='pinkBtn'>Назад</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default BecomeVendor