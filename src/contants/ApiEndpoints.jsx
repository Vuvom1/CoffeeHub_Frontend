import { statistic } from "antd/es/theme/internal";
import AddEmployee from "../pages/admin/Employee/AddEmployee";
import AddMenuItemCategory from "../pages/admin/MenuItem/AddMenuItemCategory";

const baseURL = 'https://localhost:7035/api/';

const apiEndpoints = {
    baseURL: baseURL,
    auth: {
        getDetails: 'Auth/details',
        login: 'Auth/login',
        signup: 'Auth/register',
        signupCustomer: 'Auth/register-customer',
        AddEmployee: 'Auth/register-employee',
    },
    cashier: {
        order: {
            getAll: 'Order',
            getById: (id) => `Order/${id}`,
            create: 'Order',
            startProcessingOrder: (id) => `Order/${id}/start-processing`,
        },
        customer: {
            getById: (id) => `Customer/${id}`,
        },
    }, 

    barista: {
        order: {
            getAll: 'Order',
            getById: (id) => `Order/${id}`,
            startPreparingOrder: (id) => `Order/${id}/start-preparing`,
            markReadyForPickup: (id) => `Order/${id}/mark-ready`,
        },  
    },
    waiter: {
        order: {
            getAll: 'Order',
            getById: (id) => `Order/${id}`,
            completeOrder: (id) => `Order/${id}/complete`,
        },
    },
    customer: {
        verifyCustomer: 'Customer',
        menuItems: {
            getAll: 'MenuItem',
            getById: (id) => `MenuItem/${id}`,
            getPopular: (limit) => `MenuItem/getPopular?limit=${limit}`,
            getNewest: (limit) => `MenuItem/getNewest?limit=${limit}`,
        },
        categories: {
            getAll: 'MenuItemCategory',
            getById: (id) => `MenuItemCategory/${id}`,
            getAllWithItems: 'MenuItemCategory/getWithMenuItems',
        },
        customer: {
            getById: (id) => `Customer/${id}`,
            getByAuthId: (id) => `Customer/getByAuthId/${id}`, 
            update: (id) => `Customer/${id}`,
            
        }, 
        order: {
            getById: (id) => `Order/${id}`,
            add: 'Order',
            addWithDelivery: 'Order/createWithDelivery',
            update: (id) => `Order/${id}`,
        },
        promotion: {
            getUsablePromotionsByCustomerId: (id) => `Promotion/usable/${id}`,
        },
    },
    admin: {
        statistic: {
            finance: (startDate, endDate) => `Statistic/Finance?startDate=${startDate}&endDate=${endDate}`,
            schedule: (startDate, endDate) => `Statistic/Schedule?startDate=${startDate}&endDate=${endDate}`,
            stock: (limit) => `Statistic/Stock?limit=${limit}`,
            dailyFinancial: (startDate, endDate) => `Statistic/DailyFinancial?startDate=${startDate}&endDate=${endDate}`,
            monthlyFinancial: (startDate, endDate) => `Statistic/MonthlyFinancial?startDate=${startDate}&endDate=${endDate}`,
            yearlyFinancial: (startDate, endDate) => `Statistic/YearlyFinancial?startDate=${startDate}&endDate=${endDate}`,
            popularMenuItems: (startDate, endDate, limit) => `Statistic/PopularMenuItems?startDate=${startDate}&endDate=${endDate}&limit=${limit}`,
            leastPopularMenuItems: (startDate, endDate,limit) => `Statistic/LeastPopularMenuItems?startDate=${startDate}&endDate=${endDate}&limit=${limit}`,
        },
        admin: {
            getAll: 'Admin',
        },
        employee: {
            getAll: 'Employee',
            getAllWithSchedules: 'Employee/schedule',
            getById: (id) => `Employee/${id}`,
            add: 'Employee',
            update: (id) => `Employee/${id}`,
        },
        customer: {
            getAll: 'Customer',
            getByPhoneNumber: (phone) => `Customer/phone/${phone}`,
            getById: (id) => `Customer/${id}`,
            update: (id) => `Customer/${id}`,
        },
        order: {
            getAll: 'Order',
            getById: (id) => `Order/${id}`,
            add: 'Order',
            update: (id) => `Order/${id}`,
            updateStatus: (id, status) => `Order/${id}/status?orderStatus=${status}`,
        },
        menuItem: {
            getAll: 'MenuItem',
            getById: (id) => `MenuItem/${id}`,
            add: 'MenuItem',
            update: (id) => `MenuItem/${id}`,
            updateAvailability: (id) => `MenuItem/updateAvailability?id=${id}`,
            delete: 'MenuItem',
        },
        menuItemCategory: {
            getAll: 'MenuItemCategory',
            add: 'MenuItemCategory',
            update: 'MenuItemCategory',
            delete: 'MenuItemCategory',
        },
        ingredient: {
            getAll: 'Ingredient',
            getById: (id) => `Ingredient/${id}`,
            getByIds: (ids = []) => `Ingredient/ids?${ids.map(id => `ids=${id}`).join('&')}`,
            add: 'Ingredient',
            update: (id) => `Ingredient/${id}`,
            delete: 'Ingredient',
        },
        ingredientCategory: {
            getAll: 'IngredientCategory',
            add: 'IngredientCategory',
            update: 'IngredientCategory',
            delete: 'IngredientCategory',
        },
        ingredientStock: {
            getAll: 'IngredientStock',
            add: 'IngredientStock',
            update: 'IngredientStock',
        },
        recipe: {
            getAll: 'Recipe',
            getById: (id) => `Recipe/${id}`,
            getByMenuItemId: (id) => `Recipe/menu-item/${id}`,
            add: 'Recipe',
            update: (id) => `Recipe/${id}`,
            updateByMenuItemId: (id) => `Recipe/menu-item/${id}`,
            delete: 'Recipe',
        },
        schedule: {
            getAll: 'Schedule',
            add: 'Schedule',
            update: (id) => `Schedule/${id}`,
            delete: 'Schedule',
            getById: (id) => `Schedule/${id}`,
        },
        shift: {
            getAll: 'Shift',
        },
        promotion: {
            getAll: 'Promotion',
            getById: (id) => `Promotion/${id}`,
            getUsableByCustomerId: (id) => `Promotion/usable/${id}`,
            add: 'Promotion',
            update: (id) => `Promotion/${id}`,
            updateActivation: (id) => `Promotion/activation/${id}`,
            delete: 'Promotion',
        },
        image: {
            upload: 'Image',
            edit: 'Image',
        },
    },
}

export default apiEndpoints;