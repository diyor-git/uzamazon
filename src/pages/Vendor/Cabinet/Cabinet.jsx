import './Cabinet.scss'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {Avatar, message, Progress, Upload} from 'antd';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import DatePicker from '../../../components/Input/DatePicker';
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import banner from '../../../assets/img/categoryBannerDefault.png'
import Grid from "../../../components/Grid/Grid";
import {getCabinet, getTotalStatistics, updatePhotoCabinet} from "../../../redux/vendorsReducer";

const Cabinet = () => {
    let history = useHistory();
    let login = useSelector(state => state.profilePage.login.token);
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const cabinet = useSelector(state => state.vendorsPage.cabinet)
    const statistics = useSelector(state => state.vendorsPage.totalStatistics)
    let sentRequest = useSelector(state => state.profilePage.login.sent_request)
    let verified = useSelector(state => state.profilePage.login.verified)
    const {
        control,
    } = useForm({});
    const upload = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        name: 'file',
        multiple: false,
        customRequest: (file) => {
            message.info(`${file.file.name} фото отправляется`)
            dispatch(updatePhotoCabinet(file.file)).then(() => {
                dispatch(getCabinet())
                message.success(`${file.file.name} фото загрузилось`)
            })
        }
    };
    useEffect(() => {
        dispatch(getCabinet())
        dispatch(getTotalStatistics())
    }, [])

    useEffect(() => {
        if (!login) {
            history.push('/login')
        } else if (sentRequest && !verified) {
            history.push('/become-vendor')
        } else if (!sentRequest && !verified) {
            history.push('/become-vendor')
        }
    }, [])

    return (
        <div>
            <Header/>
            <div className="cabinetBanner">
                <img src={banner} alt="Banner"/>
            </div>
            <div className="container">
                <div className='cabinetPage mt-70px'>
                    <h2 className='bold-48px color-dark-blue'>Личный кабинет {cabinet.title}</h2>
                    <div className='profile_data mt-30px'>
                        <div className='d-flex flex-column flex-items-center avatar-wrapper'>
                            <Avatar
                                draggable={false}
                                size={{xs: 110, sm: 150, md: 150, lg: 150, xl: 150, xxl: 220}}
                                icon={<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M216.5 110C216.5 168.818 168.818 216.5 110 216.5C51.1817 216.5 3.5 168.818 3.5 110C3.5 51.1816 51.1816 3.5 110 3.5C168.818 3.5 216.5 51.1817 216.5 110Z"
                                        fill="white" stroke="#EBEBEB" strokeWidth="7"/>
                                    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd"
                                          d="M110 123.728C91.6729 123.728 55.0879 132.925 55.0879 151.184V164.912H164.912V151.184C164.912 132.925 128.327 123.728 110 123.728ZM110 110C125.169 110 137.456 97.7132 137.456 82.5438C137.456 67.3744 125.169 55.0879 110 55.0879C94.8304 55.0879 82.5438 67.3744 82.5438 82.5438C82.5438 97.7132 94.8304 110 110 110Z"
                                          fill="#BCBCBC"/>
                                </svg>}
                                src={cabinet && cabinet.avatar}
                            />
                            <Upload {...upload}>
                                <p className='uploadBtn'>{t("profile:changePhoto")}</p>
                            </Upload>
                        </div>
                        <div className="forms">
                            <h4>Описание:</h4>
                            <textarea cols="30" rows="10" value={cabinet.description}/>
                            <button>Сохранить изменения</button>
                        </div>
                    </div>
                    <section className='statistics'>
                        <h2 className='bold-48px color-dark-blue'>Статистика продаж</h2>
                        <div className="statisticsContainer">
                            <div className="progressBar">
                                <Progress type="dashboard" strokeWidth={15} strokeLinecap="square" className='progress'
                                          width={220} percent={statistics.sold / statistics.load * 100} gapDegree={0}/>
                                <div className="all">
                                    <p>Товаров всего:</p><span>{statistics.all}</span>
                                </div>
                                <div className="sold">
                                    <p>Товаров продано:</p><span>{statistics.sold}</span>
                                </div>
                                <div className="loaded">
                                    <p>Товаров загружено:</p><span>{statistics.load}</span>
                                </div>
                            </div>
                            <div className="date">
                                <Controller
                                    render={({field: {value, onChange}, fieldState: {error}}) => (
                                        <DatePicker
                                            noShadow
                                            borderRadius='3'
                                            label='С:'
                                            name={'from'}
                                            error={error}
                                            defaultValue={value ? value : false}
                                            parentClassName='dateInput'
                                            onChange={onChange}
                                            disabledDate='future'
                                        />
                                    )}
                                    name={'from'}
                                    control={control}
                                    rules={{required: true}}
                                />
                                <Controller
                                    render={({field: {value, onChange}, fieldState: {error}}) => (
                                        <DatePicker
                                            noShadow
                                            borderRadius='3'
                                            label='По:'
                                            name={'to'}
                                            error={error}
                                            defaultValue={value ? value : false}
                                            parentClassName='dateInput'
                                            onChange={onChange}
                                            disabledDate='future'
                                        />
                                    )}
                                    name={'to'}
                                    control={control}
                                    rules={{required: true}}
                                />
                            </div>
                        </div>
                    </section>
                    <section className="products">
                        <h2 className='bold-48px color-dark-blue'>Мои товары</h2>
                        <Grid/>
                        <div className="import">
                            <button className='pinkBtn'>Импорт таблицы</button>
                            <button>Загрузить товары</button>
                        </div>
                    </section>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Cabinet