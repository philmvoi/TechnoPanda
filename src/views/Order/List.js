//this file has the table for the orders as well as the edit functionality and button
import React, {useState} from "react";
import { graphql } from "react-apollo";
import 'react-table/react-table.css';
import ReactTable from 'react-table';


import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from 'recompose';
import Select from 'react-select';

import { getOrderOrderlines, getOrdersQuery, EditOrderMutation, getOrderStatQuery, getCustomersQuery, getOfmQuery, getOpmQuery, getPlanQuery} from './queries';




// columns for the orderline table
const olColumns = [
  {
    Header: "ID",
    accessor: "order_line_id",
  }, 
  {
    Header: "Order ID",
    accessor: "order_id",
  },
  {
    Header: "Package Name",
    accessor: "package_name",
  },
  {
    Header: "Package Desc",
    accessor: "package_description",
  },
  {
    Header: "Quantity",
    accessor: "order_line_quantity",
  },
  {
    Header: "Price",
    accessor: "price",
  },
];

// columns for the order table
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
      Header: "Plan",
      accessor: "plan_type",
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
  ];



// To hold the selected row customer information
  let selectedCustomer = {
    customer_id: '',
    customer_phone_number: ''
  };

  const handleCustomerChange =(e, j) => {
    selectedCustomer.customer_id = e
    selectedCustomer.customer_phone_number = j
  };
// To hold the selected row status information
  let selectedOrderStat = {
    order_status_id: '',
    order_status: ''
  };

  const handleOrderStatChange =(e, j) => {
    selectedOrderStat.order_status_id = e
    selectedOrderStat.order_status = j
  };

 // To hold the selected row opm information 
  let selectedOpm = {
    order_payment_method_id: '',
    order_payment_method: ''
  };

  const handleOpmChange =(e, j) => {
    selectedOpm.order_payment_method_id = e
    selectedOpm.order_payment_method = j
  };

  // To hold the selected row ofm information
  let selectedOfm = {
    order_fulfillment_method_id: '',
    order_fulfillement_method: ''
  };  

  const handleOfmChange =(e, j) => {
    selectedOfm.order_fulfillment_method_id = e
    selectedOfm.order_fulfillement_method = j
  };
// To hold the selected row plan information
  let selectedPlan = {
    plan_type_id: '',
    plan_type: ''
  }; 
  
  const handlePlanChange =(e, j) => {
    selectedPlan.plan_type_id = e
    selectedPlan.plan_type = j
  };

