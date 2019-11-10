import { gql } from "apollo-boost";

const getOrderStatQuery = gql`
  {
    allOrderStat {
        order_status_id
        order_status
    }
  }
`;

const AddOrderStatMutation = gql`
  mutation($name: String!) {
    createOrderStat(order_status: $name) {
        order_status_id
        order_status
    }
  }
`;

const EditOrderStatMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updateOrderStat(order_status_id: $id, order_status: $name) {
        order_status_id
        order_status
  }
}

`;

const DeleteOrderStatMutation = gql `
mutation ($id: Int!) {
    deleteOrderStat(order_status_id: $id) {
    order_status_id
  }
}
`

export {getOrderStatQuery, AddOrderStatMutation, EditOrderStatMutation, DeleteOrderStatMutation}
