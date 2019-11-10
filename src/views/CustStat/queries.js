import { gql } from "apollo-boost";

const getCustStatQuery = gql`
  {
    allCustStat {
      customer_status_id,
      customer_status
    }
  }
`;

const AddCustStatMutation = gql`
  mutation($name: String!) {
    createCustStat(customer_status: $name) {
      customer_status_id,
      customer_status
    }
  }
`;

const EditCustStatMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updateCustStat(customer_status_id: $id, customer_status: $name) {
      customer_status_id,
      customer_status
  }
}

`;

const DeleteCustStatMutation = gql `
mutation ($id: Int!) {
  deleteCustStat(customer_status_id: $id) {
    customer_status_id
}
}
`
export {getCustStatQuery, AddCustStatMutation, EditCustStatMutation, DeleteCustStatMutation}



