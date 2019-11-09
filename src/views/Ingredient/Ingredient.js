import React, {useState} from 'react';
import IngredientAdd from './Add'
import IngredientList from './List'







import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Ingredient = () =>  { 
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


    return (
      <div>  
         <div>
            <Modal id="small" isOpen={modal} toggle={toggle} >
              <ModalHeader toggle={toggle}>Add Ingredient</ModalHeader>
              <ModalBody>
                <IngredientAdd />
      
              </ModalBody>
          
            </Modal>
         </div>
         <div class="btn-group" role="group" aria-label="Button group example">
          <Button
                  color="dark"
                  onClick={toggle}
                >
                  Add Ingredient
          </Button>
         </div>
         <IngredientList />
        
     
      
        </div>
    )
  
}

export default Ingredient
   