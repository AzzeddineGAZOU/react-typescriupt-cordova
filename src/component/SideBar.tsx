import { faUser, faHome, faSignOutAlt, faUsers, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IMold } from '../../src/interface/IMold';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import { Identifier } from '../../src/type/Identifier';
import '../assets/styles/Menu.css';
import { setUser } from '../action-creator/user/setUser';
import { getEntity } from '../utils';
import { Button } from './Button';
import { History } from 'history';
import defaultavatar from '../assets/img/defaultavatar.png';
import logo from '../assets/img/logo.png';
export interface ISideBarProps {
    user : Identified<IUser>;
    history : History;
    setUser : (user : INormalizedData<IUser> | null) => any;
    isCustomer? : boolean;
    isAdmin? : boolean;
    isPartner? : boolean;
}

export default class SideBar extends React.PureComponent<ISideBarProps> {
    logout = () => {
        this.props.setUser(null);
        this.props.history.push('/');
    };

    render() {
        const { user, isAdmin, isCustomer, isPartner } = this.props;
        const avatar = user.avatar ? <img src={ user.avatar } alt="user avatar"/> :
            <img src={defaultavatar } alt="logo"/>;

        return (
            <div id="menu">
                <img className="logo" src={ logo } alt="logo"/>
                <div className="menu-box">
                    <div className="avatar">
                        { avatar }
                    </div>
                    <h4>{ user.username }</h4>
                    <nav>
                        <ul>
                            {
                                isAdmin ? (
                                    <>
                                        <li>
                                            <FontAwesomeIcon icon={ faHome } size="xs" style={ { color : '#ccc' } }/>
                                            <Link to="/adminspace">Home</Link>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={ faUsers } size="xs" style={ { color : '#ccc' } }/>
                                            <Link to="/handleusers">Gestion des utilisateurs</Link>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={ faList } size="xs" style={ { color : '#ccc' } }/>
                                            <Link to="/partnerRequest">Demandes de partenariats</Link>
                                        </li>
                                    </>
                                ) : isPartner ? (
                                    <li>
                                        <FontAwesomeIcon icon={ faHome } size="xs" style={ { color : '#ccc' } }/>
                                        <Link to="/partnerspace">Home</Link>
                                    </li>
                                ) : isCustomer ? (
                                    <li>
                                        <FontAwesomeIcon icon={ faHome } size="xs" style={ { color : '#ccc' } }/>
                                        <Link to="/userspace">Home</Link>
                                    </li>
                                ) : null
                            }

                            <li>
                                <FontAwesomeIcon icon={ faUser } size="xs" style={ { color : '#ccc' } }/>
                                <Link to={ `/profile/${ String(user.id) }` }>Profil</Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Button onClick={ this.logout } icon={ faSignOutAlt } label="Se déconnecter" className="btn btn-danger block"/>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export interface ISmartSideBarProps {
    idUser : Identifier;
}

interface IStoreState {
    users : INormalizedData<IUser>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartSideBarProps) => {
    return {
        user : getEntity(state.users)(ownProps.idUser),
    };
};

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        setUser : (user : INormalizedData<IUser>) => dispatch(setUser(user)),
    };
};

export const SmartSideBar = connect(mapStateToProps, mapDispatchToProps)(SideBar as any);