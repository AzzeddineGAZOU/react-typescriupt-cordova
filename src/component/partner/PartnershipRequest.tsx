import { faEye } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { connect } from 'react-redux';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnershipRequest } from '../../../src/interface/IPartnershipRequest';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import '../../assets/styles/Recovery.css';
import { PopupContext } from '../../context/PopupContext';
import { getEntity } from '../../utils';
import { Button } from '../Button';
import { SmartPartnershipRequestDetails } from './PartnershipRequestDetails';

export interface IPartnershipRequestProps {
    partnershipRequest : Identified<IPartnershipRequest>;
}

export default class PartnershipRequest extends React.PureComponent<IPartnershipRequestProps> {
    static contextType = PopupContext;

    showMoldDetails = async () => {
        this.context.popup.show(
            'Détails de la demande',
            <SmartPartnershipRequestDetails idPartnershipRequest={ this.props.partnershipRequest.id }/>
        );
    };

    render() {
        const { partnershipRequest } = this.props;

        return (
            <tr>
                <td>{ partnershipRequest.username }</td>
                <td>{ partnershipRequest.submittedDate }</td>
                <td><Button className="btn btn-primary" onClick={ this.showMoldDetails } icon={ faEye }/></td>
            </tr>
        );
    }
}

export interface ISmartPartnershipRequestProps {
    idPartnershipRequest : Identifier;
}

interface IStoreState {
    partnershipRequests : INormalizedData<IPartnershipRequest>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartPartnershipRequestProps) => ({
    partnershipRequest : getEntity(state.partnershipRequests)(ownProps.idPartnershipRequest),
});

export const SmartPartnershipRequest = connect(mapStateToProps)(PartnershipRequest);