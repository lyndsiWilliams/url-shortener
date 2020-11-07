// Package imports
import React, { useState } from 'react';
import { connect } from 'react-redux';
// Redux action
import { postURL } from './redux/actions';
// Styling
import './App.css';

const App = props => {
  console.log("PROPS: ", props)

  const [form, setForm] = useState({
    url: '',
    slug: '',
    created: null,
  });

  async function createURL() {
    console.log(form.url, form.slug);
    const response = await fetch('http://localhost:1337/url', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        url: form.url,
        slug: form.slug,
      })
    });
    setForm({ created: await response.json() });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // createURL();
    props.postURL(form);
    setForm({
      url: '',
      slug: '',
      created: null,
    })
  };

  const handleChanges = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="App">
      <header>
        <h1>myMinnow - Turn your big fish URL into a tiny minnow!</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="enter a url"
            onChange={handleChanges}
            value={form.url}
          />
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            id="slug"
            placeholder="name your minnow"
            onChange={handleChanges}
            value={form.slug}
          />
          <button type="submit">Create</button>
        </form>
        <p>
          {JSON.stringify(form.created, null, 2)}
        </p>
      </main>
    </div>
  );
};

const mapStateToProps = state => ({
  url: state.url,
  error: state.error,
  isFetching: state.isFetching,
});

export default connect (
  mapStateToProps,
  { postURL }
)(App);
