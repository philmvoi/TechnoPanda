import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import StateAdd from './Add';

import StateList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const State = () =>  { 
  
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
                    Add State
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add State</ModalHeader>
          <ModalBody>
            <StateAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <StateList />

      </div>
    )
  
}


    
export default State
   