import React from "react";
import { graphql } from "react-apollo";
import HandleFormHook from "../Customer/handleFormHook";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label, Button } from 'reactstrap';
import {getStatesQuery, AddStateMutation} from "../Customer/queries";
import { compose } from "recompose";
    
const CustomerAdd = props => {
  const getFormData = () => {
    console.log(`${inputs}`);
  

  props.AddStateMutation({
    variables: {
      name: inputs.state_name
    },
    refetchQueries: [{query: getStatesQuery}]
  });
};

  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );
  return (
    <>
      <Form onSubmit={handleSubmit}>
          
      
          <FormGroup>
            <Label>State Name</Label>
            <Input
              value={inputs.state_name}
              name="state_name"
              className="form-control"
              onChange = {handleInputChange}
              required
            />
          </FormGroup>

          <Button color="primary" type="submit">Add State</Button>
          
      </Form>
 
    </>
  );
};

export default compose(
  graphql(getStatesQuery, { name: "getStatesQuery" }),
  graphql(AddStateMutation, { name: "AddStateMutation" })
)(CustomerAdd);


  
    
