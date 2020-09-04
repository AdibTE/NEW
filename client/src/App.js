import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Projects from './components/projects/Projects';
import ProjectDetail from './components/projects/ProjectDetail';
import NewProject from './components/projects/NewProject';
import Alerts from './components/layout/Alerts';
import Error from './components/pages/Error';
import PrivateRoute from './components/routing/PrivateRoute';
import CustomRoute from './components/routing/CustomRoute';

import setAuthToken from './utils/setAuthToken';

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
    });
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Fragment>
                        <Alerts />
                        <Switch>
                            <CustomRoute exact path='/404' component={Error} />
                            <CustomRoute exact path='/' component={Home} />
                            <CustomRoute exact path='/projects' component={Projects} />
                            <CustomRoute exact path='/projects/details/:id' component={ProjectDetail} />
                            <PrivateRoute exact path='/projects/create' component={NewProject} />
                            <CustomRoute exact path='/about' component={About} />
                            <CustomRoute exact path='/register' component={Register} />
                            <CustomRoute exact path='/login' component={Login} />
                            <CustomRoute path='*' component={Error} />
                        </Switch>
                    </Fragment>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
