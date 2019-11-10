import { gql } from "apollo-boost";

const getPlanQuery = gql`
  {
    allPlanType {
        plan_type_id
        plan_type
    }
  }
`;

const AddPlanMutation = gql`
  mutation($name: String!) {
    createPlanType(plan_type: $name) {
        plan_type_id
        plan_type
    }
  }
`;

const EditPlanMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updatePlanType(plan_type_id: $id, plan_type: $name) {
        plan_type_id
        plan_type
  }
}

`;

const DeletePlanMutation = gql `
mutation ($id: Int!) {
    deletePlan(plan_type_id: $id) {
        plan_type_id
    }
}
`;


export {getPlanQuery, AddPlanMutation, EditPlanMutation, DeletePlanMutation}
