import React, { useEffect, useState } from 'react';
import API from "../config";

const COLORS = {
  violet: '#534AB7',
  violetClair: '#EEEDFE',
  or: '#FAC775',
  fond: '#F8F6FF',
  maths: '#534AB7',
  francais: '#0F6E56',
  eveil: '#BA7517',
  histgeo: '#185FA5',
  edcivique: '#B5245F',
};

const NIVEAUX = [
  'Petit Lion',
  'Lion Curieux',
  'Lion Courageux',
  'Lion Brillant',
  'Lion Champion',
  'Lion Legendaire',
];

const TOUS_LES_BADGES = [
  { nom: 'Débutant',    icone: '🌱' },
  { nom: 'Apprenti',    icone: '📚' },
  { nom: 'Savant',      icone: '🔬' },
  { nom: 'Champion',    icone: '🏆' },
  { nom: 'Légendaire',  icone: '👑' },
  { nom: '5 leçons',    icone: '📖' },
  { nom: '20 leçons',   icone: '🎓' },
  { nom: '3 jours',     icone: '🔥' },
  { nom: '7 jours',     icone: '⚡' },
];

const JOURS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export default function Dashboard({ eleve, onRetour }) {
  const [xpAnim, setXpAnim] = useState(0);
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    if (eleve?.id) {
      fetch(`${API}/api/gamification/profil/${eleve.id}`)
        .then(r => r.json())
        .then(setProfil)
        .catch(() => {});
    }
  }, [eleve]);

  const progMap = {};
  if (profil?.progression) {
    profil.progression.forEach(p => {
      const total = parseInt(p.exercices_faits) || 1;
      const bonnes = parseInt(p.bonnes_reponses) || 0;
      progMap[p.matiere] = Math.round((bonnes / total) * 100);
    });
  }

  const obtenuSet = new Set((profil?.badges || []).map(b => b.nom));
  const badgesAffichage = TOUS_LES_BADGES.map(b => ({ ...b, obtenu: obtenuSet.has(b.nom) }));

  const data = {
    prenom:  eleve?.prenom || 'Élève',
    xp:      profil?.xp_total  || eleve?.xp || 0,
    xpMax:   ((profil?.niveau || 1) + 1) * 200,
    niveau:  profil ? profil.niveau - 1 : 0,
    stats: {
      lecons:    profil?.nb_lecons_faites || 0,
      exercices: profil?.progression?.reduce((s, p) => s + parseInt(p.exercices_faits || 0), 0) || 0,
      badges:    profil?.badges?.length || 0,
    },
    progression: {
      maths:    progMap["Mathématiques"]       || 0,
      francais: progMap["Français"]            || 0,
      eveil:    progMap["Éveil scientifique"]  || 0,
      histgeo:  progMap["Histoire-Géographie"] || 0,
      edcivique:progMap["Éducation civique"]   || 0,
    },
    serie: profil?.serie || 0,
    joursRevises: [false, false, false, false, false, false, false],
  };

  const nomNiveau = NIVEAUX[data.niveau] || NIVEAUX[0];
  const pctXP = Math.round((data.xp / data.xpMax) * 100);

  useEffect(() => {
    setTimeout(() => setXpAnim(pctXP), 300);
  }, [pctXP]);

  const styles = {
    page: {
      fontFamily: "'Nunito', sans-serif",
      background: COLORS.fond,
      minHeight: '100vh',
    },
    topbar: {
      background: COLORS.violet,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    topbarLeft: { display: 'flex', alignItems: 'center', gap: 10 },
    avatar: {
      width: 40, height: 40, borderRadius: '50%',
      background: COLORS.or,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, fontWeight: 800, color: COLORS.violet,
      border: '2px solid #fff',
    },
    prenom: { color: '#fff', fontSize: 15, fontWeight: 700 },
    niveauPill: {
      background: COLORS.or, color: COLORS.violet,
      fontSize: 11, fontWeight: 800,
      padding: '2px 8px', borderRadius: 20,
    },
    xpBadge: {
      background: 'rgba(255,255,255,0.15)', color: COLORS.or,
      fontSize: 13, fontWeight: 700,
      padding: '4px 10px', borderRadius: 20,
      display: 'flex', alignItems: 'center', gap: 4,
    },
    hero: {
      background: '#534AB7',
      padding: '20px 16px 0',
    },
    lionZone: { display: 'flex', alignItems: 'flex-end', gap: 16 },
    levelCard: {
      background: '#fff', borderRadius: 16,
      padding: '12px 16px', flex: 1,
    },
    levelTitle: {
      fontSize: 11, color: '#888', fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.5px',
      margin: '0 0 4px',
    },
    levelName: {
      fontSize: 20, fontWeight: 800,
      color: COLORS.violet, margin: '0 0 8px',
    },
    xpBarBg: {
      background: COLORS.violetClair,
      borderRadius: 20, height: 10, overflow: 'hidden',
    },
    xpBarFill: {
      background: COLORS.violet,
      height: '100%', borderRadius: 20,
      width: xpAnim + '%',
      transition: 'width 1s ease',
    },
    xpLabel: { fontSize: 11, color: '#888', margin: '4px 0 0' },
    section: { padding: '16px 16px 0' },
    sectionTitle: {
      fontSize: 13, fontWeight: 800, color: COLORS.violet,
      textTransform: 'uppercase', letterSpacing: '0.5px',
      margin: '0 0 12px',
    },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 },
    statCard: {
      background: '#fff', borderRadius: 14, padding: 12,
      textAlign: 'center',
    },
    statIcon: { fontSize: 22, marginBottom: 4 },
    statVal: { fontSize: 22, fontWeight: 800, color: COLORS.violet, lineHeight: 1 },
    statLbl: { fontSize: 10, color: '#888', fontWeight: 600, marginTop: 2 },
    badgesGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 },
    badgeItem: (obtenu) => ({
      background: '#fff', borderRadius: 14, padding: '10px 6px',
      textAlign: 'center',
      opacity: obtenu ? 1 : 0.35,
      filter: obtenu ? 'none' : 'grayscale(1)',
    }),
    badgeIcon: { fontSize: 26 },
    badgeName: {
      fontSize: 9, fontWeight: 700, color: COLORS.violet,
      marginTop: 4, lineHeight: 1.2,
    },
    progList: { display: 'flex', flexDirection: 'column', gap: 10 },
    progRow: {
      background: '#fff', borderRadius: 14, padding: '12px 14px',
    },
    progHeader: {
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', marginBottom: 6,
    },
    progMatiere: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700 },
    progDot: (couleur) => ({
      width: 10, height: 10, borderRadius: '50%',
      background: couleur, flexShrink: 0,
    }),
    progPct: { fontSize: 12, fontWeight: 700, color: '#888' },
    progBg: { background: COLORS.violetClair, borderRadius: 20, height: 8, overflow: 'hidden' },
    progFill: (couleur, pct) => ({
      background: couleur, height: '100%',
      borderRadius: 20, width: pct + '%',
    }),
    streakCard: {
      background: COLORS.violet, borderRadius: 16, padding: 16,
      display: 'flex', alignItems: 'center', gap: 14,
      marginBottom: 24,
    },
    streakVal: { fontSize: 28, fontWeight: 800, color: COLORS.or, lineHeight: 1 },
    streakLbl: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginTop: 2 },
    streakDays: { display: 'flex', gap: 6 },
    dayDot: (fait) => ({
      width: 28, height: 28, borderRadius: '50%',
      background: fait ? COLORS.or : 'rgba(255,255,255,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 9, fontWeight: 700,
      color: fait ? COLORS.violet : '#fff',
    }),
    btnRetour: {
      display: 'block', width: 'calc(100% - 32px)',
      margin: '0 16px 24px', padding: '14px',
      background: COLORS.violet, color: '#fff',
      border: 'none', borderRadius: 14,
      fontSize: 15, fontWeight: 800, cursor: 'pointer',
    },
  };

  return (
    <div style={styles.page}>

      <div style={styles.topbar}>
        <div style={styles.topbarLeft}>
          <div style={styles.avatar}>{data.prenom.charAt(0).toUpperCase()}</div>
          <div>
            <div style={styles.prenom}>{data.prenom}</div>
            <span style={styles.niveauPill}>Niveau {data.niveau + 1}</span>
          </div>
        </div>
        <div style={styles.xpBadge}>
          <span>★</span> {data.xp} XP
        </div>
      </div>

      <div style={styles.hero}>
        <div style={styles.lionZone}>
          <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
            <ellipse cx="45" cy="95" rx="28" ry="12" fill="#EEEDFE"/>
            <rect x="30" y="70" width="8" height="28" rx="4" fill="#FAC775"/>
            <rect x="52" y="70" width="8" height="28" rx="4" fill="#FAC775"/>
            <ellipse cx="45" cy="55" rx="26" ry="24" fill="#FAC775"/>
            <ellipse cx="45" cy="55" rx="18" ry="17" fill="#F5A623"/>
            <ellipse cx="37" cy="52" rx="5" ry="5.5" fill="white"/>
            <ellipse cx="53" cy="52" rx="5" ry="5.5" fill="white"/>
            <circle cx="37" cy="53" r="3" fill="#3C3489"/>
            <circle cx="53" cy="53" r="3" fill="#3C3489"/>
            <circle cx="38" cy="52" r="1" fill="white"/>
            <circle cx="54" cy="52" r="1" fill="white"/>
            <ellipse cx="45" cy="62" rx="6" ry="4" fill="#E8901A"/>
            <ellipse cx="45" cy="63" rx="4" ry="2.5" fill="#cc7010"/>
            <rect x="28" y="68" width="34" height="22" rx="6" fill="#F5A623"/>
            <rect x="31" y="71" width="28" height="16" rx="4" fill="#534AB7"/>
            <text x="45" y="83" textAnchor="middle" fontSize="9" fontWeight="800" fill="#FAC775">CE2</text>
            <ellipse cx="19" cy="50" rx="10" ry="8" fill="#FAC775"/>
            <ellipse cx="71" cy="50" rx="10" ry="8" fill="#FAC775"/>
            <path d="M25 35 Q45 15 65 35" stroke="#E8901A" strokeWidth="14" strokeLinecap="round" fill="none"/>
            <path d="M22 38 Q45 10 68 38" stroke="#FAC775" strokeWidth="8" strokeLinecap="round" fill="none"/>
          </svg>
          <div style={styles.levelCard}>
            <p style={styles.levelTitle}>Mon niveau</p>
            <p style={styles.levelName}>{nomNiveau}</p>
            <div style={styles.xpBarBg}><div style={styles.xpBarFill} /></div>
            <p style={styles.xpLabel}>{data.xp} / {data.xpMax} XP pour Niveau {data.niveau + 2}</p>
          </div>
        </div>
      </div>

      <div style={{ ...styles.section, marginTop: 16 }}>
        <p style={styles.sectionTitle}>Mes statistiques</p>
        <div style={styles.statsGrid}>
          {[
            { icon: '📚', val: data.stats.lecons, lbl: 'Lecons' },
            { icon: '✅', val: data.stats.exercices, lbl: 'Exercices' },
            { icon: '🏆', val: data.stats.badges, lbl: 'Badges' },
          ].map((s) => (
            <div key={s.lbl} style={styles.statCard}>
              <div style={styles.statIcon}>{s.icon}</div>
              <div style={styles.statVal}>{s.val}</div>
              <div style={styles.statLbl}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...styles.section, marginTop: 16 }}>
        <p style={styles.sectionTitle}>Mes badges</p>
        <div style={styles.badgesGrid}>
          {badgesAffichage.map((b) => (
            <div key={b.nom} style={styles.badgeItem(b.obtenu)}>
              <div style={styles.badgeIcon}>{b.icone}</div>
              <div style={styles.badgeName}>{b.nom}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...styles.section, marginTop: 16 }}>
        <p style={styles.sectionTitle}>Ma progression</p>
        <div style={styles.progList}>
          {[
            { nom: 'Mathématiques',      couleur: COLORS.maths,     pct: data.progression.maths },
            { nom: 'Français',           couleur: COLORS.francais,  pct: data.progression.francais },
            { nom: 'Éveil scientifique', couleur: COLORS.eveil,     pct: data.progression.eveil },
            { nom: 'Histoire-Géo',       couleur: COLORS.histgeo,   pct: data.progression.histgeo },
            { nom: 'Éd. civique',        couleur: COLORS.edcivique, pct: data.progression.edcivique },
          ].map((m) => (
            <div key={m.nom} style={styles.progRow}>
              <div style={styles.progHeader}>
                <div style={styles.progMatiere}>
                  <div style={styles.progDot(m.couleur)} />
                  {m.nom}
                </div>
                <div style={styles.progPct}>{m.pct}%</div>
              </div>
              <div style={styles.progBg}>
                <div style={styles.progFill(m.couleur, m.pct)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...styles.section, marginTop: 16 }}>
        <p style={styles.sectionTitle}>Ma serie</p>
        <div style={styles.streakCard}>
          <div style={{ fontSize: 36 }}>🔥</div>
          <div style={{ flex: 1 }}>
            <div style={styles.streakVal}>{data.serie} jour{data.serie > 1 ? 's' : ''}</div>
            <div style={styles.streakLbl}>{data.serie > 0 ? 'de révision continue !' : 'Commence ta série !'}</div>
          </div>
          <div style={styles.streakDays}>
            {JOURS.map((j, i) => (
              <div key={i} style={styles.dayDot(data.joursRevises[i])}>{j}</div>
            ))}
          </div>
        </div>
      </div>

      {onRetour && (
        <button style={styles.btnRetour} onClick={onRetour}>
          Continuer a reviser
        </button>
      )}

    </div>
  );
}