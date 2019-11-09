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

 
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
 { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
 { path: '/customers', name: 'Customers', component: Customer },
 { path: '/orders', name: 'Orders', component: Order },
 { path: '/reports', exact:true, name: 'Reports', component: Report },
 { path: '/meals', exact:true, name: 'Meals', component: Meal },
 { path: '/packages', exact:true, name: 'Packages', component: Package },
 { path: '/ingredients', exact:true, name: 'Ingredients', component: Ingredient },
 
];
 
export default routes;

