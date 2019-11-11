import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import IngStatAdd from './Add';

import IngStatList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const IngStatus = () =>  { 
  
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
                    Add Ingredient Status
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Ingredient Status</ModalHeader>
          <ModalBody>
            <IngStatAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <IngStatList />

      </div>
    )
  
}


    
export default IngStatus
   