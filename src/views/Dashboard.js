import React, { Component }from 'react';

import ReleaseFilter from '../components/ReleaseFilter';
import TableDataInstalation from '../components/dashboard/TableDataInstalation';
import TableDataPreparation from '../components/dashboard/TableDataPreparation';
import TableScienceReadyCatalogs from '../components/dashboard/TableScienceReadyCatalogs';
import TableSpecialSamples from '../components/dashboard/TableSpecialSamples';
import TableScienceWorkflows from '../components/dashboard/TableScienceWorkflows';
import TableParameterStimation from '../components/dashboard/TableParameterStimation';
import TableUtilities from '../components/dashboard/TableUtilities';

import '../assets/css/dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <p className="h6 text-center headerTitle">DES Science Portal Dashboard</p>
                <div className="row">
                    <div className="filter">
                        <ReleaseFilter />
                    </div>
                </div>
                <div className="a01 row">
                    <div className="a01-1 col-sm-12 col-md-6 px-0">
                        <TableDataInstalation />
                        <TableDataPreparation />
                        <TableScienceReadyCatalogs />
                    </div>
                    <div className="a01-2 col-sm-12 col-md-6 px-0">
                        <TableSpecialSamples />
                        <TableScienceWorkflows />
                        <TableParameterStimation />
                        <TableUtilities />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;