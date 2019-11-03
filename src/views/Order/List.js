import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getOrdersQuery} from "./queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from "recompose";

const columns = [
    {
      Header: "ID",
      accessor: "order_id",
    },
    {
      Header: "Customer ID",
      accessor: "customer_id",
      show: false
    },
    {
      Header: "Last Name",
      accessor: "customer_last_name",
    },
    {
      Header: "Phone",
      accessor: "customer_phone_number",
    },
    {
      Header: "Order Status ID",
      accessor: "order_status_id",
      show: false
    },
    {
      Header: "Status",
      accessor: "order_status_id",
    },
    {
      Header: "Pay Method ID",
      accessor: "order_payment_method_id",
      show: false
    },
    {
      Header: "Pay Method",
      accessor: "order_payment_method"
    },
    {
      Header: "Delivery/Pick-up Id",
      accessor: "order_fulfillment_method_id",
      show: false
    },
    {
      Header: "Delivery/Pick-up",
      accessor: "order_fulfillement_method"
    },
    {
      Header: "Plan Id",
      accessor: "plan_type_id",
      show: false
    },
    {
      Header: "Received",
      accessor: "order_received_date"
    },
    {
      Header: "Due",
      accessor: "order_due_date"
    },
    {
      Header: "Delivery Street",
      accessor: "order_delivery_street"
    },
    {
      Header: "Delivery City",
      accessor: "order_delivery_city"
    },
    {
      Header: "Delivery Zip ",
      accessor: "order_delivery_zipcode"
    },
    {
      Header: "Complete Date",
      accessor: "order_completed_date"
    },
    {
      Header: "Delivery By",
      accessor: "order_deliver_by"
    },
    {
      Header: "Total",
      accessor: "order_total_price"
    },
    {
      Header: " Special Reqs",
      accessor: "special_requirements"
    },
    {
      Header: "Payment Amt",
      accessor: "payment_amount"
    }
  ]

  
const OrderList = props => {
  
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


  const displayOrders = () => {

    // const handleSubmit = event => {
    //   if (event) event.preventDefault();
    //   props.EditStateMutation({
    //     variables: {
    //       id: row,
    //       name: name
    //     },
    //     refetchQueries: [{query: getStatesQuery}]
    //   });
    
    
    // };
    // const handleInputChange = event => {
    //   event.persist();
    //   changeName(event.target.value);
    // };
  

    const data = props.getOrdersQuery;
    if (data.loading) {
      return <div>Loading Orders...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allOrders}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        changeSelected(rowInfo.index);
                        
                        // changeRow(rowInfo.row._original.state_id);
                        // changeName(rowInfo.row._original.state_name)
                        // console.log(name);
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
{/* 
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
            </div> */}

            </div>
        )
      
    }
  };

  return (
    <>
      {displayOrders()}
      
    </>
  );
};

export default compose(
  graphql(getOrdersQuery, { name: "getOrdersQuery" }),

)(OrderList);

