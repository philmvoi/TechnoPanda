import { gql } from "apollo-boost";

const getCurMonRev = gql`
{
    revenueCurrentMonth{
        Current_Year
        Current_Month
        Total_Revenue_this_Month
    }
}
`;

const getPrevMonRev = gql`
{
    revenueLastMonth{
        Prev_Year
        Previous_Month
        Total_Revenue_in_Previous_Month
    }
}
`; 

const getUpcomingOrders = gql`
{
    upcomingOrderandPackage {
        order_id
        customer_first_name
        customer_last_name
        customer_phone_number
        order_due_date
        order_delivery_street
        order_delivery_city
        order_delivery_zipcode
        order_total_price
        special_requirements
        order_payment_method
        order_fulfillement_method
        plan_type
    }
}
`;

const getUpcomingMeals = gql`
{
    upcomingMealInfo{
        order_id
        package_name
        meal_name
        protein_type
        description_
        meal_description
        additional_protein_oz
        order_due_date
    }
}
`
const getPopMeals = gql`{
     popularMeal {
        meal_name
        frequency
    }
}
`;

const getPopPackages = gql `{
     popularPackage{
        package_name
        frequency
    }
}
`;
const getLoyCustomer = gql `
{
    loyalCustomer{
        customer_last_name
        customer_first_name
        customer_id
        frequency 
    }
}
`
const getPopIngredients = gql `
{
    popularIngredients{
        ingredient_name
        frequency
    }
}
`;

export {getPrevMonRev, getCurMonRev, getUpcomingOrders, getUpcomingMeals, getPopMeals, getPopPackages, getLoyCustomer, getPopIngredients};