import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../../src/components/Header/';
import Footer from '../../src/components/Footer/';
import Dashboard from '../../src/pages/Dashboard/';

function Router() {

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Dashboard} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );

}

export default Router;