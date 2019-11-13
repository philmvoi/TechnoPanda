import React, {useState} from "react";
import { graphql } from "react-apollo";
import ReactTable from 'react-table';
import { compose } from "recompose";
import 'react-table/react-table.css';
import {getPopIngredients} from './queries'

const columns = [{
  Header: "MOST POPULAR INGREDIENTS",
  columns:
  [
    {
      Header: "Ingredient",
      accessor: "ingredient_name",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Frequency",
      accessor: "frequency",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    ]}
  ];

const PopIngredientsReport = props => {

  const displayPopIngredients = () => {

    const data = props.getPopIngredients;
    if (data.loading) {
      return <div>Loading Popular Ingredients...</div>;
    } else {
        return (
          <div>
          <div>
            <ReactTable
                data={data.popularIngredients}
                // filterable={true}
              //   defaultFilterMethod={(filter, row) =>
              //   String(row[filter.id]).indexOf(filter.value) > -1
              // }
                columns={columns}
                defaultPageSize={7}
                style={{height: "400px"}}
                className="-striped -highlight"
              
            />

            </div>

            </div>
        )
    }
  }

    return (
        <>
         {displayPopIngredients()}
          
        </>
      );

}

export default compose(
    graphql(getPopIngredients, { name: "getPopIngredients" }),  
  )(PopIngredientsReport);