import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getOpmQuery, EditOpmMutation, DeleteOpmMutation} from "./queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from "recompose";

const columns = [       
    {
      Header: "ID",
      accessor: "order_payment_method_id",
    },
    {
      Header: "Payment Method",
      accessor: "order_payment_method"
    }
  ]

  
const OpmList = props => {

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


  const displayOpm = () => {

    const handleDelete = () => {
        props.DeleteOpmMutation({
          variables: {
            id: row
          },
          refetchQueries: [{query: getOpmQuery}]
        })
      }

    const handleSubmit = event => {
      if (event) event.preventDefault();
      props.EditOpmMutation({
        variables: {
          id: row,
          name: name
        },
        refetchQueries: [{query: getOpmQuery}]
      });
    
    
    };
    const handleInputChange = event => {
      event.persist();
      changeName(event.target.value);
    };
  

    const data = props.getOpmQuery;
    if (data.loading) {
      return <div>Loading Payment Methods...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allOpm}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        changeSelected(rowInfo.index);
                        
                        changeRow(rowInfo.row._original.order_payment_method_id);
                        changeName(rowInfo.row._original.order_payment_method)
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
                  <ModalHeader toggle={toggle}>Edit Payment Method</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handleSubmit}>
              
          
                          <FormGroup>
                            <Label> Payment Method <i className="text-danger">*</i></Label>
                            <Input
                              value={name}
                              name="state_name"
                              className="form-control"
                              onChange = {handleInputChange}
                              required
                            />
                          </FormGroup>

                          <Button onClick={toggle} className="form-control" type="submit">Save</Button>
              
                    </Form>
          
                  </ModalBody>
                </Modal>

                <div class="btn-group" role="group" aria-label="Button group example">
                   <Button disabled={active} color="primary" onClick={toggle}> Edit Payment Method </Button>
                   <Button disabled={active} color="danger" onClick={handleDelete}>  Delete Payment Method </Button>
                 </div>

            </div>

            </div>
        )
      
    }
  };

  return (
    <>
      {displayOpm()}
      
    </>
  );
};

export default compose(
  graphql(getOpmQuery, { name: "getOpmQuery" }),
  graphql(EditOpmMutation, { name: "EditOpmMutation" }),
  graphql(DeleteOpmMutation, { name: "DeleteOpmMutation" }),
)(OpmList);

