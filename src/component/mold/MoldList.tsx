import * as React from 'react';
import { connect } from 'react-redux';
import { IMold } from '../../../src/interface/IMold';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnerRecovery } from '../../../src/interface/IPartnerRecovery';
import { IRecovery } from '../../../src/interface/IRecovery';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { RecoveryState } from '../../../src/type/RecoveryState';
import '../../assets/styles/Recovery.css';
import { filter } from '../../utils';
import { SmartMold } from './Mold';

export interface IMoldListProps {
    molds : Identified<IMold>[];
}

export default class MoldList extends React.PureComponent<IMoldListProps> {
    render() {
        const { molds } = this.props;

        return (
            <div id="RecoveryList">
                { molds.map((mold) => {
                    return <SmartMold key={ mold.id } idMold={ mold.id }/>;
                })
                }
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

const mapStateToProps = (state : IStoreState) => {
    const recoveries = filter(state.recoveries)(recovery => recovery.recoveryState === RecoveryState.NotTaken);
    const idMolds = recoveries.map(recovery => recovery.idMold);

    return {
        molds : filter(state.molds)(mold => idMolds.includes(mold.id)),
    };

};

export const SmartMoldList = connect(mapStateToProps)(MoldList);