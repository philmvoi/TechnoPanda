import React from "react";
import { graphql } from "react-apollo";
import HandleFormHook from "../Customer/handleFormHook";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label, Button } from 'reactstrap';
import {getMealStatQuery, AddMealStatMutation} from './queries';
import { compose } from "recompose";
    
const MealStatAdd = props => {
  const getFormData = () => {
    console.log(`${inputs}`);
  

  props.AddMealStatMutation({
    variables: {
      name: inputs.state_name
    },
    refetchQueries: [{query: getMealStatQuery}]
  });
};

  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );
  return (
    <>
      <Form onSubmit={handleSubmit}>
          
      
          <FormGroup>
            <Label>Meal Status <i className="text-danger">*</i></Label>
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
  graphql(getMealStatQuery, { name: "getMealStatQuery" }),
  graphql(AddMealStatMutation, { name: "AddMealStatMutation" })
)(MealStatAdd);

