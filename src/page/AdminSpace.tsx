import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRole } from '../../src/interface/IRole';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import '../assets/styles/Home.css';
import { SmartInvalidMoldList } from '../component/mold/InvalidMoldList';
import { SmartRecoveryGlobalViewList } from '../component/recovery/RecoveryGlobalViewList';
import { SmartRecoveryList } from '../component/recovery/RecoveryList';
import { SmartSideBar } from '../component/SideBar';
import { PopupContext } from '../context/PopupContext';
import { all, getEntity } from '../utils';

export interface IAdminSpaceProps extends RouteComponentProps {
    user? : Identified<IUser>;
    role? : IRole;
}

export class AdminSpace extends React.PureComponent<IAdminSpaceProps> {
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
                    <div className="flex evenly">
                        <SmartRecoveryList/>
                        <SmartInvalidMoldList/>
                    </div>
                    <SmartRecoveryGlobalViewList idAdmin={ user!.id }/>
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

export const SmartAdminSpace = connect(mapStateToProps)(AdminSpace);