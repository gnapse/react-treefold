export const geoData = [
  {
    id: 'north-america',
    name: 'North America',
    children: [
      {
        id: 'usa',
        name: 'USA',
        children: [
          {
            id: 'calif',
            name: 'California',
            children: [
              { id: 'LA', name: 'Los Angeles' },
              { id: 'SF', name: 'San Francisco' },
            ],
          },
          {
            id: 'texas',
            name: 'Texas',
            children: [
              { id: 'dallas', name: 'Dallas' },
              { id: 'houston', name: 'Houston' },
            ],
          },
        ],
      },
      {
        id: 'canada',
        name: 'Canada',
        children: [
          { id: 'montreal', name: 'Montreal' },
          { id: 'toronto', name: 'Toronto' },
        ],
      },
      {
        id: 'mx',
        name: 'Mexico',
        children: [
          { id: 'mx-city', name: 'Mexico City' },
          { id: 'monterrey', name: 'Monterrey' },
          { id: 'guadalajara', name: 'Guadalajara' },
        ],
      },
    ],
  },
  {
    id: 'caribbean',
    name: 'Caribbean',
    children: [
      { id: 'cuba', name: 'Cuba', children: [{ id: 'hav', name: 'Havana' }] },
      { id: 'jc', name: 'Jamaica' },
      { id: 'pr', name: 'Puerto Rico', children: [] },
    ],
  },
  {
    id: 'south-america',
    name: 'South America',
    children: [
      {
        id: 'cl',
        name: 'Chile',
        children: [
          { id: 'stg', name: 'Santiago' },
          { id: 'valpo', name: 'Valparaíso' },
          { id: 'punta-arenas', name: 'Punta Arenas' },
        ],
      },
      {
        id: 'peru',
        name: 'Peru',
        children: [
          { id: 'lima', name: 'Lima' },
          { id: 'ica', name: 'Ica' },
          { id: 'iquitos', name: 'Iquitos' },
        ],
      },
    ],
  },
];
