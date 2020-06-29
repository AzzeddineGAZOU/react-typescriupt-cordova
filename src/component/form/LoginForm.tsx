import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IRole } from '../../../src/interface/IRole';
import { IUser } from '../../../src/interface/IUser';
import { setUser } from '../../action-creator/user/setUser';
import '../../assets/styles/Form.css';
import { PopupContext } from '../../context/PopupContext';
import { normalize } from '../../normalize';
import UserServiceInstance from '../../service/UserService';
import { all, getEntity } from '../../utils';

export interface ILoginFormProps {
    setUser : (user : INormalizedData<IUser>) => any;
    user? : IUser;
    role? : IRole;
    history : History;
}

export interface ILoginFormState {
    username : string;
    password : string;
    email : string;
    passwordForgot : boolean;
}

class LoginForm extends React.PureComponent<ILoginFormProps, ILoginFormState> {
    static contextType = PopupContext;
    public state : ILoginFormState = {
        username : '',
        email : '',
        password : '',
        passwordForgot : false,
    };

    submit = async (e: any) => {
        e.preventDefault();
        if (this.state.passwordForgot) {
            await UserServiceInstance.resetPassword({ email : this.state.email });

        } else {
            const response = await UserServiceInstance.auth(this.state);
            if (response.ok) {
                const data = await response.json();
                window.localStorage.setItem('token', data.token);
                this.props.setUser(normalize(data.user));
            }
        }
        this.context.popup.show(null, null);
    };

    handleChange = (e: any) => {
        // @ts-ignore
        this.setState({
            [e.target.id] : e.target.value,
        });
    };

    render() {
        const { passwordForgot } = this.state;
        return (
            <form onSubmit={ this.submit }>
                { !passwordForgot ?
                    (<>
                        <div>
                            <label>Nom d'utilisateur</label>
                            <input type="text" id="username" placeholder="" className="form-control" onChange={ this.handleChange }/>
                        </div>

                        <div>
                            <label>Mot de passe</label>
                            <input type="password" id="password" className="form-control" onChange={ this.handleChange }/>
                        </div>
                        <p className="passwordForgot" onClick={ this.resetPassword }>mot de passe oublié</p>
                        <button className="btn btn-primary">Connexion</button>

                    </>) :
                    (<>
                        <div>
                            <label>Entrez votre adresse email</label>
                            <input id="email" className="form-control" onChange={ this.handleChange }/>
                        </div>
                        <p className="passwordForgot" onClick={ this.resetPassword }>se connecter</p>
                        <button className="btn btn-primary">Envoyer</button>

                    </>) }

            </form>
        );
    }

    private resetPassword = () => {
        this.setState({ passwordForgot : !this.state.passwordForgot });
    };
}

interface IStoreState {
    user : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
}

const mapStateToProps = (state : IStoreState) => {
    const user = state.user ? all(state.user)[0] : undefined;
    return {
        user,
        role : user ? getEntity(state.roles)(user.idRole) : undefined
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch(setUser(user))
    };
};

export const SmartLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
