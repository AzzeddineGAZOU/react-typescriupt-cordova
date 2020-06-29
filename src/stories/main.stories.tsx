import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import '../assets/styles/Main.css';
import { Hello, SmartHello } from '../component/Hello';
import { SmartMoldCreationForm } from '../component/mold/form/MoldCreationForm';
import { SmartMoldList } from '../component/mold/MoldList';
import { SmartPartnershipRequestList } from '../component/partner/PartnershipRequestList';
import { SmartRecoveryGlobalViewList } from '../component/recovery/RecoveryGlobalViewList';
import { SmartRecoveryList } from '../component/recovery/RecoveryList';
import { SmartSideBar } from '../component/SideBar';
import { PopupProvider } from '../context/PopupContext';
import { P } from './fakeData';
import { admin1, partner1, user1 } from './fakeData/users';

storiesOf('example/smartHello component', module)
    .addDecorator(story => (
        <P>
            { story() }
        </P>
    ))
    .add('simple example', () => (
        <SmartHello message="hey you"/>
    ))
    .add('simple example', () => (
        <Hello message="hey you" ingredients={ [] }/>
    ));

storiesOf('component/SideBar', module)
    .addDecorator(story => (
        <P>
            { story() }
        </P>
    ))
    .add('simple example', () => (
        <HashRouter>
            //@ts-ignore
            <SmartSideBar idUser={ user1.id }/>
        </HashRouter>
    ));

storiesOf('component/recoveryList', module)
    .addDecorator(story => (
        <P>
            <PopupProvider>
                { story() }
            </PopupProvider>
        </P>
    ))
    .add('simple example', () => (
        <SmartRecoveryList/>
    ));

storiesOf('component/recoveryGlobalViewList', module)
    .addDecorator(story => (
        <P>
            <PopupProvider>
                { story() }
            </PopupProvider>
        </P>
    ))
    .add('for partner', () => (
        <SmartRecoveryGlobalViewList idAdmin={ partner1.id }/>
    ))
    .add('for seb', () => (
        <SmartRecoveryGlobalViewList idAdmin={ admin1.id }/>
    ));

storiesOf('component/SmartMoldList', module)
    .addDecorator(story => (
        <P>
            <PopupProvider>
                { story() }
            </PopupProvider>
        </P>
    ))
    .add('simple example', () => (
        <SmartMoldList/>
    ));

storiesOf('component/SmartPartnershipRequestList', module)
    .addDecorator(story => (
        <P>
            <PopupProvider>
                { story() }
            </PopupProvider>
        </P>
    ))
    .add('simple example', () => (
        <SmartPartnershipRequestList/>
    ));

storiesOf('form/SmartMoldCreationForm', module)
    .addDecorator(story => (
        <P>
            { story() }
        </P>
    ))
    .add('simple example', () => (
        <SmartMoldCreationForm idUser={ user1.id }/>
    ));