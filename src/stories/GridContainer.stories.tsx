import GridContainer from '../Grid/GridContainer';
import testrequest from '../Grid/testrequest.json';

export default {
  title: 'GridContainer',
  component: GridContainer,
  argTypes: {
    variant: {
      options: ['items', 'json'],
      control: { type: 'radio' },
    },
  },
};

const items = new Array(
  { key: 1, filedata: { type: 'doc', title: 'doc1', link: 'https://www.svgrepo.com/show/532761/file-check.svg' } },
  { key: 2, filedata: { type: 'file', title: 'file1' } },
  { key: 3, filedata: { type: 'txt', title: 'aud1', link: 'https://www.svgrepo.com/show/532699/file-audio.svg' } },
  { key: 4, filedata: { type: 'mp4', title: 'vid1' } },
  { key: 5, filedata: { type: 'file', title: 'file2' } },
  { key: 6, filedata: { type: 'txt', title: 'aud2' } },
  { key: 7, filedata: { type: 'doc', title: 'doc2' } },
  { key: 8, filedata: { type: 'mp4', title: 'vid2' } },
  { key: 9, filedata: { type: 'doc', title: 'doc3' } },
  { key: 10, filedata: { type: 'doc', title: 'doc4' } },
  { key: 11, filedata: { type: 'doc', title: 'doc5' } },
  { key: 12, filedata: { type: 'doc', title: 'doc6' } }
);

const items2 = testrequest.items.map((item, index) => ({
  key: index + 1,
  filedata: { type: item.type, title: item.title.t.en, link: item.link },
}));

export const Default = (args: { variant: any; }) => {
  const { variant } = args;
  let selectedItems = items;

  if (variant === 'json') {
    selectedItems = items2;
  }

  return <GridContainer items={selectedItems} />;
};

Default.args = {
  variant: 'items',
};
