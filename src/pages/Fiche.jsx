import { useState, useEffect } from "react";
import API from "../config";

const TYPE_STYLES = {
  definition: { bg: "#EEEDFE", border: "#AFA9EC", accent: "#534AB7", emoji: "📖" },
  regle:      { bg: "#E1F5EE", border: "#9FE1CB", accent: "#0F6E56", emoji: "📏" },
  exemple:    { bg: "#FAEEDA", border: "#FAC775", accent: "#BA7517", emoji: "✏️"  },
  astuce:     { bg: "#FDE8F0", border: "#F4AACB", accent: "#B5245F", emoji: "💡" },
};
const TYPE_DEFAUT = { bg: "#F0F0F0", border: "#CCC", accent: "#555", emoji: "📌" };

export default function Fiche({ lecon, matiere, eleve, onCommencerExercices, onRetour }) {
  const [fiche, setFiche]       = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur]     = useState(false);

  const accent = matiere?.couleur?.accent || "#534AB7";
  const bg     = matiere?.couleur?.bg     || "#EEEDFE";

  useEffect(() => {
    if (!lecon?.id) return;
    fetch(`${API}/api/fiches/${lecon.id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setFiche(data); setChargement(false); })
      .catch(() => { setErreur(true); setChargement(false); });
  }, [lecon]);

  return (
    <div style={{ minHeight: "100vh", background: "#F8F6FF",
      display: "flex", justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* Barre du haut */}
        <div style={{ background: accent, padding: "14px 20px",
          display: "flex", alignItems: "center", gap: 12 }}>
          <div onClick={onRetour}
            style={{ width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", display: "flex",
              alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 18, color: "white" }}>
            ←
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
              {matiere?.nom}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "white" }}>
              Fiche de révision
            </div>
          </div>
        </div>

        {/* Titre de la leçon */}
        <div style={{ background: bg, padding: "16px 20px",
          borderBottom: `1px solid ${matiere?.couleur?.border || "#AFA9EC"}` }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: accent }}>
            {lecon?.titre}
          </div>
          {lecon?.contenu && (
            <div style={{ fontSize: 13, color: "#555", marginTop: 6, lineHeight: 1.5 }}>
              {lecon.contenu}
            </div>
          )}
        </div>

        {/* Contenu */}
        <div style={{ padding: "16px 16px 100px" }}>
          {chargement && (
            <div style={{ textAlign: "center", padding: 40, color: "#888", fontSize: 14 }}>
              Chargement de la fiche…
            </div>
          )}

          {!chargement && erreur && (
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 14, color: "#888" }}>
                Fiche non disponible pour cette leçon.
              </div>
              <div style={{ fontSize: 12, color: "#AAA", marginTop: 6 }}>
                Tu peux quand même faire les exercices !
              </div>
            </div>
          )}

          {!chargement && fiche && fiche.sections?.map((section, i) => {
            const style = TYPE_STYLES[section.type] || TYPE_DEFAUT;
            return (
              <div key={i} style={{
                background: style.bg,
                border: `1px solid ${style.border}`,
                borderRadius: 14,
                padding: 16,
                marginBottom: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{style.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: style.accent }}>
                    {section.titre}
                  </span>
                </div>
                <div style={{ fontSize: 14, color: "#333", lineHeight: 1.65,
                  whiteSpace: "pre-line" }}>
                  {section.contenu}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bouton bas fixe */}
        <div style={{ position: "fixed", bottom: 0, left: "50%",
          transform: "translateX(-50%)", width: "100%", maxWidth: 480,
          padding: "12px 16px", background: "white",
          borderTop: "1px solid #E8E6F0" }}>
          <div onClick={onCommencerExercices}
            style={{ background: accent, color: "white",
              borderRadius: 14, padding: "14px",
              textAlign: "center", cursor: "pointer",
              fontSize: 15, fontWeight: 700 }}>
            ✏️ Commencer les exercices
          </div>
        </div>

      </div>
    </div>
  );
}
