import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import PackStatAdd from './Add';

import PackStatList from './List';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const PackStatus = () =>  { 
  
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
                    Add Package Status
            </Button>
   
         <Modal id="small" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Package Status</ModalHeader>
          <ModalBody>
            <PackStatAdd />
  
          </ModalBody>

      </Modal>
         </div>
        <PackStatList />

      </div>
    )
  
}


    
export default PackStatus
   