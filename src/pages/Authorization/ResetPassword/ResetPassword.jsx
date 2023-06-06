import classes from './ResetPassword.module.scss'

import {useEffect, useState} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";

import banner from '../../../assets/img/resetPassword.png'
import logo from '../../../assets/logo.svg'

import PhoneNumberInput from '../../../components/Input/PhoneNumberInput';

import {cleanPasswordReset, postPasswordReset} from "../../../redux/profileReducer";
import {useTranslation} from "react-i18next";


const ResetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {formState: {errors}, control, handleSubmit} = useForm();
    const {t} = useTranslation();
    let token = useSelector(state => state.profilePage.login.token);

    let passwordResetState = useSelector(state => state.profilePage.passwordResetState);

    const [username, setUsername] = useState('');

    let onSubmit = (data) => {
        if (data.username.charAt(0) === '+') {
            data.username = data.username.slice(1);
        }
        setUsername(data.username);
        dispatch(postPasswordReset(data));

    }

    useEffect(() => {
        if (passwordResetState && passwordResetState.status) {
            history.replace({
                pathname: '/reset-password/code',
                state: {username: username}
            });
        }
    }, [history, username, passwordResetState])

    useEffect(() => {
        return () => {
            dispatch(cleanPasswordReset())
        };
    }, [dispatch]);

    if (token) {
        history.replace('/')
    }

    return (
        <div className={classes.loginPage}>
            <div className={classes.bannerWrapper}>
                <div className={classes.banner} style={{backgroundImage: `url(${banner})`}}/>
            </div>
            <div className={classes.loginWrapper}>
                <div className={classes.loginContainer}>
                    <div className={classes.title}>
                        <h2>{t("forms:passwordTitle")}</h2>
                        <Link to='/'>
                            <img src={logo} className='user-select-none user-drag-none'  alt="Logo"/>
                        </Link>
                    </div>

                    <div className={classes.loginForm}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3>{t("forms:phoneChangePassword")}</h3>
                            <Controller
                                render={({field}) =>
                                    <PhoneNumberInput {...field} type='tel'
                                                      className={(errors.username || (passwordResetState && !passwordResetState.status)) && classes.error}/>
                                }
                                name={'username'}
                                control={control}
                                rules={{required: true}}
                            />
                            <span>
                                {errors.username && errors.username.type === 'required' && `${t("forms:fillError")}`}
                                {!errors.username && passwordResetState && !passwordResetState.status && passwordResetState.message && passwordResetState.message}
                            </span>
                            <button className='mb-10px' type='submit'>{t("forms:changePassword")}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
