// Package imports
import React, { useState } from 'react';
import axios from 'axios';
// Styling
import './App.css';

function App() {
  const [form, setForm] = useState({
    url: '',
    slug: '',
    created: null,
  });

  const createURL = () => {
    console.log(form.url, form.slug);
    axios
      .post('localhost:1337/url', form)
      .then(res => {
        console.log("POST REQUEST", res);
        setForm({ created: res })
      })
      .catch(err => console.log(err))
  };

  const handleSubmit = event => {
    event.preventDefault();
    // createURL();
    axios
      .post('localhost:1337/url', form)
      .then(res => {
        console.log("POST REQUEST", res);
        setForm({ created: res })
      })
      .catch(err => console.log(err))
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
          <input
            type="text"
            name="url"
            id="url"
            placeholder="enter a url"
            onChange={handleChanges}
            value={form.url}
          />
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

export default App;
