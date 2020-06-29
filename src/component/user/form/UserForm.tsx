import * as React from 'react';
import { connect } from 'react-redux';
import { INormalizedData } from '../../../../src/interface/INormalizedData';
import { IUser } from '../../../../src/interface/IUser';
import { Identified } from '../../../../src/type/Identified';
import { Identifier } from '../../../../src/type/Identifier';
import '../../../assets/styles/Form.css';
import { getEntity } from '../../../utils';
import { Button } from '../../Button';

export interface IUserFormProps {
    user : Identified<IUser> | IUser;
}

interface IUserFormState {
    username : string;
    firstname : string;
    lastname : string;
    email : string;
}

export default class UserForm extends React.Component<IUserFormProps, IUserFormState> {
    public componentDidMount() : void {

    }

    public state : IUserFormState = {
        username : this.props.user.username,
        firstname : this.props.user.firstname,
        lastname : this.props.user.lastname,
        email : this.props.user.email,
    };

    handleChange = (e: any) => {
        // @ts-ignore
        this.setState({
            [e.target.id] : e.target.value,
        });
    };

    render() {
        const { user } = this.props;
        const { username, email, lastname, firstname } = this.state;
        return (
            <form className="" onSubmit={ this.submit }>
                <input type="text" id="username" onChange={ this.handleChange } value={ username }/>
                <input type="text" id="email" onChange={ this.handleChange } value={ email }/>
                <input type="text" id="firstname" onChange={ this.handleChange } value={ firstname }/>
                <input type="text" id="lastname" onChange={ this.handleChange } value={ lastname }/>
                <Button onClick={ () => {} } label="Enregistrer"/>
            </form>
        );
    }

    private submit = () => {

    };
}

export interface ISmartUserFormProps {
    idUser? : Identifier;
    user? : IUser;
}

interface IStoreState {
    users : INormalizedData<IUser>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartUserFormProps) => {
    const { idUser } = ownProps;
    if (!ownProps.user && !idUser) {
        throw new Error('One of user or idUser must be given');
    }
    return {
        user : idUser ? getEntity(state.users)(ownProps.idUser!) : ownProps.user,
    };
};

export const SmartUserForm = connect(mapStateToProps)(UserForm as any);