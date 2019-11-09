import React, {useState} from 'react';
import {getPackagesQuery, AddPackageMutation} from './queries'
import HandleFormHook from './handleFormHook';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label, Button } from 'reactstrap';
import { compose } from "recompose";
import { graphql } from "react-apollo";
import Select from 'react-select';

const PackageAdd = props => {
    const getFormData = () => {
      console.log(`${inputs}`);
    
    props.AddPackageMutation({
      variables: {
        status: 2,
        name: inputs.name,
        quant: inputs.quant,
        desc: inputs.desc,

      },
      refetchQueries: [{query: getPackagesQuery}]
    });
  };


  
    const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
      getFormData
    );
    return (
      <>
        
        <Form onSubmit={handleSubmit}>

           <div  class="form-row">
             <div  class="form-group col-md-4">
               <label for="name">Name <i className="text-danger">*</i></label>
               <Input required onChange = {handleInputChange} name="name" class="form-control" id="name" />
             </div>
             <div  class="form-group col-md-4">
               <label for="quant">Meal Quantity <i className="text-danger">*</i></label>
               <Input required onChange = {handleInputChange} name="quant" class="form-control" id="quant"/>
             </div>
           </div>
          <div class="form-group">
         <label for="quant">Description</label>
               <Input onChange = {handleInputChange} name="desc" class="form-control" id="desc"/>
         </div>
         <div>

         </div>
           
           <Button type="submit" class="btn btn-primary">Save</Button>
      </Form>
   
      </>
    );
  };
  
  export default compose(
    graphql(getPackagesQuery, { name: "getPackagesQuery" }),
    graphql(AddPackageMutation, { name: "AddPackageMutation" }),
  )(PackageAdd);

