import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import Projects from './components/projects/Projects';
import ProjectDetail from './components/projects/ProjectDetail';
import NewProject from './components/projects/NewProject';
import Settings from './components/settings/Settings';
import Categories from './components/settings/Categories';
import NewCategory from './components/settings/NewCategory';
import Stars from './components/settings/Stars';
import NewStar from './components/settings/NewStar';

import Alerts from './components/layout/Alerts';
import Error from './components/pages/Error';
import PrivateRoute from './components/routing/PrivateRoute';
import CustomRoute from './components/routing/CustomRoute';

import setAuthToken from './utils/setAuthToken';
import ScrollToTop from './utils/ScrollToTop';

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
    });
    return (
        <Provider store={store}>
            <Router>
                <ScrollToTop>
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
                                <PrivateRoute exact path='/settings' component={Settings} authorize={0} />
                                <PrivateRoute exact path='/settings/categories' component={Categories} authorize={0} />
                                <PrivateRoute exact path='/settings/categories/create' component={NewCategory} authorize={0} />
                                <PrivateRoute exact path='/settings/stars' component={Stars} authorize={0} />
                                <PrivateRoute exact path='/settings/stars/create' component={NewStar} authorize={0} />
                                <CustomRoute exact path='/about' component={About} />
                                <CustomRoute exact path='/register' component={Register} />
                                <CustomRoute exact path='/login' component={Login} />
                                <CustomRoute exact path='/forgot' component={ForgotPassword} />
                                <CustomRoute path='*' component={Error} />
                            </Switch>
                        </Fragment>
                        <Footer />
                    </Fragment>
                </ScrollToTop>
            </Router>
        </Provider>
    );
};

export default App;
