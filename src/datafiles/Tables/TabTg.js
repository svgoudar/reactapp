import React, { Component } from 'react'
import axios from 'axios'

class TabTg extends Component 
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
    axios.get('https://poc100.herokuapp.com/register/topgearc_table',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    }).then((res) => 
    { console.log(res.data)
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
            <th className="col">Topgear ID</th>
            <th className="col">Challenge Title</th>
            <th className="col">Challenge Points</th>
            <th className="col">Certifications</th>
            <th className="col">Cash Reward</th>
            <th className="col">Completion Date</th>
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
            <th className="col">Topgear ID</th>
            <th className="col">Challenge Title</th>
            <th className="col">Challenge Points</th>
            <th className="col">Certifications</th>
            <th className="col">Cash Reward</th>
            <th className="col">Completion Date</th>
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
        <td className="row">{user.name}</td>
        <td className="row">{user.project}</td>
        <td className="row">{user.pm}</td>
        <td className="row">{user.dm}</td>
        <td className="row">{user.tgid}</td>
  <td className="row">{user.chaltitle}</td>
  <td className="row">{user.points}</td>
  <td className="row">{user.cert}</td>
  <td className="row">{user.cashprize}</td>
   <td className="row">{user.date}</td>
    </tr>
      )
    })
  }
}
  export default TabTg;