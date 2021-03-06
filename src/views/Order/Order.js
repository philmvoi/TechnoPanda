//THIS IS THE PARENT COMPONENT FOR THE ORDER MODULE. THIS IS ESSENTIALLY WHERE EVERY THING IS CALLED AND RENDERED
import React, {useState} from 'react';
import PropTypes from "prop-types";
import OrderList from './List'
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import OrderAdd from './Add';
import {getOrdersQuery} from './queries'
import { compose } from "recompose";
import { graphql } from "react-apollo";
 

const Order = props => {
    
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const data = props.getOrdersQuery;
      
      return (
        <div>
           <div>
           <div class="btn-group" role="group" aria-label="Button group example">
              <Button
                      // className="my-2"
                      color="dark"
                      onClick={toggle}
                    >
                      Add Order
              </Button>
            </div>
            <Modal isOpen={modal} toggle={toggle}  >
              <ModalHeader toggle={toggle}>Add Order</ModalHeader>
              <ModalBody>
              <OrderAdd />
      
              </ModalBody>
          
            </Modal>
         </div>
              <OrderList />  
          
      </div>
      )
    
   }
export default Order