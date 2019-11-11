import React, {useState} from "react";
import { graphql } from "react-apollo";
import HandleFormHook from "../Customer/handleFormHook";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label, Button } from 'reactstrap';
import {getOrdersQuery, AddOrderMutation, getOrderStatQuery, getCustomersQuery, getOfmQuery, getOpmQuery, getPlanQuery} from "./queries";
import { compose } from "recompose";
import Select from 'react-select';
    

 //this is to retieve the ID values for the drop downs once a selection is made
 let cust_id = null;
 let status_id = null;
 let opm_id = null;
 let ofm_id = null;
 let plan_id =  null;

const OrderAdd = props => {

  //retreiving data for the drop downs
  const customerData = props.getCustomersQuery;
  const orderStatData = props.getOrderStatQuery;
  const opmData = props.getOpmQuery;
  const ofmData = props.getOfmQuery;
  const planData = props.getPlanQuery;
  
 

  const getFormData = () => {
    console.log(`${inputs}`);

    
  //Query to insert data into order table
  props.AddOrderMutation({
    variables: {
      cust: cust_id,
      status: status_id,
      opm: opm_id,
      ofm: ofm_id,
      plan: plan_id,
      due: inputs.due,
      received: inputs.received,
      street: inputs.street,
      city: inputs.city,
      zip: inputs.zip,
      completed: inputs.completed,
      delBy: inputs.delBy,
      total: inputs.total,
      spec: inputs.spec,
      pa: inputs.pa
    },
    refetchQueries: [{query: getOrdersQuery}]
  });
};


// this is basically a hook that is being imported to handle the form inputs and submission
  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );

  
  return (

    <>
          
      <Form onSubmit={handleSubmit}>
           <div class="form-row">
           <div class="form-group col-md-4">
               <label for="cust">Customer <i className="text-danger">*</i></label>
               <Select id="cust" class="form-control"
                   {...props}
                   closeMenuOnSelect={true}
                   value={inputs.cust}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select.."
                   required
                   onChange = {event => {
                     
                    cust_id = event.customer_id
                    console.log(cust_id)
                   }}
                   name="cust"
                   options={customerData.allCustomers}
                   getOptionLabel={(option) => `${option.customer_first_name} ${option.customer_last_name}, ${option.customer_phone_number} `}
                   getOptionValue={(option) => option.customer_id}
                   />
             
             </div>
             <div className="form-group col-md-4">
               <label for="status">Status<i className="text-danger">*</i></label>
               <Select id="status" class="form-control"
                   closeMenuOnSelect={true}
                   
                   value={inputs.status}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select.."
                   required
                   onChange = {event => {
                     console.log(event.order_status_id)
                     status_id = event.order_status_id
                     console.log(inputs.status)
                   }}
                   name="status"
                   options={orderStatData.allOrderStat}
                   getOptionLabel={(option) => option.order_status}
                   getOptionValue={(option) => option.order_status_id}
                   />
             
             </div>
             <div class="form-group col-md-4">
               <label for="opm">Payment Method<i className="text-danger">*</i></label>
               <Select id="opm" class="form-control"
                   {...props}
                   closeMenuOnSelect={true}
                   
                   value={inputs.opm}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select.."
                   required
                   onChange = {event => {
                     console.log(event.order_payment_method_id)
                     opm_id = event.order_payment_method_id
                     console.log(inputs.opm)
                   }}
                   name="opm"
                   options={opmData.allOpm}
                   getOptionLabel={(option) => option.order_payment_method}
                   getOptionValue={(option) => option.order_payment_method_id}
                   />
             
             </div>
             <div class="form-group col-md-4">
                <label for="ofm">Delivery/Pick-up <i className="text-danger">*</i></label>
                  <Select id="ofm" class="form-control"
                       {...props}
                      closeMenuOnSelect={true}
                      
                      value={inputs.ofm}
                      hideSelectedOptions={false}
                      backspaceRemovesValue={false}
                      placeholder="Select.."
                      required
                      onChange = {event => {
                        console.log(event.order_fulfillment_method_id)
                        ofm_id = event.order_fulfillment_method_id
          
                      }}
                      name="ofm"
                      options={ofmData.allOfm}
                      getOptionLabel={(option) => option.order_fulfillement_method}
                      getOptionValue={(option) => option.order_fulfillment_method_id}
                      />
             </div>
             <div class="form-group col-md-4">
                <label for="plan">Plan <i className="text-danger">*</i></label>
                      <Select id="plan" class="form-control"
                          closeMenuOnSelect={true}
                          
                          value={inputs.plan}
                          hideSelectedOptions={false}
                          backspaceRemovesValue={false}
                          placeholder="Select.."
                          required
                          onChange = {event => {
                            console.log(event.plan_type_id)
                            plan_id = event.plan_type_id
                    
                          }}
                          name="plan"
                          options={planData.allPlanType}
                          getOptionLabel={(option) => option.plan_type}
                          getOptionValue={(option) => option.plan_type_id}
                          />
             </div>

             <div class="form-group col-md-4">
               <label for="received">Received <i className="text-danger">*</i></label>
               <Input required onChange = {handleInputChange} name="received" class="form-control" id="received" placeholder="YYYY-MM-DD"/>
             </div>
           </div>
           <div class="form-row">
             <div class="form-group col-md-4">
               <label for="due">Due <i className="text-danger">*</i></label>
               <Input required onChange = {handleInputChange} name="due" class="form-control" id="received" placeholder="YYYY-MM-DD"/>
             </div>
             <div class="form-group col-md-4">
               <label for="city">Delivery city</label>
               <Input onChange = {handleInputChange} name="city" class="form-control" id="city" />
             </div>
             <div class="form-group col-md-4">
               <label for="zip">Zip code</label>
               <Input onChange = {handleInputChange} name="zip" class="form-control" id="zip" />
             </div>
           </div>
           
           <div class="form-group col-md-14">
               <label for="street">Delivery Street</label>
               <Input onChange = {handleInputChange} name="street" class="form-control" id="street"/>
             </div>
           <div class="form-row">
           <div class="form-group col-md-3">
             <label for="completed">Completed Date</label>
             <Input onChange = {handleInputChange} name="completed" class="form-control" id="completed" placeholder="YYYY-MM-DD"/>
           </div>
             <div class="form-group col-md-3">
             <label for="delBy">Delivery By</label>
               <Input onChange = {handleInputChange} name="delBy" class="form-control" id="delBy"/>
             </div>
             <div class="form-group col-md-2">
               <label for="total">Total <i className="text-danger">*</i></label>
               <Input onChange = {handleInputChange} name="total" class="form-control" id="total"/>
             </div>
             <div class="form-group col-md-2">
             <label for="completed">Payment</label>
             <Input onChange = {handleInputChange} name="pa" class="form-control" id="pa" />
           </div>
           </div>
           <div class="form-row">
         </div>
         <div class="form-group">
               <label for="spec">Special Reqs</label>
               <textarea onChange = {handleInputChange} name="spec"class="form-control" id="spec" rows="4"></textarea>
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
)(OrderAdd);


    
