import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import '../assets/styles/Home.css';
import { SmartSideBar } from '../component/SideBar';
import { PopupContext } from '../context/PopupContext';
import { all } from '../utils';

export interface IUserSpaceProps extends RouteComponentProps {
    user : Identified<IUser>;
}

export class UserSpace extends React.PureComponent<IUserSpaceProps> {
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
                history={ this.props.history } isCustomer={ true } idUser={ user.id }/>) : null }
                <div className="container">
                    <h2>je suis un simple user</h2>
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

export const SmartUserSpace = connect(mapStateToProps)(UserSpace);