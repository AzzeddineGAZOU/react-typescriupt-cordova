import * as React from 'react';
import { connect } from 'react-redux';
import { IIngredient } from '../../../../src/interface/IIngredient';
import { INormalizedData } from '../../../../src/interface/INormalizedData';
import { Identified } from '../../../../src/type/Identified';
import { Identifier } from '../../../../src/type/Identifier';

import * as data from '../../../assets/relays.json';
import '../../../assets/styles/Form.css';
import { all } from '../../../utils';
import { Button } from '../../Button';
import { SmartIngredientName } from '../../IngredientName';

export interface IMoldCreationFormProps {
    ingredients : Identified<IIngredient>[];
}

interface IMoldCreationFormState {
    compositions : Identifier[];
    selectedIngredient? : Identifier;
    selectedPickup? : Identifier;
    relays : any[];
}

export default class MoldCreationForm extends React.Component<IMoldCreationFormProps, IMoldCreationFormState> {
    public componentDidMount() : void {

    }

    public state : IMoldCreationFormState = {
        compositions : [],
        selectedIngredient : this.props.ingredients[0].id,
        selectedPickup : undefined,
        relays : data,
    };

    add = () => {
        const { selectedIngredient, compositions } = this.state;

        if (!compositions.includes(selectedIngredient as any)) {
            this.state.selectedIngredient && this.setState({
                compositions : [
                    ...compositions, selectedIngredient!
                ]
            });
        }
    };

    remove = () => {
        const { compositions } = this.state;
        if (compositions.length) {
            compositions.splice(compositions.length - 1, 1);
            this.setState({
                compositions,
            });
        }

    };
    onIngredientSelected = (e) => {
        this.setState({
            selectedIngredient : e.target.value,
        });
    };

    onPickUpSelected = (e) => {
        this.setState({
            selectedPickup : e.target.value,
        });
    };
    filterPickUps = (e) => {
        const pickUps = e.target.value !== '' ? this.state.relays.filter(pickUp => String(pickUp.fields.code_postal).startsWith(e.target.value) !== false)
            : data;
        this.setState({
            relays : pickUps,
        });
    };

    render() {
        const { ingredients } = this.props;
        const { relays, selectedPickup } = this.state;
        return (
            <form className="flexRow moldForm">
                <div>
                    <p>composition</p>
                    { this.state.compositions.map(id => <SmartIngredientName idIngredient={ id }/>) }

                </div>
                <div>
                    <select onChange={ this.onIngredientSelected }>
                        { ingredients.map(ingredient => <option value={ ingredient.id }>{ ingredient.name }</option>) }
                    </select>
                    <Button onClick={ this.add } label="ajouter" preventSubmit={ true }/>
                    <Button onClick={ this.remove } label="enlever" preventSubmit={ true }/>
                    <button className="btn btn-primary">creer</button>
                </div>
                <div>
                    <input type="number" onKeyPress={ this.filterPickUps } placeholder="Votre Code Postale"/>
                    <select onChange={ this.onPickUpSelected }>
                        {
                            relays.length ? relays.map(relay => <option
                                    value={ `${ relay.fields.adresse_1 } ${ relay.fields.code_postal }, ${ relay.fields.ville }` }>{ relay.fields.nom_point_de_retrait }</option>)
                                :
                                <option>aucun point de relais dans votre ville</option>
                        }
                    </select>
                </div>
            </form>
        );
    }
}

export interface ISmartMoldCreationFormProps {
    idUser : Identifier;
}

interface IStoreState {
    ingredients : INormalizedData<IIngredient>;
}

const mapStateToProps = (state : IStoreState, ownProps : ISmartMoldCreationFormProps) => {
    return {
        ingredients : all(state.ingredients),
    };
};

export const SmartMoldCreationForm = connect(mapStateToProps)(MoldCreationForm);