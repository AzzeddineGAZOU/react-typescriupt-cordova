import { IPartnershipRequest } from '../../../src/interface/IPartnershipRequest';
import { Identified } from '../../../src/type/Identified';
import { RequestState } from '../../../src/type/RequestState';

export const request1 : Identified<IPartnershipRequest> = {
    id : 1,
    address : '2 rue ',
    city : 'paris',
    email : 'dani@gmail.com',
    firstname : 'daniel',
    lastname : 'dupré',
    motivation : 'On est interressé par votre projet',
    password : 'danidan',
    postcode : 0,
    requestState : RequestState.Sent,
    submittedDate : '20/08/2020',
    username : 'newSOciety',
};

export const request2 : Identified<IPartnershipRequest> = {
    id : 2,
    address : '2 rue des pré',
    city : 'paris',
    email : 'su@gmail.com',
    firstname : 'daniel',
    lastname : 'dupré',
    motivation : 'motivé',
    password : 'danidan',
    postcode : 0,
    requestState : RequestState.Sent,
    submittedDate : '20/10/2020',
    username : 'Sustainable',
};

export const request3 : Identified<IPartnershipRequest> = {
    id : 3,
    address : '2 rue ',
    city : 'paris',
    email : 're@gmail.com',
    firstname : 'daniel',
    lastname : 'dupré',
    motivation : 'nous voyons là une réelle opportunité',
    password : 'danidan',
    postcode : 0,
    requestState : RequestState.Granted,
    submittedDate : '20/11/202',
    username : 'renouveau',
};

export const partnershipRequests : IPartnershipRequest[] = [
    request1,
    request2,
    request3,
];