import { useState, useEffect } from "react";
import API from "../config";

export default function Lecons({ matiere, eleve, onChoisirLecon, onRetour }) {
  const [lecons, setLecons] = useState([]);
  const [chargement, setChargement] = useState(true);

  const accent  = matiere?.couleur?.accent  || "#534AB7";
  const bg      = matiere?.couleur?.bg      || "#EEEDFE";
  const border  = matiere?.couleur?.border  || "#AFA9EC";
  const nomMat  = matiere?.nom || "Matière";

  useEffect(() => {
    if (!matiere?.id) return;
    fetch(`${API}/api/matieres/${matiere.id}/lecons?niveau=${eleve?.classe || 'CE2'}`)
      .then(r => r.json())
      .then(data => { setLecons(data); setChargement(false); })
      .catch(() => setChargement(false));
  }, [matiere]);

  return (
    <div style={{ minHeight:"100vh", background:"#F8F6FF",
      display:"flex", justifyContent:"center",
      fontFamily:"'Segoe UI', sans-serif" }}>
      <div style={{ width:"100%", maxWidth:480 }}>

        {/* Barre du haut */}
        <div style={{ background:accent, padding:"14px 20px",
          display:"flex", alignItems:"center", gap:12 }}>
          <div onClick={onRetour}
            style={{ width:32, height:32, borderRadius:"50%",
              background:"rgba(255,255,255,0.18)", display:"flex",
              alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize:16, color:"#EEEDFE", fontWeight:700 }}>{nomMat}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.75)" }}>Choisis une leçon</div>
          </div>
        </div>

        {/* Sous-titre */}
        <div style={{ background:bg, border:`0.5px solid ${border}`,
          margin:"16px", borderRadius:14, padding:"14px 16px",
          display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ fontSize:28 }}>📖</div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:"#26215C" }}>
              Quelle leçon veux-tu réviser ?
            </div>
            <div style={{ fontSize:12, color:"#534AB7", marginTop:2 }}>
              {lecons.length} leçon{lecons.length > 1 ? "s" : ""} disponible{lecons.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Liste des leçons */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"0 16px 24px" }}>
          {chargement && (
            <div style={{ textAlign:"center", color:"#534AB7", padding:20 }}>
              Chargement...
            </div>
          )}
          {lecons.map((l, i) => (
            <div key={l.id}
              onClick={() => onChoisirLecon(l)}
              style={{ background:"white", borderRadius:14,
                border:`0.5px solid ${border}`, padding:"14px 16px",
                cursor:"pointer", display:"flex",
                alignItems:"center", gap:14,
                boxShadow:"0 2px 8px rgba(83,74,183,0.07)" }}
              onMouseEnter={e => e.currentTarget.style.transform="scale(1.01)"}
              onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>

              {/* Numéro */}
              <div style={{ width:36, height:36, borderRadius:10,
                background:accent, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:15,
                fontWeight:700, color:"white", flexShrink:0 }}>
                {i + 1}
              </div>

              {/* Titre et description */}
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:"#26215C" }}>
                  {l.titre}
                </div>
                {l.contenu && (
                  <div style={{ fontSize:11, color:"#534AB7", marginTop:3 }}>
                    {l.contenu}
                  </div>
                )}
              </div>

              {/* Flèche */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}>
                <path d="M6 3L11 8L6 13" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
