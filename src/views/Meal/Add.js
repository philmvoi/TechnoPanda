import React, {useState} from 'react';
import {getMealsQuery, getProteinQuery, getMealCategory, AddMealMutation} from './queries'
import HandleFormHook from './handleFormHook';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label, Button } from 'reactstrap';
import { compose } from "recompose";
import { graphql } from "react-apollo";
import Select from 'react-select';

let protein_id = null;
let category_id = null;
const MealAdd = props => {
    const getFormData = () => {
      console.log(`${inputs}`);
    
    props.AddMealMutation({
      variables: {
        status: 2,
        catg: category_id,
        protein: protein_id,
        name: inputs.name,
        desc: inputs.desc,
        addProt: inputs.addoz,

      },
      refetchQueries: [{query: getMealsQuery}]
    });
  };

  //Retreiving protein type data
  const protData = props.getProteinQuery;
  const catgData = props.getMealCategory;
  
    const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
      getFormData
    );
    return (
      <>
        
        <Form onSubmit={handleSubmit}>
           <div class="form-row">
           <div class="form-group col-md-6">
               <label for="protein">Protein <i className="text-danger">*</i></label>
               <Select id="protein" class="form-control"
                   {...props}
                   closeMenuOnSelect={true}
                   value={inputs.protein}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select.."
                   required
                   onChange = {event => {
                     
                    protein_id = event.protein_type_id
                    console.log(protein_id)
                   }}
                   name="protein"
                   options={protData.allProType}
                   getOptionLabel={(option) => option.protein_type}
                   getOptionValue={(option) => option.protein_type_id}
                   />
             
             </div>
             <div className="form-group col-md-6">
               <label for="catg">Category<i className="text-danger">*</i></label>
               <Select id="catg" class="form-control"
                   closeMenuOnSelect={true}
              
                   value={inputs.catg}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select.."
                   required
                   onChange = {event => {
                     console.log(event.meal_category_id)
                     category_id = event.meal_category_id
                   
                   }}
                   name="catg"
                   options={catgData.allMealCat}
                   getOptionLabel={(option) => option.description_}
                   getOptionValue={(option) => option.meal_category_id}
                   />
             
             </div>
           </div>
           <div class="form-row">
             <div  class="form-group col-md-4">
               <label for="name">Name <i className="text-danger">*</i></label>
               <Input required onChange = {handleInputChange} name="name" class="form-control" id="name" />
             </div>
             <div  class="form-group col-md-3">
               <label for="addoz">Add Protein</label>
               <Input onChange = {handleInputChange} name="addoz" class="form-control" id="addoz"/>
             </div>
           </div>
         <div class="form-group">
               <label for="desc">Description</label>
               <textarea onChange = {handleInputChange} name="desc"class="form-control" id="desc" rows="4"></textarea>
        </div>
           
           <Button type="submit" class="btn btn-primary">Save</Button>
      </Form>
   
      </>
    );
  };
  
  export default compose(
    graphql(getMealsQuery, { name: "getMealsQuery" }),
    graphql(getProteinQuery, { name: "getProteinQuery" }),
    graphql(getMealCategory, { name: "getMealCategory" }),
    graphql(AddMealMutation, { name: "AddMealMutation" }),
  )(MealAdd);

