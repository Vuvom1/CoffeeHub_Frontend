import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import Home from './pages/customer/Home';
import CustomerLayout from './layouts/customer/CustomerLayout';
import MenuItemDetail from './pages/customer/MenuItemDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderTracking from './pages/customer/OrderTracking';
import CustomerMenu from './pages/customer/CustomerMenu';
import AdminLayout from './layouts/admin/AdminLayout';
import MenuItem from './pages/admin/MenuItem/MenuItem';
import Ingredient from './pages/admin/Ingredient/Ingredient';
import Order from './pages/admin/Order/Order';
import CreateOrder from './pages/admin/Order/CreateOrder';
import CheckoutOrder from './pages/admin/Order/CheckoutOrder';
import Employee from './pages/admin/Employee/Employee';
import EmployeeProfile from './pages/admin/Employee/EmployeeProfile';
import Customer from './pages/admin/Customer/Customer';
import CustomerProfile from './pages/admin/Customer/CustomerProfile';
import OrderDetail from './pages/admin/Order/OrderDetail';
import Schedule from './pages/admin/Schedule/Schedule';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import AuthLayout from './layouts/auth/AuthLayout';
import EmployeeVerify from './pages/auth/EmployeeVerify';
import CustomerVerify from './pages/auth/CustomerVerify';
import RequireAuth from './components/RequiredAuth';
import Promotion from './pages/admin/Promotion/Promotion';
import Dashboard from './pages/admin/Dashboard/Dashboard';

const AppRoutes = () => (
  <HashRouter>
    <Routes>      
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='employee-verify' element={<EmployeeVerify />} />
        <Route path='customer-verify' element={<CustomerVerify />} />
      </Route>
      {/* Customer Routes */}
    
      <Route path='/coffeehub' element={
          <CustomerLayout />
      }>
        <Route index element={<Home />} />
        <Route path='menu-item/:id' element={<MenuItemDetail />} />
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='order-tracking' element={<OrderTracking />} />
        <Route path='menu' element={<CustomerMenu />} />
      </Route>

      {/* Admin Routes */}
      <Route path='/admin' element={
        <RequireAuth>
          <AdminLayout />
        </RequireAuth>
      }>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='menu-item' element={<MenuItem />} />
        <Route path='ingredient' element={<Ingredient />} />
        <Route path='order' >
          <Route index element={<Order />} />
          <Route path='create' element={<CreateOrder />} />
          <Route path='checkout' element={<CheckoutOrder />} />
          <Route path=':id' element={<OrderDetail />} />
        </Route>
        <Route path='schedule' element={<Schedule />} />
        <Route path='employee'  >
          <Route index element={<Employee />} />
          <Route path='profile/:id' element={<EmployeeProfile />} />
        </Route>
        <Route path='customer'  >
          <Route index element={<Customer />} />
          <Route path='profile/:id' element={<CustomerProfile />} />
        </Route>
        <Route path='promotion' >
          <Route index element={<Promotion />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);

export default AppRoutes;