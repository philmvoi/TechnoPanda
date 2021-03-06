import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import StateAdd from './Add';

import StateList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Customer = () =>  { 
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


    return (
      <div>  
         <div>
         <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add State</ModalHeader>
          <ModalBody>
            <StateAdd />
  
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


    
export default Customer
   