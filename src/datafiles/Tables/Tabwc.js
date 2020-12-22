import React, { Component } from 'react'
import axios from 'axios'

class Tabwc extends Component 
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
    axios.get('https://poc100.herokuapp.com/register/winnercircle_table',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    }).then((res) => 
    { 
    this.setState({tableData:res.data});
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
         <thead>
         <tr>
           <th className="col">Name</th>
             <th className="col">Project</th>
             <th className="col">Project Manager</th>
             <th className="col">Delivery Manager</th>
             <th className="col">Recieved From</th>
             <th className="col">Winner Circle Points</th> 
             <th className="col">Description</th>
             <th className="col">Recieved Date</th>
           </tr>
         </thead>
         <tbody className="row">
           {this.renderTableRows()}
         </tbody>
       </table></div>

      ) : (
         
        <div>
                          <table className="tab">
         <thead>
           <tr>
           <th className="col">Name</th>
             <th className="col">Project</th>
             <th className="col">Project Manager</th>
             <th className="col">Delivery Manager</th>
             <th className="col">Recieved From</th>
             <th className="col">Winner Circle Points</th> 
             <th className="col">Description</th>
             <th className="col">Recieved Date</th>
           </tr>
         </thead>
   
       </table>
      </div>
      )
  }

  renderTableRows = () => {
    return this.state.tableData.map(user => {
      return (
        <tr>
        <td className="row">{user.Name}</td>
        <td className="row">{user.Project}</td>
        <td className="row">{user.PM}</td>
        <td className="row">{user.DM}</td>
        <td className="row">{user.From}</td>
        <td className="row">{user.Points}</td>
        <td className="row">{user.Description}</td>
        <td className="row">{user.date}</td>
</tr>
      )
    })
  }
}
  export default Tabwc;