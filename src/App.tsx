import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { Dispatch } from 'redux';
import { INormalizedData } from '../src/interface/INormalizedData';
import { IRole } from '../src/interface/IRole';
import { setRoles } from './action-creator/setRoles';
import './assets/styles/Layout.css';
import './assets/styles/Main.css';
import { PopupProvider } from './context/PopupContext';
import { normalize } from './normalize';
import { SmartAdminSpace } from './page/AdminSpace';
import { SmartHandleUser } from './page/HandleUser';
import { SmartHome } from './page/Home';
import { SmartPartnerRecoveriesPage } from './page/PartnerRecoveriesPage';
import { SmartPartnerRequestPage } from './page/PartnerRequestPages';
import { SmartPartnerSpace } from './page/PartnerSpace';
import { SmartUserProfile } from './page/UserProfile';
import { SmartUserSpace } from './page/UserSpace';
import RoleService from './service/RoleService';

export interface IAppProps {
    setRoles : (roles : INormalizedData<IRole>) => any;
}

class App extends React.PureComponent<IAppProps> {
    public async componentDidMount() : Promise<void> {
        const getRoles = await RoleService.findAll();
        const dataRoles = await getRoles.json();
        this.props.setRoles(normalize(dataRoles.roles));
    }

    render() {
        return (
            <PopupProvider>
                <HashRouter>
                    <Route exact path="/" component={ SmartHome }/>
                    <Route path="/userspace" component={ SmartUserSpace }/>
                    <Route path="/profile/:idUser" component={ SmartUserProfile }/>
                    <Route exact path="/adminspace" component={ SmartAdminSpace }/>
                    <Route path="/adminspace/partnerRecoveries/:idUser" component={ SmartPartnerRecoveriesPage }/>
                    <Route path="/partnerRequest" component={ SmartPartnerRequestPage }/>
                    <Route path="/partnerspace" component={ SmartPartnerSpace }/>
                    <Route path="/handleusers" component={ SmartHandleUser }/>
                </HashRouter>
            </PopupProvider>
        );
    }
}

const mapDispatchToProps = (dispatch : Dispatch) => ({
    setRoles : (roles : INormalizedData<IRole>) => dispatch(setRoles(roles)),
});

export const SmartApp = connect(undefined, mapDispatchToProps)(App);

export default App;
