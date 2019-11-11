import { gql } from "apollo-boost";

const getIngStatQuery = gql`
  {
    allIngStat {
        ingredient_status_id
        ingredient_status
    }
  }
`;

const AddIngStatMutation = gql`
  mutation($name: String!) {
    createIngStat(ingredient_status: $name) {
        ingredient_status_id
        ingredient_status
    }
  }
`;

const EditIngStatMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updateIngStat(ingredient_status_id: $id, ingredient_status: $name) {
        ingredient_status_id
        ingredient_status
  }
}

`;

const DeleteIngStatMutation = gql `
mutation ($id: Int!) {
    deleteIngStat(ingredient_status_id: $id) {
    ingredient_status_id
}
}
`
export {getIngStatQuery, AddIngStatMutation, EditIngStatMutation, DeleteIngStatMutation}

