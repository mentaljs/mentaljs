import { configure } from '@storybook/react';
import { setAddon, addDecorator } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs/react';
addDecorator(withKnobs);
setAddon(JSXAddon);

// automatically import all files ending in *.stories.tsx
const req = require.context('../packages/storybook/src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);