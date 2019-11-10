import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import CustStatAdd from './Add';

import CustStatList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const CustomerStatus = () =>  { 
  
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
                    Add Customer Status
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Customer Status</ModalHeader>
          <ModalBody>
            <CustStatAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <CustStatList />

      </div>
    )
  
}


    
export default CustomerStatus
   