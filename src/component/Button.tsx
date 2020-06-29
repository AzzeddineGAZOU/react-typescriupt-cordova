import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface IButtonProps {
    className? : string;
    preventSubmit? : boolean;
    label? : string;
    disabled? : boolean;
    onClick : (...args : any[]) => any;
    onDisabledClick? : (...args : any[]) => any;
    icon? : IconProp;
    color? : string;
}

export class Button extends React.PureComponent<IButtonProps> {

    public render() {
        const { label, icon, color } = this.props;
        let classNames = this._getBaseClassNames();
        let style : { backgroundColor? : string } = {};
        let iconTag,
            labelTag;

        if (icon) {
            iconTag = <FontAwesomeIcon icon={ icon }/>;
        }

        if (label) {
            labelTag = <span className="">{ label }</span>;
        }

        let buttonOptionalProps : { type? : 'button' | 'reset' | 'submit' } = this.props.preventSubmit ? { type : 'button' } : {};
        const separation = icon && label ? '|' : null;
        return (
            <button { ...buttonOptionalProps } onClick={ this._onClick } style={ style } className={ classNames.join(' ') }>
                { iconTag } { separation } { labelTag }
            </button>
        );
    }

    private _onClick = (event : React.MouseEvent) => {
        event.stopPropagation();
        if (!this.props.disabled) {
            this.props.onClick();
        } else if (this.props.onDisabledClick) {
            this.props.onDisabledClick();
        }
    };

    private _getBaseClassNames() {
        const { className } = this.props;
        const classNames : string[] = [];

        if (className) {
            classNames.push(className);
        }

        return classNames;
    }

}