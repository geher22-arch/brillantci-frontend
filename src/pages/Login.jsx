import { useState } from "react";
import API from "../config";

export default function Login({ onConnexion }) {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [ecole, setEcole] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [mode, setMode] = useState("connexion");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");

  const handleSubmit = async () => {
    if (!prenom || !motDePasse) return;
    setLoading(true);
    setErreur("");
    try {
      if (mode === "connexion") {
        const res = await fetch(`${API}/api/eleves/connexion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prenom, mot_de_passe: motDePasse }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.erreur || "Erreur de connexion");
        localStorage.setItem("token", data.token);
        onConnexion({ ...data.eleve, niveau: 1, xp: 0 });
      } else {
        if (!nom || !ecole) { setErreur("Remplis tous les champs"); setLoading(false); return; }
        const res = await fetch(`${API}/api/eleves/inscription`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prenom, nom, ecole, mot_de_passe: motDePasse }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.erreur || "Erreur d'inscription");
        setMode("connexion");
        setNom(""); setEcole("");
        setErreur("Compte créé ! Connecte-toi maintenant.");
      }
    } catch (err) {
      setErreur(err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    shell: { minHeight:"100vh", background:"#FFF8ED",
      display:"flex", justifyContent:"center",
      fontFamily:"'Segoe UI', sans-serif" },
    card: { width:"100%", maxWidth:480, borderRadius:20,
      overflow:"hidden", border:"0.5px solid #AFA9EC",
      background:"#FFF8ED", boxShadow:"0 8px 32px rgba(83,74,183,0.10)" },
    topbar: { background:"#534AB7", padding:"14px 24px",
      display:"flex", alignItems:"center", gap:12 },
    form: { background:"white", borderRadius:16,
      border:"0.5px solid #D3D1C7", padding:"20px 24px",
      margin:"14px 20px", display:"flex",
      flexDirection:"column", gap:14 },
    input: { width:"100%", border:"0.5px solid #B4B2A9",
      borderRadius:8, padding:"10px 12px", fontSize:15,
      background:"#F1EFE8", color:"#2C2C2A",
      outline:"none", boxSizing:"border-box" },
    label: { fontSize:12, color:"#5F5E5A",
      fontWeight:500, marginBottom:4 },
  };

  return (
    <div style={styles.shell}>
      <div style={styles.card}>

        <div style={styles.topbar}>
          <svg width="30" height="30" viewBox="0 0 30 30">
            <polygon points="15,3 18,10 26,11 20,17 22,25 15,21 8,25 10,17 4,11 12,10" fill="#FAC775"/>
          </svg>
          <div>
            <div style={{ fontSize:18, color:"#EEEDFE", fontWeight:600 }}>BrillantCI</div>
            <div style={{ fontSize:11, color:"#AFA9EC" }}>Révisions CE2 — Côte d'Ivoire</div>
          </div>
        </div>

        <div style={{ background:"#FAEEDA", textAlign:"center", padding:"20px 10px 10px" }}>
          <svg width="140" height="150" viewBox="0 0 140 150">
            <ellipse cx="70" cy="100" rx="45" ry="40" fill="#EF9F27"/>
            <circle cx="70" cy="60" r="34" fill="#BA7517"/>
            <circle cx="70" cy="60" r="28" fill="#FAC775"/>
            <ellipse cx="56" cy="44" rx="9" ry="11" fill="#BA7517"/>
            <ellipse cx="84" cy="44" rx="9" ry="11" fill="#BA7517"/>
            <ellipse cx="56" cy="44" rx="5" ry="7" fill="#F5C4B3"/>
            <ellipse cx="84" cy="44" rx="5" ry="7" fill="#F5C4B3"/>
            <circle cx="60" cy="55" r="6" fill="white"/>
            <circle cx="80" cy="55" r="6" fill="white"/>
            <circle cx="61" cy="57" r="4" fill="#26215C"/>
            <circle cx="81" cy="57" r="4" fill="#26215C"/>
            <ellipse cx="70" cy="66" rx="5" ry="4" fill="#BA7517"/>
            <path d="M60 74 Q70 84 80 74" stroke="#854F0B" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <rect x="42" y="105" width="56" height="38" rx="8" fill="#185FA5"/>
            <rect x="42" y="105" width="56" height="14" rx="6" fill="#0C447C"/>
            <rect x="54" y="97" width="32" height="12" rx="6" fill="#0C447C"/>
            <circle cx="70" cy="132" r="5" fill="#FAC775"/>
            <rect x="38" y="115" width="8" height="20" rx="4" fill="#EF9F27"/>
            <rect x="94" y="115" width="8" height="20" rx="4" fill="#EF9F27"/>
            <rect x="50" y="143" width="14" height="18" rx="7" fill="#BA7517"/>
            <rect x="76" y="143" width="14" height="18" rx="7" fill="#BA7517"/>
          </svg>
          <div style={{ fontSize:16, fontWeight:600, color:"#3C3489", marginTop:6 }}>
            Bonjour, futur(e) champion(ne) !
          </div>
          <div style={{ fontSize:13, color:"#534AB7", marginTop:4 }}>
            Connecte-toi pour commencer ta révision
          </div>
        </div>

        <div style={styles.form}>
          <div style={{ display:"flex", gap:8 }}>
            {["connexion","inscription"].map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex:1, padding:"8px", borderRadius:8, border:"none",
                cursor:"pointer", fontWeight:500, fontSize:14,
                background: mode===m ? "#534AB7" : "#EEEDFE",
                color: mode===m ? "#EEEDFE" : "#534AB7" }}>
                {m === "connexion" ? "Se connecter" : "Créer un compte"}
              </button>
            ))}
          </div>

          <div>
            <div style={styles.label}>Ton prénom</div>
            <input type="text" value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Ex : Aminata, Kouassi..."
              style={styles.input}/>
          </div>

          {mode === "inscription" && (
            <>
              <div>
                <div style={styles.label}>Ton nom de famille</div>
                <input type="text" value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex : Koné, Traoré..."
                  style={styles.input}/>
              </div>
              <div>
                <div style={styles.label}>Ton école</div>
                <input type="text" value={ecole}
                  onChange={(e) => setEcole(e.target.value)}
                  placeholder="Ex : EPP Cocody, Groupe scolaire..."
                  style={styles.input}/>
              </div>
            </>
          )}

          <div>
            <div style={styles.label}>Ton mot de passe</div>
            <input type="password" value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="••••••••"
              style={styles.input}/>
          </div>

          {erreur && (
            <div style={{ fontSize:13, padding:"8px 12px", borderRadius:8,
              background: erreur.includes("créé") ? "#E1F5EE" : "#FCEBEB",
              color: erreur.includes("créé") ? "#0F6E56" : "#A32D2D",
              fontWeight:500 }}>
              {erreur}
            </div>
          )}

          <button onClick={handleSubmit}
            disabled={loading || !prenom || !motDePasse}
            style={{ width:"100%",
              background:(!prenom||!motDePasse) ? "#AFA9EC" : "#534AB7",
              color:"#EEEDFE", border:"none", borderRadius:8,
              padding:"12px", fontSize:16, fontWeight:600,
              cursor:(!prenom||!motDePasse) ? "not-allowed" : "pointer" }}>
            {loading ? "Connexion en cours..." : mode==="connexion" ? "Me connecter" : "Créer mon compte"}
          </button>
        </div>

        <div style={{ display:"flex", gap:8, padding:"0 20px 20px",
          justifyContent:"center", flexWrap:"wrap" }}>
          {[
            { label:"Maths", bg:"#FAC775", color:"#412402" },
            { label:"Français", bg:"#C0DD97", color:"#173404" },
            { label:"Éveil", bg:"#F4C0D1", color:"#4B1528" },
            { label:"Histoire-Géo", bg:"#B5D4F4", color:"#042C53" },
          ].map(({label,bg,color}) => (
            <span key={label} style={{ background:bg, color,
              fontSize:11, padding:"5px 13px",
              borderRadius:20, fontWeight:600 }}>{label}</span>
          ))}
        </div>

      </div>
    </div>
  );
}