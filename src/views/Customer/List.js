import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getStatesQuery, getCustomersQuery, EditCustomerMutation, DeleteCustomerMutation} from "./queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from "recompose";
import Select from 'react-select';
import 'react-table/react-table.css';


const columns = [
    {
      Header: "ID",
      accessor: "customer_id",
    },
    {
      Header: "State ID",
      accessor: "state_id",
      show: false
    },
    {
      Header: "State",
      accessor: "state_name"
    },
    {
      Header: "Phone",
      accessor: "customer_phone_number"
    },
    {
      Header: "First Name",
      accessor: "customer_first_name"
    },
    {
      Header: "Last Name",
      accessor: "customer_last_name"
    },
    {
      Header: "Email",
      accessor: "customer_email"
    },
    {
      Header: "City",
      accessor: "customer_city"
    },
    {
      Header: "Street",
      accessor: "customer_street_address"
    },
    {
      Header: "Zip",
      accessor: "customer_zipcode"
    },
    {
      Header: "Height",
      accessor: "Height"
    },
    {
      Header: "Weight",
      accessor: "Weight"
    },
    {
      Header: "Allergies",
      accessor: "Allergies"
    },
    {
      Header: "Instagram",
      accessor: "Instagram"
    }
    
  ]


let _selected = {
  state_id: '',
  state_name: ''
}
  
