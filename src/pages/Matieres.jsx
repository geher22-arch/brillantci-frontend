export default function Matieres({ eleve, onChoisirMatiere }) {

  const matieres = [
    {
      id: 1,
      nom: "Mathématiques",
      description: "Nombres, calcul, géométrie",
      couleur: { bg: "#EEEDFE", border: "#AFA9EC", accent: "#534AB7", text: "#26215C", sub: "#534AB7", badge: "#EEEDFE" },
      progression: 60,
      nbLecons: 18,
      icone: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <text x="4" y="18" fontSize="16" fill="white" fontFamily="serif">∑</text>
        </svg>
      ),
    },
    {
      id: 2,
      nom: "Français",
      description: "Lecture, grammaire, conjugaison",
      couleur: { bg: "#E1F5EE", border: "#9FE1CB", accent: "#0F6E56", text: "#04342C", sub: "#0F6E56", badge: "#E1F5EE" },
      progression: 40,
      nbLecons: 22,
      icone: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 10h12M4 14h14M4 18h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 3,
      nom: "Éveil scientifique",
      description: "Nature, corps, environnement",
      couleur: { bg: "#FAEEDA", border: "#FAC775", accent: "#BA7517", text: "#412402", sub: "#854F0B", badge: "#FAEEDA" },
      progression: 25,
      nbLecons: 16,
      icone: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" fill="white"/>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 4,
      nom: "Histoire-Geographie",
      description: "Cote d'Ivoire et Afrique",
      couleur: { bg: "#E6F1FB", border: "#B5D4F4", accent: "#185FA5", text: "#042C53", sub: "#185FA5", badge: "#E6F1FB" },
      progression: 15,
      nbLecons: 14,
      icone: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2"/>
          <path d="M12 4 Q16 12 12 20M12 4 Q8 12 12 20M4 12h16" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
    },
  ];

  const prenomInitiales = eleve ? eleve.prenom.slice(0, 2).toUpperCase() : "AK";
  const prenomAffiche = eleve ? eleve.prenom : "Aminata K.";
  const niveau = eleve ? eleve.niveau : 3;
  const xp = eleve ? eleve.xp : 350;
  const xpMax = niveau * 200;
  const xpPct = Math.round((xp / xpMax) * 100);

  return (
    <div style={{ minHeight:"100vh", background:"#F8F6FF",
      display:"flex", justifyContent:"center",
      fontFamily:"'Segoe UI', sans-serif" }}>
      <div style={{ width:"100%", maxWidth:480, borderRadius:20,
        overflow:"hidden", border:"0.5px solid #AFA9EC",
        background:"#F8F6FF",
        boxShadow:"0 8px 32px rgba(83,74,183,0.10)" }}>

        {/* Barre du haut */}
        <div style={{ background:"#534AB7", padding:"14px 20px",
          display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:"50%",
            background:"#FAC775", display:"flex",
            alignItems:"center", justifyContent:"center",
            fontSize:14, fontWeight:600, color:"#412402", flexShrink:0 }}>
            {prenomInitiales}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, marginBottom:3,
              display:"flex", justifyContent:"space-between" }}>
              <span style={{ color:"#FAC775", fontWeight:500 }}>{prenomAffiche}</span>
              <span style={{ color:"#FAC775" }}>⭐ Niveau {niveau} — {xp} XP</span>
            </div>
            <div style={{ height:6, background:"#3C3489",
              borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", background:"#FAC775",
                borderRadius:3, width:`${xpPct}%` }}/>
            </div>
          </div>
        </div>

        {/* Héros */}
        <div style={{ background:"#EEEDFE", padding:"16px 20px 12px",
          display:"flex", alignItems:"center", gap:14 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="22" r="16" fill="#BA7517"/>
            <circle cx="32" cy="22" r="13" fill="#FAC775"/>
            <ellipse cx="26" cy="13" rx="4" ry="5" fill="#BA7517"/>
            <ellipse cx="38" cy="13" rx="4" ry="5" fill="#BA7517"/>
            <circle cx="27" cy="20" r="3.5" fill="white"/>
            <circle cx="37" cy="20" r="3.5" fill="white"/>
            <circle cx="28" cy="21" r="2" fill="#26215C"/>
            <circle cx="38" cy="21" r="2" fill="#26215C"/>
            <path d="M27 28 Q32 33 37 28" stroke="#854F0B" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <ellipse cx="32" cy="44" rx="14" ry="12" fill="#EF9F27"/>
            <rect x="24" y="40" width="16" height="12" rx="3" fill="#185FA5"/>
            <rect x="24" y="40" width="16" height="5" rx="3" fill="#0C447C"/>
          </svg>
          <div>
            <div style={{ fontSize:16, fontWeight:600, color:"#3C3489" }}>
              Que veux-tu réviser ?
            </div>
            <div style={{ fontSize:12, color:"#534AB7", marginTop:2 }}>
              Choisis une matière et commence !
            </div>
            <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap" }}>
              {[
                { label:"🏆 3 badges", color:"#534AB7" },
                { label:"✅ 12 leçons", color:"#0F6E56" },
                { label:"🔥 5 jours", color:"#BA7517" },
              ].map(({ label, color }) => (
                <span key={label} style={{ background:"white", borderRadius:20,
                  padding:"4px 10px", fontSize:11, fontWeight:500, color,
                  border:"0.5px solid #AFA9EC" }}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Titre */}
        <div style={{ fontSize:13, fontWeight:600,
          color:"#3C3489", padding:"14px 20px 8px" }}>
          Mes matières
        </div>

        {/* Grille */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:12, padding:"0 16px 20px" }}>
          {matieres.map((m) => (
            <div key={m.id}
              onClick={() => onChoisirMatiere && onChoisirMatiere(m)}
              style={{ background:m.couleur.bg,
                border:`0.5px solid ${m.couleur.border}`,
                borderRadius:16, padding:16, cursor:"pointer",
                display:"flex", flexDirection:"column", gap:8 }}
              onMouseEnter={(e) => e.currentTarget.style.transform="scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform="scale(1)"}>

              <div style={{ width:44, height:44, borderRadius:12,
                background:m.couleur.accent, display:"flex",
                alignItems:"center", justifyContent:"center" }}>
                {m.icone}
              </div>

              <div style={{ fontSize:14, fontWeight:600, color:m.couleur.text }}>
                {m.nom}
              </div>

              <div style={{ fontSize:11, color:m.couleur.sub }}>
                {m.description}
              </div>

              <div style={{ height:5, borderRadius:3,
                background:"rgba(0,0,0,0.12)", overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:3,
                  background:m.couleur.accent, width:`${m.progression}%` }}/>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", fontSize:11 }}>
                <span style={{ color:m.couleur.sub }}>{m.progression}% complété</span>
                <span style={{ background:m.couleur.accent, color:m.couleur.badge,
                  padding:"3px 8px", borderRadius:10,
                  fontWeight:500, fontSize:10 }}>
                  {m.nbLecons} leçons
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}