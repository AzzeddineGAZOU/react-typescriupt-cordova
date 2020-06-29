import { faEye, faHandRock } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { connect } from 'react-redux';
import { IMold } from '../../../src/interface/IMold';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IRecovery } from '../../../src/interface/IRecovery';
import { IRole } from '../../../src/interface/IRole';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import '../../assets/styles/Recovery.css';
import { PopupContext } from '../../context/PopupContext';
import { all, getEntity } from '../../utils';
import { Button } from '../Button';
import { SmartMoldDetails } from '../mold/moldDetails';

export interface IRecoveryProps {
    recovery : Identified<IRecovery>;
    mold : Identified<IMold>;
}

export default class Recovery extends React.PureComponent<IRecoveryProps> {
    static contextType = PopupContext;

    pickMold = async () => {
        this.context.popup.show(
            'reward',
            <SmartMoldDetails idMold={ this.props.mold.id } idRecovery={ this.props.recovery.id }/>
        );
    };

    render() {
        const { recovery, mold } = this.props;
        return (
            <tr>
                <td>{ mold.quantity }g</td>
                <td>{ mold.pickUpAddress }</td>
                <td>{ mold.compositionDate }</td>
                <td>
                    <Button className="btn btn-primary" onClick={ this.pickMold } icon={ faEye }/>
                </td>
            </tr>
        );
    }
}

export interface ISmartRecoveryProps {
    idRecovery : Identifier;
}

interface IStoreState {
    molds : INormalizedData<IMold>;
    recoveries : INormalizedData<IRecovery>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartRecoveryProps) => {
    const recovery = getEntity(state.recoveries)(ownProps.idRecovery);
    return {
        recovery,
        mold : getEntity(state.molds)(recovery.idMold),
    };
};

export const SmartRecovery = connect(mapStateToProps)(Recovery);