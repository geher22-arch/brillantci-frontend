import { useState } from 'react';
import Login from './pages/Login';
import Matieres from './pages/Matieres';

function App() {
  const [page, setPage] = useState("login");
  const [eleve, setEleve] = useState(null);

  if (page === "login") {
    return <Login onConnexion={(e) => { setEleve(e); setPage("matieres"); }} />;
  }
  return <Matieres eleve={eleve} onChoisirMatiere={(m) => console.log(m)} />;
}

export default App;