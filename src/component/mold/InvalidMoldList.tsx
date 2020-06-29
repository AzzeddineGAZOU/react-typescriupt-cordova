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
import Heading from '../Heading';
import { SmartMold } from './Mold';

export interface IInvalidMoldListProps {
    molds : Identified<IMold>[];
}

export default class InvalidMoldList extends React.PureComponent<IInvalidMoldListProps> {
    render() {
        const { molds } = this.props;

        return (
            <div id="RecoveryList">
                <Heading title="Colis invalide"/>
                <div className="boxing">
                    { molds.map((mold) => {
                        return <SmartMold key={ mold.id } idMold={ mold.id } isInvalid={ true }/>;
                    })
                    }
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

const mapStateToProps = (state : IStoreState) => {
    const recoveries = filter(state.recoveries)(recovery => recovery.recoveryState === RecoveryState.Invalid);
    const idMolds = recoveries.map(recovery => recovery.idMold);

    return {
        molds : filter(state.molds)(mold => idMolds.includes(mold.id)),
    };

};

export const SmartInvalidMoldList = connect(mapStateToProps)(InvalidMoldList);