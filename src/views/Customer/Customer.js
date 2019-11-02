import React, {useState} from 'react';
import HandleFormHook from './handleFormHook';
import DDown from '../Components/DDown';
import BaseSelect from "react-select";
import PropTypes from "prop-types";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Query,graphql } from 'react-apollo';
import { Table } from 'reactstrap';
import { loadPartialConfig } from '@babel/core';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import CustomerAdd from './CustomerAdd';

import CustomerList from './CustomerList';

import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
 



const Customer = () =>  { 
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


    return (
      <div>  
         <div>
         <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <CustomerAdd />
 
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
         </div>
        <CustomerList />
        <Container fluid>
      <Button
              className="my-2"
              color="primary"
              onClick={toggle}
            >
              Add State
      </Button>
      </Container>
      </div>
    )
  
}


// const Select = props => (
//   <DDown
//     {...props}
//     SelectComponent={BaseSelect}
//     options={null}
//   />
// );

// class Customer extends Component {
//     render() {
      
//       return (
//         <Form>
//           <div class="form-row">
//             <div class="form-group col-md-6">
//               <label for="fname">First Name <i className="text-danger">required</i></label>
//               <Input name='fname' class="form-control" placeholder="First Name" validations={[]}/>
//             </div>
//             <div class="form-group col-md-6">
//               <label for="lname">Last Name <i className="text-danger">required</i></label>
//               <input type="lname" class="form-control" id="lname" placeholder="Last Name"/>
//             </div>
//           </div>
//           <div class="form-row">
//             <div class="form-group col-md-4">
//               <label for="phone">Phone Number <i className="text-danger">required</i></label>
//               <input type="phone" class="form-control" id="phone" placeholder="999-990-0090"/>
//             </div>
//             <div class="form-group col-md-4">
//               <label for="email">Email <i className="text-danger">required</i></label>
//               <input type="email" class="form-control" id="email" placeholder="jane@yahoo.com"/>
//             </div>
//             <div class="form-group col-md-4">
//               <label for="instagram">Instagram</label>
//               <input type="instagram" class="form-control" id="instagram" placeholder="@fit_preps"/>
//             </div>
//           </div>
//           <div class="form-group">
//             <label for="address">Street Address</label>
//             <input type="text" class="form-control" id="adress" placeholder="1234 Main St"/>
//           </div>
          
//           <div class="form-row">
//             <div class="form-group col-md-6">
//               <label for="city">City</label>
//               <input type="text" class="form-control" id="city"/>
//             </div>
//             <div class="form-group col-md-4">
//               <label for="state">State</label>
//               <Select id="inputState" class="form-control"
//                   closeMenuOnSelect={false}
//                   options={null}
//                   hideSelectedOptions={false}
//                   backspaceRemovesValue={false}
//                   placeholder="Select a state"
//                   required
//                   />
             
//             </div>
//             <div class="form-group col-md-2">
//               <label for="zipcode">Zip</label>
//               <input type="text" class="form-control" id="zipcode"/>
//             </div>
//           </div>
//           <div class="form-row">
//             <div class="form-group col-md-6">
//               <label for="height">Height</label>
//               <input type="height" class="form-control" id="height" placeholder="6 foot 7"/>
//             </div>
//             <div class="form-group col-md-6">
//               <label for="weight">Weight</label>
//               <input type="weight" class="form-control" id="weight" placeholder="186.9"/>
//             </div>
//           </div>
//           <div class="form-group">
//               <label for="allergies">Allergies</label>
//               <textarea class="form-control" id="allergies" rows="3"></textarea>
//             </div>
//           <button type="submit" class="btn btn-primary">Save</button>
//         </Form>
//       )
//     }
//    }
    
export default Customer
   