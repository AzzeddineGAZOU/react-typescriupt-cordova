import * as React from 'react';

export interface IHeadingProps {
    title : string;
}

export default class Heading extends React.PureComponent<IHeadingProps> {
    render() {
        const { title } = this.props;
        return (
            <div className="heading">
                <p>{ title }</p>
                <span className="headingDecoration"/>
            </div>
        );
    }
}
