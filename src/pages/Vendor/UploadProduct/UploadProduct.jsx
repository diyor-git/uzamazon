import './UploadProduct.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Avatar, message, Upload } from 'antd';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Input from '../../../components/Input/Input';
import { getProfile, setPhotoProfile } from "../../../redux/profileReducer";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import banner from '../../../assets/img/cabinetBanner.png'
import Checkbox from "../../../components/Checkbox/Checkbox";
import productSimple from '../../../assets/img/categoryPreviewDefault.png'
import { CategoriesBlock } from '../../../components/CategoriesBlock/CategoriesBlock'
const UploadProduct = () => {
    let history = useHistory();
    let login = useSelector(state => state.profilePage.login.token);
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const {
        control,
    } = useForm({});
    // const porducts = useSelector(state => state.profilePage)
    const profile = useSelector(state => state.profilePage)

    const upload = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        name: 'file',
        multiple: false,
        customRequest: (file) => {
            message.info(`${file.file.name} фото отправляется`)
            dispatch(setPhotoProfile(file.file)).then(() => {
                dispatch(getProfile())
                message.success(`${file.file.name} фото загрузилось`)
            })
        }
    };

    useEffect(() => {
        if (!login) {
            history.push('/login')
        }
    }, [])

    const categoriesData = [
        {
            header: 'Категории',
            subcategories: [
                {
                    header: 'Одежда и аксессуары',
                    items: [
                        {
                            header: 'Женская',
                            checkboxes: ['Футболки', 'Топы', 'Куртки', 'Брюки']
                        },
                        {
                            header: 'Мужское',
                            checkboxes: ['Футболки', 'Топы', 'Куртки', 'Брюки']
                        }
                    ]

                },
                {
                    header: 'Электроника',
                    checkboxes: ['Футболки', 'Топы', 'Куртки', 'Брюки']
                },
            ],
        },
    ]


    return (
        <div>
            <Header />
            <div className="cabinetBanner">
                <img src={banner} alt="Banner" />
            </div>
            <div className="container">
                <div className='uploadProduct mt-70px'>
                    <h2 className='bold-48px color-dark-blue'>Загрузка товара</h2>
                    <div className='profile_data mt-30px'>
                        <div className='d-flex flex-column flex-items-center avatar-wrapper'>
                            <Avatar
                                shape="square"
                                draggable={false}
                                size={{ xs: 110, sm: 150, md: 150, lg: 150, xl: 150, xxl: 220 }}
                                src={(profile.profile && profile.profile.avatar) || productSimple}
                            />
                            <Upload {...upload}>
                                <p className='uploadBtn'>Изменить фото товара</p>
                            </Upload>
                        </div>

                        <div className="forms">
                            <div className="info">
                                <h4>Общая информация:</h4>
                                <div className="info-container">
                                    <div className="name">
                                        <Controller
                                            render={({ field, fieldState: { error } }) =>
                                                <Input type='text' noShadow borderRadius='2' error={error} {...field}
                                                    className='input'
                                                    label='Название товара:' placeholder='Введите название товара'
                                                />
                                            }
                                            name={'name'}
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                        <Controller
                                            render={({ field, fieldState: { error } }) =>
                                                <Input type='number' noShadow borderRadius='2' error={error} {...field}
                                                    className='input'
                                                    label='Цена (в долларах):' placeholder='Введите цену '
                                                />
                                            }
                                            name={'phone'}
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                    </div>
                                    <div className="site">
                                        <Controller
                                            render={({ field, fieldState: { error } }) =>
                                                <Input type='number' noShadow borderRadius='2' error={error} {...field}
                                                    className='input'
                                                    label='Количество:' placeholder='Введите количество'
                                                />
                                            }
                                            name={'site'}
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                        <Controller
                                            render={({ field, fieldState: { error } }) =>
                                                <Input type='text' noShadow borderRadius='2' error={error} {...field}
                                                    className='input'
                                                    label='Ссылка на аккаунт в Instagram:' placeholder='www.companyname.uz'
                                                />
                                            }
                                            name={'instagram'}
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text">
                                <h4>Описание:</h4>
                                <textarea cols="30" rows="10" />
                            </div>
                            <div className="characteristics">
                                <h4>Характеристики товара:</h4>
                                <textarea cols="30" rows="10" />
                                <Controller
                                    render={({ field }) =>
                                        <Checkbox
                                            {...field}>
                                            {t("forms:disclaimer")}
                                        </Checkbox>
                                    }
                                    name={'checkbox'}
                                    control={control}
                                    rules={{ required: true }}
                                />
                                <button>Загрузить товар</button>
                            </div>
                        </div>
                    </div>
                </div>
                <CategoriesBlock data={categoriesData} />
            </div>
            <Footer />
        </div>
    )
}

export default UploadProduct