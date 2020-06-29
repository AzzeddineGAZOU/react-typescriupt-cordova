import { ReactNode } from 'react';
import * as React from 'react';
import '../assets/styles/Modal.css';

export interface IPopupObject {
    show(title : string, content : ReactNode) : void;
}

export interface IPopupProvider {
    popup : IPopupObject | null;
}

export const PopupContext = React.createContext<IPopupProvider>({ popup : null });

export class PopupProvider extends React.PureComponent {
    static Toggle = ({ children, className }) => (
        <PopupContext.Consumer>
            { data => (
                // @ts-ignore
                <button aria-label="toggle modal" onClick={ data.popup.show } className={ className }>
                    { children }
                </button>
            ) }
        </PopupContext.Consumer>
    );

    state = {
        isOpen : false,
        key : null,
        title : null,
        content : null,
    };

    toggleShow = (title : string, content : ReactNode) => {
        this.setState({
            isOpen : !this.state.isOpen,
            title,
            content,
        });
    };

    render() {
        const { children } = this.props;
        const { isOpen, title, content } = this.state;
        const displayTitle = typeof title !== 'string' ? null : title;

        return (
            <PopupContext.Provider value={
                {
                    popup : {
                        show : this.toggleShow,
                    }
                }
            }>
                <PopupProvider.Toggle className={ `overlay ${ isOpen && 'active' }` } children={ '' }/>

                <div className={ `inner ${ isOpen && 'active' }` }>
                    <div className="header">
                        { displayTitle }
                    </div>
                    <div className="content">
                        { content }
                    </div>
                </div>
                { children }

            </PopupContext.Provider>
        );
    }
}
