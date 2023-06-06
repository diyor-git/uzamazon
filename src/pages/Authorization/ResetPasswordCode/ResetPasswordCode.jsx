import classes from './ResetPasswordCode.module.scss'

import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";

import {cleanPasswordReset, postPasswordResetCode} from '../../../redux/profileReducer';

import banner from '../../../assets/img/resetPasswordCode.png'
import logo from '../../../assets/logo.svg'
import {useTranslation} from "react-i18next";

const ResetPasswordCode = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {register, formState: {errors}, handleSubmit, setValue} = useForm();
    const {t} = useTranslation();
    let passwordResetState = useSelector(state => state.profilePage.passwordResetState);

    useEffect(() => {
        if (history.location.state && history.location.state.username) {
            setValue('username', history.location.state.username);
        } else {
            history.push('/')
        }

        return () => {
            dispatch(cleanPasswordReset());
        }
    }, [dispatch, history, setValue]);

    useEffect(() => {
        if (passwordResetState && passwordResetState.token) {
            sessionStorage.setItem('resetToken', passwordResetState.token);
            history.replace({
                pathname: '/reset-password/set-password',
                state: {username: history.location.state.username}
            });

            // NOTE, BUG, ISSUE: Auto-login Security Issue
        }
    }, [history, passwordResetState])

    let onSubmit = (data) => {
        dispatch(postPasswordResetCode(data));
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
                            <h3>{t("forms:passwordTitle")}</h3>
                            <input type='number'
                                   className={(errors.code || passwordResetState.status === false) && classes.error} {...register("code", {
                                required: true,
                                maxLength: 5,
                                minLength: 5
                            })} />
                            <span className={classes.error}>
                                {errors.code && errors.code.type === 'required' && 'Пожалуйста заполните это поле'}
                                {((errors.code && (errors.code.type === 'maxLength' || errors.code.type === 'minLength'))) && 'Пожалуйста введите 5-значный пароль'}
                                {((!errors.code && passwordResetState.status === false && 'Неверный код'))}
                            </span>
                            <button type='submit'>{t("forms:changePassword")}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordCode
