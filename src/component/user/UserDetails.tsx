import { faGift, faMailBulk, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IMold } from '../../../src/interface/IMold';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IRecovery } from '../../../src/interface/IRecovery';
import { IReward } from '../../../src/interface/IReward';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import { setUsers } from '../../action-creator/user/setUsers';
import '../../assets/styles/Recovery.css';
import { PopupContext } from '../../context/PopupContext';
import { normalize } from '../../normalize';
import { getUserTotalDeliveredMold } from '../../selector/getUserTotalDeliveredMold';
import { getUserTotalDeliveredMoldQuantity } from '../../selector/getUserTotalDeliveredMoldQuantity';
import UserServiceInstance from '../../service/UserService';
import { filter, getEntity } from '../../utils';
import { Button } from '../Button';
import ConfirmationPopup from '../ConfirmationPopup';
import { SmartContactForm } from '../form/ContactForm';
import { SmartRewardForm } from '../reward/RewardForm';

export interface IUserDetailsProps {
    user : Identified<IUser>;
    userTotalDeliveredMold : number;
    producedMolds : number;
    setUsers : (users : INormalizedData<IUser>) => any;
    userTotalDeliveredMoldQuantity : number;
    rewardNumber : number;
}

export default class UserDetails extends React.PureComponent<IUserDetailsProps> {
    static contextType = PopupContext;
    reward = async () => {
        this.context.popup.show(
            'attribuer une recompense',
            <SmartRewardForm idUser={ this.props.user.id }/>
        );

    };

    deleteUser = async () => {
        const deletion = await UserServiceInstance.remove(this.props.user.id);
        if (deletion.ok) {
            const getUsers = await UserServiceInstance.findAll();
            const dataUsers = await getUsers.json();
            this.props.setUsers(normalize(dataUsers.users));
        }
    };

    cancelDeletion = () => {
        return false;
    };

    delete = async () => {
        this.context.popup.show(
            `Suppimer ${ this.props.user.firstname }${ this.props.user.lastname } ?`,
            <ConfirmationPopup onValidate={ this.deleteUser } onCancel={ this.cancelDeletion }/>
        );
    };

    sendMail = async () => {
        this.context.popup.show(
            `Contacter ${ this.props.user.firstname } ${ this.props.user.lastname }`,
            <SmartContactForm idUser={ this.props.user.id }/>
        );
    };

    render() {
        const { user, userTotalDeliveredMold, rewardNumber, userTotalDeliveredMoldQuantity, producedMolds } = this.props;
        const isMultipleOfFive = userTotalDeliveredMold % 5 === 0;

        const rewardButton = (userTotalDeliveredMold > 0 && isMultipleOfFive) || userTotalDeliveredMold === 1 ?
            <Button onClick={ this.reward } label={ String(rewardNumber) } className="btn btn-validation" icon={ faGift }/>
            : null;
        return (
            <tr>
                <td>{ user.firstname } { user.lastname }</td>
                <td>{ producedMolds }</td>
                <td>{ userTotalDeliveredMold }</td>
                <td>{ userTotalDeliveredMoldQuantity }g</td>
                <td style={ { textAlign : 'right' } }>
                    { rewardButton }
                    <Button onClick={ this.delete } className="btn btn-danger" icon={ faTimes }/>
                    <Button onClick={ this.sendMail } className="btn btn-warning" icon={ faMailBulk }/>
                </td>
            </tr>
        );
    }
}

export interface ISmartUserDetailsProps {
    idUser : Identifier;
}

interface IStoreState {
    users : INormalizedData<IUser>;
    molds : INormalizedData<IMold>;
    recoveries : INormalizedData<IRecovery>;
    rewards : INormalizedData<IReward>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartUserDetailsProps) => {

    return {
        user : getEntity(state.users)(ownProps.idUser),
        producedMolds : filter(state.molds)(mold => mold.idUser === ownProps.idUser).length,
        rewardNumber : filter(state.rewards)(reward => reward.idUser === ownProps.idUser).length,
        userTotalDeliveredMold : getUserTotalDeliveredMold(state)(ownProps.idUser),
        userTotalDeliveredMoldQuantity : getUserTotalDeliveredMoldQuantity(state)(ownProps.idUser),
    };
};

const mapDispatchToProps = (dispatch : Dispatch, ownProps : ISmartUserDetailsProps) => ({
    setUsers : (users : INormalizedData<IUser>) => dispatch(setUsers(users)),
});

export const SmartUserDetails = connect(mapStateToProps, mapDispatchToProps)(UserDetails);