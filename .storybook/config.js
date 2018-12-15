// automatically import all files ending in *.stories.tsx
const req = require.context('../packages/storybook/src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);