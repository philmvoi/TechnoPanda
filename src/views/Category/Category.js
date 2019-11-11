import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import CategoryAdd from './Add';

import CategoryList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Category = () =>  { 
  
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
                    Add Meal Category
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Meal Category</ModalHeader>
          <ModalBody>
            <CategoryAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <CategoryList />

      </div>
    )
  
}


    
export default Category
   