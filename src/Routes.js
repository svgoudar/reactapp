import React, { Component } from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import Register from './Register';
import history from './history';
import SignIn from './SignIn';
import Navbar from './Navbar'
import SupportPage from './SupportPage';
import DataSets from './DataSets';
import Hackerank from './datafiles/DropdownPages/Hackerank';
import Trendnext from './datafiles/DropdownPages/Trendnext';
import Topcoder from './datafiles/DropdownPages/Topcoder';
import Shristi from './datafiles/DropdownPages/Shristi';
import Pragati from './datafiles/DropdownPages/Pragati';
import Wc from './datafiles/DropdownPages/Wc';
import Details from './datafiles/DropdownPages/Details';
import Topgear from './datafiles/DropdownPages/Topgear';
import ReportWC from'./datafiles/Reports/ReportWC';
import ReportsTgc from'./datafiles/Reports/ReportsTgc';
import ReportsTgl from'./datafiles/Reports/ReportsTgl';
import ReportsH from'./datafiles/Reports/ReportsH';
import ReportsT from'./datafiles/Reports/ReportsT';
import ReportTTM from'./datafiles/Reports/ReportTTM';
import ReportsS from'./datafiles/Reports/ReportsS';
import ReportsP from'./datafiles/Reports/ReportsP';

export default class Routes extends Component
{
    render()
        {
            return(
                <Router history= {history}>
                <Switch>

                <Route exact path="/" component={SignIn} />
                <Route path ="/Register" component = {Register} />
                <Route path="/Navbar" component={Navbar} />
                <Route path="/SignIn" component={SignIn} />
                <Route path="/SupportPage" component={SupportPage} />
                <Route path="/Reports" component={DataSets} />
                <Route path="/Hackerank" component={Hackerank} />
                <Route path="/TrendNext" component={Trendnext} />
                <Route path="/Pragati" component={Pragati} />
                <Route path="/Topcoder" component={Topcoder} />
                <Route path="/Shristi" component={Shristi} />
                <Route path="/Wc" component={Wc} />
                <Route path="/Details" component={Details} />
                <Route path="/Topgear" component={Topgear} />
                <Route path="/WC_Reports" component={ReportWC} />
                <Route path="/hackerank_Reports" component={ReportsH} />
                <Route path="/trendnext_Reports" component={ReportTTM} />
                <Route path="/trendnextReports" component={ReportsT} />
                <Route path="/topgearl_Reports" component={ReportsTgl} />
                <Route path="/topgearc_Reports" component={ReportsTgc} />
                <Route path="/pragati_Reports" component={ReportsP} />
                <Route path="/shristi_Reports" component={ReportsS} />

                </Switch>
                </Router>
            )
        }
}

