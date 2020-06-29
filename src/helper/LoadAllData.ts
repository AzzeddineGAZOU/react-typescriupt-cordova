import { Dispatch } from 'redux';
import { IAddress } from '../../src/interface/IAddress';
import { IIngredient } from '../../src/interface/IIngredient';
import { IIngredientMold } from '../../src/interface/IIngredientMold';
import { IMold } from '../../src/interface/IMold';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IPartnerRecovery } from '../../src/interface/IPartnerRecovery';
import { IPartnershipRequest } from '../../src/interface/IPartnershipRequest';
import { IRecovery } from '../../src/interface/IRecovery';
import { IReward } from '../../src/interface/IReward';
import { IRole } from '../../src/interface/IRole';
import { IUser } from '../../src/interface/IUser';
import { setAddresses } from '../action-creator/setAddresses';
import { setIngredientMolds } from '../action-creator/setIngredientMolds';
import { setIngredients } from '../action-creator/setIngredients';
import { setMolds } from '../action-creator/setMolds';
import { setPartnerRecoveries } from '../action-creator/setParnerRecoveries';
import { setPartnershipRequests } from '../action-creator/setPartnershipRequests';
import { setRecoveries } from '../action-creator/setRecoveries';
import { setRewards } from '../action-creator/setRewards';
import { setRoles } from '../action-creator/setRoles';
import { setUsers } from '../action-creator/user/setUsers';

export const loadAllData = (dispatch : Dispatch) => ({
    setUsers : (users : INormalizedData<IUser>) => dispatch(setUsers(users)),
    setPartnershipRequests : (partnershipRequests : INormalizedData<IPartnershipRequest>) => dispatch(setPartnershipRequests(partnershipRequests)),
    setAddresses : (addresses : INormalizedData<IAddress>) => dispatch(setAddresses(addresses)),
    setRoles : (roles : INormalizedData<IRole>) => dispatch(setRoles(roles)),
    setMolds : (molds : INormalizedData<IMold>) => dispatch(setMolds(molds)),
    setRecoveries : (recoveries : INormalizedData<IRecovery>) => dispatch(setRecoveries(recoveries)),
    setPartnerRecoveries : (partnerRecoveries : INormalizedData<IPartnerRecovery>) => dispatch(setPartnerRecoveries(partnerRecoveries)),
    setRewards : (rewards : INormalizedData<IReward>) => dispatch(setRewards(rewards)),
    setIngredients : (ingredients : INormalizedData<IIngredient>) => dispatch(setIngredients(ingredients)),
    setIngredientMolds : (ingredientMolds : INormalizedData<IIngredientMold>) => dispatch(setIngredientMolds(ingredientMolds)),
});