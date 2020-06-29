import { faCheck, faExclamationCircle, faHandPaper } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IMold } from '../../../src/interface/IMold';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnerRecovery } from '../../../src/interface/IPartnerRecovery';
import { IRecovery } from '../../../src/interface/IRecovery';
import { IRole } from '../../../src/interface/IRole';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import { RecoveryState } from '../../../src/type/RecoveryState';
import { setPartnerRecoveries } from '../../action-creator/setParnerRecoveries';
import { setRecoveries } from '../../action-creator/setRecoveries';
import '../../assets/styles/Recovery.css';
import { PopupContext } from '../../context/PopupContext';
import { getRecoveryStateLabel } from '../../helper/getRecoveryStateLabel';
import { normalize } from '../../normalize';
import PartnerRecoveryService from '../../service/PartnerRecoveryService';
import RecoveryServiceInstance from '../../service/RecoveryService';
import { all, getEntity } from '../../utils';
import { Button } from '../Button';
import ConfirmationPopup from '../ConfirmationPopup';

export interface IRecoveryGlobalViewProps {
    userRole : string;
    partner : IUser;
    mold : IMold;
    user : IUser;
    recovery : IRecovery;
    partnerRecovery : Identified<IPartnerRecovery>;
    setPartnerRecoveries : (partnerRecoveries : INormalizedData<IPartnerRecovery>) => any;
    setRecoveries : (recoveries : INormalizedData<IRecovery>) => any;
}

export default class RecoveryGlobalView extends React.PureComponent<IRecoveryGlobalViewProps> {
    static contextType = PopupContext;
    validate = async () => {
        this.context.popup.show(
            'statuer le colis en tant que valide ? (action irréversible)',
            <ConfirmationPopup onValidate={ this.validateMold } onCancel={ this.cancel }/>
        );
    };

    private setReduxState = async () => {
        const getRecoveries = await RecoveryServiceInstance.findAll();
        const dataRecoveries = await getRecoveries.json();
        this.props.setRecoveries(normalize(dataRecoveries.recoveries));
        const getPartnerRecoveries = await PartnerRecoveryService.findAll();
        const dataPartnerRecoveries = await getPartnerRecoveries.json();
        this.props.setPartnerRecoveries(normalize(dataPartnerRecoveries.partnerRecoveries));
    };

    leave = async () => {
        await RecoveryServiceInstance.leave({ idPartnerRecovery : this.props.partnerRecovery.id });
        await this.setReduxState();
    };

    cancel = () => {
        return false;
    };

    validateMold = async () => {
        await RecoveryServiceInstance.validate({ idPartnerRecovery : this.props.partnerRecovery.id });
        await this.setReduxState();
    };

    invalidateMold = async () => {
        await RecoveryServiceInstance.invalidate({ idPartnerRecovery : this.props.partnerRecovery.id });
        await this.setReduxState();

    };
    invalidate = async () => {
        this.context.popup.show(
            'statuer le colis en tant que non conforme ? (action irréversible)',
            <ConfirmationPopup onValidate={ this.invalidateMold } onCancel={ this.cancel }/>
        );
    };

    render() {
        const { partner, userRole, user, mold, partnerRecovery, recovery } = this.props;
        const recoveryState = getRecoveryStateLabel(recovery.recoveryState);
        const isAdmin = userRole === 'ROLE_ADMIN';
        const assigned = isAdmin ? <td>{ partner.username }</td> : null;
        const actions = !isAdmin && (recovery.recoveryState !== RecoveryState.Delivered && recovery.recoveryState !== RecoveryState.Invalid) ? <td>
            <Button onClick={ this.validate } className="btn btn-validation" icon={ faCheck }/>
            <Button onClick={ this.invalidate } className="btn btn-danger" icon={ faExclamationCircle }/>
            <Button onClick={ this.leave } className="btn btn-warning" icon={ faHandPaper }/>
        </td> : null;
        return (
            <tr>
                <td>{ partnerRecovery.pickDate }</td>
                <td>{ recoveryState }</td>
                { assigned }
                <td>{ user.firstname } { user.lastname }</td>
                { actions }
            </tr>
        );
    }
}

export interface ISmartRecoveryGlobalViewProps {
    idAdmin : Identifier;
    idPartnerRecovery : Identifier;
}

interface IStoreState {
    user : INormalizedData<IUser>;
    users : INormalizedData<IUser>;
    molds : INormalizedData<IMold>;
    recoveries : INormalizedData<IRecovery>;
    partnerRecoveries : INormalizedData<IPartnerRecovery>;
    roles : INormalizedData<IRole>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartRecoveryGlobalViewProps) => {
    const partnerRecovery = getEntity(state.partnerRecoveries)(ownProps.idPartnerRecovery);
    const recovery = getEntity(state.recoveries)(partnerRecovery.idRecovery);
    const mold = getEntity(state.molds)(recovery.idMold);
    const admin = state.user ? all(state.user)[0] : undefined;
    const partner = getEntity(state.users)(partnerRecovery.idUser);
    const userRole = getEntity(state.roles)(admin!.idRole).name;
    return {
        partner,
        partnerRecovery,
        userRole,
        user : getEntity(state.users)(mold.idUser),
        mold,
        recovery,
    };
};

const mapDispatchToProps = (dispatch : Dispatch, ownProps : ISmartRecoveryGlobalViewProps) => ({
    setPartnerRecoveries : (partnerRecoveries : INormalizedData<IPartnerRecovery>) => dispatch(setPartnerRecoveries(partnerRecoveries)),
    setRecoveries : (recoveries : INormalizedData<IRecovery>) => dispatch(setRecoveries(recoveries)),
});

export const SmartRecoveryGlobalView = connect(mapStateToProps, mapDispatchToProps)(RecoveryGlobalView);