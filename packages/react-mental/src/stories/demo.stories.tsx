import './GlamorStyles';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { XView } from '../XView';

storiesOf('XView', module).add('Hello World', () => {
    return (
        <XView
            backgroundColor="red"
            padding={10}
            width={100}
            height={48}
            borderRadius={24}
            hoverBackgroundColor="blue"
        >
            text
        </XView>
    );
});