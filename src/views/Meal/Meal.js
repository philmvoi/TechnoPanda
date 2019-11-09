import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import 'react-table/react-table.css';
import MealsList from './List'
import MealAdd from './Add';

const Meal = () =>  { 
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);
  
  
      return (
        <div>  
           <div>
              <Modal isOpen={modal} toggle={toggle} >
              <ModalHeader toggle={toggle}>Add Meal</ModalHeader>
              <ModalBody>
                <MealAdd />
      
              </ModalBody>
            
              </Modal>
           </div>
           <div class="btn-group" role="group" aria-label="Button group example">
            <Button
                    color="dark"
                    onClick={toggle}
                  >
                    Add Meal
            </Button>
           </div>
         
          <MealsList />
          </div>
      )
    
  }
  
      
export default Meal
     