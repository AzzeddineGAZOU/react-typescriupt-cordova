import { faArrowRight, faEye, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';
import { IMold } from '../../../src/interface/IMold';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IRole } from '../../../src/interface/IRole';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import '../../assets/styles/Recovery.css';
import { PopupContext } from '../../context/PopupContext';
import { all, getEntity } from '../../utils';
import { Button } from '../Button';
import { SmartContactForm } from '../form/ContactForm';
import { SmartMoldDetails } from './moldDetails';

export interface IMoldProps {
    mold : Identified<IMold>;
    user : Identified<IUser>;
    isInvalid? : boolean;
    isAdmin : boolean;
}

export default class Mold extends React.PureComponent<IMoldProps> {
    static contextType = PopupContext;

    showMoldDetails = async () => {
        this.context.popup.show(
            'detail',
            <SmartMoldDetails idMold={ this.props.mold.id }/>
        );
    };

    sendMail = async () => {
        this.context.popup.show(
            `Contacter ${ this.props.user.firstname } ${ this.props.user.lastname }`,
            <SmartContactForm idUser={ this.props.user.id }/>
        );
    };

    render() {
        const { mold, isAdmin, isInvalid } = this.props;

        return (
            <div className="flexRow marginBetweenChildren list">
                <p>{ mold.quantity }</p>
                <p>{ mold.compositionDate }</p>
                <Button className="btn btn-primary" onClick={ this.showMoldDetails } icon={ faEye }/>
                {
                    isAdmin && isInvalid ? <Button preventSubmit={ true } onClick={ this.sendMail } className="btn btn-warning" icon={ faMailBulk }/>
                        : null
                }

            </div>
        );
    }
}

export interface ISmartMoldProps {
    idMold : Identifier;
}

interface IStoreState {
    molds : INormalizedData<IMold>;
    roles : INormalizedData<IRole>;
    user : INormalizedData<IUser>;
    users : INormalizedData<IUser>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartMoldProps) => {
    const admin = all(state.user)[0];
    const roleAdmin = getEntity(state.roles)(admin.idRole);
    const mold = getEntity(state.molds)(ownProps.idMold);

    return {
        user : getEntity(state.users)(mold.idUser),
        mold,
        isAdmin : roleAdmin.name === 'ROLE_ADMIN',
    };
};

export const SmartMold = connect(mapStateToProps)(Mold);