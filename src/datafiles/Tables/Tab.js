import React, { Component } from 'react'
import axios from 'axios'

class Tab extends Component 
{
  constructor(props) {
    super(props)
    this.state = {
      tableData:[],
      isLoading: false,
      isError: false
    }
}

 componentWillMount() {
    axios.get('https://poc100.herokuapp.com/register/hackerrank_table',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    }).then((res) => 
     { 
      //  console.log(res.data.data)
    this.setState({tableData:res.data.data});
    })
    
  }
  render() {
   // console.log("sid", this.state.tableData);
    const { tableData, isLoading, isError } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    return tableData.length > 0
      ? (
         <div>  
      <table className="tab">
      <thead className="col">
           <tr className="col">
             {/* {this.renderTableHeader()} */}
             <th className="col">Name</th>
             <th className="col">Project</th>
             <th className="col">Project Manager</th>
             <th className="col">Delivery Manager</th>
             <th className="col">Hackerrank ID</th>
             <th className="col">Badge</th>
             <th className="col">Certification</th>
             <th className="col">Practice/Contest</th>
             <th className="col">Score</th>
             <th className="col">Skills</th>
             <th className="col">Rating</th>
             <th className="col">Completion Date</th>
    
           </tr>
         </thead>
         <tbody className="row">
           {this.renderTableRows()}
         </tbody>
       </table></div>

      ) : (
      
        
         
        <div>
          {/* <h1 style={{}}>Loading Data...</h1> */}
          
      <table className="tab">
      <thead>
           <tr className="colm">
             {/* {this.renderTableHeader()} */}
             <th className="colm">Name</th>
             <th className="colm">Project</th>
             <th className="colm">Project Manager</th>
             <th className="colm">Delivery Manager</th>
             <th className="colm">Hackerrank ID</th>
             <th className="colm">Badge</th>
             <th className="colm">Certification</th>
             <th className="colm">Practice/Contest</th>
             <th className="colm">Score</th>
             <th className="colm">Skills</th>
             <th className="colm">Rating</th>
             <th className="colm">Completion Date</th>
    
           </tr>
         </thead>
        </table>
      </div>
      )
      
  }
  renderTableRows = () => {
    return this.state.tableData.map(user => {
      return (
        <tr >
            <td className="row">{user.Name}</td>
            <td className="row">{user.Project}</td>
            <td className="row">{user.PM}</td>
            <td className="row">{user.DM}</td>
            <td className="row">{user.HackerRankID}</td>
          <td className="row">{user.Badge}</td>
          <td className="row">{user.Certification}</td>
          <td className="row">{user.Mode}</td>
          <td className="row">{user.Score}</td>
          <td className="row">{user.Skill}</td>
          <td className="row">{user.Stars}</td>
          <td className="row">{user.date}</td>

        </tr>
        
      )
    })
  }
}
  export default Tab;