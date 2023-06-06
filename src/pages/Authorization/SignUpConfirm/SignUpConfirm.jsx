import classes from './SignUpConfirm.module.scss'

import {useState, useEffect} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import banner from '../../../assets/img/signup_banner2.png'
import logo from '../../../assets/logo.svg'

import {getStatus, tokenAcc} from "../../../redux/profileReducer";
import {useTranslation} from "react-i18next";

const SignUpConfirm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {t} = useTranslation();
    const {register, formState: {errors}, handleSubmit, setValue} = useForm();

    let token = useSelector(state => state.profilePage.login.token)

    const [codeError, setCodeError] = useState('');

    const onSubmit = data => {
        dispatch(tokenAcc(data)).then(({data, error}) => {
            if (data) {
                dispatch(getStatus())
                localStorage.setItem('Verified', data.verified);
            }
            setCodeError(error)
        })
    }
    
    useEffect(() => {
        if (history.location.state && history.location.state.username) {
            setValue('username', history.location.state.username);
        } 
    }, [history, setValue]);

    return (
        token ? <Redirect exact to=''/> :
            <div className={classes.loginPage}>
                <div className={classes.bannerWrapper}>
                    <div className={classes.banner} style={{backgroundImage: `url(${banner})`}}/>
                </div>
                <div className={classes.loginWrapper}>
                    <div className={classes.loginContainer}>
                        <div className={classes.title}>
                            <h2>{t("registration")}</h2>
                            <Link to='/'>
                                <img src={logo} className='user-select-none user-drag-none'  alt="Logo"/>
                            </Link>
                        </div>
                        <div className={classes.loginForm}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h3>{t("forms:code")}</h3>
                                <input type='number'
                                       className={(errors.code || codeError.message === 'Code is incorrect') && classes.error} {...register("code", {
                                    required: true,
                                    maxLength: 5,
                                    minLength: 5
                                })} />
                                <span className={classes.error}>
                                    {errors.code && errors.code.type === 'required' && `${t("forms:fillError")}`}
                                    {((errors.code && (errors.code.type === 'maxLength' || errors.code.type === 'minLength')) || codeError.message === 'Code is incorrect') && 'Неверный код'}
                                </span>
                                <button type='submit'>{t("registration")}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SignUpConfirm
