export const familyTree = [
  {
    id: '1',
    he: {
      name: 'Joe Mighty',
      born: 1601,
      died: 1681,
    },
  },
  {
    id: '2',
    she: {
      name: 'Sue Mighty',
      born: 1607,
      died: 1685,
    },
    he: {
      name: 'Jim Snow',
      born: 1633,
      died: 1697,
    },
    children: [
      {
        id: '3',
        she: {
          name: 'Lily Sight',
          born: 1633,
          died: 1697,
        },
        he: {
          name: 'Sam Snow',
          born: 1631,
          died: 1695,
        },
        children: [
          {
            id: '4',
            he: {
              name: 'Ralf Snow',
              born: 1651,
            },
          },
          {
            id: '5',
            she: {
              name: 'Brie Snow',
              born: 1653,
            },
          },
        ],
      },
      {
        id: '6',
        she: {
          name: 'Zoe Blue',
          born: 1633,
          died: 1697,
        },
        he: {
          name: 'Jim Snow',
          born: 1633,
          died: 1697,
        },
        children: [
          {
            id: '7',
            she: {
              name: 'Sally Bern',
              born: 1653,
            },
            he: {
              name: 'Ralf Snow',
              born: 1651,
            },
            children: [
              {
                id: '8',
                she: {
                  name: 'Magna Snow',
                  born: 1697,
                },
              },
            ],
          },
          {
            id: '9',
            she: {
              name: 'Brie Snow',
              born: 1653,
            },
          },
        ],
      },
      {
        id: '10',
        he: {
          name: 'John Snow',
          born: 1635,
          died: 1699,
        },
      },
    ],
  },
];
