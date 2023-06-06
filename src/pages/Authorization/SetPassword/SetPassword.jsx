import classes from './SetPassword.module.scss';

import {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import banner from '../../../assets/img/newpassword.png'
import logo from '../../../assets/logo.svg'

import {cleanPasswordReset, postSetPasswordReset, setLogin} from "../../../redux/profileReducer";
import {useTranslation} from "react-i18next";

const SetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {register, formState: {errors}, handleSubmit, watch} = useForm();
    const {t} = useTranslation();
    let passwordResetState = useSelector(state => state.profilePage.passwordResetState);

    const [localToken, setLocalToken] = useState(sessionStorage.getItem('resetToken'));

    let onSubmit = (data) => {
        dispatch(postSetPasswordReset(data));
    }

    if (!sessionStorage.getItem('resetToken')) {
        history.replace('/');
    }

    useEffect(() => {
        if (!localToken) {
            setLocalToken(sessionStorage.getItem('resetToken'));
        }

        return () => {
            sessionStorage.removeItem('resetToken');
            dispatch(cleanPasswordReset());
        };
    }, [dispatch, localToken]);

    useEffect(() => {
        if (passwordResetState && passwordResetState.status) {
            dispatch(setLogin(localToken));
            localStorage.setItem('Token', localToken);
            history.replace('/');
        }
    }, [dispatch, history, localToken, passwordResetState])

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
                            <h3>{t("forms:newPassword")}</h3>
                            <input className={errors.username && classes.error}
                                   {...register("password1", {required: true, minLength: 8})} type='password'/>

                            {errors.password1 && errors.password1.type === 'required' && `${t("forms:fillError")}`}
                            {errors.password1 && errors.password1.type !== 'required' && errors.password1.type === 'minLength' && `${t("forms:minPassword")}`}

                            <h3>{t("forms:repeatNewPassword")}</h3>
                            <input className={errors.password && classes.error}
                                   {...register("password2", {
                                       required: true,
                                       validate: value => value === watch('password1', '' || `${t("forms:passMismatch")}`)
                                   })} type='password'/>
                            {errors.password2 && errors.password2.type === 'required' && `${t("forms:fillError")}`}
                            {errors.password2 && errors.password2.type === 'validate' && `${t("forms:passMismatch")}`}
                            {/* {(errors.password2 && errors.password2.type !== 'validate') && errorReg && errorReg.password2 && 'Пароли не совпадают'} */}
                            <button type='submit'>{t("forms:save")}</button>
                            <div className={classes.signup}>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetPassword;
