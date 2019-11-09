import { gql } from "apollo-boost";

const getPackagesQuery = gql `
{
    allPackage{
     package_id
     package_name
     package_description
     meal_quantity
    }
   }
`;

const AddPackageMutation = gql `
mutation($status: Int!, $name: String!, $desc: String, $quant: String!) {
    createPackage(input: {
      package_status_id: $status
      package_name: $name
      package_description: $desc
      meal_quantity: $quant
    }) {
      package_name
    }
  }
`;

const EditPackageMutation = gql `
mutation($id:Int!, $name: String!, $desc: String, $quant: String!) {
    updatePackage(input: {
      package_name: $name
      package_description: $desc
      meal_quantity: $quant
    }, package_id: $id) {
      package_name
    }
  }
`;

export {getPackagesQuery, AddPackageMutation, EditPackageMutation}

