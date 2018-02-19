module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactTreefold',
      externals: {
        react: 'React',
      },
    },
  },
};
