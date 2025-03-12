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
        },
        order: {
            getAll: 'Order',
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
            add: 'Promotion',
            update: (id) => `Promotion/${id}`,
            delete: 'Promotion',
        },
        image: {
            upload: 'Image',
            edit: 'Image',
        },
    },
}

export default apiEndpoints;