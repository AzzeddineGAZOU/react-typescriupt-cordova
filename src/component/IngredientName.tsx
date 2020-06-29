import * as React from 'react';
import { connect } from 'react-redux';
import { IIngredient } from '../../src/interface/IIngredient';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { Identifier } from '../../src/type/Identifier';
import { getEntity } from '../utils';

export interface IIngredientNameProps {
    ingredient : IIngredient;
}

export default class IngredientName extends React.PureComponent<IIngredientNameProps> {
    public render() : React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <span>{ this.props.ingredient.name }</span>;
    }
}

export interface ISmartIngredientNameProps {
    idIngredient : Identifier;
}

interface IStoreState {
    ingredients : INormalizedData<IIngredient>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartIngredientNameProps) => ({
    ingredient : getEntity(state.ingredients)(ownProps.idIngredient),
});

export const SmartIngredientName = connect(mapStateToProps)(IngredientName);