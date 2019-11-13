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

import { getOrderOrderlines, getOrdersQuery, EditOrderMutation, getOrderStatQuery, getCustomersQuery, getOfmQuery, getOpmQuery, getPlanQuery, AddOrderlineMutation, getPackagesQuery, EditOrderlineMutation, getMealListQuery, AddMealListMutation, getMealsQuery, EditMealListMutation, DeleteOrderMutation, DeleteOrderLineMutation, DeleteMealListMutation} from './queries';

// for adding packages
let package_id = null;
let meal_id = null;

//columns for meallist table
const mlColumns = [
{
  Header:"MEAL-LIST",
  columns:
  [
  {
    Header: "ID",
    accessor: "meal_list_id",
    show: true
  }, 
  {
    Header: "Order ID",
    accessor: "order_id",
    show: true
  }, 
  {
    Header: "Meal ID",
    accessor: "meal_id",
    show: false
  }, 
  {
    Header: "Meal",
    accessor: "meal_name",
  }, 
  {
    Header: "Package ID",
    accessor: "package_id",
    show: false
  }, 
  {
    Header: "Package",
    accessor: "package_name",
  }, 
  {
    Header: "Quantity",
    accessor: "meal_list_quantity",
  }
  ]}
]

// columns for the orderline table
const olColumns = [{
  Header:"ORDERLINES",
  columns:
  [
  {
    Header: "ID",
    accessor: "order_line_id",
    width: 130,

  }, 
  {
    Header: "Order ID",
    accessor: "order_id",
    width: 130
  },
  {
    Header: "Package ID",
    accessor: "package_id",
    show: true,
    width: 110
  },
  {
    Header: "Package Name",
    accessor: "package_name",
    width: 170
  },
  {
    Header: "Package Desc",
    accessor: "package_description",
  },
  {
    Header: "Quantity",
    accessor: "order_line_quantity",
    width: 110
  },
  {
    Header: "Price",
    accessor: "price",
    width: 90,
    Cell: row => <div style={{ textAlign: "right" }}>${row.value}</div>
  }
]}

];

// columns for the order table
const columns = [{
  Header: "ORDERS",
  columns:
  [
    {
      Header: "ID",
      accessor: "order_id",
      width: 40
    },
    {
      Header: "Customer ID",
      accessor: "customer_id",
      show: false
    },
    {
      Header: "First Name",
      accessor: "customer_first_name",
      width: 80
    },
    {
      Header: "Last Name",
      accessor: "customer_last_name",
      width: 80
    },
    {
      Header: "Phone",
      accessor: "customer_phone_number",
      width: 110
    },
    {
      Header: "Order Status ID",
      accessor: "order_status_id",
      show: false
    },
    {
      Header: "Status",
      accessor: "order_status",
      width: 80
    },
    {
      Header: "Pay Method ID",
      accessor: "order_payment_method_id",
      show: false
    },
    {
      Header: "Pay Type",
      accessor: "order_payment_method",
      width: 70
    },
    {
      Header: "Delivery/Pick-up Id",
      accessor: "order_fulfillment_method_id",
      show: false
    },
    {
      Header: "Delivery/Pick-up",
      accessor: "order_fulfillement_method",
      width: 130
    },
    {
      Header: "Plan Id",
      accessor: "plan_type_id",
      show: false
    },
    {
      Header: "Plan",
      accessor: "plan_type",
      width: 70
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
      accessor: "order_delivery_street",
      width: 180
    },
    {
      Header: "Delivery City",
      accessor: "order_delivery_city",
      width: 90
    },
    {
      Header: "Zip",
      accessor: "order_delivery_zipcode",
      width: 60
    },
    {
      Header: "Complete Date",
      accessor: "order_completed_date",
      width: 105
    },
    {
      Header: "Delivery By",
      accessor: "order_deliver_by",
      width: 90
    },
    {
      Header: "Subtotal",
      accessor: "ol_price",
      Cell: row => <div style={{ textAlign: "right" }}>${row.value}</div>
    },
    // {
    //   Header: "End Total",
    //   accessor: "order_total_price",
    //   width: 70,
    //   Cell: row => <div style={{ textAlign: "right" }}>${row.value}</div>
    // },
    {
      Header: " Special Reqs",
      accessor: "special_requirements",
      width: 200
    },
    {
      Header: "Payment Amt",
      accessor: "payment_amount",
      Cell: row => <div style={{ textAlign: "right" }}>${row.value}</div>
    }
    ]}
  ];

// To hold the selected row customer information
let selectedPackage = {
  package_id: '',
  package_name: ''
};

