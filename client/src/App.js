import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import Spinner from './components/layout/Spinner';
import PrivateRoute from './components/routing/PrivateRoute';

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
                    <Spinner />
                    <Navbar />
                    <div className='container'>
                        <Alerts />
                        <Switch>
                            <PrivateRoute exact path='/' component={Home} />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/login' component={Login} />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
