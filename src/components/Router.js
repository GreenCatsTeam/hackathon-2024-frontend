import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './screens/home/Home'
import Dashboard from './screens/admin-dashboard/Dashboard'
import LoginPage from './screens/login-page/LoginPage'
import RegPage from './screens/reg-page/RegPage'
import VerifyCards from './screens/admin-verify-cards/VerifyCards'
import UserManage from './screens/admin-manage-users/ManageUsers'
import PrivateRoute from './PrivateRoute'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login-page" element={<LoginPage/>} />
            <Route path="/registration-page" element={<RegPage/>} />
            
            <Route element={<PrivateRoute />}>
            <Route path="/verify-page" element={<VerifyCards/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/manage-users" element={<UserManage/>} />
            </Route>
            
        </Routes>
    </BrowserRouter>
  );
}


export default Router 

//<Route path="/login" element={<Login />} />
//
//<Route path="/dashboard" element={<DefaultLayout />} />
