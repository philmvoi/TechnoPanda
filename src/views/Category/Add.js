import React from "react";
import { graphql } from "react-apollo";
import HandleFormHook from "../Customer/handleFormHook";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label, Button } from 'reactstrap';
import {getCategoryQuery, AddCategoryMutation} from './queries';
import { compose } from "recompose";
    
const CategoryAdd = props => {
  const getFormData = () => {
    console.log(`${inputs}`);
  

  props.AddCategoryMutation({
    variables: {
      name: inputs.state_name
    },
    refetchQueries: [{query: getCategoryQuery}]
  });
};

  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );
  return (
    <>
      <Form onSubmit={handleSubmit}>
          
      
          <FormGroup>
            <Label>Meal Category <i className="text-danger">*</i></Label>
            <Input
              value={inputs.state_name}
              name="state_name"
              className="form-control"
              onChange = {handleInputChange}
              required
            />
          </FormGroup>

          <Button className="form-control" type="submit">Save</Button>
          
      </Form>
 
    </>
  );
};

export default compose(
  graphql(getCategoryQuery, { name: "getCategoryQuery" }),
  graphql(AddCategoryMutation, { name: "AddCategoryMutation" })
)(CategoryAdd);



