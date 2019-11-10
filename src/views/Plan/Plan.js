import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import PlanAdd from './Add';

import PlanList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Plan = () =>  { 
  
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
                    Add Plan
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Plan</ModalHeader>
          <ModalBody>
            <PlanAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <PlanList />

      </div>
    )
  
}


    
export default Plan
   