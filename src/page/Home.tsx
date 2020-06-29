import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IAddress } from '../../src/interface/IAddress';
import { IIngredient } from '../../src/interface/IIngredient';
import { IIngredientMold } from '../../src/interface/IIngredientMold';
import { IMold } from '../../src/interface/IMold';
import { INormalizedData } from '../../src/interface/INormalizedData';
import '../assets/styles/Home.css';
import { IPartnerRecovery } from '../../src/interface/IPartnerRecovery';
import { IPartnershipRequest } from '../../src/interface/IPartnershipRequest';
import { IRecovery } from '../../src/interface/IRecovery';
import { IReward } from '../../src/interface/IReward';
import { IRole } from '../../src/interface/IRole';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import { Button } from '../component/Button';
import { SmartLoginForm } from '../component/form/LoginForm';
import { SmartSubscriptionForm } from '../component/form/SubscriptionForm';
import { PopupContext } from '../context/PopupContext';
import { loadAllData } from '../helper/LoadAllData';
import { normalize } from '../normalize';
import AddressService from '../service/AddressService';
import IngredientMoldService from '../service/IngredientMoldService';
import IngredientService from '../service/IngredientService';
import MoldService from '../service/MoldService';
import PartnerRecoveryService from '../service/PartnerRecoveryService';
import PartnershipRequestService from '../service/PartnershipRequestService';
import RecoveryServiceInstance from '../service/RecoveryService';
import RewardService from '../service/RewardService';
import RoleService from '../service/RoleService';
import UserServiceInstance from '../service/UserService';
import { all, getEntity } from '../utils';
import logo from '../assets/img/logo.png';
export interface IHomeProps extends RouteComponentProps {
    user? : Identified<IUser>;
    role? : Identified<IRole>;
    setUsers : (users : INormalizedData<IUser>) => any;
    setPartnershipRequests : (partnershipRequests : INormalizedData<IPartnershipRequest>) => any;
    setAddresses : (addresses : INormalizedData<IAddress>) => any;
    setRoles : (roles : INormalizedData<IRole>) => any;
    setMolds : (molds : INormalizedData<IMold>) => any;
    setRecoveries : (recoveries : INormalizedData<IRecovery>) => any;
    setPartnerRecoveries : (partnerRecoveries : INormalizedData<IPartnerRecovery>) => any;
    setRewards : (rewards : INormalizedData<IReward>) => any;
    setIngredients : (ingredients : INormalizedData<IIngredient>) => any;
    setIngredientMolds : (ingredientMolds : INormalizedData<IIngredientMold>) => any;
}

export class Home extends React.PureComponent<IHomeProps> {
    static contextType = PopupContext;

    public componentDidMount() : void {
        this.redirect();
    }

    redirect = async () => {
        const { user, role } = this.props;
        if (user && role) {
            await this.loadData();
            role.name === 'ROLE_ADMIN' ? this.props.history.push('/adminspace') : role.name === 'ROLE_PARTNER' ? this.props.history.push('/partnerspace')
                : this.props.history.push('/userspace');
        }
    };

    public componentDidUpdate() : void {
        this.redirect();
    }

    loadData = async () => {
        const getUsers = await UserServiceInstance.findAll();
        const dataUsers = await getUsers.json();
        this.props.setUsers(normalize(dataUsers.users));

        const getPartnershipRequest = await PartnershipRequestService.findAll();
        const dataPartnershipRequests = await getPartnershipRequest.json();
        this.props.setPartnershipRequests(normalize(dataPartnershipRequests.partnershipRequests));

        const getAddresses = await AddressService.findAll();
        const dataAddresses = await getAddresses.json();
        this.props.setAddresses(normalize(dataAddresses.addresses));

        const getRoles = await RoleService.findAll();
        const dataRoles = await getRoles.json();
        this.props.setRoles(normalize(dataRoles.roles));

        const getMolds = await MoldService.findAll();
        const dataMolds = await getMolds.json();
        this.props.setMolds(normalize(dataMolds.molds));

        const getRecoveries = await RecoveryServiceInstance.findAll();
        const dataRecoveries = await getRecoveries.json();
        this.props.setRecoveries(normalize(dataRecoveries.recoveries));

        const getPartnerRecoveries = await PartnerRecoveryService.findAll();
        const dataPartnerRecoveries = await getPartnerRecoveries.json();
        this.props.setPartnerRecoveries(normalize(dataPartnerRecoveries.partnerRecoveries));

        const getRewards = await RewardService.findAll();
        const dataRewards = await getRewards.json();
        this.props.setRewards(normalize(dataRewards.rewards));

        const getIngredients = await IngredientService.findAll();
        const dataIngredients = await getIngredients.json();
        this.props.setIngredients(normalize(dataIngredients.ingredients));

        const getIngredientMolds = await IngredientMoldService.findAll();
        const dataIngredientMolds = await getIngredientMolds.json();
        this.props.setIngredientMolds(normalize(dataIngredientMolds.ingredientMolds));
    };

    render() {
        return (
            <div className="home flexColumn">
                <img className="logo" src={ logo } alt="logo"/>
                <Button className="btn btn-primary block big" onClick={ this.connect } preventSubmit={ true } label="Se connecter"/>
                <Button className="btn btn-primary block big" onClick={ this.signUp } preventSubmit={ true } label="S'inscrire"/>
                <Button className="btn btn-primary block big" onClick={ this.sendPartnershipRequest } preventSubmit={ true } label="Demande de partenariat"/>
            </div>
        );
    }

    private connect = () => {
        this.context.popup.show(
            'Connexion',
            <SmartLoginForm history={ this.props.history }/>
        );
    };

    private signUp = () => {
        this.context.popup.show(
            'inscription',
            <SmartSubscriptionForm/>
        );
    };

    private sendPartnershipRequest = () => {
        this.context.popup.show(
            'Devenir partenaire',
            <SmartSubscriptionForm isRequest={ true }/>
        );
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

export const SmartHome = connect(mapStateToProps, loadAllData)(Home);