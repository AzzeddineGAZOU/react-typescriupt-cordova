import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IIngredient } from '../../../src/interface/IIngredient';
import { IIngredientMold } from '../../../src/interface/IIngredientMold';
import { IMold } from '../../../src/interface/IMold';
import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IPartnerRecovery } from '../../../src/interface/IPartnerRecovery';
import { IRecovery } from '../../../src/interface/IRecovery';
import { IRole } from '../../../src/interface/IRole';
import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { Identifier } from '../../../src/type/Identifier';
import { setPartnerRecoveries } from '../../action-creator/setParnerRecoveries';
import { setRecoveries } from '../../action-creator/setRecoveries';
import '../../assets/styles/Recovery.css';
import { PopupContext } from '../../context/PopupContext';
import { normalize } from '../../normalize';
import PartnerRecoveryService from '../../service/PartnerRecoveryService';
import RecoveryServiceInstance from '../../service/RecoveryService';
import { all, filter, getEntity } from '../../utils';
import { Button } from '../Button';

export interface IMoldDetailsProps {
    partner : Identified<IUser>;
    recovery? : Identified<IRecovery>;
    user : IUser;
    mold : IMold;
    ingredients : Identified<IIngredient>[];
    isAdmin : boolean;
    setPartnerRecoveries : (partnerRecoveries : INormalizedData<IPartnerRecovery>) => any;
    setRecoveries : (recoveries : INormalizedData<IRecovery>) => any;
}

export default class MoldDetails extends React.PureComponent<IMoldDetailsProps> {
    static contextType = PopupContext;

    private setReduxState = async () => {
        const getRecoveries = await RecoveryServiceInstance.findAll();
        const dataRecoveries = await getRecoveries.json();
        this.props.setRecoveries(normalize(dataRecoveries.recoveries));
        const getPartnerRecoveries = await PartnerRecoveryService.findAll();
        const dataPartnerRecoveries = await getPartnerRecoveries.json();
        this.props.setPartnerRecoveries(normalize(dataPartnerRecoveries.partnerRecoveries));
    };

    pick = async () => {
        this.props.recovery && await RecoveryServiceInstance.pick({ idUser : this.props.partner.id, idRecovery : this.props.recovery.id });
        await this.setReduxState();
        this.context.popup.show(null, null);
    };

    render() {
        const { mold, ingredients, user, isAdmin } = this.props;
        const pickButton = !isAdmin ? <Button onClick={ this.pick } className="btn btn-primary" label="Recuperer"/> : null;

        return (
            <div className="flexRow marginBetweenChildren">
                <div>
                    <p>creer par <span className="important">{ user.firstname } { user.lastname }</span></p>
                    <p>le { mold.compositionDate }</p>
                    <p> quantité : { mold.quantity } grammes</p>
                    <p>point relais : { mold.pickUpAddress }</p>
                    { pickButton }
                </div>
                <div>
                    <h4 style={ { margin : 8, textAlign : 'center' } }>Composition</h4>
                    <div className="moldIngredients">
                        { ingredients.map(ingredient => <div key={ ingredient.id }>
                            <div className="ingredients flexRow">
                                <p>{ ingredient.name }</p>
                                <FontAwesomeIcon className="infos" icon={ faInfoCircle } color="#1833ffff"/>
                                <p className="ingredientContribution">{ ingredient.contribution }</p>
                            </div>

                        </div>) }
                    </div>
                </div>

            </div>
        );
    }
}

export interface ISmartMoldDetailsProps {
    idMold : Identifier;
    idRecovery? : Identifier;
}

interface IStoreState {
    ingredientMolds : INormalizedData<IIngredientMold>;
    ingredients : INormalizedData<IIngredient>;
    users : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
    user : INormalizedData<IUser>;
    molds : INormalizedData<IMold>;
    recoveries : INormalizedData<IRecovery>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartMoldDetailsProps) => {
    const partner = all(state.user)[0];
    const role = getEntity(state.roles)(partner.idRole);
    const mold = getEntity(state.molds)(ownProps.idMold);
    const user = getEntity(state.users)(mold.idUser);
    const ingredientMolds = filter(state.ingredientMolds)(ingredientMold => ingredientMold.idMold === mold.id);
    const ingredientIds = ingredientMolds.map(ingredient => ingredient.idIngredient);
    return {
        partner,
        isAdmin : role.name === 'ROLE_ADMIN',
        user,
        mold,
        recovery : ownProps.idRecovery ? getEntity(state.recoveries)(ownProps.idRecovery) : undefined,
        ingredients : filter(state.ingredients)(ingredient => ingredientIds.includes(ingredient.id)),
    };
};

const mapDispatchToProps = (dispatch : Dispatch, ownProps : ISmartMoldDetailsProps) => ({
    setPartnerRecoveries : (partnerRecoveries : INormalizedData<IPartnerRecovery>) => dispatch(setPartnerRecoveries(partnerRecoveries)),
    setRecoveries : (recoveries : INormalizedData<IRecovery>) => dispatch(setRecoveries(recoveries)),
});

export const SmartMoldDetails = connect(mapStateToProps, mapDispatchToProps)(MoldDetails);