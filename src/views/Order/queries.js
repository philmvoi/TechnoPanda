import { gql } from "apollo-boost";

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
      customer_phone_number
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
    createOrderr(input:{
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
      state_id
    }
  }
`;

export {getOrdersQuery, AddOrderMutation, getOrderStatQuery, getCustomersQuery, getOfmQuery, getOpmQuery, getPlanQuery }