const CustomerList = props => {

  const [active, setActive] = useState(true)

  const states = props.getStatesQuery;

  const [inputs, setInputs] = useState({});
  
  const [selected, setSelected] = useState({
      selected: [],
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [row, setRow] = useState({
      row: []
  });

  const [state_name, setState] = useState({
    state_name: [],
});

const [phone, setPhone] = useState({
  phone: [],
});

const [fname, setFname] = useState({
  fname: [],
});

const [lname, setLname] = useState({
  lname: [],
});

const [email, setEmail] = useState({
  email: [],
});

const [city, setCity] = useState({
  city: [],
});

const [street, setStreet] = useState({
  street: [],
});

const [zip, setZip] = useState({
  zip: [],
});

const [h, setH] = useState({
  h: []
});

const [w, setW] = useState({
  w: []
});

const [allergies, setAllergies] = useState({
  allergies: []
});

const [ig, setIg] = useState({
  ig: []
});





  const displayCustomers = () => {

    const handleDelete = () => {
      props.DeleteCustomerMutation({
        variables: {
          id: row
        },
        refetchQueries: [{query: getCustomersQuery}]
      })
    };

     const handleSubmit = event => {
       if (event) event.preventDefault();
       props.EditCustomerMutation({
         variables: {
           id: row,
           state: _selected.state_id,
            status: 1,
            phone: phone,
            fname: fname,
            lname: lname,
            email: email,
            city: city,
            street: street,
            zip: zip,
            h: h,
            w: w,
            allergies: allergies,
            ig: ig
        },
        refetchQueries: [{query: getCustomersQuery}]
      });
    
    
    
    };

    const handleValueChange =(e, j) => {
      _selected.state_id = e
      _selected.state_name = j
    };
  

    let test = [];
   
    const data = props.getCustomersQuery;
  

    if (data.loading) {
      return <div>Loading Customers...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allCustomers}
                getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                       handleValueChange(rowInfo.row._original.state_id, rowInfo.row._original.state_name)
                       setSelected(rowInfo.index);
                        setRow(rowInfo.row._original.customer_id);
                        setPhone(rowInfo.row._original.customer_phone_number);
                        setFname(rowInfo.row._original.customer_first_name);
                        setLname(rowInfo.row._original.customer_last_name);;
                        setEmail(rowInfo.row._original.customer_email);
                        setCity(rowInfo.row._original.customer_city);
                        setStreet(rowInfo.row._original.customer_street_address);
                        setZip(rowInfo.row._original.customer_zipcode);
                        setH(rowInfo.row._original.Height);
                        setW(rowInfo.row._original.Weight);
                        setAllergies(rowInfo.row._original.Allergies);
                        setIg(rowInfo.row._original.Instagram);
                        setActive(false);
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
                   <ModalHeader toggle={toggle}>Edit Customer</ModalHeader>
                   <ModalBody>
                   <Form onSubmit={handleSubmit}>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="fname">First Name <i className="text-danger">required</i></label>
                          <Input value={fname} onChange = {event => {console.log(event.target.value); setFname(event.target.value)}} name='fname' class="form-control" placeholder="First Name" required/>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="lname">Last Name <i className="text-danger">required</i></label>
                          <Input value={lname} onChange = {event => setLname(event.target.value)} name="lname" class="form-control" id="lname" placeholder="Last Name" required/>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-4">
                          <label for="phone">Phone <i className="text-danger">required</i></label>
                          <Input value={phone} onChange = {event => setPhone(event.target.value)} name="phone" class="form-control" id="phone" placeholder="999-990-0090" required/>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="email">Email <i className="text-danger">required</i></label>
                          <Input value={email} onChange = {event => setEmail(event.target.value)} name="email" class="form-control" id="email" placeholder="jane@yahoo.com"/>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="instagram">Instagram</label>
                          <Input value={ig} onChange = {event => setIg(event.target.value)} name="ig" class="form-control" id="instagram" placeholder="@fit_preps"/>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="address">Street Address</label>
                        <Input value={street} onChange = {event => setStreet(event.target.value)} name="street" class="form-control" id="adress" placeholder="1234 Main St"/>
                      </div>
                      
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="city">City</label>
                          <Input value={city} onChange = {event => setCity(event.target.value)} name="city" class="form-control" id="city"/>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="state">State</label>
                          <Select id="inputState" class="form-control"
                              closeMenuOnSelect={true}
                              
                              value={_selected}
                              hideSelectedOptions={false}
                              backspaceRemovesValue={false}
                              placeholder="Select a state"
                              required
                              onChange = {event => {
                                handleValueChange(event.state_id, event.state_name)
                                // setState(event.state_id)
                              }}
                              name="state"
                              labelKey='state_name'
                              valueKey='state_id'
                              options={states.allStates}
                              getOptionLabel={(option) => option.state_name}
                              getOptionValue={(option) => option.state_id}
                              />
                        
                        </div>
                        <div class="form-group col-md-2">
                          <label for="zipcode">Zip</label>
                          <Input value={zip} onChange = {event => setZip(event.target.value)} name="zip" class="form-control" id="zipcode"/>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="height">Height</label>
                          <Input value={h} onChange = {event => setH(event.target.value)} name="h" class="form-control" id="height" placeholder="6 foot 7"/>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="weight">Weight</label>
                          <Input value={w} onChange = {event => setW(event.target.value)} name="w" class="form-control" id="weight" placeholder="186.9"/>
                        </div>
                      </div>
                      <div class="form-group">
                          <label for="allergies">Allergies</label>
                          <textarea value={allergies} onChange = {event => setAllergies(event.target.value)} name="allergies"class="form-control" id="allergies" rows="3"></textarea>
                        </div>
                      <Button type="submit" class="btn btn-primary">Save</Button>
                  </Form>
                   </ModalBody>
                 </Modal>

                 <div class="btn-group" role="group" aria-label="Button group example">
                   <Button
                           disabled={active} 
                           color="primary"
                           onClick={toggle}
                         >
                           Edit Customer
                   </Button>
                   <Button
                           disabled={active} 
                           color="danger"
                           onClick={handleDelete}
                         >
                           Delete Customer
                   </Button>
             </div>

            </div>
            </div>
        )
      
    }
  };

  return (
    <>
      {displayCustomers()}
      
    </>
  );
};

export default compose(
  graphql(getStatesQuery, { name: "getStatesQuery" }),
  graphql(getCustomersQuery, { name: "getCustomersQuery" }),
  graphql(EditCustomerMutation, {name: "EditCustomerMutation"}),
  graphql(DeleteCustomerMutation, {name: "DeleteCustomerMutation"}),
 
  
)(CustomerList);

