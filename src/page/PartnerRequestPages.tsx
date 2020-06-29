import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRole } from '../../src/interface/IRole';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import '../assets/styles/Home.css';
import { SmartPartnershipRequestList } from '../component/partner/PartnershipRequestList';
import { SmartSideBar } from '../component/SideBar';
import { PopupContext } from '../context/PopupContext';
import { all, getEntity } from '../utils';

export interface IPartnerRequestPageProps extends RouteComponentProps {
    user? : Identified<IUser>;
    role? : IRole;
}

export class PartnerRequestPage extends React.PureComponent<IPartnerRequestPageProps> {
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
        const { user } = this.props;
        return (
            <div className="flex">
                { user ? (<SmartSideBar 
                //@ts-ignore
                isAdmin={ true } history={ this.props.history } idUser={ user.id }/>) : null }
                <div className="container">
                    <SmartPartnershipRequestList/>
                </div>
            </div>
        );
    }
}

interface IStoreState {
    user : INormalizedData<IUser>;
    users : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
}

const mapStateToProps = (state : IStoreState) => {
    const user = state.user ? all(state.user)[0] : undefined;
    return {
        user,
        role : user ? getEntity(state.roles)(user.idRole) : undefined,
    };
};

export const SmartPartnerRequestPage = connect(mapStateToProps)(PartnerRequestPage);