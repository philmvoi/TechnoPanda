import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getStatesQuery} from "./queries";
import ReactTable from 'react-table';

const columns = [
    {
      Header: "ID",
      accessor: "state_id"
    },
    {
      Header: "State Name",
      accessor: "state_name"
    }
  ]

const CustomerList = props => {
  console.log(props);
  const [selected, setSelected] = useState({
      selected: [],
  });

//   function changeSelected(e) {
//       setSelected(e)
//   };

  const [row, setRow] = useState({
      row: []
  });

  function changeSelected(e) {
      setSelected(e)
  };

  const displayStates = () => {
    const data = props.data;
    if (data.loading) {
      return <div>Loading States...</div>;
    } else {
        return (
            <ReactTable
                data={data.allStates}
                getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row) {
                    return {
                    onClick: (e) => {
                        changeSelected(
                        rowInfo.index
                        )
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
        )
      
    }
  };

  return (
    <>
      {displayStates()}
    </>
  );
};

export default graphql(getStatesQuery)(CustomerList);

