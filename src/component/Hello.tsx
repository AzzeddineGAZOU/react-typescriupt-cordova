import * as React from 'react';
import { connect } from 'react-redux';
import { IIngredient } from '../../src/interface/IIngredient';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IUser } from '../../src/interface/IUser';
import { all, getEntity } from '../utils';

export interface IHelloProps<T> {
    message : string;
    name? : T;
    ingredients : IIngredient[];
}

export class Hello extends React.PureComponent<IHelloProps<number | string | IUser>> {
    render() {
        const { name, message, ingredients } = this.props;
        return (
            <section>
                <h1>{ message } { name }</h1>
                <div>
                    {
                        ingredients.map(ingredient => <p>{ ingredient.name }</p>)
                    }
                </div>
            </section>
        );
    }
}

interface IStoreState {
    ingredients : INormalizedData<IIngredient>;
    users : INormalizedData<IUser>;
}

const mapStateToProps = (state : IStoreState) => ({
    ingredients : all(state.ingredients),
    name : getEntity(state.users)(1).firstname,
});

export const SmartHello = connect(mapStateToProps)(Hello);
