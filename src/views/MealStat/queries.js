import { gql } from "apollo-boost";

const getMealStatQuery = gql`
  {
    allMealStat {
        meal_status_id
        meal_status
    }
  }
`;

const AddMealStatMutation = gql`
  mutation($name: String!) {
    createMealStat(meal_status: $name) {
        meal_status_id
        meal_status
    }
  }
`;

const EditMealStatMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updateMealStat(meal_status_id: $id, meal_status: $name) {
        meal_status_id
        meal_status
  }
}

`;

const DeleteMealStatMutation = gql `
mutation ($id: Int!) {
    deleteMealStat(meal_status_id: $id) {
        meal_status_id
    }
}
`;


export {getMealStatQuery, AddMealStatMutation, EditMealStatMutation, DeleteMealStatMutation}
