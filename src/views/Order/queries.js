import { gql }  from 'apollo-boost';

const getOrderStatQuery = gql`
{
    allOrderStat {
      order_status_id,
      order_status
  }
}
`;

const getCustomersQuery = gql`
  {
    allCustomers {
      customer_id
      customer_phone_number,
      customer_last_name,
      customer_first_name
    }
  }
`;

const getOfmQuery = gql`
{
    allOfm {
      order_fulfillment_method_id,
      order_fulfillement_method
  }
}
`;

const getOpmQuery = gql`
{
    allOpm {
      order_payment_method_id,
      order_payment_method
  }
}
`;

const getPlanQuery = gql`
{
    allPlanType {
      plan_type_id,
      plan_type
  }
}
`;

const getOrdersQuery = gql`
{
    allOrders{
      order_id
      customer_id
      customer_last_name
      customer_phone_number
      order_status_id
      order_status
      order_payment_method_id
      order_payment_method
      order_fulfillment_method_id
      order_fulfillement_method
      plan_type_id
      plan_type
      order_received_date
      order_due_date
      order_delivery_street
      order_delivery_city
      order_delivery_zipcode
      order_completed_date
      order_deliver_by
      order_total_price
      special_requirements
      payment_amount
    }
  }
`;

const AddOrderMutation = gql`
  mutation($cust: Int!, $status: Int!, $opm: Int!, $ofm: Int!, $plan: Int!, $due: String, $received: String, $street: String, $city: String!, $zip: String, $completed: String, $delBy: String, $total: String!, $spec: String, $pa: String!) {
    createOrder(input:{
        customer_id: $cust,
        order_status_id: $status,
        order_payment_method_id: $opm,
        order_fulfillment_method_id: $ofm
        plan_type_id: $plan,
        order_due_date: $due
        order_received_date: $received
        order_delivery_street: $street
        order_delivery_city: $city
        order_delivery_zipcode: $zip,
        order_completed_date: $completed
        order_deliver_by: $delBy
        order_total_price: $total
        special_requirements: $spec
        payment_amount: $pa
    
    }) {
      customer_id
    }
  }
`;

const EditOrderMutation = gql`
  mutation($id: Int!, $cust: Int, $status: Int!, $opm: Int!, $ofm: Int!, $plan: Int!, $due: String, $received: String, $street: String, $city: String!, $zip: String, $completed: String, $delBy: String, $total: String!, $spec: String, $pa: String!) {
    updateOrder(input:{
        customer_id: $cust,
        order_status_id: $status,
        order_payment_method_id: $opm,
        order_fulfillment_method_id: $ofm,
        plan_type_id: $plan,
        order_due_date: $due
        order_received_date: $received
        order_delivery_street: $street
        order_delivery_city: $city
        order_delivery_zipcode: $zip,
        order_completed_date: $completed
        order_deliver_by: $delBy
        order_total_price: $total
        special_requirements: $spec
        payment_amount: $pa
    
    }, order_id: $id) {
      customer_id
    }
  }
  `;

const getOrderOrderlines = gql`
 {
  allOrderOrderLines {
    order_line_id
    order_id
    package_description,
    package_name
    order_line_quantity
    price
    package_id
  }
}
`;

const AddOrderlineMutation = gql`
  mutation($order: Int!, $package: Int!, $quant: String!, $price: String) {
      createOrderLine(input:{  
        order_id: $order,
        package_id: $package,
        order_line_quantity: $quant,
        price: $price
    }) {
      order_id
    }
  }
`;

const EditOrderlineMutation = gql`
  mutation($id: Int!, $package: Int!, $quant: String!, $price: String) {
      updateOrderLine(input:{  
        package_id: $package,
        order_line_quantity: $quant,
        price: $price
    }, order_line_id: $id) {
      order_id
    }
  }
`;

const getPackagesQuery = gql`
{
    allPackage {
      package_id,
      package_name
  }
}
`;

const getMealListQuery = gql `
{
    allMlJoin{
      meal_list_id,
      meal_id,
      order_id
      order_line_id
      meal_name
      package_name
      meal_list_quantity
      package_id
    }
  
}
`;

const AddMealListMutation = gql`
  mutation($meal: Int!, $oline: Int!, $quant: String!) {
      createMealList(input:{  
        meal_id: $meal,
        order_line_id: $oline,
        meal_list_quantity: $quant,
    }) {
      meal_id
    }
  }
`;

const EditMealListMutation = gql`
  mutation($id: Int!, $meal: Int!, $quant: String!) {
      updateMealList(input:{  
        meal_id: $meal,
        meal_list_quantity: $quant,
    }, meal_list_id: $id) {
      meal_id
    }
  }
`;

const getMealsQuery = gql `
{
  allMeal{
    meal_id
    meal_name
  }
}
`
const DeleteOrderMutation = gql `
mutation($id: Int!) {
  deleteOrder(order_id: $id){
    order_id
  }
}

`;

const DeleteOrderLineMutation = gql `
mutation($id: Int!) {
  deleteOrderLine(order_line_id: $id){
    order_line_id
  }
}

`;

const DeleteMealListMutation = gql `
mutation($id: Int!) {
  deleteMealList(meal_list_id: $id){
    meal_list_id
  }
}

`;



export {getOrdersQuery, AddOrderMutation, getOrderStatQuery, getCustomersQuery, getOfmQuery, getOpmQuery, getPlanQuery, EditOrderMutation, getOrderOrderlines, AddOrderlineMutation, getPackagesQuery, EditOrderlineMutation, getMealListQuery, AddMealListMutation, getMealsQuery, EditMealListMutation, DeleteOrderMutation, DeleteOrderLineMutation, DeleteMealListMutation};