import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import OpmAdd from './Add';

import OpmList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Opm = () =>  { 
  
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
                    Add Payment Method
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Payment Method</ModalHeader>
          <ModalBody>
            <OpmAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <OpmList />

      </div>
    )
  
}


    
export default Opm
   