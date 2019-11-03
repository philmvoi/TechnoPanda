import React, {useState} from "react";
import { graphql } from "react-apollo";
import HandleFormHook from "../Customer/handleFormHook";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label, Button } from 'reactstrap';
import {getStatesQuery, AddCustomerMutation, getCustomersQuery} from "./queries";
import { compose } from "recompose";
import Select from 'react-select';
    
const CustomerAdd = props => {

  

  
  const data = props.getStatesQuery;
  
  let state_id = null;
  const getFormData = () => {
    console.log(`${inputs}`);
  
  props.AddCustomerMutation({
    variables: {
      state: state_id,
      status: 1,
      phone: inputs.phone,
      fname: inputs.fname,
      lname: inputs.lname,
      email: inputs.email,
      city: inputs.city,
      street: inputs.street,
      zip: inputs.zip,
      h: inputs.h,
      w: inputs.w,
      allergies: inputs.allergies,
      ig: inputs.ig
    },
    refetchQueries: [{query: getCustomersQuery}]
  });
};

  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );

  
  return (

    <>
          
      <Form onSubmit={handleSubmit}>
           <div class="form-row">
             <div class="form-group col-md-6">
               <label for="fname">First Name <i className="text-danger">required</i></label>
               <Input onChange = {handleInputChange} name='fname' class="form-control" placeholder="First Name" required/>
             </div>
             <div class="form-group col-md-6">
               <label for="lname">Last Name <i className="text-danger">required</i></label>
               <Input onChange = {handleInputChange} name="lname" class="form-control" id="lname" placeholder="Last Name" required/>
             </div>
           </div>
           <div class="form-row">
             <div class="form-group col-md-4">
               <label for="phone">Phone <i className="text-danger">required</i></label>
               <Input required onChange = {handleInputChange} name="phone" class="form-control" id="phone" placeholder="999-990-0090"/>
             </div>
             <div class="form-group col-md-4">
               <label for="email">Email <i className="text-danger">required</i></label>
               <Input onChange = {handleInputChange} name="email" class="form-control" id="email" placeholder="jane@yahoo.com"/>
             </div>
             <div class="form-group col-md-4">
               <label for="instagram">Instagram</label>
               <Input onChange = {handleInputChange} name="ig" class="form-control" id="instagram" placeholder="@fit_preps"/>
             </div>
           </div>
           <div class="form-group">
             <label for="address">Street Address</label>
             <Input onChange = {handleInputChange} name="street" class="form-control" id="adress" placeholder="1234 Main St"/>
           </div>
          
           <div class="form-row">
             <div class="form-group col-md-6">
               <label for="city">City</label>
               <Input onChange = {handleInputChange} name="city" class="form-control" id="city"/>
             </div>
             <div class="form-group col-md-4">
               <label for="state">State <i className="text-danger">required</i></label>
               <Select id="inputState" class="form-control"
                   closeMenuOnSelect={false}
                   
                   value={inputs.state}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select a state"
                   required
                   onChange = {event => {
                     console.log(event.state_id)
                     state_id = event.state_id
                     console.log(inputs.state)
                   }}
                   name="state"
                   labelKey='state_name'
                   valueKey='state_id'
                   options={data.allStates}
                   getOptionLabel={(option) => option.state_name}
                   getOptionValue={(option) => option.state_id}
                   required={true}
                   />
             
             </div>
             <div class="form-group col-md-2">
               <label for="zipcode">Zip</label>
               <Input onChange = {handleInputChange} name="zip" class="form-control" id="zipcode"/>
             </div>
           </div>
           <div class="form-row">
             <div class="form-group col-md-6">
               <label for="height">Height</label>
               <Input onChange = {handleInputChange} name="h" class="form-control" id="height" placeholder="6 foot 7"/>
             </div>
             <div class="form-group col-md-6">
               <label for="weight">Weight</label>
               <Input onChange = {handleInputChange} name="w" class="form-control" id="weight" placeholder="186.9"/>
             </div>
           </div>
           <div class="form-group">
               <label for="allergies">Allergies</label>
               <textarea onChange = {handleInputChange} name="allergies"class="form-control" id="allergies" rows="3"></textarea>
             </div>
           <Button type="submit" class="btn btn-primary">Save</Button>
      </Form>
         
          
 
    </>
  );
};

export default compose(
  graphql(getStatesQuery, { name: "getStatesQuery" }),
  graphql(AddCustomerMutation, { name: "AddCustomerMutation" }),
  graphql(getCustomersQuery, { name: "getCustomersQuery" })

)(CustomerAdd);


  
    
