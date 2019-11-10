import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getCustStatQuery, EditCustStatMutation, DeleteCustStatMutation} from "./queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from "recompose";

const columns = [
    {
      Header: "ID",
      accessor: "customer_status_id",
    },
    {
      Header: "Customer Status",
      accessor: "customer_status"
    }
  ]

  
const CustStatList = props => {

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


  const displayStatuses = () => {

    const handleDelete = () => {
        props.DeleteCustStatMutation({
          variables: {
            id: row
          },
          refetchQueries: [{query: getCustStatQuery}]
        })
      }

    const handleSubmit = event => {
      if (event) event.preventDefault();
      props.EditCustStatMutation({
        variables: {
          id: row,
          name: name
        },
        refetchQueries: [{query: getCustStatQuery}]
      });
    
    
    };
    const handleInputChange = event => {
      event.persist();
      changeName(event.target.value);
    };
  

    const data = props.getCustStatQuery;
    if (data.loading) {
      return <div>Loading Customer Statuses...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allCustStat}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        changeSelected(rowInfo.index);
                        
                        changeRow(rowInfo.row._original.customer_status_id);
                        changeName(rowInfo.row._original.customer_status)
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
                  <ModalHeader toggle={toggle}>Edit Customer Status</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handleSubmit}>
              
          
                          <FormGroup>
                            <Label> Customer Status <i className="text-danger">*</i></Label>
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
                   <Button disabled={active} color="primary" onClick={toggle}> Edit Customer Status </Button>
                   <Button disabled={active} color="danger" onClick={handleDelete}>  Delete Customer Status </Button>
                 </div>

            </div>

            </div>
        )
      
    }
  };

  return (
    <>
      {displayStatuses()}
      
    </>
  );
};

export default compose(
  graphql(getCustStatQuery, { name: "getCustStatQuery" }),
  graphql(EditCustStatMutation, { name: "EditCustStatMutation" }),
  graphql(DeleteCustStatMutation, { name: "DeleteCustStatMutation" }),
)(CustStatList);

