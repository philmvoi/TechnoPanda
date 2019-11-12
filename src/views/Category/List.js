import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getCategoryQuery, EditCategoryMutation, DeleteCategoryMutation} from "./queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from "recompose";

const columns = [
    {
      Header: "ID",
      accessor: "meal_category_id",
    },
    {
      Header: "Meal Category",
      accessor: "description_"
    }
  ]

  
const CategoryList = props => {

  const [active, setActive] = useState(true)  
  
  const [selected, setSelected] = useState({
      selected: [],
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [row, setRow] = useState({
      row: []
  });

  const [name, setName] = useState({
    name: [],
});

  function changeSelected(e) {
      setSelected(e)
  };

  function changeRow(e) {
    setRow(e)
  };

  function changeName(e) {
    setName(e)
  };


  const displayCategories = () => {

    const handleDelete = () => {
        props.DeleteCategoryMutation({
          variables: {
            id: row
          },
          refetchQueries: [{query: getCategoryQuery}]
        })
      }

    const handleSubmit = event => {
      if (event) event.preventDefault();
      props.EditCategoryMutation({
        variables: {
          id: row,
          name: name
        },
        refetchQueries: [{query: getCategoryQuery}]
      });
    
    
    };
    const handleInputChange = event => {
      event.persist();
      changeName(event.target.value);
    };
  

    const data = props.getCategoryQuery;
    if (data.loading) {
      return <div>Loading Meal Categories...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allMealCat}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        changeSelected(rowInfo.index);
                        
                        changeRow(rowInfo.row._original.meal_category_id);
                        changeName(rowInfo.row._original.description_)
                        console.log(name);
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
                  <ModalHeader toggle={toggle}>Edit Meal Category</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handleSubmit}>
              
          
                          <FormGroup>
                            <Label> Meal Category <i className="text-danger">*</i></Label>
                            <Input
                              value={name}
                              name="state_name"
                              className="form-control"
                              onChange = {handleInputChange}
                              required
                            />
                          </FormGroup>

                          <Button className="form-control" type="submit">Save</Button>
              
                    </Form>
          
                  </ModalBody>
                </Modal>

                <div class="btn-group" role="group" aria-label="Button group example">
                   <Button disabled={active} color="primary" onClick={toggle}> Edit Meal Category </Button>
                   <Button disabled={active} color="danger" onClick={handleDelete}>  Delete Meal Category </Button>
                 </div>

            </div>

            </div>
        )
      
    }
  };

  return (
    <>
      {displayCategories()}
      
    </>
  );
};

export default compose(
  graphql(getCategoryQuery, { name: "getCategoryQuery" }),
  graphql(EditCategoryMutation, { name: "EditCategoryMutation" }),
  graphql(DeleteCategoryMutation, { name: "DeleteCategoryMutation" }),
)(CategoryList);

