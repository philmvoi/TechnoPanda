import { gql } from "apollo-boost";

const getOpmQuery = gql`
  {
    allOpm {
        order_payment_method_id
        order_payment_method
    }
  }
`;

const AddOpmMutation = gql`
  mutation($name: String!) {
    createOpm(order_payment_method: $name) {
        order_payment_method_id
        order_payment_method
    }
  }
`;

const EditOpmMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updateOpm(order_payment_method_id: $id, order_payment_method: $name) {
        order_payment_method_id
        order_payment_method
  }
}

`;

const DeleteOpmMutation = gql `
mutation ($id: Int!) {
    deleteOpm(order_payment_method_id: $id) {
        order_payment_method_id
  }
}
`

export {getOpmQuery, AddOpmMutation, EditOpmMutation, DeleteOpmMutation}