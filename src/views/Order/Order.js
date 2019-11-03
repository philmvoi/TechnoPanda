import React, {useState} from 'react';
import PropTypes from "prop-types";
import OrderList from './List'
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 

const Order = () => {
    
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
      
      return (
        <div>
           <div>
            <Modal isOpen={modal} toggle={toggle} >
              <ModalHeader toggle={toggle}>Add Customer</ModalHeader>
              <ModalBody>
              
      
              </ModalBody>
          
            </Modal>
         </div>
            <OrderList />
            <Container fluid>
              <Button
                      className="my-2"
                      color="primary"
                      onClick={toggle}
                    >
                      Add Order
              </Button>
            </Container>
      </div>
      )
    
   }
    
export default Order
