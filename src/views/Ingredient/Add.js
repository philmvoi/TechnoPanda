import React from "react";
import { graphql } from "react-apollo";
import HandleFormHook from "../Customer/handleFormHook";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label, Button } from 'reactstrap';
import {AddIngredientMutation, getIngredientsQuery} from "./queries";
import { compose } from "recompose";
    
const IngredientAdd = props => {
  const getFormData = () => {
    console.log(`${inputs}`);
  

  props.AddIngredientMutation({
    variables: {
      status: 2,
      name: inputs.name
    },
    refetchQueries: [{query: getIngredientsQuery}]
  });
};

  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );
  return (
    <>
      <Form onSubmit={handleSubmit}>
          
      
          <FormGroup>
            <Label>Name <i className="text-danger">*</i></Label>
            <Input
              value={inputs.state_name}
              name="name"
              className="form-control"
              onChange = {handleInputChange}
              required
            />
          </FormGroup>

          <Button color="primary" type="submit">Save</Button>
          
      </Form>
 
    </>
  );
};

export default compose(
  graphql(getIngredientsQuery, { name: "getIngredientsQuery" }),
  graphql(AddIngredientMutation, { name: "AddIngredientMutation" })
)(IngredientAdd);


  
    
