import React, {useEffect} from 'react';
import './App.scss';
import {Route, Routes, useNavigate} from "react-router-dom";
import {
    ABOUT_PAGE_ROUTE,
    CART_PAGE_ROUTE, CONTACTS_PAGE_ROUTE, FINISHED_PAGE_ROUTE,
    MAIN_PAGES_ROUTE, ORDER_PAGE_ROUTE, PC_PAGE_ROUTE, PROFILE_PAGE_ROUTE, SHOP_PAGE_ROUTE,
    SIGN_IN_ROUTE, SIGN_UP_ROUTE
} from "./Utils/Routes";
import SignIn from "./Pages/SIgnIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import MainPage from "./Pages/MainPage/MainPage";
import Header from "./Components/Header/Header";
import CartPage from "./Pages/CartPage/CartPage";
import ContactsPage from "./Pages/ContactsPage/ContactsPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import FinishedPage from "./Pages/FinishedPage/FinishedPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PCPage from "./Pages/PCPage/PCPage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import Layout from "./Components/Layout/Layout";

function App() {
    let navigator = useNavigate()
    useEffect(()=>{
        navigator(SHOP_PAGE_ROUTE)
    }, [])
  return (
    <div className="App">
       
      <Routes>
          <Route path="/">

            <Route path={MAIN_PAGES_ROUTE} element={<Layout/>}>
                <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
                <Route path={SIGN_UP_ROUTE} element={<SignUp/>} />
                <Route path={SHOP_PAGE_ROUTE} index element={<MainPage/>} />
                <Route path={CART_PAGE_ROUTE} element={<CartPage/>} />
                <Route path={PC_PAGE_ROUTE} element={<PCPage/>} />
                <Route path={CONTACTS_PAGE_ROUTE} element={<ContactsPage/>} />
                <Route path={ABOUT_PAGE_ROUTE} element={<AboutPage/>} />
                <Route path={ORDER_PAGE_ROUTE} element={<OrderPage/>} />
                <Route path={FINISHED_PAGE_ROUTE} element={<FinishedPage/>} />
                <Route path={PROFILE_PAGE_ROUTE} element={<ProfilePage/>} />
            </Route>

          </Route>

      </Routes>
    </div>
  );
}

export default App;
