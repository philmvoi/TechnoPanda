import { gql } from "apollo-boost";

const getPackStatQuery = gql`
  {
    allPackStat {
      package_status_id
      package_status
    }
  }
`;

const AddPackStatMutation = gql`
  mutation($name: String!) {
    createPackStat(package_status: $name) {
      package_status_id
      package_status
    }
  }
`;

const EditPackStatMutation = gql `
  mutation ($id: Int!, $name: String!) {
    updatePackStat(package_status_id: $id, package_status: $name) {
      package_status_id
      package_status
  }
}

`;

const DeletePackStatMutation = gql `
mutation ($id: Int!) {
  deletePackStat(package_status_id: $id) {
      package_status_id
  }
}
`

export {getPackStatQuery, AddPackStatMutation, EditPackStatMutation, DeletePackStatMutation}


