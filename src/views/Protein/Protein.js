import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import ProteinAdd from './Add';

import ProteinList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Protein = () =>  { 
  
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
                    Add Protein
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Protein</ModalHeader>
          <ModalBody>
            <ProteinAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <ProteinList />

      </div>
    )
  
}


    
export default Protein
   