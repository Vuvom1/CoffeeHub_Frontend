const endpoints = {
    customer: {
        base: '/coffeehub',
        home: '/coffeehub/home',
        login: '/coffeehub/login',
        signup: '/coffeehub/signup',
        menuItemDetail: '/coffeehub/menu-item-detail',
        cart: '/coffeehub/cart',
        checkout: '/coffeehub/checkout',
        orderTracking: '/coffeehub/order-tracking',
        menu: '/coffeehub/menu',
    },
    admin: {
        base: '/admin',
        layout: '/admin/layout',
        dashboard: '/admin/dashboard',
        menuItem: '/admin/menu-item',
        ingredient: '/admin/ingredient',
        ingredientStock: '/admin/ingredient-stock',
        order: '/admin/order',
        createOrder: '/admin/order/create',
        checkoutOrder: '/admin/order/checkout',
        employee: '/admin/employee',
        employeeProfile: (id) => `/admin/employee/profile/${id}`,
        customer: '/admin/customer',
        customerProfile: '/admin/customer/profile',
        orderDetail: '/admin/order/detail',
        schedule: '/admin/schedule',
        promotion: '/admin/promotion',  
        
    },
    auth: {
        base: '/auth',
        login: '/auth/login',
        signup: '/auth/signup',
        employeeVerify: '/auth/employee-verify',
        customerVerify: '/auth/customer-verify',
        layout: '/auth/layout',
    },
};

export default endpoints;