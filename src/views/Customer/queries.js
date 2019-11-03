import { gql } from "apollo-boost";

const getStatesQuery = gql`
  {
    allStates {
        state_id,
        state_name
    }
  }
`;

const AddStateMutation = gql`
  mutation($name: String!) {
    createState(state_name: $name) {
      state_name
      state_id
    }
  }
`;

const EditStateMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updateState(state_id: $id, state_name: $name) {
      state_name,
      state_id
  }
}

`;

const getStateById = gql `
  query ($id: String) {
    getState(state_id: $id) {
      state_name,
  }
}

`;

const getCustomersQuery = gql`
  {
    allCustomers {
      customer_id
      state_id
      state_name
      customer_phone_number
      customer_first_name
      customer_last_name
      customer_email
      customer_city
      customer_street_address
      customer_zipcode
      Height
      Weight
      Allergies
      Instagram
  
    }
  }
`;

const AddCustomerMutation = gql`
  mutation($state: Int!, $status: Int!, $phone: String!, $fname: String!, $lname: String!, $email: String, $city: String, $street: String, $zip: String, $h: String, $w: String, $allergies: String, $ig: String) {
    createCustomer(input:{
      state_id: $state
      customer_status_id: $status
      customer_phone_number: $phone
      customer_first_name: $fname
      customer_last_name: $lname
      customer_email: $email
      customer_city: $city
      customer_street_address: $street
      customer_zipcode: $zip
      Height: $h
      Weight: $w
      Allergies: $allergies
      Instagram: $ig
    }) {
      customer_id
      state_id
    }
  }
`;

const EditCustomerMutation = gql `
mutation($id: Int!, $state: Int!, $status: Int!, $phone: String!, $fname: String!, $lname: String!, $email: String, $city: String, $street: String, $zip: String, $h: String, $w: String, $allergies: String, $ig: String) {
  updateCustomer(input:{
    state_id: $state
    customer_status_id: $status
    customer_phone_number: $phone
    customer_first_name: $fname
    customer_last_name: $lname
    customer_email: $email
    customer_city: $city
    customer_street_address: $street
    customer_zipcode: $zip
    Height: $h
    Weight: $w
    Allergies: $allergies
    Instagram: $ig
  }, customer_id: $id) {
    customer_id
    state_id
  }
}
`;


export {getStatesQuery, AddStateMutation, EditStateMutation, getStateById, getCustomersQuery, AddCustomerMutation, EditCustomerMutation};
