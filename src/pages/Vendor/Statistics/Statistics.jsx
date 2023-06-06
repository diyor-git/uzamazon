import './Statistics.scss'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {Avatar, message, Progress, Upload} from 'antd';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Input from '../../../components/Input/Input';
import {getProfile, setPhotoProfile} from "../../../redux/profileReducer";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import banner from '../../../assets/img/cabinetBanner.png'
import Checkbox from "../../../components/Checkbox/Checkbox";
import productSimple from '../../../assets/img/categoryPreviewDefault.png'
import Card from "../../../components/Card/Card";
import DatePicker from "../../../components/Input/DatePicker";

const Statistics = () => {
    let history = useHistory();
    let login = useSelector(state => state.profilePage.login.token);
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const {
        control,
    } = useForm({});
    const profile = useSelector(state => state.profilePage)


    useEffect(() => {
        if (!login) {
            history.push('/login')
        }
    }, [])


    return (
        <div>
            <Header/>
            <div className="cabinetBanner">
                <img src={banner} alt="Banner"/>
            </div>
            <div className="container">
                <div className='statistics mt-70px'>
                    <div className='profile_data mt-30px'>
                        <div className='d-flex flex-column flex-items-center avatar-wrapper'>
                            <Card linkTo={`/product/`}
                                  image={productSimple}
                                  price='12'
                                  title='INNERNEED Soft Silicone Face Brush '
                                  activeStars='3'
                            />
                        </div>
                        <div className="sale">
                            <h2 className='bold-48px color-dark-blue'>Статистика продаж </h2>
                            <div className="statisticsContainer">
                                <div className="progressBar">
                                    <Progress type="dashboard" strokeWidth={15} strokeLinecap="square" className='progress'
                                              width={220} percent={70} gapDegree={0}/>
                                    <div className="sold">
                                        <p>Товаров продано:</p><span>400</span>
                                    </div>
                                    <div className="loaded">
                                        <p>Товаров загружено:</p><span>8000</span>
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
                        </div>

                            </div>
                        </div>
                    </div>
            <Footer/>
        </div>
    )
}

export default Statistics