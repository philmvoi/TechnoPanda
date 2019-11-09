import React, {useState} from 'react';
import { loadPartialConfig } from '@babel/core';
import PackageList from './List'
import PackageAdd from './Add'






import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Package = () =>  { 
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


    return (
      <div>  
         <div>
            <Modal id="medium" isOpen={modal} toggle={toggle} >
              <ModalHeader toggle={toggle}>Add Package</ModalHeader>
              <ModalBody>
                <PackageAdd />
      
              </ModalBody>
          
            </Modal>
         </div>
         <div class="btn-group" role="group" aria-label="Button group example">
          <Button
                  color="dark"
                  onClick={toggle}
                >
                  Add Package
          </Button>
         </div>
         <PackageList />
     
      
        </div>
    )
  
}


export default Package
   