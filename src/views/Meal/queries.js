import { gql } from "apollo-boost";

const getMealsQuery = gql`
{
    allMealJoin{
        meal_id
        meal_category_id
        meal_name
        meal_description
        additional_protein_oz
        description_
        protein_type
        protein_type_id
      }
    
}
`;

const getProteinQuery = gql`
  {
    allProType {
        protein_type_id,
        protein_type
    }
  }
`;

const getMealCategory = gql`
  {
    allMealCat{
      meal_category_id,
      description_
    } 
  }
`;

const AddMealMutation = gql`
mutation($status: Int!, $catg: Int!, $protein: Int!, $name: String!, $desc: String, $addProt: String) {
  createMeal(input: {
    meal_status_id: $status
    meal_category_id: $catg
    protein_type_id: $protein
    meal_name: $name
    meal_description: $desc
    additional_protein_oz: $addProt
  }) {
    meal_id
  }
}

`;

const EditMealMutation = gql`
mutation($id: Int!, $catg: Int!, $protein: Int!, $name: String!, $desc: String, $addProt: String) {
  updateMeal(input: {
    meal_category_id: $catg
    protein_type_id: $protein
    meal_name: $name
    meal_description: $desc
    additional_protein_oz: $addProt
  }, meal_id: $id) {
    meal_id
  }
}

`;

const getIngredientListQuery = gql`
{
  allIngList{
    ingredient_id
    ingredient_name
    ingredient_list_id
    meal_id
    meal_name
  }
}

`;
const getIngredientsQuery = gql`
{
  allIngredientJoin {
    ingredient_name
    ingredient_id
  }
}

`;

const AddIngListMutation = gql `
mutation($meal: Int!, $ing: Int!) {
  createIngList(input: {
    meal_id: $meal
    ingredient_id: $ing
  }) {
    meal_id
  }
}
`;

const EditIngListMutation = gql `
mutation($id:Int!, $ing: Int!) {
  updateIngList(input: {
    ingredient_id: $ing
  }, ingredient_list_id: $id) {
    meal_id
  }
}
`;
const DeleteMealMutation = gql `
mutation($id: Int!) {
  deleteMeal(meal_id: $id){
    meal_id
  }
}

`;

const DeleteIngListMutation = gql `
mutation($id: Int!) {
  deleteIngList(ingredient_list_id: $id){
    ingredient_list_id
  }
}

`;



export {getMealsQuery, getProteinQuery, getMealCategory, AddMealMutation, EditMealMutation, getIngredientListQuery, getIngredientsQuery, AddIngListMutation, EditIngListMutation, DeleteMealMutation, DeleteIngListMutation} ;

