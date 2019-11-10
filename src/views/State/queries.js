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

const DeleteStateMutation = gql `
mutation ($id: Int!) {
  deleteState(state_id: $id) {
    state_id
}
}
`
export {getStatesQuery, AddStateMutation, EditStateMutation, DeleteStateMutation}