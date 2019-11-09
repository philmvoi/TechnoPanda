import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getMealsQuery, EditMealMutation, getProteinQuery, getMealCategory} from "./queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose, setPropTypes } from "recompose";
import Select from 'react-select';
import 'react-table/react-table.css';



const columns = [
    {
      Header: "ID",
      accessor: "meal_id",
    },
    {
      Header: "Meal Category ID",
      accessor: "meal_category_id",
      show: false
    },
    {
      Header: "Meal Category",
      accessor: "description_"
    },
    {
      Header: "PROT tYPE id",
      accessor: "protein_type_id",
      show: false
    },
    {
      Header: "Protein",
      accessor: "protein_type"
    },
    {
      Header: "Name",
      accessor: "meal_name"
    },
    {
      Header: "Description",
      accessor: "meal_description"
    },
    {
      Header: "Additional Protein",
      accessor: "additional_protein_oz"
    }
    
  ];

  // to hold the selected meal category
  let selectedMealCat = {
    meal_category_id: '',
    description_: ''
  }

  //to hold the selected protein type
  let selectedProtein = {
    protein_type_id: '',
    protein_type: ''
  }


  const MealsList = props => {

    const [selectedMealRow, setSelectedMealRow] = useState({
      selectedMealRow: []
    });

    const [catg, setCatg] = useState({
      catg: []
    });

    const [name, setName] = useState({
      name: []
    });

    const [desc, setDesc] = useState({
      desc: []
    });

    const [addProt, setAddprot] = useState({
      addProt: []
    });

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [inputs, setInputs] = useState({});

    const [meal, setMeal] = useState({
      meal: []
  });


    const displayMeals = () => {

      // handle the changes to the meal category drop down
      const handleCategoryChange =(e, j) => {
        selectedMealCat.meal_category_id = e
        selectedMealCat.description_ = j
      };
  
      // handle the change to the protein type drop down
      const handleProteinChange =(e, j) => {
        selectedProtein.protein_type_id = e
        selectedProtein.protein_type = j
      };

      //
      const handleSubmit = event => {
        if (event) event.preventDefault();
        props.EditMealMutation({
          variables: {
             id: meal,
             catg: selectedMealCat.meal_category_id,
             protein: selectedProtein.protein_type_id,
             name: name,
             desc: desc,
             addProt: addProt,
         },
         refetchQueries: [{query: getMealsQuery}]
       });
     
     };

      //Retreiving protein type data
      const protData = props.getProteinQuery;
      const catgData = props.getMealCategory;
 
        const data = props.getMealsQuery;
    if (data.loading) {
      return <div>Loading Meals...</div>;
    } else {
        return (
          <div>
            <ReactTable
                data={data.allMealJoin}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        setMeal(rowInfo.row._original.meal_id)
                        setSelectedMealRow(rowInfo.index);
                        handleCategoryChange(rowInfo.row._original.meal_category_id, rowInfo.row._original.description_);
                        handleProteinChange(rowInfo.row._original.protein_type_id, rowInfo.row._original.protein_type)
                        setName(rowInfo.row._original.meal_name);
                        setDesc(rowInfo.row._original.meal_description);
                        setAddprot(rowInfo.row._original.additional_protein_oz);
                     
                    },
                    style: {
                        background: rowInfo.index === selectedMealRow ? '#00afec' : 'white',
                        color: rowInfo.index === selectedMealRow ? 'white' : 'black'
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
            <div class="form-group col-md-6">
               <label for="protein">Protein <i className="text-danger">*</i></label>
               <Select id="protein" class="form-control"
                   {...props}
                   closeMenuOnSelect={true}
                   value={selectedProtein}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select.."
                   required
                   onChange = {event => {
                     
                    handleProteinChange(event.protein_type_id, event.protein_type)
                   }}
                   name="protein"
                   options={protData.allProType}
                   getOptionLabel={(option) => option.protein_type}
                   getOptionValue={(option) => option.protein_type_id}
                   />
             
             </div>
             <div className="form-group col-md-6">
               <label for="catg">Category<i className="text-danger">*</i></label>
               <Select id="catg" class="form-control"
                   closeMenuOnSelect={true}
              
                   value={selectedMealCat}
                   hideSelectedOptions={false}
                   backspaceRemovesValue={false}
                   placeholder="Select.."
                   required
                   onChange = {event => {
                     handleCategoryChange(event.meal_category_id, event.description_)
                   
                   }}
                   name="catg"
                   options={catgData.allMealCat}
                   getOptionLabel={(option) => option.description_}
                   getOptionValue={(option) => option.meal_category_id}
                   />
             
                </div>
                  </div>
                    <div class="form-row">
                      <div  class="form-group col-md-4">
                        <label for="name">Name <i className="text-danger">*</i></label>
                        <Input onChange = {event => {
                          setName(event.target.value)
                        }} name="name" class="form-control" id="name" value={name} />
                      </div>
                      <div  class="form-group col-md-3">
                        <label for="addoz">Add Protein</label>
                        <Input onChange = {event => {
                          setAddprot(event.target.value)
                        }} name="addoz" class="form-control" id="addoz" value={addProt}/>
                      </div>
                    </div>
                    <div class="form-group">
                          <label for="desc">Description</label>
                          <textarea value={desc} onChange = {event => {setDesc(event.target.value)}} name="desc"class="form-control" id="desc" rows="4"></textarea>
                    </div>
                  
                  <Button type="submit" class="btn btn-primary">Save</Button>
              </Form>
          
                  </ModalBody>
                </Modal>

                <div class="btn-group" role="group" aria-label="Button group example">
                   <Button
                           color="primary"
                           onClick={toggle}
                         >
                           Edit Meal
                   </Button>
                 </div>
            </div> 

            </div>
        )
      
    }

    };

    return (
        <>
          {displayMeals()}
          
        </>
      );

  }
  export default compose(
    graphql(getMealsQuery, { name: "getMealsQuery" }),
    graphql(EditMealMutation, { name: "EditMealMutation" }),
    graphql(getProteinQuery, { name: "getProteinQuery" }),
    graphql(getMealCategory, { name: "getMealCategory" }),
  )(MealsList);

