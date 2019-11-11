import { gql } from "apollo-boost";

const getCategoryQuery = gql`
  {
    allMealCat {
        meal_category_id
        description_
    }
  }
`;

const AddCategoryMutation = gql`
  mutation($name: String!) {
    createMealCat(description_: $name) {
        meal_category_id
        description_
    }
  }
`;

const EditCategoryMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updateMealCat(meal_category_id: $id, description_: $name) {
        meal_category_id
        description_
  }
}

`;

const DeleteCategoryMutation = gql `
mutation ($id: Int!) {
    deleteMealCat(meal_category_id: $id) {
        meal_category_id
  }
}
`

export {getCategoryQuery, AddCategoryMutation, EditCategoryMutation, DeleteCategoryMutation}
