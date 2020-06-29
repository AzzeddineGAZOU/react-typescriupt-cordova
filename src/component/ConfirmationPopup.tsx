import * as React from 'react';
import { PopupContext } from '../context/PopupContext';
import { Button } from './Button';

export interface IConfirmationProps {
    onValidate : (...args : any[]) => any;
    onCancel? : () => any;
}

export default class ConfirmationPopup extends React.Component<IConfirmationProps> {
    static contextType = PopupContext;

    private onValidate = async () => {
        await this.props.onValidate();
        this.context.popup.show(null, null);
    };

    private onCancel = async () => {
        this.props.onCancel && await this.props.onCancel();
        this.context.popup.show(null, null);
    };

    render() {
        return (
            <>
                <Button className="btn btn-primary big" onClick={ this.onValidate } label="OUI"/>
                <Button className="btn btn-danger big" onClick={ this.onCancel } label="NON"/>
            </>
        );
    }
}
