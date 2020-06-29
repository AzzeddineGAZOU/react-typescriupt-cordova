import * as React from 'react';
import { connect } from 'react-redux';
import { IMail } from '../../../src/interface/IMail';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import '../../assets/styles/Form.css';
import { PopupContext } from '../../context/PopupContext';
import { contactUser } from '../../helper/sendMail';
import { getEntity } from '../../utils';
import { Button } from '../Button';

export interface IContactFormProps {
    user : Identified<IUser>;
}

interface IContactFormState extends IMail {
}

export default class ContactForm extends React.Component<IContactFormProps, IContactFormState> {
    static contextType = PopupContext;

    public state : IContactFormState = {
        html : '',
        subject : '',
        email : this.props.user.email,
    };

    handleChange = (e :any) => {
        // @ts-ignore
        this.setState({
            [e.target.id] : e.target.value,
        });
    };

    render() {
        return (
            <form className="" onSubmit={ this.submit }>
                <label>Sujet</label>
                <input type="text" id="subject" onChange={ this.handleChange }/>
                <label>Message</label>
                <textarea id="html" onChange={ this.handleChange }/>
                <Button className="btn btn-primary" onClick={ () => {} } label="Envoyer"/>
            </form>
        );
    }

    private submit = async (e: any) => {
        e.preventDefault();
        if (this.state.subject && this.state.html) {
            await contactUser(this.state);
            this.context.popup.show(null, null);
            this.setState({
                subject : '',
                html : '',
            });
        }
    };
}

export interface ISmartContactFormProps {
    idUser : Identifier;
}

interface IStoreState {
    users : INormalizedData<IUser>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartContactFormProps) => ({
    user : getEntity(state.users)(ownProps.idUser),
});

export const SmartContactForm = connect(mapStateToProps)(ContactForm);