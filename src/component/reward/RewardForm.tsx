import * as React from 'react';
import { connect } from 'react-redux';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IReward } from '../../../src/interface/IReward';
import { IUser } from '../../../src/interface/IUser';
import { Identifier } from '../../../src/type/Identifier';
import { setRewards } from '../../action-creator/setRewards';
import { setUsers } from '../../action-creator/user/setUsers';
import { PopupContext } from '../../context/PopupContext';
import { normalize } from '../../normalize';
import RewardService from '../../service/RewardService';
import { Button } from '../Button';

export interface IRewardFormProps {
    setRewards : (rewards : INormalizedData<IReward>) => any;
    idUser : Identifier;
}

interface IRewardFormState extends IReward {
}

export default class RewardForm extends React.Component<IRewardFormProps, IRewardFormState> {
    static contextType = PopupContext;

    public state : IRewardFormState = {
        expirationDate : '',
        promoCode : '',
        reduction : 0,
        idUser : this.props.idUser,
    };

    handleChange = (e: any) => {
        // @ts-ignore
        this.setState({
            [e.target.id] : e.target.value,
        });
    };

    render() {
        return (
            <form className="" onSubmit={ this.submit }>
                <label>Date d'expiration</label>
                <input type="date" id="expirationDate" onChange={ this.handleChange }/>

                <label>code promo</label>
                <input type="text" id="promoCode" onChange={ this.handleChange }/>

                <label>reduction(%)</label>
                <input type="number" id="reduction" onChange={ this.handleChange }/>
                <Button className="btn btn-primary" onClick={ () => {} } label="Enregistrer"/>
            </form>
        );
    }

    private setReduxState = async () => {
        const getRewards = await RewardService.findAll();
        const dataRewards = await getRewards.json();
        this.props.setRewards(normalize(dataRewards.rewards));
    };

    private submit = async (e: any) => {
        e.preventDefault();
        const response = await RewardService.create(this.state);
        if (response.ok) {
            this.context.popup.show(null, null);
            await this.setReduxState();
            this.setState({
                expirationDate : '',
                promoCode : '',
                reduction : 0
            });
        }
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUsers : (users : INormalizedData<IUser>) => dispatch(setUsers(users)),
        setRewards : (rewards : INormalizedData<IReward>) => dispatch(setRewards(rewards))
    };
};

export const SmartRewardForm = connect(undefined, mapDispatchToProps)(RewardForm);

