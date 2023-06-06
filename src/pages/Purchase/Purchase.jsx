import {useEffect, useState} from 'react';
import {Redirect, useHistory} from "react-router";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {Avatar} from 'antd';

import classes from './Purchase.module.scss'
import Header from "../../components/Header/Header"
import Footer from '../../components/Footer/Footer'
import Radio from '../../components/Radio/Radio';
import PhoneNumberInput from "../../components/Input/PhoneNumberInput";
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';


import {getProfile} from '../../redux/profileReducer';
import {getCartDetail, getCartLength} from "../../redux/productReducer";
import {createOrder, initOrder} from "../../redux/orderReducer";
import {useTranslation} from "react-i18next";

const Purchase = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const profile = useSelector(state => state.profilePage)
    let totalSum = useSelector(state => state.productPage.cartDetail.sum)
    const orderInitListState = useSelector(state => state.orderPage.orderInitList)
    const cartLength = useSelector(state => state.productPage.cartLength)
    const productState = useSelector(state => state.productPage.buySingleProductDetail)

    const [orderInitList, setOrderInitList] = useState(null);

    const {register, control, formState: {errors}, handleSubmit, setValue} = useForm();

    const onSubmit = (data) => {
        dispatch(createOrder(data));
        dispatch(getCartLength());

        // Should redirect to the payment page
        history.push('/profile');
    }

    const paymentMethods = [
        {title: `${t("purchase:cash")}`},
        {title: 'Oson'},
        {title: 'Click'},
        {title: 'PayMe'}
    ]

    // const [propfile, set Profile] = useState('');

    useEffect(() => {
        dispatch(getProfile());
        dispatch(getCartDetail());
        dispatch(initOrder());

        setValue('payment_type', '1');


        // setValue(totalSum);
    }, [dispatch, setValue]);

    useEffect(() => {
        setOrderInitList(orderInitListState);
        if (orderInitListState) {
            setValue('city', orderInitListState.address.city)
            setValue('district', orderInitListState.address.district)
            setValue('street', orderInitListState.address.street)
            setValue('house_number', orderInitListState.address.house_number)
            setValue('apartment', orderInitListState.address.apartment)
        }
    }, [setValue, orderInitListState])

    useEffect(() => {
    }, [productState])

    return ((cartLength === 0 && !productState) ? <Redirect to='/cart'/> :
            <>
                <Header/>
                <div className='mt-70px container'>
                    <div className={classes.purchase}>
                        <div className={classes.avatar}>
                            <div className={classes.avatar_block}>
                                <h1>{t("purchase:personalData")}</h1>
                                <Avatar size={{xs: 110, sm: 157, md: 157, lg: 157, xl: 172, xxl: 172}}
                                        src={profile.profile && profile.profile.avatar} className='mb-30px'
                                        icon={<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M216.5 110C216.5 168.818 168.818 216.5 110 216.5C51.1817 216.5 3.5 168.818 3.5 110C3.5 51.1816 51.1816 3.5 110 3.5C168.818 3.5 216.5 51.1817 216.5 110Z"
                                                fill="white" stroke="#EBEBEB" strokeWidth="7"/>
                                            <path opacity="0.3" fillRule="evenodd" clipRule="evenodd"
                                                  d="M110 123.728C91.6729 123.728 55.0879 132.925 55.0879 151.184V164.912H164.912V151.184C164.912 132.925 128.327 123.728 110 123.728ZM110 110C125.169 110 137.456 97.7132 137.456 82.5438C137.456 67.3744 125.169 55.0879 110 55.0879C94.8304 55.0879 82.5438 67.3744 82.5438 82.5438C82.5438 97.7132 94.8304 110 110 110Z"
                                                  fill="#BCBCBC"/>
                                        </svg>}/>
                            </div>
                            <div className={classes.userInfo}>
                                <div className={`${classes.inputGroup} ${classes.mt0}`}>
                                    <label>
                                        {t("forms:name")}
                                    </label>
                                    <input disabled value={`${profile.first_name}`}/>
                                </div>
                                <div className={classes.inputGroup}>
                                    <label>
                                        {t("forms:phone")}
                                    </label>
                                    <PhoneNumberInput borderRadius='3' disabled value={`+${profile.username}`}/>
                                </div>
                                <Button to='/profile' color='pink'
                                        className='mt-40px'>{t("purchase:changeData")}</Button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            <div className={classes.city}>
                                <div className={`${classes.inputGroup} ${classes.required} ${classes.mt0}`}>
                                    <Controller
                                        render={({field: {value, onChange}, fieldState: {error}}) =>
                                            <Select
                                                label={t("purchase:city")}
                                                options={[
                                                    {value: 'Tashkent', label: 'Tashkent'},
                                                ]}
                                                svgClassName='stroke-grey-3'
                                                defaultValue={{value: orderInitList && orderInitList.address.city}}
                                                className='w-100 bc-grey-4 h-40px'
                                                error={error}
                                                onChange={(e) => setValue(e.value)}
                                            />
                                        }
                                        name={'city'}
                                        control={control}
                                        rules={{required: true}}
                                    />
                                </div>
                                <div className={`${classes.inputGroup} ${classes.required}`}>
                                    <label>
                                        {t("purchase:district")}
                                    </label>
                                    <input {...register('district', {required: true})}
                                           style={errors.district && {borderColor: 'red'}}/>
                                </div>
                                <div className={`${classes.inputGroup} ${classes.required}`}>
                                    <label>
                                        {t("purchase:street")}
                                    </label>
                                    <input {...register('street', {required: true})}
                                           style={errors.district && {borderColor: 'red'}}/>
                                </div>
                                <div className={`${classes.inputGroup} ${classes.required}`}>
                                    <label>
                                        {t("purchase:house")}
                                    </label>
                                    <input {...register('house_number', {required: true})}
                                           style={errors.district && {borderColor: 'red'}}/>
                                </div>
                                <div className={classes.inputGroup}>
                                    <label>
                                        {t("purchase:apartments")}
                                    </label>
                                    <input {...register('apartment')} />
                                </div>
                            </div>
                            <div className={classes.paymentMethodWrapper}>
                                <h1>{t("purchase:paymentMethod")}</h1>
                                <div className={classes.paymentMethod}>
                                    <Radio items={paymentMethods} name='payment-method'
                                           defaultChecked={t("purchase:cash")} {...register('payment_type')}/>
                                    <div className={classes.textareaGroup}>
                                        <label className='roman-18px color-dark-blue'>{t("purchase:comment")}</label>
                                        <textarea name="orderComments" {...register('comment')} />
                                    </div>
                                    <div className={classes.totalAmount}>
                                        {t("purchase:orderPrice")}<span>{`$${productState ? productState : totalSum ? totalSum : 0}`}</span>
                                    </div>
                                    <button type='submit'>{t("purchase:pay")}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </>
    )
}

export default Purchase
