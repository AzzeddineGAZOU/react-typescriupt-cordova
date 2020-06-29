import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRole } from '../../src/interface/IRole';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import '../assets/styles/Home.css';
import { SmartPartnershipRequestList } from '../component/partner/PartnershipRequestList';
import { SmartRecoveryGlobalViewList } from '../component/recovery/RecoveryGlobalViewList';
import { SmartSideBar } from '../component/SideBar';
import { SmartPartnerList } from '../component/user/PartnerList';
import { SmartUserList } from '../component/user/UserList';
import { PopupContext } from '../context/PopupContext';
import { all, getEntity } from '../utils';

export interface IHandleUserProps extends RouteComponentProps {
    user? : Identified<IUser>;
    role? : Identified<IRole>;
}

export class HandleUser extends React.PureComponent<IHandleUserProps> {
    static contextType = PopupContext;

    constructor(props) {
        super(props);
        !this.props.user && this.props.history.push('/');
        this.props.role!.name !== 'ROLE_ADMIN' && this.props.history.push('/');
    }

    render() {
        const { user } = this.props;
        return (
            <div className="flex">
                { user ? (<SmartSideBar 
                //@ts-ignore
                isAdmin={ true } history={ this.props.history } idUser={ user.id }/>) : null }
                <div className="container">
                    <SmartUserList 
                    //@ts-ignore
                    idAdmin={ user.id }/>
                    <SmartPartnerList
                    //@ts-ignore
                    idAdmin={ user.id }/>
                </div>
            </div>
        );
    }
}

interface IStoreState {
    user : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
}

const mapStateToProps = (state : IStoreState) => {
    const user = state.user ? all(state.user)[0] : undefined;
    return {
        user,
        role : user ? getEntity(state.roles)(user.idRole) : undefined
    };
};

export const SmartHandleUser = connect(mapStateToProps)(HandleUser);