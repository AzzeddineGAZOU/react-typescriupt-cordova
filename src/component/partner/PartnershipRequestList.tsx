import * as React from 'react';
import { connect } from 'react-redux';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnershipRequest } from '../../../src/interface/IPartnershipRequest';
import { Identified } from '../../../src/type/Identified';
import { RequestState } from '../../../src/type/RequestState';
import '../../assets/styles/Recovery.css';
import { filter } from '../../utils';
import Heading from '../Heading';
import { SmartPartnershipRequest } from './PartnershipRequest';

export interface IPartnershipRequestListProps {
    partnershipRequests : Identified<IPartnershipRequest>[];
}

export default class PartnershipRequestList extends React.PureComponent<IPartnershipRequestListProps> {
    render() {
        const { partnershipRequests } = this.props;
        return (
            <div>
                <Heading title="Demandes de partenariat"/>
                <div className="boxing">
                    <table>
                        <thead>
                        <tr>
                            <th>Date de Société</th>
                            <th>Date d'envoi de la demande</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        { partnershipRequests.length ? partnershipRequests.map((partnershipRequest) => {
                            return <SmartPartnershipRequest key={ partnershipRequest.id } idPartnershipRequest={ partnershipRequest.id }/>;
                        }) : (<p>aucune demandes de partnenariat</p>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

interface IStoreState {
    partnershipRequests : INormalizedData<IPartnershipRequest>;
}

const mapStateToProps = (state : IStoreState) => ({
    partnershipRequests : filter(state.partnershipRequests)(partnershipRequest => partnershipRequest.requestState === RequestState.Sent),
});

export const SmartPartnershipRequestList = connect(mapStateToProps)(PartnershipRequestList);