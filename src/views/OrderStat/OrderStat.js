import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import OrderStatAdd from './Add';

import OrderStatList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const OrderStatus = () =>  { 
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


    return (
      <div>  
         <div>
     
            <Button
                    className="my-2"
                    color="primary"
                    onClick={toggle}
                    >
                    Add Order Status
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Order Status</ModalHeader>
          <ModalBody>
            <OrderStatAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <OrderStatList />

      </div>
    )
  
}


    
export default OrderStatus
   