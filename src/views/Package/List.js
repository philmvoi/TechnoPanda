import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getPackagesQuery, EditPackageMutation, DeletePackageMutation} from "./queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose } from "recompose";
import 'react-table/react-table.css';
const columns = [{
  Header: "PACKAGES",
  columns:
  [
    {
      Header: "ID",
      accessor: "package_id",
    },
    {
      Header: "Name",
      accessor: "package_name"
    },
    {
      Header: "Description",
      accessor: "package_description"
    },
    {
      Header: "Quantity",
      accessor: "meal_quantity"
      }]}

  ]

  
const PackageList = props => {

  const [active, setActive] = useState(true)
  
  const [selected, setSelected] = useState({
      selected: [],
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // to hold the package id
  const [id, setId] = useState({
    id: []
});

//to hold the package name
  const [name, setName] = useState({
    name: []
});

//to hold the meal quantity for a package
const [quant, setQuant] = useState({
  quant: []
});

//to hold the package desc
const [desc, setDesc] = useState({
  desc: []
});



  const displayPackages = () => {

    const handleDelete = () => {
      props.DeletePackageMutation({
        variables: {
          id: id
        },
        refetchQueries: [{query: getPackagesQuery}]
      })
    }
    const handleSubmit = event => {
      if (event) event.preventDefault();
      props.EditPackageMutation({
        variables: {
          id: id,
          name: name,
          quant: quant.toString(),
          desc: desc
        },
        refetchQueries: [{query: getPackagesQuery}]
      });
    
    
    };
  

    const data = props.getPackagesQuery;
    if (data.loading) {
      return <div>Loading Packages...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allPackage}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        setSelected(rowInfo.index);
                        setId(rowInfo.row._original.package_id);
                        setName(rowInfo.row._original.package_name);
                        setQuant(rowInfo.row._original.meal_quantity)
                        setDesc(rowInfo.row._original.package_description)
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
                 <Modal id="medium" isOpen={modal} toggle={toggle} >
                  <ModalHeader toggle={toggle}>Edit Package</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handleSubmit}>

                        <div  class="form-row">
                          <div  class="form-group col-md-4">
                            <label for="name">Name <i className="text-danger">*</i></label>
                            <Input value={name} required onChange = {event => setName(event.target.value)} name="name" class="form-control" id="name" />
                          </div>
                          <div  class="form-group col-md-4">
                            <label for="quant">Meal Quantity <i className="text-danger">*</i></label>
                            <Input value={quant} required onChange = {event => setQuant(event.target.value)} name="quant" class="form-control" id="quant"/>
                          </div>
                        </div>
                        <div class="form-group">
                      <label for="desc">Description</label>
                            <Input value={desc} onChange = {event => setDesc(event.target.value)} name="desc" class="form-control" id="desc"/>
                      </div>
                      <div>

                      </div>
                        
                        <Button type="submit" class="btn btn-primary">Save</Button>
                    </Form>
                  </ModalBody>
                </Modal> 

                 <div class="btn-group" role="group" aria-label="Button group example">
                   <Button disabled={active} color="primary" onClick={toggle}> Edit Package </Button>
                   <Button disabled={active} color="danger" onClick={handleDelete}> Delete Package </Button>
                 </div>
            </div>

            </div>
        )
      
    }
  };

  return (
    <>
      {displayPackages()}
      
    </>
  );
};

export default compose(
  graphql(getPackagesQuery, { name: "getPackagesQuery" }),
  graphql(EditPackageMutation, { name: "EditPackageMutation" }),
  graphql(DeletePackageMutation, { name: "DeletePackageMutation" }),

)(PackageList);

