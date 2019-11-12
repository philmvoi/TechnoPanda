import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getOfmQuery, EditOfmMutation, DeleteOfmMutation} from "./queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from "recompose";

const columns = [
    {
      Header: "ID",
      accessor: "order_fulfillment_method_id",
    },
    {
      Header: "Fulfillment Method",
      accessor: "order_fulfillement_method"
    }
  ]

  
const OfmList = props => {

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


  const displayOfm = () => {

    const handleDelete = () => {
        props.DeleteOfmMutation({
          variables: {
            id: row
          },
          refetchQueries: [{query: getOfmQuery}]
        })
      }

    const handleSubmit = event => {
      if (event) event.preventDefault();
      props.EditOfmMutation({
        variables: {
          id: row,
          name: name
        },
        refetchQueries: [{query: getOfmQuery}]
      });
    
    
    };
    const handleInputChange = event => {
      event.persist();
      changeName(event.target.value);
    };
  

    const data = props.getOfmQuery;
    if (data.loading) {
      return <div>Loading Fulfillment Method...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allOfm}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        changeSelected(rowInfo.index);
                        
                        changeRow(rowInfo.row._original.order_fulfillment_method_id);
                        changeName(rowInfo.row._original.order_fulfillement_method)
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
                  <ModalHeader toggle={toggle}>Edit Fulfillment Method</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handleSubmit}>
              
          
                          <FormGroup>
                            <Label> Fulfillment Method <i className="text-danger">*</i></Label>
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
                   <Button disabled={active} color="primary" onClick={toggle}> Edit Fulfillment Method </Button>
                   <Button disabled={active} color="danger" onClick={handleDelete}>  Delete Fulfillment Method </Button>
                 </div>

            </div>

            </div>
        )
      
    }
  };

  return (
    <>
      {displayOfm()}
      
    </>
  );
};

export default compose(
  graphql(getOfmQuery, { name: "getOfmQuery" }),
  graphql(EditOfmMutation, { name: "EditOfmMutation" }),
  graphql(DeleteOfmMutation, { name: "DeleteOfmMutation" }),
)(OfmList);



