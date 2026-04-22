import { useState, useEffect } from "react";
import API from "../config";

const EXERCICES_DEMO = [
  { id:1, question:"Combien font 7 x 8 ?", choix:["54","56","48","63"], bonne:1, explication:"7 x 8 = 56 !", xp:10 },
  { id:2, question:"Quel est le double de 15 ?", choix:["25","20","30","35"], bonne:2, explication:"15 + 15 = 30 !", xp:10 },
  { id:3, question:"Combien font 6 x 9 ?", choix:["45","54","56","63"], bonne:1, explication:"6 x 9 = 54 !", xp:10 },
  { id:4, question:"Chiffre des dizaines dans 357 ?", choix:["3","7","5","35"], bonne:2, explication:"3=centaines, 5=dizaines, 7=unites", xp:10 },
  { id:5, question:"Combien font 45 + 38 ?", choix:["73","83","93","63"], bonne:1, explication:"45 + 38 = 83 !", xp:15 },
];

export default function Exercices({ matiere, lecon, eleve, onRetour }) {
  const [exercices, setExercices] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [index, setIndex]         = useState(0);
  const [choixFait, setChoixFait] = useState(null);
  const [bonnes, setBonnes]       = useState(0);
  const [xpTotal, setXpTotal]     = useState(0);
  const [termine, setTermine]     = useState(false);

  useEffect(() => {
    if (!lecon?.id) { setExercices(EXERCICES_DEMO); return; }
    fetch(`${API}/api/exercices/lecon/${lecon.id}`)
      .then(r => r.json())
      .then(data => {
        if (!data.length) { setExercices(EXERCICES_DEMO); return; }
        setExercices(data.map(e => ({
          id:           e.id,
          question:     e.question,
          choix:        e.choix        || [],
          bonne:        e.bonne        ?? -1,
          bonne_reponse:e.bonne_reponse,
          explication:  e.explication  || `Réponse : ${e.bonne_reponse}`,
          xp:           e.points       || 10,
        })));
      })
      .catch(() => setExercices(EXERCICES_DEMO));
  }, [lecon]);

  const exo   = exercices[index];
  const total = exercices.length;
  const accent = matiere ? matiere.couleur.accent : "#534AB7";
  const nom    = matiere ? matiere.nom : "Mathematiques";

  const handleChoix = (i) => {
    if (choixFait !== null || !exo) return;
    setChoixFait(i);
    const correct = exo.choix.length > 0 ? i === exo.bonne : false;
    if (correct) {
      setBonnes(bonnes + 1);
      setXpTotal(xpTotal + exo.xp);
    }
    if (sessionId && exo.bonne_reponse === undefined) return;
    if (sessionId) {
      const reponse = exo.choix.length > 0 ? exo.choix[i] : String(i);
      fetch(`${API}/api/exercices/repondre`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, exercice_id: exo.id, reponse_eleve: reponse }),
      }).catch(() => {});
    }
  };

  const handleSuivant = () => {
    if (index + 1 >= total) { setTermine(true); }
    else { setIndex(index + 1); setChoixFait(null); }
  };

  if (!exo) return (
    <div style={{ minHeight:"100vh", background:"#F8F6FF", display:"flex", justifyContent:"center", alignItems:"center", fontFamily:"'Segoe UI', sans-serif" }}>
      <div style={{ textAlign:"center", color:"#534AB7" }}>Chargement des exercices...</div>
    </div>
  );

  if (termine) {
    return (
      <div style={{ minHeight:"100vh", background:"#F8F6FF", display:"flex", justifyContent:"center", fontFamily:"'Segoe UI', sans-serif" }}>
        <div style={{ width:"100%", maxWidth:480, borderRadius:20, overflow:"hidden", border:"0.5px solid #AFA9EC", background:"#F8F6FF", boxShadow:"0 8px 32px rgba(83,74,183,0.10)" }}>
          <div style={{ background:accent, padding:"14px 20px" }}>
            <div style={{ fontSize:16, color:"#EEEDFE", fontWeight:600 }}>{nom}</div>
          </div>
          <div style={{ padding:"40px 24px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
            <div style={{ fontSize:60 }}>🏆</div>
            <div style={{ fontSize:22, fontWeight:700, color:"#26215C" }}>
              Bravo {eleve ? eleve.prenom : "champion"} !
            </div>
            <div style={{ fontSize:15, color:"#534AB7" }}>
              {bonnes} bonne{bonnes > 1 ? "s" : ""} reponse{bonnes > 1 ? "s" : ""} sur {total}
            </div>
            <div style={{ background:"#FAC775", color:"#412402", fontSize:18, fontWeight:700, padding:"12px 28px", borderRadius:20 }}>
              + {xpTotal} XP gagnes !
            </div>
            <div style={{ display:"flex", gap:12, width:"100%", marginTop:8 }}>
              <button onClick={onRetour} style={{ flex:1, padding:"13px", borderRadius:12, border:`1.5px solid ${accent}`, background:"white", color:accent, fontSize:15, fontWeight:600, cursor:"pointer" }}>
                Retour
              </button>
              <button onClick={() => { setIndex(0); setChoixFait(null); setBonnes(0); setXpTotal(0); setTermine(false); }}
                style={{ flex:1, padding:"13px", borderRadius:12, border:"none", background:accent, color:"#EEEDFE", fontSize:15, fontWeight:600, cursor:"pointer" }}>
                Rejouer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#F8F6FF", display:"flex", justifyContent:"center", fontFamily:"'Segoe UI', sans-serif" }}>
      <div style={{ width:"100%", maxWidth:480, borderRadius:20, overflow:"hidden", border:"0.5px solid #AFA9EC", background:"#F8F6FF", boxShadow:"0 8px 32px rgba(83,74,183,0.10)" }}>

        <div style={{ background:accent, padding:"12px 20px", display:"flex", alignItems:"center", gap:10 }}>
          <div onClick={onRetour} style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, color:"#EEEDFE", fontWeight:600 }}>{nom}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)" }}>Exercice {index + 1}</div>
          </div>
          <div style={{ background:"#FAC775", color:"#412402", fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20 }}>
            ⭐ {xpTotal} XP
          </div>
        </div>

        <div style={{ background:"#EEEDFE", padding:"14px 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:12, color:"#534AB7", fontWeight:500 }}>Question {index + 1} sur {total}</span>
            <span style={{ fontSize:12, color:"#534AB7" }}>🔥 {bonnes} bonnes</span>
          </div>
          <div style={{ height:8, background:"#AFA9EC", borderRadius:4, overflow:"hidden" }}>
            <div style={{ height:"100%", background:accent, borderRadius:4, width:`${Math.round((index/total)*100)}%`, transition:"width 0.4s" }}/>
          </div>
        </div>

        <div style={{ padding:"20px 20px 0" }}>
          <div style={{ fontSize:11, fontWeight:600, color:accent, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>
            Question {index + 1}
          </div>
          <div style={{ fontSize:17, fontWeight:600, color:"#26215C", lineHeight:1.5, marginBottom:20 }}>
            {exo.question}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {exo.choix.map((c, i) => {
              let bg = "white", border = "#AFA9EC", color = "#26215C";
              let lbg = "#EEEDFE", lcolor = "#534AB7";
              if (choixFait !== null) {
                if (i === exo.bonne) { bg="#E1F5EE"; border="#0F6E56"; color="#04342C"; lbg="#0F6E56"; lcolor="white"; }
                else if (i === choixFait) { bg="#FCEBEB"; border="#A32D2D"; color="#501313"; lbg="#A32D2D"; lcolor="white"; }
              }
              return (
                <div key={i} onClick={() => handleChoix(i)}
                  style={{ padding:"14px 16px", borderRadius:12, border:`1.5px solid ${border}`, background:bg, cursor:choixFait===null?"pointer":"default", display:"flex", alignItems:"center", gap:12, fontSize:15, color, fontWeight:500, transition:"all 0.15s" }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:lbg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:lcolor, flexShrink:0 }}>
                    {["A","B","C","D"][i]}
                  </div>
                  {c}
                  {choixFait !== null && i === exo.bonne && (
                    <span style={{ marginLeft:"auto", fontSize:13, color:"#0F6E56", fontWeight:600 }}>Bonne reponse !</span>
                  )}
                </div>
              );
            })}
          </div>

          {choixFait !== null && (
            <div style={{ marginTop:16 }}>
              {choixFait === exo.bonne && (
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#FAC775", color:"#412402", fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:20, marginBottom:12 }}>
                  +{exo.xp} XP gagnes !
                </div>
              )}
              <div style={{ background:"#E1F5EE", borderRadius:12, padding:"12px 16px", border:"0.5px solid #9FE1CB" }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#0F6E56", marginBottom:4 }}>Explication</div>
                <div style={{ fontSize:13, color:"#085041" }}>{exo.explication}</div>
              </div>
            </div>
          )}
        </div>

        {choixFait !== null && (
          <div style={{ padding:"16px 20px 20px" }}>
            <button onClick={handleSuivant} style={{ width:"100%", background:accent, color:"#EEEDFE", border:"none", borderRadius:12, padding:"14px", fontSize:16, fontWeight:600, cursor:"pointer" }}>
              {index + 1 >= total ? "Voir mon score !" : "Question suivante →"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}