let selectedMeal = {
  meal_id: '',
  meal_name: ''
};



const handleMealChange = (e, j) => {
  selectedMeal.meal_id = e
  selectedMeal.meal_name = j
};


const handlePackageChange =(e, j) => {
  selectedPackage.package_id = e
  selectedPackage.package_name = j
};

// To hold the selected row customer information
  let selectedCustomer = {
    customer_id: '',
    customer_phone_number: '',
    customer_first_name: '',
    customer_last_name: ''
  };

  const handleCustomerChange =(e, j, h, i) => {
    selectedCustomer.customer_id = e
    selectedCustomer.customer_phone_number = j
    selectedCustomer.customer_first_name = h
    selectedCustomer.customer_last_name = i
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

  //the selected row
  const [selected, setSelected] = useState({
      selected: [],
  });
//these are for toggling the different modals we have in the order module
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [packageModal, setPackageModal] = useState(false);
  const packageToggle = () => setPackageModal(!packageModal);

  const [packageEditModal, setPackageEditModal] = useState(false);
  const packageEditditoggle = () => setPackageEditModal(!packageEditModal);

  const [mealModal, setMealModal] = useState(false);
  const mealToggle = () => setMealModal(!mealModal);

  const [mealEditModal, setEditMealModal] = useState(false);
  const mealEditToggle = () => setEditMealModal(!mealEditModal);

  //to hold and set the order_id value
const [mlRow, setMlRow] = useState({
  mlRow: []
});

const [mlquant, setMlquant] = useState({
  mlquant:[]
})
//to hold order_line_id value
const [olRow, setOlrow] = useState({
  olRow: []
}) 

//the selected orderline row
const [selectedOl, setSelectedOl] = useState({
  selectedOl: [],
});

//the selected meallist row
const [selectedMlRow, setSelectedMlRow] = useState({
  selectedMlRow: [],
})

  //to hold and set the order_id value
const [row, setRow] = useState({
      row: []
  });

//to hold and set the quantity value in a orderline 
const [quant, setQuant] = useState({
  quant: [],
});

//to hold and set the price value in a orderline 
const [price, setPrice] = useState({
  price: [],
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

//this is to hold and set the active order row
const [activeOrder, setActiveOrder] = useState(true);
const [activeOl, setActiveOl] = useState(true);
const [activeMl, setActiveMl] = useState(true);


  function changeSelected(e) {
      setSelected(e)
  };

  function changeRow(e) {
    setRow(e)
  };


  
  // all of this to handle changes in the add package form
  const [packageInputs, setPackageInputs] = useState({});

   // all of this to handle changes in the add meal form
   const [mealInputs, setMealInputs] = useState({});

  const displayOrders = () => {

// all of this is to handle changes to the add meal form
const handleMealAddSubmit = event => {
  if (event) {
    event.preventDefault();
    props.AddMealListMutation ({
      variables: {
        meal: meal_id,
        oline: olRow,
        quant: mealInputs.mlquant
      },
      refetchQueries: [{query: getMealListQuery}]
    })
  }
};

const handleMealEditSubmit = event => {
  if (event) {
    event.preventDefault();
    props.EditMealListMutation ({
      variables: {
        id: mlRow,
        meal: selectedMeal.meal_id,
        quant: mlquant
      },
      refetchQueries: [{query: getMealListQuery}]
    })
  }
};


 // all of this is to handle chages to edit package form
 const handlePackageEditSubmit = event => {
   if (event) {
     event.preventDefault();
     props.EditOrderlineMutation ({
      variables: {
        id: olRow,
        package: selectedPackage.package_id,
        quant: quant.toString(),
        price: price
      },
      refetchQueries: [{query: getOrderOrderlines}, {query: getOrdersQuery}]
     })
   }
 }
  //handle order delete
  const handleOrderDelete = () => {
    props.DeleteOrderMutation ({
      variables: {
        id: row
      },
      refetchQueries: [{query: getOrdersQuery}]
    })
  }

    //handle orderline delete
    const handleOrderLineDelete = () => {
      props.DeleteOrderLineMutation ({
        variables: {
          id: olRow
        },
        refetchQueries: [{query: getOrderOrderlines}, {query: getOrdersQuery}]
      })
    }

    //handle meal list delete
    const handleMealListDelete = () => {
      props.DeleteMealListMutation({
        variables: {
          id: mlRow
        },
        refetchQueries: [{query: getMealListQuery}]
      })
    }
  
// all of this to handle changes in the add package form
  const handlePackageAddSubmit = event => {
    if (event){
       event.preventDefault();
       props.AddOrderlineMutation({
         variables: {
           order: row,
           package: package_id,
           quant: packageInputs.quant,
           price: packageInputs.price
         },
         refetchQueries: [{query: getOrderOrderlines}, {query: getOrdersQuery}]
       })

    }
  
  };


 // all of this to handle changes in the add meal form
 const handleMealInputChange = event => {
  event.persist();
  
  setMealInputs(mealInputs => ({
    ...mealInputs,
    [event.target.name]: event.target.value
  }));
}; 
  
// all of this to handle changes in the add package form
  const handlePackageInputChange = event => {
    event.persist();
    
    setPackageInputs(packageInputs => ({
      ...packageInputs,
      [event.target.name]: event.target.value
    }));
  };


// all of this to edit an order
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
          // total: total,
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
  const packageData = props.getPackagesQuery;
  
  const olData = props.getOrderOrderlines;
  const mlData = props.getMealListQuery;
  const mealData = props.getMealsQuery;

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
                        
                        handleCustomerChange(rowInfo.row._original.customer_id, rowInfo.row._original.customer_phone_number, rowInfo.row._original.customer_first_name, rowInfo.row._original.customer_last_name)
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
                        // setTotal(rowInfo.row._original.order_total_price);
                        setSpec(rowInfo.row._original.special_requirements);
                        setReceived(rowInfo.row._original.order_received_date);
                        setPa(rowInfo.row._original.payment_amount);
                        setActiveOrder(false)
                        

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
             <div> {/* modal and form to edit orders*/}
                <Modal isOpen={modal} toggle={toggle} >
                  <ModalHeader toggle={toggle}>Edit Order</ModalHeader>
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
                              handleCustomerChange(event.customer_id, event.customer_phone_number, event.customer_first_name, event.customer_last_name)
                            }}
                            name="cust"
                            options={customerData.allCustomers}
                            getOptionLabel={(option) =>  `${option.customer_first_name} ${option.customer_last_name}, ${option.customer_phone_number} `}
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
                            closeMenuOnSelect={true}
                            
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
                                closeMenuOnSelect={true}
                                
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
                                    closeMenuOnSelect={true}
                                    
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
                        <Input required value= {received} onChange = {event => setReceived(event.target.value)} name="received" class="form-control" id="received" placeholder="YYYY-MM-DD"/>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="due">Due <i className="text-danger">*</i></label>
                        <Input required value={due} onChange = {event => setDue(event.target.value)} name="due" class="form-control" id="due" placeholder="YYYY-MM-DD"/>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="city">Delivery city</label>
                        <Input value={city} onChange = {event => setCity(event.target.value)} name="city" class="form-control" id="city" />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="zip">Zip code</label>
                        <Input value={zip} onChange = {event => setZip(event.target.value)} name="zip" class="form-control" id="zip" />
                      </div>
                    </div>
                    
                    <div class="form-group col-md-14">
                        <label for="street">Delivery Street</label>
                        <Input value={street} onChange = {event => setStreet(event.target.value)} name="street" class="form-control" id="street"/>
                      </div>
                    <div class="form-row">
                    <div class="form-group col-md-3">
                      <label for="completed">Completed Date</label>
                      <Input value={completed} onChange = {event => setCompleted(event.target.value)} name="completed" class="form-control" id="completed" placeholder="YYYY-MM-DD"/>
                    </div>
                      <div class="form-group col-md-3">
                      <label for="delBy">Delivery By</label>
                        <Input value={delBy} onChange = {event => setDelBy(event.target.value)} name="delBy" class="form-control" id="delBy"/>
                      </div>
                      {/* <div class="form-group col-md-2">
                        <label for="total">Total <i className="text-danger">*</i></label>
                        <Input value={total} onChange = {event => setTotal(event.target.value)} name="total" class="form-control" id="total"/>
                      </div> */}
                      <div class="form-group col-md-3">
                      <label for="pa">Payment</label>
                      <Input value={pa} onChange = {event => setPa(event.target.value)} name="pa" class="form-control" id="pa" />
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

                <div class="btn-group" role="group" aria-label="Button group example">
                  <Button
                          disabled={activeOrder}
                          // className="form-group col-md-2"
                          color="primary"
                          onClick={toggle}
                        >
                          Edit Order
                  </Button>
                   <Button onClick={handleOrderDelete} color="danger" >Delete Order</Button>                 
                  <Button onClick={packageToggle} 
                  // className="form-group col-md-2" 
                  color="dark" type="submit" disabled={activeOrder}>Add Package To Order</Button>
                </div>

                <Modal id="small"  isOpen={packageModal} toggle={packageToggle} >
                  <ModalHeader toggle={packageToggle}>Add Package</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handlePackageAddSubmit}>
              
          
                          <FormGroup>
                            <label for="package">Package <i className="text-danger">*</i></label>
                            <Select id="package" class="form-control"
                                {...props}
                                closeMenuOnSelect={true}
                                value={packageInputs.package}
                                hideSelectedOptions={false}
                                backspaceRemovesValue={false}
                                placeholder="Select.."
                                required
                                onChange = {event => {
                                  
                                  package_id = event.package_id
                                  console.log(package_id)
                                }}
                                name="package"
                                options={packageData.allPackage}
                                getOptionLabel={(option) => option.package_name}
                                getOptionValue={(option) => option.package_id}
                                />
             
                              <Label>Quantity <i className="text-danger">*</i></Label>
                              <Input
                                name="quant"
                                className="form-control"
                                onChange = {handlePackageInputChange}
                                required
                                
                              />

                              <Label> Price <i className="text-danger">*</i> </Label>
                              <Input
                                name="price"
                                className="form-control"
                                onChange = {handlePackageInputChange}
                                required
                              />
                          </FormGroup>
                          <Button type="submit" class="btn btn-primary">Save</Button>
                          
              
                    </Form>
          
                  </ModalBody>
                </Modal>

                <ReactTable 
                  data={olData.allOrderOrderLines}
                  columns={olColumns}
                  filterable={true}
                    defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) > -1
                    }
                    getTrProps={(state, rowInfo) => {
                      if (rowInfo && rowInfo.row) {
                          return {
                          onClick: (e) => {
                              handlePackageChange(rowInfo.row._original.package_id, rowInfo.row._original.package_name)
                            
                              setSelectedOl(rowInfo.index);
                              setOlrow(rowInfo.row._original.order_line_id);
                              setDue(rowInfo.row._original.order_due_date);
                              setPrice(rowInfo.row._original.price);
                              setQuant(rowInfo.row._original.order_line_quantity);
                              setActiveOl(false)
                          },
                          style: {
                              background: rowInfo.index === selectedOl ? '#00afec' : 'white',
                              color: rowInfo.index === selectedOl ? 'white' : 'black'
                          }
                          }
                      }else{
                          return {}
                      }
                      }}
                    
                    defaultPageSize={7}
                    style={{height: "400px"}}
                    className="-striped -highlight"
                  />

                  <Modal id="small"  isOpen={packageEditModal} toggle={packageEditditoggle} >
                  <ModalHeader toggle={packageEditditoggle}>Edit Package</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handlePackageEditSubmit}>
              
          
                          <FormGroup>
                            <label for="package">Package <i className="text-danger">*</i></label>
                            <Select id="package" class="form-control"
                                {...props}
                                closeMenuOnSelect={true}
                                value={selectedPackage}
                                hideSelectedOptions={false}
                                backspaceRemovesValue={false}
                                placeholder="Select.."
                                required
                                onChange = {event => {
                                  
                                  handlePackageChange(event.package_id, event.package_name)
                                }}
                                name="package"
                                options={packageData.allPackage}
                                getOptionLabel={(option) => option.package_name}
                                getOptionValue={(option) => option.package_id}
                                />
             
                              <Label>Quantity <i className="text-danger">*</i></Label>
                              <Input
                                name="quant"
                                className="form-control"
                                onChange = {event => {
                                  setQuant(event.target.value)
                                }}
                                required
                                value = {quant}
                              />

                              <Label> Price <i className="text-danger">*</i></Label>
                              <Input
                                required
                                name="price"
                                className="form-control"
                                onChange = {event => {
                                  setPrice(event.target.value)
                                  
                                }}
                                
                                value={price}
                              />
                          </FormGroup>
                          <Button  type="submit" class="btn btn-primary">Save</Button>
                          
              
                     </Form>
          
                    </ModalBody>
                  </Modal>
                  <div class="btn-group" role="group" aria-label="Button group example">
                    <Button disabled={activeOl} onClick={packageEditditoggle} className="my-2" color="primary" type="submit">Edit Order Package</Button>
                    <Button disabled={activeOl} onClick={handleOrderLineDelete} className="my-2" color="danger" type="submit">Delete Order Package</Button>
                    <Button disabled={activeOl} onClick={mealToggle} className="my-2" color="dark" type="submit">Add Meal To Package</Button>
                  </div>             
                  <div></div>

                <ReactTable 
                  data={mlData.allMlJoin}
                  columns={mlColumns}
                  filterable={true}
                    defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) > -1
                    }
                    getTrProps={(state, rowInfo) => {
                      if (rowInfo && rowInfo.row) {
                          return {
                          onClick: (e) => {
                              handleMealChange(rowInfo.row._original.meal_id, rowInfo.row._original.meal_name)
                              setSelectedMlRow(rowInfo.index);
                              setMlquant(rowInfo.row._original.meal_list_quantity);
                              setMlRow(rowInfo.row._original.meal_list_id)
                              setActiveMl(false)
                          },
                          style: {
                              background: rowInfo.index === selectedMlRow ? '#00afec' : 'white',
                              color: rowInfo.index === selectedMlRow ? 'white' : 'black'
                          }
                          }
                      }else{
                          return {}
                      }
                      }}
                    
                    defaultPageSize={7}
                    style={{height: "400px"}}
                    className="-striped -highlight"
                  />

                  <Modal id="small"  isOpen={mealModal} toggle={mealToggle} >
                    <ModalHeader toggle={mealToggle}>Add Meal</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleMealAddSubmit}>
                
            
                            <FormGroup>
                              <label for="meal">Meal <i className="text-danger">*</i></label>
                              <Select id="meal" class="form-control"
                                  {...props}
                                  closeMenuOnSelect={true}
                                  value={packageInputs.meal}
                                  hideSelectedOptions={false}
                                  backspaceRemovesValue={false}
                                  placeholder="Select.."
                                  required
                                  onChange = {event => {
                                    
                                    meal_id = event.meal_id
                                    console.log(meal_id)
                                  }}
                                  name="meal"
                                  options={mealData.allMeal}
                                  getOptionLabel={(option) => option.meal_name}
                                  getOptionValue={(option) => option.meal_id}
                                  />
              
                                <Label>Quantity <i className="text-danger">*</i></Label>
                                <Input
                                  name="mlquant"
                                  className="form-control"
                                  onChange = {handleMealInputChange}
                                  required
                                />
                            </FormGroup>
                            <Button type="submit" class="btn btn-primary">Save</Button>
                            
                
                      </Form>
            
                    </ModalBody>
                  </Modal>

                  <Modal id="small"  isOpen={mealEditModal} toggle={mealEditToggle} >
                    <ModalHeader toggle={mealEditToggle}>Edit Meal</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleMealEditSubmit}>
                
            
                            <FormGroup>
                              <label for="meal">Meal <i className="text-danger">*</i></label>
                              <Select id="meal" class="form-control"
                                  {...props}
                                  closeMenuOnSelect={true}
                                  value={selectedMeal}
                                  hideSelectedOptions={false}
                                  backspaceRemovesValue={false}
                                  placeholder="Select.."
                                  required
                                  onChange = {event => {
                                    
                                    handleMealChange(event.meal_id, event.meal_name)
                                  }}
                                  name="meal"
                                  options={mealData.allMeal}
                                  getOptionLabel={(option) => option.meal_name}
                                  getOptionValue={(option) => option.meal_id}
                                  />
              
                                <Label>Quantity <i className="text-danger">*</i></Label>
                                <Input
                                value={mlquant}
                                  name="mlquant"
                                  className="form-control"
                                  onChange = {event => {
                                    setMlquant(event.target.value)
                                  }}
                                  required
                                />
                            </FormGroup>
                            <Button type="submit" class="btn btn-primary">Save</Button>
                            
                
                      </Form>
            
                    </ModalBody>
                  </Modal>
                  <div class="btn-group" role="group" aria-label="Button group example">
                    <Button  disabled={activeMl} onClick={handleMealListDelete}  color="danger" type="submit">Delete Package Meal</Button>
                    <Button disabled={activeMl} onClick={mealEditToggle}  color="dark" type="submit">Edit Package Meal</Button>
                  </div> 




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
  graphql(AddOrderlineMutation, { name: "AddOrderlineMutation" }),
  graphql(getPackagesQuery, { name: "getPackagesQuery" }),
  graphql(EditOrderlineMutation, { name: "EditOrderlineMutation" }),
  graphql(getMealListQuery, { name: "getMealListQuery" }),
  graphql(AddMealListMutation, { name: "AddMealListMutation" }),
  graphql(getMealsQuery, { name: "getMealsQuery" }),
  graphql(EditMealListMutation, { name: "EditMealListMutation" }),
  graphql(DeleteOrderMutation, { name: "DeleteOrderMutation" }),
  graphql(DeleteOrderLineMutation, { name: "DeleteOrderLineMutation" }),
  graphql(DeleteMealListMutation, { name: "DeleteMealListMutation" }),
)(OrderList);

