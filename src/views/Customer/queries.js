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


export {getStatesQuery, AddStateMutation};
