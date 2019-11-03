import React, {useState} from "react";
import { graphql } from "react-apollo";
import HandleFormHook from "../Customer/handleFormHook";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label, Button } from 'reactstrap';
import {getOrdersQuery, c, getOrderStatQuery, getCustomersQuery, getOfmQuery, getOpmQuery, getPlanQuery} from "./queries";
import { compose } from "recompose";
import Select from 'react-select';
    
const CustomerAdd = props => {

  

  
  const data = props.getStatesQuery;
  
  let cust = null;
  let status = null;
  let opm = null;
  let ofm = null;
  let plan =  null;
  const getFormData = () => {
    console.log(`${inputs}`);

    
  
  props.AddCustomerMutation({
    variables: {
        customer_id: cust,
        order_status_id: status,
        order_payment_method_id: opm,
        order_fulfillment_method_id: ofm,
        plan_type_id: plan,
        order_due_date: due,
        order_received_date: received,
        order_delivery_street: street,
        order_delivery_city: city,
        order_delivery_zipcode: $zip,
        order_completed_date: $completed,
        order_deliver_by: $delBy,
        order_total_price: $total,
        special_requirements: $spec,
        payment_amount: $pa
    },
    refetchQueries: [{query: getOrdersQuery}]
  });
};

  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );

  
  return (

    <>
          
      <Form onSubmit={handleSubmit}>
           <div class="form-row">
           <div class="form-group col-md-4">
               <label for="state">Customer</label>
               <Select id="inputCust" class="form-control"
                   closeMenuOnSelect={true}
                   value={inputs.cust}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select a customer"
                   required
                   onChange = {event => {
                     console.log(event.customer_id)
                     cust = event.customer_id
                     console.log(inputs.cust)
                   }}
                   name="cust"
                  //  labelKey='state_name'
                  //  valueKey='state_id'
                   options={data.allStates}
                   getOptionLabel={(option) => option.customer_phone_number}
                   getOptionValue={(option) => option.customer_id}
                   />
             
             </div>
             <div class="form-group col-md-4">
               <label for="state">Status</label>
               <Select id="inputState" class="form-control"
                   closeMenuOnSelect={true}
                   
                   value={inputs.status}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select a status"
                   required
                   onChange = {event => {
                     console.log(event.order_status_id)
                     status = event.order_status_id
                     console.log(inputs.status)
                   }}
                   name="status"
                  //  labelKey='state_name'
                  //  valueKey='state_id'
                   options={data.allStates}
                   getOptionLabel={(option) => option.order_status}
                   getOptionValue={(option) => option.order_status_id}
                   />
             
             </div>
             <div class="form-group col-md-4">
               <label for="opm">Payment Mthd</label>
               <Select id="inputState" class="form-control"
                   closeMenuOnSelect={false}
                   
                   value={inputs.opm}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select a payment mthd"
                   required
                   onChange = {event => {
                     console.log(event.order_payment_method_id)
                     opm = event.order_payment_method
                     console.log(inputs.opm)
                   }}
                   name="opm"
                  //  labelKey='state_name'
                  //  valueKey='state_id'
                   options={data.allStates}
                   getOptionLabel={(option) => option.order_payment_method}
                   getOptionValue={(option) => option.order_payment_method_id}
                   />
             
             </div>
             <div class="form-group col-md-4">
                <label for="ofm">Delivery/Pick-up</label>
                  <Select id="ofm" class="form-control"
                      closeMenuOnSelect={false}
                      
                      value={inputs.ofm}
                      hideSelectedOptions={false}
                      backspaceRemovesValue={false}
                      placeholder="Select a fulfillment mthd"
                      required
                      onChange = {event => {
                        console.log(event.order_fulfillment_method_id)
                        ofm = event.order_fulfillment_method_id
                        console.log(inputs.ofm)
                      }}
                      name="ofm"
                      //  labelKey='state_name'
                      //  valueKey='state_id'
                      options={data.allStates}
                      getOptionLabel={(option) => option.order_fulfillement_method}
                      getOptionValue={(option) => option.order_fulfillment_method_id}
                      />
             </div>
             <div class="form-group col-md-4">
                <label for="ofm">Plan</label>
                      <Select id="plan" class="form-control"
                          closeMenuOnSelect={false}
                          
                          value={inputs.plan}
                          hideSelectedOptions={false}
                          backspaceRemovesValue={false}
                          placeholder="Select a fulfillment mthd"
                          required
                          onChange = {event => {
                            console.log(event.plan_type_id)
                            plan = event.plan_type_id
                            console.log(inputs.plan)
                          }}
                          name="plan"
                          //  labelKey='state_name'
                          //  valueKey='state_id'
                          options={data.allStates}
                          getOptionLabel={(option) => option.plant_type}
                          getOptionValue={(option) => option.plan_type_id}
                          />
             </div>

             <div class="form-group col-md-4">
               <label for="phone">Due <i className="text-danger">required</i></label>
               <Input onChange = {handleInputChange} name="due" class="form-control" id="due" placeholder="2019-05-23"/>
             </div>
           </div>
           <div class="form-row">
             <div class="form-group col-md-4">
               <label for="phone">Received <i className="text-danger">required</i></label>
               <Input onChange = {handleInputChange} name="received" class="form-control" id="received" placeholder="2019-05-23"/>
             </div>
             <div class="form-group col-md-4">
               <label for="street">Delivery Street <i className="text-danger">required</i></label>
               <Input onChange = {handleInputChange} name="street" class="form-control" id="street" placeholder="123 main street"/>
             </div>
             <div class="form-group col-md-4">
               <label for="instagram">Instagram</label>
               <Input onChange = {handleInputChange} name="ig" class="form-control" id="instagram" placeholder="@fit_preps"/>
             </div>
           </div>
           <div class="form-group">
             <label for="address">Delivery Street</label>
             <Input onChange = {handleInputChange} name="street" class="form-control" id="street" placeholder="1234 Main St"/>
           </div>
          
           <div class="form-row">
             <div class="form-group col-md-6">
               <label for="city">City</label>
               <Input onChange = {handleInputChange} name="city" class="form-control" id="city"/>
             </div>
             <div class="form-group col-md-4">
               <label for="state">State</label>
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
  graphql(getOrdersQuery, { name: "getOrdersQuery" }),
  graphql(AddOrderMutation, { name: "AddOrderMutation" }),
  graphql(getOrderStatQuery, { name: "getOrderStatQuery" }),
  graphql(getCustomersQuery, { name: "getCustomersQuery" }),
  graphql(getOfmQuery, { name: "getOfmQuery" }),
  graphql(getOpmQuery, { name: "getOpmQuery" }),
  graphql(getPlanQuery, { name: "getPlanQuery" }),

)(CustomerAdd);


getOrdersQuery, AddOrderMutation, getOrderStatQuery, getCustomersQuery, getOfmQuery, getOpmQuery, getPlanQuery
    
