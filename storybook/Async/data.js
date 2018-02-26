const injectNames = obj =>
  Object.keys(obj).reduce(
    (result, name) => ({ ...result, [name]: { name, ...obj[name] } }),
    {}
  );

// Source: http://slideplayer.com/slide/6378912/22/images/19/Language+Tree.jpg
const allLanguages = injectNames({
  'Proto-Indo-European': {
    children: [
      'Germanic',
      'Romance',
      'Balto-Slavic',
      'Celtic',
      'Indo-Iranian',
      'Greek',
      'Albanian',
      'Armenian',
    ],
  },
  Germanic: {
    children: ['North Germanic', 'West Germanic'],
  },
  'North Germanic': {
    children: ['Danish', 'Norwegian', 'Swedish'],
  },
  'West Germanic': {
    children: ['English', 'German', 'Dutch', 'Afrikaans'],
  },
  Romance: {
    children: [
      'Spanish',
      'French',
      'Italian',
      'Portuguese',
      'Catalan',
      'Romanian',
    ],
  },
  'Balto-Slavic': {
    children: ['South Slavic', 'West Slavic', 'East Slavic'],
  },
  'South Slavic': {
    children: ['Bulgarian', 'Servo-Croatian'],
  },
  'West Slavic': {
    children: ['Polish', 'Czech', 'Slavic'],
  },
  'East Slavic': {
    children: ['Russian', 'Bielo-Russian', 'Ukranian'],
  },
  Celtic: {
    children: ['Breton', 'Scottish', 'Caelic', 'Irish', 'Gaelic', 'Welsh'],
  },
  'Indo-Iranian': {
    children: ['Sanskrit', 'Old Persian'],
  },
  Sanskrit: {
    children: ['Hindi', 'Bengali', 'Punjabi', 'Urdu'],
  },
  'Old Persian': {
    children: ['Persian', 'Kurdish', 'Iranian'],
  },
  Greek: {},
  Albanian: {},
  Armenian: {},
  Danish: {},
  Norwegian: {},
  Swedish: {},
  English: {},
  German: {},
  Dutch: {},
  Afrikaans: {},
  Spanish: {},
  French: {},
  Italian: {},
  Portuguese: {},
  Catalan: {},
  Romanian: {},
  Breton: {},
  Scottish: {},
  Caelic: {},
  Irish: {},
  Gaelic: {},
  Welsh: {},
  Bulgarian: {},
  'Servo-Croatian': {},
  Polish: {},
  Czech: {},
  Slavic: {},
  Russian: {},
  'Bielo-Russian': {},
  Ukranian: {},
  Hindi: {},
  Bengali: {},
  Punjabi: {},
  Urdu: {},
  Persian: {},
  Kurdish: {},
  Iranian: {},
});

export const getId = node => node.name;

export const getChildren = ({ children }) =>
  children ? children.map(name => allLanguages[name]) : undefined;

export const languages = [allLanguages['Proto-Indo-European']];
