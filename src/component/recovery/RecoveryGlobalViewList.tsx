import * as React from 'react';
import { connect } from 'react-redux';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnerRecovery } from '../../../src/interface/IPartnerRecovery';
import { IRecovery } from '../../../src/interface/IRecovery';
import { IRole } from '../../../src/interface/IRole';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import { RecoveryState } from '../../../src/type/RecoveryState';
import '../../assets/styles/Recovery.css';
import { all, filter, getEntity } from '../../utils';
import Heading from '../Heading';
import { SmartRecoveryGlobalView } from './RecoveryGlobalView';

export interface IRecoveryGlobalViewListProps {
    partnerRecoveries : Identified<IPartnerRecovery>[];
    user : Identified<IUser>;
    isAdmin : boolean;
}

export default class RecoveryGlobalViewList extends React.PureComponent<IRecoveryGlobalViewListProps> {
    render() {
        const { partnerRecoveries, user, isAdmin } = this.props;
        const head = isAdmin ? <thead>
        <tr>
            <th>Date de prise en charge</th>
            <th>Etat</th>
            <th>Entreprise</th>
            <th>utilisateur</th>
        </tr>
        </thead> : <thead>
        <tr>
            <th>Date de prise en charge</th>
            <th>Etat</th>
            <th>utilisateur</th>
            <th></th>
        </tr>
        </thead>;

        return (
            <div id="RecoveryList">
                <Heading title="Suvi des Transactions"/>
                <div className="boxing">
                    <table>
                        { head }
                        <tbody>
                        { partnerRecoveries.length ? partnerRecoveries.map(
                            (partnerRecovery) => <SmartRecoveryGlobalView key={ partnerRecovery.id } idPartnerRecovery={ partnerRecovery.id }
                                                                          idAdmin={ user.id }/>)
                            : (<p>aucune transaction en cours</p>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export interface ISmartRecoveryGlobalViewListProps {
    idAdmin : Identifier;
}

interface IStoreState {
    users : INormalizedData<IUser>;
    user : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
    partnerRecoveries : INormalizedData<IPartnerRecovery>;
    recoveries : INormalizedData<IRecovery>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartRecoveryGlobalViewListProps) => {
    const admin = all(state.user)[0];
    const user = getEntity(state.users)(ownProps.idAdmin);
    const role = getEntity(state.roles)(user.idRole);
    const roleAdmin = getEntity(state.roles)(admin.idRole);

    const partnerRecoveries = role.name === 'ROLE_PARTNER' ? filter(state.partnerRecoveries)(partnerRecovery => partnerRecovery.idUser === user.id)
        : all(state.partnerRecoveries);
    const partnerRecoveriesIds = partnerRecoveries.map(partnerRecovery => partnerRecovery.idRecovery);
    const treatedRecoveries = filter(state.recoveries)(recovery => partnerRecoveriesIds.includes(recovery.id) &&
                                                                   (recovery.recoveryState === RecoveryState.Invalid || recovery.recoveryState ===
                                                                    RecoveryState.Delivered));
    const treatedRecoveriesId = treatedRecoveries.map(recovery => recovery.id);
    const treatedPartnerRecoveriesIds = partnerRecoveries.filter(partnerRecovery => treatedRecoveriesId.includes(partnerRecovery.idRecovery))
        .map(partnerRecovery => partnerRecovery.id);

    const sortedPartnerRecoveries = partnerRecoveries.sort((partnerRecoveryA, partnerRecoveryB) => {
        if (treatedPartnerRecoveriesIds.includes(partnerRecoveryA.id) && !treatedPartnerRecoveriesIds.includes(partnerRecoveryB.id)) {
            return 1;
        }
        if (!treatedPartnerRecoveriesIds.includes(partnerRecoveryA.id) && treatedPartnerRecoveriesIds.includes(partnerRecoveryB.id)) {
            return -1;
        }
        return 0;
    });

    return {
        user,
        role,
        partnerRecoveries : sortedPartnerRecoveries,
        isAdmin : roleAdmin.name === 'ROLE_ADMIN',
    };

};

export const SmartRecoveryGlobalViewList = connect(mapStateToProps)(RecoveryGlobalViewList);