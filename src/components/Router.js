import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './screens/home/Home'
import Dashboard from './screens/admin-dashboard/Dashboard'
import LoginPage from './screens/login-page/LoginPage'
import VerifyCards from './screens/admin-verify-cards/VerifyCards'
import UserManage from './screens/admin-manage-users/ManageUsers'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/registration" element={<LoginPage/>} />
            <Route path="/verify-page" element={<VerifyCards/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/manage-users" element={<UserManage/>} />
        </Routes>
    </BrowserRouter>
  );
}


export default Router 

//<Route path="/login" element={<Login />} />
//
//<Route path="/dashboard" element={<DefaultLayout />} />
