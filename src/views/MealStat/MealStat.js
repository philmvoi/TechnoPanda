import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import MealStatAdd from './Add';

import MealStatList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const MealStatus = () =>  { 
  
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
                    Add Meal Status
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Meal Status</ModalHeader>
          <ModalBody>
            <MealStatAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <MealStatList />

      </div>
    )
  
}


    
export default MealStatus
   