const OrderList = props => {

  //the selected column
  const [selected, setSelected] = useState({
      selected: [],
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //to hold and set the order_id value
const [row, setRow] = useState({
      row: []
  });

  //to hold and set the due date value 
const [due, setDue] = useState({
    due: [],
});

  //to hold and set the received date value 
const [received, setReceived] = useState({
  received: [],
});

  //to hold and set the delivery street address value 
const [street, setStreet] = useState({
  street: [],
});

 //to hold and set the delivery city value 
const [city, setCity] = useState({
  city: [],
});

 //to hold and set the delivery zip value 
const [zip, setZip] = useState({
  zip: [],
});

 //to hold and set the completed date value 
const [completed, setCompleted] = useState({
  completed: [],
});

 //to hold and set the delivery by value 
const [delBy, setDelBy] = useState({
  delBy: [],
});

 //to hold and set the order total value 
const [total, setTotal] = useState({
  total: [],
});

 //to hold and set the special requirements value 
const [spec, setSpec] = useState({
  spec: [],
});

 //to hold and set the payment amount value 
const [pa, setPa] = useState({
  pa: [],
});


  function changeSelected(e) {
      setSelected(e)
  };

  function changeRow(e) {
    setRow(e)
  };

  
  const displayOrders = () => {

   

    const handleSubmit = event => {
      if (event) event.preventDefault();
      props.EditOrderMutation({
        variables: {
          id: row,
          cust: selectedCustomer.customer_id,
          status: selectedOrderStat.order_status_id,
          opm: selectedOpm.order_payment_method_id,
          ofm: selectedOfm.order_fulfillment_method_id,
          plan: selectedPlan.plan_type_id,
          due: due,
          received: received,
          street: street,
          city: city,
          zip: zip,
          completed: completed,
          delBy: delBy,
          total: total,
          spec: spec,
          pa: pa
        },
        refetchQueries: [{query: getOrdersQuery}]
      });
   };
    // const handleInputChange = event => {
    //   event.persist();
    //   changeName(event.target.value);
    // };

  //retreiving data for the drop downs
  const customerData = props.getCustomersQuery;
  const orderStatData = props.getOrderStatQuery;
  const opmData = props.getOpmQuery;
  const ofmData = props.getOfmQuery;
  const planData = props.getPlanQuery;
  
  const olData = props.getOrderOrderlines

    //retreiving order data
    const data = props.getOrdersQuery;
    if (data.loading) {
      return <div>Loading Orders...</div>;
    } else {
        return (
          <div>
             <ReactTable
                data={data.allOrders}
                getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        
                        handleCustomerChange(rowInfo.row._original.customer_id, rowInfo.row._original.customer_phone_number)
                        handleOrderStatChange(rowInfo.row._original.order_status_id, rowInfo.row._original.order_status)
                        handleOpmChange(rowInfo.row._original.order_payment_method_id, rowInfo.row._original.order_payment_method)
                        handleOfmChange(rowInfo.row._original.order_fulfillment_method_id, rowInfo.row._original.order_fulfillement_method)
                        handlePlanChange(rowInfo.row._original.plan_type_id, rowInfo.row._original.plan_type)
                        changeSelected(rowInfo.index);
                        setRow(rowInfo.row._original.order_id);
                        setDue(rowInfo.row._original.order_due_date);
                        setStreet(rowInfo.row._original.order_delivery_street);
                        setCity(rowInfo.row._original.order_delivery_city);;
                        setZip(rowInfo.row._original.order_delivery_zipcode);
                        setCompleted(rowInfo.row._original.order_completed_date);
                        setDelBy(rowInfo.row._original.order_deliver_by);
                        setTotal(rowInfo.row._original.order_total_price);
                        setSpec(rowInfo.row._original.special_requirements);
                        setReceived(rowInfo.row._original.order_received_date);
                        setPa(rowInfo.row._original.payment_amount);
                        

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
                    <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="cust">Customer <i className="text-danger">*</i></label>
                        <Select id="cust" class="form-control"
                            {...props}
                            closeMenuOnSelect={true}
                            value={selectedCustomer}
                            hideSelectedOptions={false}
                            backspaceRemovesValue={false}
                            placeholder="Select.."
                            required
                            onChange = {event => {
                              handleCustomerChange(event.customer_id, event.customer_phone_number)
                            }}
                            name="cust"
                            options={customerData.allCustomers}
                            getOptionLabel={(option) => option.customer_phone_number}
                            getOptionValue={(option) => option.customer_id}
                            />
                      
                      </div>
                      <div className="form-group col-md-4">
                        <label for="status">Status<i className="text-danger">*</i></label>
                        <Select id="status" class="form-control"
                            closeMenuOnSelect={true}
                            
                            value={selectedOrderStat}
                            hideSelectedOptions={false}
                            backspaceRemovesValue={false}
                            placeholder="Select.."
                            required
                            onChange = {event => {
                              handleOrderStatChange(event.order_status_id, event.order_status)
                            }}
                            name="status"
                            options={orderStatData.allOrderStat}
                            getOptionLabel={(option) => option.order_status}
                            getOptionValue={(option) => option.order_status_id}
                            />
                      
                      </div>
                      <div class="form-group col-md-4">
                        <label for="opm">Payment Method<i className="text-danger">*</i></label>
                        <Select id="opm" class="form-control"
                            {...props}
                            closeMenuOnSelect={false}
                            
                            value={selectedOpm}
                            hideSelectedOptions={false}
                            backspaceRemovesValue={false}
                            placeholder="Select.."
                            required
                            onChange = {event => {
                              handleOpmChange(event.order_payment_method_id, event.order_payment_method)
                            }}
                            name="opm"
                            options={opmData.allOpm}
                            getOptionLabel={(option) => option.order_payment_method}
                            getOptionValue={(option) => option.order_payment_method_id}
                            />
                      
                      </div>
                      <div class="form-group col-md-4">
                          <label for="ofm">Delivery/Pick-up <i className="text-danger">*</i></label>
                            <Select id="ofm" class="form-control"
                                {...props}
                                closeMenuOnSelect={false}
                                
                                value={selectedOfm}
                                hideSelectedOptions={false}
                                backspaceRemovesValue={false}
                                placeholder="Select.."
                                required
                                onChange = {event => {
                                  handleOfmChange(event.order_fulfillment_method_id, event.order_fulfillement_method)
                                }}
                                name="ofm"
                                options={ofmData.allOfm}
                                getOptionLabel={(option) => option.order_fulfillement_method}
                                getOptionValue={(option) => option.order_fulfillment_method_id}
                                />
                      </div>
                      <div class="form-group col-md-4">
                          <label for="plan">Plan <i className="text-danger">*</i></label>
                                <Select id="plan" class="form-control"
                                    closeMenuOnSelect={false}
                                    
                                    value={selectedPlan}
                                    hideSelectedOptions={false}
                                    backspaceRemovesValue={false}
                                    placeholder="Select.."
                                    required
                                    onChange = {event => {
                                      handlePlanChange(event.plan_type_id, event.plan_type)
                                    }}
                                    name="plan"
                                    options={planData.allPlanType}
                                    getOptionLabel={(option) => option.plan_type}
                                    getOptionValue={(option) => option.plan_type_id}
                                    />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="received">Received <i className="text-danger">*</i></label>
                        <Input value= {received} onChange = {event => setReceived(event.target.value)} name="received" class="form-control" id="received" placeholder="2019-05-23"/>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="due">Due <i className="text-danger">*</i></label>
                        <Input value={due} onChange = {event => setDue(event.target.value)} name="due" class="form-control" id="due" placeholder="2019-05-23"/>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="city">Delivery city</label>
                        <Input value={city} onChange = {event => setCity(event.target.value)} name="city" class="form-control" id="city" placeholder="Houston"/>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="zip">Zip code</label>
                        <Input value={zip} onChange = {event => setZip(event.target.value)} name="zip" class="form-control" id="zip" placeholder="77898"/>
                      </div>
                    </div>
                    
                    <div class="form-group col-md-14">
                        <label for="street">Delivery Street</label>
                        <Input value={street} onChange = {event => setStreet(event.target.value)} name="street" class="form-control" id="street"/>
                      </div>
                    <div class="form-row">
                    <div class="form-group col-md-3">
                      <label for="completed">Completed Date</label>
                      <Input value={completed} onChange = {event => setCompleted(event.target.value)} name="completed" class="form-control" id="completed" placeholder="2019-08-16"/>
                    </div>
                      <div class="form-group col-md-3">
                      <label for="delBy">Delivery By</label>
                        <Input value={delBy} onChange = {event => setDelBy(event.target.value)} name="delBy" class="form-control" id="delBy"/>
                      </div>
                      <div class="form-group col-md-2">
                        <label for="total">Total <i className="text-danger">*</i></label>
                        <Input value={total} onChange = {event => setTotal(event.target.value)} name="total" class="form-control" id="total"/>
                      </div>
                      <div class="form-group col-md-2">
                      <label for="pa">Payment</label>
                      <Input value={pa} onChange = {event => setPa(event.target.value)} name="pa" class="form-control" id="pa" placeholder="45"/>
                    </div>
                    </div>
                    <div class="form-row">
                  </div>
                  <div class="form-group">
                        <label for="spec">Special Reqs</label>
                        <textarea value={spec} onChange = {event => setSpec(event.target.value)} name="spec"class="form-control" id="spec" rows="4"></textarea>
                  </div>
           
            <Button type="submit" class="btn btn-primary">Save</Button>
        </Form>
          
                  </ModalBody>
                </Modal>

                <Container fluid>
                  <Button
                          className="my-2"
                          color="primary"
                          onClick={toggle}
                        >
                          Edit Order
                  </Button>
                </Container>

                <ReactTable 
                  data={olData.allOrderOrderLines}
                  columns={olColumns}
                  filterable={true}
                    defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) > -1
                    }
                    
                    defaultPageSize={7}
                    style={{height: "400px"}}
                    className="-striped -highlight"
                  />
            </div>  

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
  graphql(getOrderStatQuery, { name: "getOrderStatQuery" }),
  graphql(getCustomersQuery, { name: "getCustomersQuery" }),
  graphql(getOfmQuery, { name: "getOfmQuery" }),
  graphql(getOpmQuery, { name: "getOpmQuery" }),
  graphql(getPlanQuery, { name: "getPlanQuery" }),
  graphql(EditOrderMutation, { name: "EditOrderMutation" }),
  graphql(getOrderOrderlines, { name: "getOrderOrderlines" }),
)(OrderList);

