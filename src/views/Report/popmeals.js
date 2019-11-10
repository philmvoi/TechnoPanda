import React, {useState} from "react";
import { graphql } from "react-apollo";
import ReactTable from 'react-table';
import { compose } from "recompose";
import 'react-table/react-table.css';
import {getPopMeals} from './queries'

const columns = [{
  Header: "MEAL FREQUENCY",
  columns:
  [
    {
      Header: "Meal",
      accessor: "meal_name",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Frequency",
      accessor: "frequency",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    ]}
  ];

const PopMealsReport = props => {

  const displayPopMeals = () => {

    const data = props.getPopMeals;
    if (data.loading) {
      return <div>Loading Popular Meals...</div>;
    } else {
        return (
          <div>
          <div>
            <ReactTable
                data={data.popularMeal}
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
         {displayPopMeals()}
          
        </>
      );

}

export default compose(
    graphql(getPopMeals, { name: "getPopMeals" }),  
  )(PopMealsReport);