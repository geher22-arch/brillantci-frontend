import React, { useState } from 'react';
import Login from './pages/Login';
import Matieres from './pages/Matieres';
import Lecons from './pages/Lecons';
import Exercices from './pages/Exercices';
import Dashboard from './pages/Dashboard';

function App() {
  const [page, setPage]       = useState("login");
  const [eleve, setEleve]     = useState(null);
  const [matiere, setMatiere] = useState(null);
  const [lecon, setLecon]     = useState(null);

  if (page === "login") {
    return <Login onConnexion={(e) => { setEleve(e); setPage("matieres"); }} />;
  }

  if (page === "matieres") {
    return <Matieres eleve={eleve}
      onChoisirMatiere={(m) => { setMatiere(m); setPage("lecons"); }}
      onDashboard={() => setPage("dashboard")}
    />;
  }

  if (page === "lecons") {
    return <Lecons matiere={matiere} eleve={eleve}
      onChoisirLecon={(l) => { setLecon(l); setPage("exercices"); }}
      onRetour={() => setPage("matieres")}
    />;
  }

  if (page === "exercices") {
    return <Exercices matiere={matiere} lecon={lecon} eleve={eleve}
      onRetour={() => setPage("lecons")}
      onTerminer={() => setPage("lecons")} />;
  }

  if (page === "dashboard") {
    return <Dashboard eleve={eleve}
      onRetour={() => setPage("matieres")} />;
  }
}

export default App;