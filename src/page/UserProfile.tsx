import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { connect } from 'react-redux';
import { match, RouteComponentProps } from 'react-router';
import { IAddress } from '../../src/interface/IAddress';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRole } from '../../src/interface/IRole';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import '../assets/styles/Recovery.css';
import { Button } from '../component/Button';
import { SmartSideBar } from '../component/SideBar';
import { SmartUserForm } from '../component/user/form/UserForm';
import { PopupContext } from '../context/PopupContext';
import { filter, getEntity } from '../utils';
import defaultavatar from '../assets/img/defaultavatar.png';
export interface IUserProfileProps extends RouteComponentProps {
    user : Identified<IUser>;
    role : Identified<IRole>;
    addresses : Identified<IAddress>[];
}

export default class UserProfile extends React.PureComponent<IUserProfileProps> {
    static contextType = PopupContext;

    updateUser = async () => {
        this.context.popup.show(
            'utilisateur',
            <SmartUserForm idUser={ this.props.user.id }/>
        );
    };

    render() {
        const { user, addresses, role } = this.props;
        const isAdmin = role.name === 'ROLE_ADMIN';
        const isPartner = role.name === 'ROLE_PARTNER';
        const isCustomer = role.name === 'ROLE_USER';
        const avatar = user.avatar ? <img src={ user.avatar } alt="avatar"/> :
            <img src={ defaultavatar } alt="avatar"/>;
        return (
            <div className="flex">
                <SmartSideBar
                //@ts-ignore
                history={ this.props.history } idUser={ user.id } isPartner={ isPartner } isAdmin={ isAdmin } isCustomer={ isCustomer }/>
                <div className="container">
                    <div className="boxing">
                        { avatar }
                        <p>{ user.username }</p>
                        {
                            addresses.map((address) => <p>{ address.address } { address.city } { address.postcode }</p>
                            )
                        }
                        <Button className="btn btn-primary" preventSubmit={ true } onClick={ this.updateUser } icon={ faArrowRight } label="modifier"/>
                    </div>
                </div>

            </div>
        );
    }
}

export interface ISmartUserProfileParams {
    idUser : string;
}

export interface ISmartUserProfileProps {
    match : match<ISmartUserProfileParams>;
}

interface IStoreState {
    users : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
    addresses : INormalizedData<IAddress>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartUserProfileProps) => {
    const user = getEntity(state.users)(Number(ownProps.match.params.idUser));
    return {
        user,
        role : getEntity(state.roles)(user.idRole),
        addresses : filter(state.addresses)((address) => address.idUser === Number(ownProps.match.params.idUser)),
    };
};

export const SmartUserProfile = connect(mapStateToProps)(UserProfile);