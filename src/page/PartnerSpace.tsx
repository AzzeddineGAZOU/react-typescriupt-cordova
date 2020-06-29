import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import '../assets/styles/Home.css';
import { SmartInvalidMoldList } from '../component/mold/InvalidMoldList';
import { SmartRecoveryGlobalViewList } from '../component/recovery/RecoveryGlobalViewList';
import { SmartRecoveryList } from '../component/recovery/RecoveryList';
import { SmartSideBar } from '../component/SideBar';
import { PopupContext } from '../context/PopupContext';
import { all } from '../utils';

export interface IPartnerSpaceProps extends RouteComponentProps {
    user : Identified<IUser>;
}

export class PartnerSpace extends React.PureComponent<IPartnerSpaceProps> {
    static contextType = PopupContext;

    constructor(props) {
        super(props);
        if (!this.props.user) {
            this.props.history.push('/');
        }
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
                history={ this.props.history } idUser={ user.id }/>) : null }
                <div className="container">
                    <SmartRecoveryList/>
                    <SmartRecoveryGlobalViewList idAdmin={ user.id }/>
                </div>
            </div>
        );
    }
}

interface IStoreState {
    user : INormalizedData<IUser>;
    users : INormalizedData<IUser>;
}

const mapStateToProps = (state : IStoreState) => {
    return {
        user : state.user ? all(state.user)[0] : undefined
    };
};

export const SmartPartnerSpace = connect(mapStateToProps)(PartnerSpace);