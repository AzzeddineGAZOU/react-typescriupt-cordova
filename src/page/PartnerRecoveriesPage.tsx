import * as React from 'react';
import { connect } from 'react-redux';
import { match, RouteComponentProps } from 'react-router';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRole } from '../../src/interface/IRole';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import '../assets/styles/Home.css';
import { SmartRecoveryGlobalViewList } from '../component/recovery/RecoveryGlobalViewList';
import { SmartSideBar } from '../component/SideBar';
import { PopupContext } from '../context/PopupContext';
import { all, getEntity } from '../utils';

export interface IPartnerRecoveriesPageProps extends RouteComponentProps {
    user : Identified<IUser>;
    admin? : Identified<IUser>;
    role? : Identified<IRole>;
}

export class PartnerRecoveriesPage extends React.PureComponent<IPartnerRecoveriesPageProps> {
    static contextType = PopupContext;

    constructor(props) {
        super(props);
        !this.props.user && this.props.history.push('/');
        this.props.role!.name !== 'ROLE_ADMIN' && this.props.history.push('/');
    }

    public componentDidUpdate() : void {
        if (!this.props.user) {
            this.props.history.push('/');
        }
    }

    render() {
        const { user, admin } = this.props;
        return (
            <div className="flex">
                { admin ? (<SmartSideBar 
                //@ts-ignore
                isAdmin={ true } history={ this.props.history } idUser={ admin.id }/>) : null }
                <div className="container">
                    <SmartRecoveryGlobalViewList idAdmin={ user.id }/>
                </div>
            </div>
        );
    }
}

export interface ISmartPartnerRecoveriesPageParams {
    idUser : string;
}

export interface ISmartPartnerRecoveriesPageProps {
    match : match<ISmartPartnerRecoveriesPageParams>;
}

interface IStoreState {
    users : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
    user : INormalizedData<IUser>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartPartnerRecoveriesPageProps) => {
    const admin = all(state.user)[0];
    return {
        user : getEntity(state.users)(Number(ownProps.match.params.idUser)),
        admin,
        role : admin ? getEntity(state.roles)(admin.idRole) : undefined,
    };
};

export const SmartPartnerRecoveriesPage = connect(mapStateToProps)(PartnerRecoveriesPage);