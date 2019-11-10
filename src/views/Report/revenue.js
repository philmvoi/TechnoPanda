import React, {useState} from "react";
import { graphql } from "react-apollo";
import ReactTable from 'react-table';
import { compose } from "recompose";
import {getPrevMonRev, getCurMonRev} from './queries';
import 'react-table/react-table.css';


const currColumns = [{
  Header: "CURRENT MONTH REVENUE",
  columns:
  [
    {
      Header: "Year",
      accessor: "Current_Year",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Month",
      accessor: "Current_Month",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Revenue",
      accessor: "Total_Revenue_this_Month",
      Cell: row => <div style={{ textAlign: "right" }}>${row.value}</div>
    }
    ]}
  ];

  const prevColumns = [{
    Header: "PREVIOUS MONTH REVENUE",
    columns:
    [
      {
        Header: "Year",
        accessor: "Year",
        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
      },
      {
        Header: "Month",
        accessor: "Previous_Month",
        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
      },
      {
        Header: "Revenue",
        accessor: "Total_Revenue_in_Previous_Month",
        Cell: row => <div style={{ textAlign: "right" }}>${row.value}</div>
      }
      ]}
    ]

const Revenue = props => {

  const displayRevenue = () => {

    const prevData = props.getPrevMonRev
    const currData = props.getCurMonRev;
    if (currData.loading) {
      return <div>Loading Revenue...</div>;
    } else {
        return (
          <div>
          <div>
            <ReactTable
                data={currData.revenueCurrentMonth}
                // filterable={true}
              //   defaultFilterMethod={(filter, row) =>
              //   String(row[filter.id]).indexOf(filter.value) > -1
              // }
                columns={currColumns}
                defaultPageSize={7}
                style={{height: "400px"}}
                className="-striped -highlight"
              
            />

            </div>

            <div>
            <ReactTable
                data={prevData.revenueLastMonth}
                // filterable={true}
              //   defaultFilterMethod={(filter, row) =>
              //   String(row[filter.id]).indexOf(filter.value) > -1
              // }
                columns={prevColumns}
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
         {displayRevenue()}
          
        </>
      );

}

export default compose(
    graphql(getPrevMonRev, { name: "getPrevMonRev" }),  
    graphql(getCurMonRev, { name: "getCurMonRev" }),  
  )(Revenue);
