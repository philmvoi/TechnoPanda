import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getStatesQuery, EditStateMutation} from "../Customer/queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from "recompose";

const columns = [
    {
      Header: "ID",
      accessor: "state_id",
    },
    {
      Header: "State Name",
      accessor: "state_name"
    }
  ]

  
const CustomerList = props => {
  
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


  const displayStates = () => {

    const handleSubmit = event => {
      if (event) event.preventDefault();
      props.EditStateMutation({
        variables: {
          id: row,
          name: name
        },
        refetchQueries: [{query: getStatesQuery}]
      });
    
    
    };
    const handleInputChange = event => {
      event.persist();
      changeName(event.target.value);
    };
  

    const data = props.getStatesQuery;
    if (data.loading) {
      return <div>Loading States...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allStates}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        changeSelected(rowInfo.index);
                        
                        changeRow(rowInfo.row._original.state_id);
                        changeName(rowInfo.row._original.state_name)
                        console.log(name);
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
                <Modal isOpen={modal} toggle={toggle} >
                  <ModalHeader toggle={toggle}>Edit State</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handleSubmit}>
              
          
                          <FormGroup>
                            <Label>State Name</Label>
                            <Input
                              value={name}
                              name="state_name"
                              className="form-control"
                              onChange = {handleInputChange}
                              required
                            />
                          </FormGroup>

                          <Button onClick={toggle} className="form-control" color="primary" type="submit">Edit State</Button>
              
                    </Form>
          
                  </ModalBody>
                </Modal>

                <Container fluid>
                  <Button
                          className="my-2"
                          color="primary"
                          onClick={toggle}
                        >
                          Edit
                  </Button>
                </Container>
            </div>

            </div>
        )
      
    }
  };

  return (
    <>
      {displayStates()}
      
    </>
  );
};

export default compose(
  graphql(getStatesQuery, { name: "getStatesQuery" }),
  graphql(EditStateMutation, { name: "EditStateMutation" })
)(CustomerList);

