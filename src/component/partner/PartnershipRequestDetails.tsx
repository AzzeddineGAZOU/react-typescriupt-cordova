import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnershipRequest } from '../../../src/interface/IPartnershipRequest';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import { RequestState } from '../../../src/type/RequestState';
import { setPartnershipRequests } from '../../action-creator/setPartnershipRequests';
import '../../assets/styles/Recovery.css';
import { setUsers } from '../../action-creator/user/setUsers';
import { PopupContext } from '../../context/PopupContext';
import { normalize } from '../../normalize';
import PartnershipRequestServiceInstance from '../../service/PartnershipRequestService';
import UserServiceInstance from '../../service/UserService';
import { getEntity } from '../../utils';
import { Button } from '../Button';

export interface IPartnershipRequestDetailsProps {
    partnershipRequest : Identified<IPartnershipRequest>;
    setPartnershipRequests : (partnershipRequests : INormalizedData<IPartnershipRequest>) => any;
    setUsers : (users : INormalizedData<IUser>) => any;
}

export default class PartnershipRequestDetails extends React.PureComponent<IPartnershipRequestDetailsProps> {
    static contextType = PopupContext;

    render() {
        const { partnershipRequest } = this.props;

        return (
            <div className="flexRow marginBetweenChildren">
                <div>
                    <p>creer par <span className="important">{ partnershipRequest.username }</span></p>
                    <p>le { partnershipRequest.submittedDate }</p>
                    <p>motivation:{ partnershipRequest.motivation }</p>
                    <div>
                        <Button className="btn btn-primary" label="accepter" onClick={ this.accept } icon={ faCheck }/>
                        <Button className="btn btn-danger" label="refuser" onClick={ this.deny } icon={ faTimes }/>
                    </div>
                </div>
            </div>
        );
    }

    private setReduxState = async () => {
        const getPartnershipRequest = await PartnershipRequestServiceInstance.findAll();
        const dataPartnershipRequests = await getPartnershipRequest.json();
        this.props.setPartnershipRequests(normalize(dataPartnershipRequests.partnershipRequests));
        const getUsers = await UserServiceInstance.findAll();
        const dataUsers = await getUsers.json();
        this.props.setUsers(normalize(dataUsers.users));
        this.context.popup.show(null, null);
    };
    private accept = async () => {
        await PartnershipRequestServiceInstance.denyOrGrant(this.props.partnershipRequest.id, RequestState.Granted);
        await this.setReduxState();
    };

    private deny = async () => {
        await PartnershipRequestServiceInstance.denyOrGrant(this.props.partnershipRequest.id, RequestState.Denied);
        await this.setReduxState();
    };
}

export interface ISmartPartnershipRequestDetailsProps {
    idPartnershipRequest : Identifier;
}

interface IStoreState {
    partnershipRequests : INormalizedData<IPartnershipRequest>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartPartnershipRequestDetailsProps) => ({
    partnershipRequest : getEntity(state.partnershipRequests)(ownProps.idPartnershipRequest),
});

const mapDispatchToProps = (dispatch : Dispatch, ownProps : ISmartPartnershipRequestDetailsProps) => ({
    setPartnershipRequests : (partnershipRequests : INormalizedData<IPartnershipRequest>) => dispatch(setPartnershipRequests(partnershipRequests)),
    setUsers : (users : INormalizedData<IUser>) => dispatch(setUsers(users)),
});
export const SmartPartnershipRequestDetails = connect(mapStateToProps, mapDispatchToProps)(PartnershipRequestDetails);