import React from 'react';
import './styles.css';

const Layout = storyFn => (
  <section className="layout">
    <header>
      <h1>react-treefold</h1>
      <div>
        <a target="__blank" href="https://github.com/gnapse/react-treefold">
          <span className="fa fa-lg fa-github" />
        </a>
      </div>
    </header>
    <main>{storyFn()}</main>
  </section>
);

export default Layout;
