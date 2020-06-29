import { faArrowRight, faMailBulk, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IMold } from '../../../src/interface/IMold';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnerRecovery } from '../../../src/interface/IPartnerRecovery';
import { IRecovery } from '../../../src/interface/IRecovery';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import { setUsers } from '../../action-creator/user/setUsers';
import '../../assets/styles/Recovery.css';
import { PopupContext } from '../../context/PopupContext';
import { normalize } from '../../normalize';
import { getUserTotalMoldPicked } from '../../selector/getUserTotalMoldPicked';
import UserServiceInstance from '../../service/UserService';
import { getEntity } from '../../utils';
import { Button } from '../Button';
import ConfirmationPopup from '../ConfirmationPopup';
import { SmartContactForm } from '../form/ContactForm';

export interface IPartnerDetailsProps {
    user : Identified<IUser>;
    userTotalMoldPicked : number;
    setUsers : (users : INormalizedData<IUser>) => any;

}

export default class PartnerDetails extends React.PureComponent<IPartnerDetailsProps> {
    static contextType = PopupContext;

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
            `Suppimer ${ this.props.user.username } ?`,
            <ConfirmationPopup onValidate={ this.deleteUser } onCancel={ this.cancelDeletion }/>
        );
    };

    sendMail = async () => {
        this.context.popup.show(
            `Contacter ${ this.props.user.username }`,
            <SmartContactForm idUser={ this.props.user.id }/>
        );
    };

    render() {
        const { user, userTotalMoldPicked } = this.props;

        return (
            <tr>
                <td>{ user.username }</td>
                <td>{ userTotalMoldPicked }</td>
                <td style={ { textAlign : 'right' } }>
                    <Link to={ `adminspace/partnerRecoveries/${ user.id }` }>
                        <span className="btn btn-primary"><FontAwesomeIcon icon={ faArrowRight }/></span>
                    </Link>
                    <Button onClick={ this.delete } className="btn btn-danger" icon={ faTimes }/>
                    <Button preventSubmit={ true } onClick={ this.sendMail } className="btn btn-warning" icon={ faMailBulk }/>
                </td>
            </tr>
        );
    }
}

export interface ISmartPartnerDetailsProps {
    idUser : Identifier;
}

interface IStoreState {
    users : INormalizedData<IUser>;
    molds : INormalizedData<IMold>;
    recoveries : INormalizedData<IRecovery>;
    partnerRecoveries : INormalizedData<IPartnerRecovery>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartPartnerDetailsProps) => {
    return {
        user : getEntity(state.users)(ownProps.idUser),
        userTotalMoldPicked : getUserTotalMoldPicked(state)(ownProps.idUser),
    };
};

const mapDispatchToProps = (dispatch : Dispatch, ownProps : ISmartPartnerDetailsProps) => ({
    setUsers : (users : INormalizedData<IUser>) => dispatch(setUsers(users)),
});

export const SmartPartnerDetails = connect(mapStateToProps, mapDispatchToProps)(PartnerDetails);