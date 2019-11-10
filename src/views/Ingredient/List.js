import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getIngredientsQuery, EditIngredientMutation, DeleteIngredientMutation} from "./queries";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from "recompose";

const columns = [{
  Header: "INGREDIENTS",
  columns:
  [
    {
      Header: "ID",
      accessor: "ingredient_id",
    },
    {
      Header: "Name",
      accessor: "ingredient_name"
    }
    ]}
  ]

  
const IngredientList = props => {

  const [active, setActive] = useState(true)
  
  const [selected, setSelected] = useState({
      selected: [],
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //to hold the ingredient id
  const [id, setId] = useState({
      id: []
  });

  const [name, setName] = useState({
    name: [],
});

  function changeSelected(e) {
      setSelected(e)
  };



  const displayIngredients = () => {

    const handleDelete = () => {
      props.DeleteIngredientMutation({
        variables: {
          id: id
        },
        refetchQueries: [{query: getIngredientsQuery}]
      })
    }

    const handleSubmit = event => {
      if (event) event.preventDefault();
      props.EditIngredientMutation({
        variables: {
          id: id,
          name: name
        },
        refetchQueries: [{query: getIngredientsQuery}]
      });
    
    
    };
  

    const data = props.getIngredientsQuery;
    if (data.loading) {
      return <div>Loading Ingredients...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allIngredientJoin}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        changeSelected(rowInfo.index);
                        
                        setId(rowInfo.row._original.ingredient_id);
                        setName(rowInfo.row._original.ingredient_name)
                        setActive(false)
                    },
                    style: {
                        background: rowInfo.index === selected ? '#00afec' : 'white',
                        color: rowInfo.index === selected ? 'white' : 'black'
                    }
                    }
                }else{
                    return {}
                }
                }}
                filterable={true}
                defaultFilterMethod={(filter, row) =>
                String(row[filter.id]).indexOf(filter.value) > -1
              }
                columns={columns}
                defaultPageSize={7}
                style={{height: "400px"}}
                className="-striped -highlight"
            
            />

            <div>
                <Modal id="small" isOpen={modal} toggle={toggle} >
                  <ModalHeader toggle={toggle}>Edit Ingredient</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handleSubmit}>
              
          
                          <FormGroup>
                            <Label>Name <i className="text-danger">*</i></Label>
                            <Input
                              value={name}
                              name="name"
                              className="form-control"
                              onChange = {event => setName(event.target.value)}
                              required
                            />
                          </FormGroup>

                          <Button onClick={toggle} className="form-control" color="primary" type="submit">Edit Ingredient</Button>
              
                    </Form>
          
                  </ModalBody>
                </Modal>

                <div class="btn-group" role="group" aria-label="Button group example">
                   <Button disabled={active} color="primary" onClick={toggle}> Edit Ingredient </Button>
                   <Button disabled={active} color="danger" onClick={handleDelete}>  Delete Ingredient </Button>
                 </div>

            </div>

            </div>
        )
      
    }
  };

  return (
    <>
      {displayIngredients()}
      
    </>
  );
};

export default compose(
  graphql(getIngredientsQuery, { name: "getIngredientsQuery" }),
  graphql(EditIngredientMutation, { name: "EditIngredientMutation" }),
  graphql(DeleteIngredientMutation, { name: "DeleteIngredientMutation" }),
)(IngredientList);

