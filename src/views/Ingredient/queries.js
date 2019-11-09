import { gql }  from 'apollo-boost';

const getIngredientsQuery = gql`
{
    allIngredientJoin {
      ingredient_id,
      ingredient_name
  }
}
`;

const EditIngredientMutation = gql `
mutation($id: Int!, $name: String!){
  updateIngredient(input: {
    ingredient_name: $name
  }, ingredient_id: $id) {
    ingredient_name
  }
}
`;

const AddIngredientMutation = gql `
mutation($status: Int!, $name: String!){
  createIngredient(input: {
    ingredient_status_id: $status
    ingredient_name: $name
  }) {
    ingredient_name
  }
}
`;
const DeleteIngredientMutation =gql `
mutation($id: Int!){
  deleteIngredient(ingredient_id: $id){
    ingredient_id
  }
}
`
export {getIngredientsQuery, EditIngredientMutation, AddIngredientMutation, DeleteIngredientMutation}