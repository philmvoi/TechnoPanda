import { gql } from "apollo-boost";

const getOfmQuery = gql`
  {
    allOfm {
        order_fulfillment_method_id
        order_fulfillement_method
    }
  }
`;

const AddOfmMutation = gql`
  mutation($name: String!) {
    createOfm(order_fulfillement_method: $name) {
        order_fulfillment_method_id
        order_fulfillement_method
    }
  }
`;

const EditOfmMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updateOfm(order_fulfillment_method_id: $id, order_fulfillement_method: $name) {
        order_fulfillment_method_id
        order_fulfillement_method
  }
}

`;

const DeleteOfmMutation = gql `
mutation ($id: Int!) {
    deleteOfm(order_fulfillment_method_id: $id) {
        order_fulfillment_method_id
    }
}
`;


export {getOfmQuery, AddOfmMutation, EditOfmMutation, DeleteOfmMutation}
