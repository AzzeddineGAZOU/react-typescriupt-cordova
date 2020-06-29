import * as React from 'react';
import { connect } from 'react-redux';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IRole } from '../../../src/interface/IRole';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import '../../assets/styles/Recovery.css';
import { getPartners } from '../../selector/getPartners';
import { getEntity } from '../../utils';
import Heading from '../Heading';
import { SmartPartnerDetails } from './PartnerDetails';

export interface IPartnerListProps {
    users : Identified<IUser>[];
    admin : Identified<IUser>;
    role : Identified<IRole>;
}

export default class PartnerList extends React.PureComponent<IPartnerListProps> {
    render() {
        const { users, admin, role } = this.props;

        return (
            <div id="RecoveryList">
                <Heading title="Partenaires"/>
                <div className="boxing">
                    <table>
                        <thead>
                        <tr>
                            <th>Société</th>
                            <th>Nombre de colis récupéré</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        { users.length ? users.map(
                            (user) => <SmartPartnerDetails key={ user.id } idUser={ user.id }/>)
                            : (<p>aucun utilisateur</p>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export interface ISmartPartnerListProps {
    idAdmin : Identifier;
}

interface IStoreState {
    users : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartPartnerListProps) => {
    const admin = getEntity(state.users)(ownProps.idAdmin);
    const role = getEntity(state.roles)(admin.idRole);

    return {
        admin,
        role,
        users : getPartners(state),
    };

};

export const SmartPartnerList = connect(mapStateToProps)(PartnerList);