import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getMealsQuery, EditMealMutation, getProteinQuery, getMealCategory, getIngredientListQuery, getIngredientsQuery, AddIngListMutation, EditIngListMutation} from "./queries";
import ReactTable from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, Container} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormGroup, Label } from 'reactstrap';
import { compose, setPropTypes } from "recompose";
import Select from 'react-select';
import 'react-table/react-table.css';

const ilcolumns = [
  {
    Header: "ID",
    accessor: "ingredient_list_id",
  },
  {
    Header: "Ingredient ID",
    accessor: "ingredient_id",
    show: false
  },
  {
    Header: "Ingredient",
    accessor: "ingredient_name",
  },
  {
    Header: "Meal ID",
    accessor: "meal_id",
  },
  {
    Header: "Meal",
    accessor: "meal_name",
  },
];

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
//to hold ingredient ID
let ingredient_id = null;

//to hold the selected ingredient
let selectedIng = {
  ingredient_id: '',
  ingredient_name: ''
};

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

      //to hold and set the ingredient_list_id value
    const [il, setIl] = useState({
      il: []
    });

    const [selectedIlrow, setSelctedIlRow] = useState({
      selectedIlrow: []
    });

    const [selectedMealRow, setSelectedMealRow] = useState({
      selectedMealRow: []
    });

    const [selectedEditMeal, setSelectedEditMeal] = useState({
      selectedEditMeal: []
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

    const [ilAddModal, setIlAddModal] = useState(false);
    const ilAddToggle = () => setIlAddModal(!ilAddModal);

    const [ilEditModal, setIlEditModal] = useState(false);
    const ilEditToggle = () => setIlEditModal(!ilEditModal);

    const [inputs, setInputs] = useState({});


    const [meal, setMeal] = useState({
      meal: []
  });


    const displayMeals = () => {

      // to handle submission of the ingredient add form
      const handleIngredientAddSubmit = event => {
        if (event){
           event.preventDefault();
           props.AddIngListMutation({
             variables: {
               meal: meal,
               ing: ingredient_id,
             },
             refetchQueries: [{query: getIngredientListQuery}]
           })
        }
      };

      // to handle submission of the ingredient add form
      const handleIngredientEditSubmit = event => {
        if (event){
           event.preventDefault();
           props.EditIngListMutation({
             variables: {
               id: il,
               ing: selectedIng.ingredient_id,
             },
             refetchQueries: [{query: getIngredientListQuery}]
           })
        }
      };

       // all of this to handle changes in the add meal form
 const handleIngInputChange = event => {
  event.persist();
  setInputs(inputs => ({
    ...inputs,
    [event.target.name]: event.target.value
  }));
}; 
    

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

      // handle change to the ingredient
      const handleIngredientChange = (e,j) => {
        selectedIng.ingredient_id = e
        selectedIng.ingredient_name = j
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
      const ingData = props.getIngredientsQuery;
        const ildata = props.getIngredientListQuery;
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
                   <Button color="dark" onClick={ilAddToggle}> Add Ingredient To Meal </Button>
                 </div>
            </div> 
            <ReactTable
                data={ildata.allIngList}
                getTrProps={(state, rowInfo, instance) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        setIl(rowInfo.row._original.ingredient_list_id)
                        setSelctedIlRow(rowInfo.index);
                        handleIngredientChange(rowInfo.row._original.ingredient_id, rowInfo.row._original.ingredient_name);
                        setSelectedEditMeal(rowInfo.row._original.meal_name)
                    },
                    style: {
                        background: rowInfo.index === selectedIlrow ? '#00afec' : 'white',
                        color: rowInfo.index === selectedIlrow ? 'white' : 'black'
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
                columns={ilcolumns}
                defaultPageSize={7}
                style={{height: "400px"}}
                className="-striped -highlight"
            
            />

          
            <Modal id="small" isOpen={ilAddModal} toggle={ilAddToggle} >
                  <ModalHeader toggle={ilAddToggle}>Add Ingredient List</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handleIngredientAddSubmit}>
              
          
                          <FormGroup>
                            <label>Meal</label>
                          <Input
                                  value={name}
                                  name="name"
                                  className="form-control"
                                  disabled={true}
                                
                                />
                            <label for="ingredient">Ingredient <i className="text-danger">*</i></label>
                            <Select id="ingredient" class="form-control"
                                {...props}
                                closeMenuOnSelect={true}
                                value={inputs.ingredient}
                                hideSelectedOptions={false}
                                backspaceRemovesValue={false}
                                placeholder="Select.."
                                required
                                onChange = {event => {
                                  ingredient_id = event.ingredient_id
                                }}
                                name="ingredient"
                                options={ingData.allIngredientJoin}
                                getOptionLabel={(option) => option.ingredient_name}
                                getOptionValue={(option) => option.ingredient_id}
                                />

                          </FormGroup>
                          <Button type="submit" class="btn btn-primary">Save</Button>
                          
              
                    </Form>
          
                  </ModalBody>
                </Modal>

                <Modal id="small" isOpen={ilEditModal} toggle={ilEditToggle} >
                  <ModalHeader toggle={ilEditToggle}>Edit Ingredient List</ModalHeader>
                  <ModalBody>
                      <Form onSubmit={handleIngredientEditSubmit}>
              
          
                          <FormGroup>
                            <label>Meal</label>
                          <Input
                                  value={selectedEditMeal}
                                  name="name"
                                  className="form-control"
                                  disabled={true}
                                
                                />
                            <label for="ingredient">Ingredient <i className="text-danger">*</i></label>
                            <Select id="ingredient" class="form-control"
                                {...props}
                                closeMenuOnSelect={true}
                                value={selectedIng}
                                hideSelectedOptions={false}
                                backspaceRemovesValue={false}
                                placeholder="Select.."
                                required 
                                onChange = {event => {
                                  handleIngredientChange(event.ingredient_id, event.ingredient_name);
                                }}
                                name="ingredient"
                                options={ingData.allIngredientJoin}
                                getOptionLabel={(option) => option.ingredient_name}
                                getOptionValue={(option) => option.ingredient_id}
                                />

                          </FormGroup>
                          <Button type="submit" class="btn btn-primary">Save</Button>
                          
              
                    </Form>
          
                  </ModalBody>
                </Modal>
                <div class="btn-group" role="group" aria-label="Button group example">
                   <Button color="dark" onClick={ilEditToggle}> Edit Ingredient List </Button>
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
    graphql(getIngredientListQuery, { name: "getIngredientListQuery" }),
    graphql(getIngredientsQuery, { name: "getIngredientsQuery" }),
    graphql(AddIngListMutation, { name: "AddIngListMutation" }),
    graphql(EditIngListMutation, { name: "EditIngListMutation" }),

  )(MealsList);

  