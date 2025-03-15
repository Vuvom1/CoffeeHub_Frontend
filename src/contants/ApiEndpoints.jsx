import AddEmployee from "../pages/admin/Employee/AddEmployee";
import AddMenuItemCategory from "../pages/admin/MenuItem/AddMenuItemCategory";

const baseURL = 'https://localhost:7035/api/';

const apiEndpoints = {
    baseURL: baseURL,
    auth: {
        login: 'Auth/login',
        signup: 'Auth/register',
        signupCustomer: 'Auth/register-customer',
        AddEmployee: 'Auth/register-employee',
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
    },
    admin: {
        admin: {
            getAll: 'Admin',
        },
        employee: {
            getAll: 'Employee',
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