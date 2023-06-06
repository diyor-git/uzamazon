import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'antd/dist/antd.css';
import React, {Suspense, useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Main from './pages/Main/Main';
import Search404 from "./pages/Search/Search404";
import Search from "./pages/Search/Search";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";
import Cart from "./pages/Cart/Cart";
import Purchase from "./pages/Purchase/Purchase";
import Preloader from "./components/Preloader/Preloader";
import {getStatus, setToken} from "./redux/profileReducer";
import './i18n';
import BestOfMonth from "./pages/BestOfMonth/BestOfMonth";
import Cabinet from "./pages/Vendor/Cabinet/Cabinet";
import CreateCabinet from "./pages/Vendor/CreateCabinet/CreateCabinet";
import BecomeVendor from "./pages/Vendor/BecomeVendor/BecomeVendor";
import {Manufacturer} from "./pages/Manufacturer/Manufacturer";
import UploadProduct from "./pages/Vendor/UploadProduct/UploadProduct";
import Statistics from "./pages/Vendor/Statistics/Statistics";

const Login = React.lazy(() => import('./pages/Authorization/Login/Login'));
const SignUp = React.lazy(() => import('./pages/Authorization/SignUp/SignUp'));
const SignUpConfirm = React.lazy(() => import('./pages/Authorization/SignUpConfirm/SignUpConfirm'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const ResetPasswordCode = React.lazy(() => import('./pages/Authorization/ResetPasswordCode/ResetPasswordCode'));
const ResetPassword = React.lazy(() => import('./pages/Authorization/ResetPassword/ResetPassword'));
const SetPassword = React.lazy(() => import('./pages/Authorization/SetPassword/SetPassword'));

/* Add Lazy loading to Order page */

function App() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.profilePage.login.token)

    useEffect(() => {
        dispatch(setToken(localStorage.getItem('Token')))
        dispatch(getStatus())
    }, [])

    return (
        <Router>
            <Suspense fallback={<Preloader/>}>
                <Switch>

                    {/* Auth Routes */}
                    <Route exact path="/login"><Login/></Route>
                    <Route exact path="/signup"><SignUp/></Route>
                    <Route exact path="/signup/confirm"><SignUpConfirm/></Route>
                    <Route exact path="/reset-password"><ResetPassword/></Route>
                    <Route exact path="/reset-password/code"><ResetPasswordCode/></Route>
                    <Route exact path="/reset-password/set-password"><SetPassword/></Route>

                    {/* Routes with ProductList */}
                    <Redirect exact from="/category" to='/'/>
                    <Route exact path="/category/:categoryName"><Category/></Route>
                    <Route exact path="/manufacturer/:manufacturerName"><Manufacturer/></Route>
                    <Route exact path="/best"><BestOfMonth/></Route>

                    <Route exact path="/search"><Search/></Route>

                    {/* Product Routes */}
                    <Redirect exact from="/product" to='/'/>
                    <Route exact path="/product/:name?"><Product/></Route>

                    {/* Cart Routes */}
                    <Route exact path="/cart"><Cart/></Route>

                    {/* Purchase Routes */}
                    <Route exact path="/purchase" render={({location}) => (
                        token ? <Purchase/> :
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {from: location}
                                }}/>
                    )}/>

                    {/* Profile Routes */}
                    <Route exact path="/profile"><Profile/></Route>

                    {/*Vendor Routes*/}
                    <Route exact path="/cabinet"><Cabinet/></Route>
                    <Route exact path="/create-cabinet"><CreateCabinet/></Route>
                    <Route exact path="/become-vendor"><BecomeVendor/></Route>
                    <Route exact path="/upload-product"><UploadProduct/></Route>
                    <Route exact path="/product/:name?/statistics"><Statistics/></Route>

                    {/* Home Route */}
                    <Route exact path="/"><Main/></Route>

                    {/* 404 Route */}
                    <Route exact path="*"><Search404/></Route>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
