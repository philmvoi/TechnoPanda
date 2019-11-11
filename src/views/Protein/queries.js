import { gql } from "apollo-boost";

const getProteinQuery = gql`
  {
    allProType {
        protein_type_id
        protein_type
    }
  }
`;

const AddProteinMutation = gql`
  mutation($name: String!) {
    createProType(protein_type: $name) {
        protein_type_id
        protein_type
    }
  }
`;

const EditProteinMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updateProType(protein_type_id: $id, protein_type: $name) {
        protein_type_id
        protein_type
  }
}

`;

const DeleteProteinMutation = gql `
mutation ($id: Int!) {
    deleteProType(protein_type_id: $id) {
    protein_type_id
  }
}
`

export {getProteinQuery, AddProteinMutation, EditProteinMutation, DeleteProteinMutation}


