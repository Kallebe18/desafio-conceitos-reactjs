import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
    .then(res => {
      setRepositories(res.data);
    })
  }, [])

  async function handleAddRepository() {
    const repo = {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel",
      techs: ["Node", "Express", "TypeScript"]
    }

    const response = await api.post('/repositories', repo);
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`)
    if(res.status === 204) {
      setRepositories(
        repositories.filter(r => r.id !== id)
      )
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories.map(r => {
          return <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
