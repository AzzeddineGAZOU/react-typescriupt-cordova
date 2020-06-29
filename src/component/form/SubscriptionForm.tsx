import * as React from 'react';
import { connect } from 'react-redux';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnershipRequest } from '../../../src/interface/IPartnershipRequest';
import { IUser } from '../../../src/interface/IUser';
import { setPartnershipRequests } from '../../action-creator/setPartnershipRequests';
import { setUsers } from '../../action-creator/user/setUsers';
import '../../assets/styles/Form.css';
import { PopupContext } from '../../context/PopupContext';
import { normalize } from '../../normalize';
import PartnershipRequestServiceInstance from '../../service/PartnershipRequestService';
import UserServiceInstance from '../../service/UserService';
import { Button } from '../Button';

export interface ISubscriptionFormProps {
    setUsers : (users : INormalizedData<IUser>) => any;
    setPartnershipRequests : (partnershipRequests : INormalizedData<IPartnershipRequest>) => any;
    isRequest? : boolean;
}

interface ISubscriptionFormState {
    username : string;
    firstname : string;
    lastname : string;
    email : string;
    address : string;
    postcode : number;
    city : string;
    password : string;
    motivation : string;
}

export default class SubscriptionForm extends React.Component<ISubscriptionFormProps, ISubscriptionFormState> {
    static contextType = PopupContext;

    public componentDidMount() : void {

    }

    public state : ISubscriptionFormState = {
        username : '',
        firstname : '',
        lastname : '',
        email : '',
        address : '',
        city : '',
        postcode : 0,
        password : '',
        motivation : '',
    };

    handleChange = (e: any) => {
        // @ts-ignore
        this.setState({
            [e.target.id] : e.target.value,
        });
    };

    render() {
        const { username, email, lastname, firstname, city, address, password, postcode, motivation } = this.state;
        const { isRequest } = this.props;
        const usernameLabel = !isRequest ? 'nom d\'utilisateur' : 'nom de société';
        return (
            <form className="" onSubmit={ this.submit }>
                <label>{ usernameLabel }</label>
                <input type="text" id="username" onChange={ this.handleChange } value={ username }/>

                <label>Email</label>
                <input type="text" id="email" onChange={ this.handleChange } value={ email }/>

                <label>prenom</label>
                <input type="text" id="firstname" onChange={ this.handleChange } value={ firstname }/>

                <label>nom</label>
                <input type="text" id="lastname" onChange={ this.handleChange } value={ lastname }/>

                <label>adresse</label>
                <input type="text" id="address" onChange={ this.handleChange } value={ address }/>

                <label>Ville</label>
                <input type="text" id="city" onChange={ this.handleChange } value={ city }/>

                <label>Code postale</label>
                <input type="number" id="postcode" onChange={ this.handleChange } value={ postcode }/>

                <label>Mot de passe</label>
                <input type="password" id="password" onChange={ this.handleChange } value={ password }/>

                {
                    isRequest ? (
                        <>
                            <label>Motivation</label>
                            <textarea id="motivation" onChange={ this.handleChange }>
                                { motivation }
                            </textarea>
                        </>
                    ) : null
                }
                <Button className="btn btn-primary" onClick={ () => {} } label="Enregistrer"/>
            </form>
        );
    }

    private setReduxState = async () => {
        if (this.props.isRequest) {
            const getPartnershipRequest = await PartnershipRequestServiceInstance.findAll();
            const dataPartnershipRequests = await getPartnershipRequest.json();
            this.props.setPartnershipRequests(normalize(dataPartnershipRequests.partnershipRequests));
        } else {
            const getUsers = await UserServiceInstance.findAll();
            const dataUsers = await getUsers.json();
            this.props.setUsers(normalize(dataUsers.users));
        }
    };

    private submit = async (e: any) => {
        e.preventDefault();
        const response = this.props.isRequest ? await PartnershipRequestServiceInstance.create(this.state) : await UserServiceInstance.create(this.state);
        if (response.ok) {
            //close popup
            setTimeout(() => {
                this.context.popup.show(null, null);
            }, 500);
            await this.setReduxState();
            this.setState({
                username : '',
                firstname : '',
                lastname : '',
                email : '',
                address : '',
                city : '',
                postcode : 0,
                password : '',
                motivation : '',
            });
        }
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUsers : (users : INormalizedData<IUser>) => dispatch(setUsers(users)),
        setPartnershipRequests : (partnershipRequests : INormalizedData<IPartnershipRequest>) => dispatch(setPartnershipRequests(partnershipRequests))
    };
};

export const SmartSubscriptionForm = connect(undefined, mapDispatchToProps)(SubscriptionForm);

