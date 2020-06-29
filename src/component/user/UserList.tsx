import * as React from 'react';
import { connect } from 'react-redux';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IRole } from '../../../src/interface/IRole';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import '../../assets/styles/Recovery.css';
import { getCustomers } from '../../selector/getCustomers';
import { all, getEntity } from '../../utils';
import Heading from '../Heading';
import { SmartUserDetails } from './UserDetails';

export interface IUserListProps {
    users : Identified<IUser>[];
    admin : Identified<IUser>;
    role : Identified<IRole>;
}

export default class UserList extends React.PureComponent<IUserListProps> {
    render() {
        const { users, admin, role } = this.props;

        return (
            <div id="RecoveryList">
                <Heading title="Clients"/>
                <div className="boxing">
                    <table>
                        <thead>
                        <tr>
                            <th>utilisateur</th>
                            <th>utilisation machine</th>
                            <th>colis envoyé</th>
                            <th>quantité livré</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        { users.length ? users.map(
                            (user) => <SmartUserDetails key={ user.id } idUser={ user.id }/>)
                            : (<p>aucun utilisateur</p>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export interface ISmartUserListProps {
    idAdmin : Identifier;
}

interface IStoreState {
    users : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartUserListProps) => {
    const admin = getEntity(state.users)(ownProps.idAdmin);
    const role = getEntity(state.roles)(admin.idRole);

    return {
        admin,
        role,
        users : getCustomers(state),
    };

};

export const SmartUserList = connect(mapStateToProps)(UserList);