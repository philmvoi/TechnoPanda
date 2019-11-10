import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import OfmAdd from './Add';

import OfmList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Ofm = () =>  { 
  
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
                    Add Fulfillment Method
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Fulfillment Method</ModalHeader>
          <ModalBody>
            <OfmAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <OfmList />

      </div>
    )
  
}


    
export default Ofm
   