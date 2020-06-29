import * as React from 'react';
import { connect } from 'react-redux';
import { IMold } from '../../../src/interface/IMold';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnerRecovery } from '../../../src/interface/IPartnerRecovery';
import { IRecovery } from '../../../src/interface/IRecovery';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import { RecoveryState } from '../../../src/type/RecoveryState';
import '../../assets/styles/Recovery.css';
import { filter, getEntity } from '../../utils';
import Heading from '../Heading';
import { SmartRecovery } from './Recovery';

export interface IRecoveryListProps {
    recoveries : Identified<IRecovery>[];
}

export default class RecoveryList extends React.PureComponent<IRecoveryListProps> {
    render() {
        const { recoveries } = this.props;

        return (
            <div id="RecoveryList">
                <Heading title="Colis non pris en charges"/>
                <div className="boxing">
                    <table>
                        { recoveries.length ? recoveries.map((recovery) => {
                            return <SmartRecovery idRecovery={ recovery.id }/>;
                        }) : (<p>aucun colis non traité</p>)
                        }
                    </table>
                </div>
            </div>
        );
    }
}

interface IStoreState {
    users : INormalizedData<IUser>;
    molds : INormalizedData<IMold>;
    recoveries : INormalizedData<IRecovery>;
    partnerRecoveries : INormalizedData<IPartnerRecovery>;
}

const mapStateToProps = (state : IStoreState) => ({
    recoveries : filter(state.recoveries)(recovery => recovery.recoveryState === RecoveryState.NotTaken),
});

export const SmartRecoveryList = connect(mapStateToProps)(RecoveryList);