import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { XView } from '../XView';

storiesOf('XView', module).add('Story', () => {
    return <XView padding={0} />;
});