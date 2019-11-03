import React, {useState} from 'react';
import HandleFormHook from '../Customer/handleFormHook';
import DDown from '../Components/DDown';
import BaseSelect from "react-select";
import PropTypes from "prop-types";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Query,graphql } from 'react-apollo';
import { Table } from 'reactstrap';
import { loadPartialConfig } from '@babel/core';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import CustomerAdd from './Add';

import CustomerList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Customer = () =>  { 
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


    return (
      <div>  
         <div>
         <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Customer</ModalHeader>
        <ModalBody>
        <CustomerAdd />
 
        </ModalBody>
       
      </Modal>
         </div>
        <CustomerList />
        <Container fluid>
      <Button
              className="my-2"
              color="primary"
              onClick={toggle}
            >
              Add Customer
      </Button>
      </Container>
      </div>
    )
  
}


// const Select = props => (
//   <DDown
//     {...props}
//     SelectComponent={BaseSelect}
//     options={null}
//   />
// );

    
export default Customer
   