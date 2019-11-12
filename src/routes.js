import React from 'react';
import Loadable from 'react-loadable'
 
function Loading() {
 return <div>Loading...</div>;
}
 
const Dashboard = Loadable({
 loader: () => import('./views/Dashboard/Dashboard'),
 loading: Loading,
});
 
const Customer = Loadable({
 loader: () => import('./views/Customer/Customer'),
 loading: Loading,
});
 
const Order = Loadable({
 loader: () => import('./views/Order/Order'),
 loading: Loading,
});
 
const Report = Loadable({
 loader: () => import('./views/Report/Report'),
 loading: Loading,
});
 
const Meal = Loadable({
    loader: () => import('./views/Meal/Meal'),
    loading: Loading,
   });

const Package = Loadable({
    loader: () => import('./views/Package/Package'),
    loading: Loading,
});  

const Ingredient = Loadable({
    loader: () => import('./views/Ingredient/Ingredient'),
    loading: Loading,
});
const Revenue = Loadable({
    loader: () => import('./views/Report/revenue'),
    loading: Loading,
});    

const Upcoming = Loadable({
    loader: () => import('./views/Report/upcoming'),
    loading: Loading,
});  

const PopMealsReport = Loadable({
    loader: () => import('./views/Report/popmeals'),
    loading: Loading,
});

const PopPkgReport = Loadable({
    loader: () => import('./views/Report/poppkg'),
    loading: Loading,
});

const LoyalCustReport = Loadable({
    loader: () => import('./views/Report/loyalcust'),
    loading: Loading,
});

const PopIngredientsReport = Loadable({
    loader: () => import('./views/Report/popingredients'),
    loading: Loading,
});

const State = Loadable({
    loader: () => import('./views/State/State'),
    loading: Loading,
});

const CustomerStatus = Loadable({
    loader: () => import('./views/CustStat/CustomerStat'),
    loading: Loading,
});

const OrderStatus = Loadable({
    loader: () => import('./views/OrderStat/OrderStat'),
    loading: Loading,
});

const Opm = Loadable({
    loader: () => import('./views/Opm/Opm'),
    loading: Loading,
});

const Ofm = Loadable({
    loader: () => import('./views/Ofm/Ofm'),
    loading: Loading,
});

const Plan = Loadable({
    loader: () => import('./views/Plan/Plan'),
    loading: Loading,
});

const MealStatus = Loadable({
    loader: () => import('./views/MealStat/MealStat'),
    loading: Loading,
});

const PackStatus = Loadable({
    loader: () => import('./views/PackStat/PackStat'),
    loading: Loading,
});

const IngStatus = Loadable({
    loader: () => import('./views/IngStat/IngStat'),
    loading: Loading,
});

const Protein = Loadable({
    loader: () => import('./views/Protein/Protein'),
    loading: Loading,
});

const Category = Loadable({
    loader: () => import('./views/Category/Category'),
    loading: Loading,
});


 
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
//  { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
 { path: '/', exact: true, name: 'Customers', component: Customer },
 { path: '/orders', name: 'Orders', component: Order },
 { path: '/reports', exact:true, name: 'Reports', component: Report },
 { path: '/meals', exact:true, name: 'Meals', component: Meal },
 { path: '/packages', exact:true, name: 'Packages', component: Package },
 { path: '/ingredients', exact:true, name: 'Ingredients', component: Ingredient },
 { path: '/reports/revenue', name: 'Revenue', component: Revenue },
 { path: '/reports/upcoming',name: 'Upcoming', component: Upcoming },
 { path: '/reports/popmeals', name: 'Popular Meals', component: PopMealsReport },
 { path: '/reports/poppkgs', name: 'Popular Packages', component: PopPkgReport },
 { path: '/reports/loyalcusts', name: 'Loyal Customers', component: LoyalCustReport },
 { path: '/reports/popingrts', name: 'Popular Ingredients', component: PopIngredientsReport },
 { path: '/states', name: 'States', component: State },
 { path: '/custstat', name: 'Customer Statuses', component: CustomerStatus },
 { path: '/orderstat', name: 'Order Statuses', component: OrderStatus },
 { path: '/opm', name: 'Payment Methods', component: Opm },
 { path: '/ofm', name: 'Fulfillment Methods', component: Ofm },
 { path: '/plan', name: 'Plans', component: Plan },
 { path: '/protein', name: 'Proteins', component: Protein },
 { path: '/mealstat', name: 'Meal Statuses', component: MealStatus },
 { path: '/packstat', name: 'Package Statuses', component: PackStatus },
 { path: '/ingstat', name: 'Ingredient Statuses', component: IngStatus },
 { path: '/category', name: 'Meal Categories', component: Category },

];
 
export default routes;

