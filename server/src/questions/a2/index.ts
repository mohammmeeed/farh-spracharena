import { BankQuestion } from '../questionTypes.js';

/**
 * A2 Level Question Bank - Farh SprachArena
 * Exactly 175 Questions categorized by the 6 Canonical Categories:
 * - Grammatik & Satzbau
 * - Wortschatz & Synonyme
 * - Alltag & Konversation
 * - Reisen & Mobilität
 * - Arbeit & Beruf
 * - Gesundheit & Ernährung
 */
export const A2_QUESTIONS: BankQuestion[] = [
  {
    "id": "A2-SA-0001",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich ___ gestern Abend lange ferngesehen.",
    "options": [
      "habe",
      "bin",
      "werde",
      "hatte"
    ],
    "correctAnswer": "habe",
    "explanation": "Das Verb \"fernsehen\" bildet das Perfekt mit dem Hilfsverb haben: \"ich habe ferngesehen\".",
    "tags": [
      "Perfekt",
      "Verben",
      "Vergangenheit",
      "Perfekt mit haben",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0002",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wir ___ am Wochenende mit dem Zug nach München gefahren.",
    "options": [
      "sind",
      "haben",
      "waren",
      "wurden"
    ],
    "correctAnswer": "sind",
    "explanation": "Verben der Ortsveränderung (fahren, gehen, fliegen, reisen) bilden das Perfekt mit sein.",
    "tags": [
      "Perfekt",
      "Ortsveränderung",
      "sein",
      "Perfekt mit sein",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0003",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Gestern war ich krank, deshalb ___ ich nicht zur Arbeit gehen.",
    "options": [
      "konnte",
      "kann",
      "könnte",
      "gekonnt"
    ],
    "correctAnswer": "konnte",
    "explanation": "Im Präteritum lautet die 1. Person Singular von können: \"ich konnte\".",
    "tags": [
      "Modalverben",
      "Präteritum",
      "Arbeit",
      "Modalverben im Präteritum",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0004",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Thomas bleibt heute zu Hause, weil er sich erkältet ___ .",
    "options": [
      "hat",
      "ist",
      "haben",
      "wird"
    ],
    "correctAnswer": "hat",
    "explanation": "In einem Nebensatz mit der Kausal-Konjunktion \"weil\" steht das finite Verb ganz am Ende.",
    "tags": [
      "Nebensätze",
      "weil",
      "Verbposition",
      "Nebensätze mit weil",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0005",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Lehrerin freut sich, dass alle Schüler pünktlich gekommen ___ .",
    "options": [
      "sind",
      "haben",
      "waren",
      "werden"
    ],
    "correctAnswer": "sind",
    "explanation": "Im Nebensatz mit \"dass\" steht das finite Hilfsverb (\"sind\" für kommen) am Satzende.",
    "tags": [
      "Nebensätze",
      "dass",
      "Perfekt",
      "Nebensätze mit dass",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0006",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Er stellt das neue Bild an ___ Wand.",
    "options": [
      "die",
      "der",
      "den",
      "dem"
    ],
    "correctAnswer": "die",
    "explanation": "Richtung / Ziel einer Handlung (Wohin?) verlangt bei Wechselpräpositionen den Akkusativ: \"an die Wand\" (feminin).",
    "tags": [
      "Wechselpräpositionen",
      "Akkusativ",
      "Wohin",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0007",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Das Bild hängt jetzt schon seit zwei Wochen an ___ Wand.",
    "options": [
      "der",
      "die",
      "den",
      "dem"
    ],
    "correctAnswer": "der",
    "explanation": "Lage / Ort (Wo?) verlangt bei Wechselpräpositionen den Dativ: \"an der Wand\" (feminin: die -> der).",
    "tags": [
      "Wechselpräpositionen",
      "Dativ",
      "Wo",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0008",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Ein ICE-Zug fährt ___ als ein normales Regionalauto.",
    "options": [
      "schneller",
      "schnellste",
      "am schnellsten",
      "schnell"
    ],
    "correctAnswer": "schneller",
    "explanation": "Für den Vergleich zweier Dinge mit \"als\" wird der Komparativ mit der Endung -er verwendet.",
    "tags": [
      "Komparativ",
      "Vergleich",
      "Adjektive",
      "Komparativ & Superlativ",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0009",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Mount Everest ist der ___ Berg der ganzen Welt.",
    "options": [
      "höchste",
      "hohe",
      "höher",
      "höchster"
    ],
    "correctAnswer": "höchste",
    "explanation": "Der Superlativ von \"hoch\" vor einem maskulinen Nomen mit bestimmtem Artikel lautet \"der höchste\".",
    "tags": [
      "Superlativ",
      "Adjektive",
      "Deklination",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0010",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich muss mich nach dem langen Sportunterricht erst einmal ___ .",
    "options": [
      "ausruhen",
      "ausruht",
      "ausruhe",
      "ausgeruht"
    ],
    "correctAnswer": "ausruhen",
    "explanation": "Nach dem Modalverb \"muss\" steht das reflexive Verb im Infinitiv am Satzende (\"sich ausruhen\").",
    "tags": [
      "Reflexive Verben",
      "Modalverben",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0011",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Freust du ___ schon auf deinen nächsten Sommerurlaub?",
    "options": [
      "dich",
      "dir",
      "sich",
      "mich"
    ],
    "correctAnswer": "dich",
    "explanation": "Das Verb \"sich freuen\" verlangt das Reflexivpronomen im Akkusativ: \"du freust dich\".",
    "tags": [
      "Reflexivpronomen",
      "Akkusativ",
      "Reisen",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0012",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wenn das Wetter morgen schön ist, ___ wir einen Ausflug an den See.",
    "options": [
      "machen",
      "wir machen",
      "gemacht",
      "machten"
    ],
    "correctAnswer": "machen",
    "explanation": "Wenn der Nebensatz vorangestellt ist, beginnt der folgende Hauptsatz sofort mit dem Verb (Position 1 im Hauptsatz).",
    "tags": [
      "Nebensätze",
      "wenn",
      "Inversion",
      "Konditionalsätze mit wenn",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0013",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "___ ich ein Kind war, habe ich viel auf der Straße gespielt.",
    "options": [
      "Als",
      "Wenn",
      "Wann",
      "Weil"
    ],
    "correctAnswer": "Als",
    "explanation": "\"Als\" verwendet man für ein einmaliges Ereignis oder einen zusammenhängenden Zeitraum in der Vergangenheit.",
    "tags": [
      "Temporalsätze",
      "als-wenn",
      "Vergangenheit",
      "Temporalsätze mit als",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0014",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich habe heute überhaupt keine Lust, die Wohnung ___ .",
    "options": [
      "aufzuräumen",
      "aufräumen",
      "zu aufräumen",
      "aufgeräumt"
    ],
    "correctAnswer": "aufzuräumen",
    "explanation": "Bei trennbaren Verben wird \"zu\" zwischen Vorsilbe und Verbstamm eingefügt: \"auf-zu-räumen\".",
    "tags": [
      "Infinitiv mit zu",
      "Trennbare Verben",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0015",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Er kauft sich einen ___ Pullover für den kalten Winter.",
    "options": [
      "warmen",
      "warmer",
      "warmes",
      "warme"
    ],
    "correctAnswer": "warmen",
    "explanation": "Maskulines Nomen im Akkusativ nach unbestimmtem Artikel erhält die Adjektivendung -en (\"einen warmen Pullover\").",
    "tags": [
      "Adjektivdeklination",
      "Akkusativ",
      "Kleidung",
      "Adjektivdeklination Akkusativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0016",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Sie wohnt in einer sehr ___ Wohnung mitten im Zentrum.",
    "options": [
      "schönen",
      "schöne",
      "schöner",
      "schönes"
    ],
    "correctAnswer": "schönen",
    "explanation": "Im Dativ enden Adjektive nach bestimmtem oder unbestimmtem Artikel immer auf -en (\"in einer schönen Wohnung\").",
    "tags": [
      "Adjektivdeklination",
      "Dativ",
      "Wohnen",
      "Adjektivdeklination Dativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0017",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Letztes Jahr ___ wir im Sommer zwei Wochen in Italien.",
    "options": [
      "waren",
      "hatten",
      "sind",
      "wurden"
    ],
    "correctAnswer": "waren",
    "explanation": "Präteritum 1. Person Plural von sein lautet \"wir waren\".",
    "tags": [
      "Präteritum",
      "Reisen",
      "Präteritum sein/haben",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0018",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Als Student ___ ich leider nicht viel Geld.",
    "options": [
      "hatte",
      "habe",
      "hätte",
      "hattest"
    ],
    "correctAnswer": "hatte",
    "explanation": "Präteritum 1. Person Singular von haben lautet \"ich hatte\".",
    "tags": [
      "Präteritum",
      "haben",
      "Präteritum haben",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0019",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Im nächsten Monat ___ mein Kollege eine neue Stelle anfangen.",
    "options": [
      "wird",
      "werde",
      "werden",
      "wirst"
    ],
    "correctAnswer": "wird",
    "explanation": "Das Hilfsverb \"werden\" in der 3. Person Singular (\"er / mein Kollege\") lautet \"wird\".",
    "tags": [
      "Futur",
      "Zukunft",
      "Arbeit",
      "Futur I mit werden",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0020",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich gehe heute nach der Arbeit ___ meiner Ärztin.",
    "options": [
      "zu",
      "bei",
      "nach",
      "an"
    ],
    "correctAnswer": "zu",
    "explanation": "Wenn man zu Personen oder Institutionen geht, verwendet man \"zu\" + Dativ (\"zu meiner Ärztin\").",
    "tags": [
      "Präpositionen",
      "Dativ",
      "Gesundheit",
      "Präpositionen mit Dativ",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0021",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Er wohnt schon seit ___ Jahr in dieser wunderschönen Stadt.",
    "options": [
      "einem",
      "einen",
      "eines",
      "einer"
    ],
    "correctAnswer": "einem",
    "explanation": "\"Seit\" verlangt immer Dativ: \"das Jahr\" (neutral) wird im Dativ zu \"einem Jahr\".",
    "tags": [
      "Präpositionen",
      "Dativ",
      "Zeit",
      "Präpositionen mit Dativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0022",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wir spazieren am Nachmittag durch ___ grünen Park.",
    "options": [
      "den",
      "dem",
      "der",
      "des"
    ],
    "correctAnswer": "den",
    "explanation": "Die Präposition \"durch\" steht immer mit dem Akkusativ (\"durch den grünen Park\").",
    "tags": [
      "Präpositionen",
      "Akkusativ",
      "Präpositionen mit Akkusativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0023",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Dieses schöne Geschenk ist ___ meine liebe Großmutter.",
    "options": [
      "für",
      "von",
      "zu",
      "mit"
    ],
    "correctAnswer": "für",
    "explanation": "\"für\" verlangt den Akkusativ und drückt den Empfänger/Zweck aus (\"für meine Großmutter\").",
    "tags": [
      "Präpositionen",
      "Akkusativ",
      "Präpositionen mit Akkusativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0024",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Es regnet in Strömen, ___ gehen wir ohne Schirm spazieren.",
    "options": [
      "trotzdem",
      "deshalb",
      "weil",
      "denn"
    ],
    "correctAnswer": "trotzdem",
    "explanation": "\"trotzdem\" drückt einen unerwarteten Gegensatz aus (Konzessiv-Adverb) und steht vor dem Verb (\"trotzdem gehen wir\").",
    "tags": [
      "Konnektoren",
      "trotzdem",
      "Adverbien",
      "Konnektoren deshalb / trotzdem",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0025",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Er hat viel gelernt, ___ hat er die Deutschprüfung bestanden.",
    "options": [
      "deshalb",
      "weil",
      "obwohl",
      "dass"
    ],
    "correctAnswer": "deshalb",
    "explanation": "\"deshalb\" drückt eine logische Folge aus und zieht das Verb an Position 2 (\"deshalb hat er\").",
    "tags": [
      "Konnektoren",
      "deshalb",
      "Folge",
      "Konnektoren deshalb",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0026",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich trinke keinen Kaffee, ___ ich mag lieber Pfefferminztee.",
    "options": [
      "denn",
      "weil",
      "deshalb",
      "trotzdem"
    ],
    "correctAnswer": "denn",
    "explanation": "\"denn\" steht auf Position 0 und verändert die normale Hauptsatz-Wortstellung nicht (\"denn ich mag...\").",
    "tags": [
      "Konnektoren",
      "denn",
      "Hauptsatz",
      "Konnektoren denn vs weil",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0027",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Du hast hohes Fieber. Du ___ unbedingt zum Arzt gehen.",
    "options": [
      "solltest",
      "musstest",
      "wolltest",
      "durftest"
    ],
    "correctAnswer": "solltest",
    "explanation": "\"solltest\" (Konjunktiv II von sollen) wird für höfliche Ratschläge und Empfehlungen genutzt.",
    "tags": [
      "Gesundheit",
      "Ratschläge",
      "Konjunktiv",
      "Gesundheit & Ratschläge",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0028",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Entschuldigung, ___ Sie mir bitte sagen, wo der Bahnhof ist?",
    "options": [
      "könnten",
      "konnten",
      "können Sie",
      "kann"
    ],
    "correctAnswer": "könnten",
    "explanation": "\"Könnten Sie...?\" ist die typische, sehr höfliche Form für Anfragen im Alltag.",
    "tags": [
      "Höflichkeit",
      "Alltag",
      "Höfliche Bitten",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0029",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Passt es Ihnen am Donnerstag um 15 Uhr? — Ja, das ___ mir sehr gut.",
    "options": [
      "passt",
      "steht",
      "geht",
      "sieht"
    ],
    "correctAnswer": "passt",
    "explanation": "Die idiomatische Redewendung für Termine lautet: \"Das passt mir gut\".",
    "tags": [
      "Termine",
      "Kommunikation",
      "Arbeit",
      "Termine vereinbaren",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0030",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Praxis von Dr. Farh ist montags ___ 8:00 bis 16:00 Uhr geöffnet.",
    "options": [
      "von",
      "ab",
      "seit",
      "um"
    ],
    "correctAnswer": "von",
    "explanation": "Zeitspannen werden mit dem Paar \"von ... bis\" ausgedrückt.",
    "tags": [
      "Zeit",
      "Termine",
      "Präpositionen",
      "Präposition von... bis / ab",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0031",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Können Sie mir sagen, ___ der Bus nach Berlin schon abgefahren ist?",
    "options": [
      "ob",
      "wann",
      "dass",
      "weil"
    ],
    "correctAnswer": "ob",
    "explanation": "Bei indirekten Ja/Nein-Fragen leitet man den Nebensatz mit \"ob\" ein (Verb am Ende).",
    "tags": [
      "Indirekte Fragen",
      "ob",
      "Verkehr",
      "Indirekte Fragesätze mit ob",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0032",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Nomen mit der Endung \"-ung\" (wie die Wohnung, die Rechnung) sind immer ___ .",
    "options": [
      "feminin (die)",
      "maskulin (der)",
      "neutral (das)",
      "Plural"
    ],
    "correctAnswer": "feminin (die)",
    "explanation": "Substantive mit den Suffixen -ung, -heit, -keit, -schaft sind immer feminin (die).",
    "tags": [
      "Grammatik",
      "Artikelregeln",
      "Nomen",
      "Wortbildung Nomen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0033",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Miete beträgt 600 Euro im Monat ___ Nebenkosten (Strom, Heizung).",
    "options": [
      "zuzüglich / plus",
      "ohne alles",
      "kostenlos",
      "billig"
    ],
    "correctAnswer": "zuzüglich / plus",
    "explanation": "In Wohnungsanzeigen unterscheidet man Kaltmiete und Warmmiete zuzüglich (plus) Nebenkosten.",
    "tags": [
      "Wohnen",
      "Alltag",
      "Wohnungsanzeigen",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0034",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Jacke ist leider zu eng. Kann ich sie gegen eine größere Nummer ___ ?",
    "options": [
      "umtauschen",
      "einkaufen",
      "verkaufen",
      "bezahlen"
    ],
    "correctAnswer": "umtauschen",
    "explanation": "\"umtauschen\" bedeutet, eine gekaufte Ware im Geschäft gegen eine andere zu wechseln.",
    "tags": [
      "Einkaufen",
      "Reklamation",
      "Reklamation & Kleidung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0035",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wie lautet die passende förmliche Grußformel am Ende eines geschäftlichen Briefes?",
    "options": [
      "Mit freundlichen Grüßen",
      "Tschüss und bis bald",
      "Liebe Grüße",
      "Machs gut"
    ],
    "correctAnswer": "Mit freundlichen Grüßen",
    "explanation": "In formellen Briefen und beruflichen E-Mails schließt man standardmäßig mit \"Mit freundlichen Grüßen\".",
    "tags": [
      "Schreiben",
      "Höflichkeit",
      "Brief",
      "Briefe & E-Mails",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SR-0001",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz im Perfekt:",
    "words": [
      "Ich",
      "gestern",
      "einen spannenden Film",
      "habe",
      "gesehen."
    ],
    "correctOrder": [
      "Ich",
      "habe",
      "gestern",
      "einen spannenden Film",
      "gesehen."
    ],
    "correctAnswer": [
      "Ich",
      "habe",
      "gestern",
      "einen spannenden Film",
      "gesehen."
    ],
    "explanation": "Hilfsverb \"habe\" steht an Position 2, das Partizip II \"gesehen\" schließt die Satzklammer am Ende.",
    "tags": [
      "Perfekt",
      "Satzklammer",
      "Perfekt Satzklammer",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0002",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Nebensatz mit \"weil\":",
    "words": [
      "Er lernt Deutsch,",
      "weil",
      "er in Deutschland",
      "arbeiten",
      "möchte."
    ],
    "correctOrder": [
      "Er lernt Deutsch,",
      "weil",
      "er in Deutschland",
      "arbeiten",
      "möchte."
    ],
    "correctAnswer": [
      "Er lernt Deutsch,",
      "weil",
      "er in Deutschland",
      "arbeiten",
      "möchte."
    ],
    "explanation": "Im weil-Satz steht der Infinitiv vor dem finiten Modalverb (\"arbeiten möchte\") am Satzende.",
    "tags": [
      "Nebensätze",
      "weil",
      "Modalverben",
      "Kausalsatz mit weil",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0003",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bringe den Wenn-Satz in die richtige Reihenfolge:",
    "words": [
      "Wenn du Zeit hast,",
      "können",
      "wir",
      "ins Kino",
      "gehen."
    ],
    "correctOrder": [
      "Wenn du Zeit hast,",
      "können",
      "wir",
      "ins Kino",
      "gehen."
    ],
    "correctAnswer": [
      "Wenn du Zeit hast,",
      "können",
      "wir",
      "ins Kino",
      "gehen."
    ],
    "explanation": "Nach dem vorgeschalteten Nebensatz folgt im Hauptsatz sofort das finite Verb auf Position 1.",
    "tags": [
      "Konditionalsatz",
      "wenn",
      "Inversion",
      "Konditionalsatz mit wenn",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0004",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die Infinitivkonstruktion mit \"zu\":",
    "words": [
      "Es ist wichtig,",
      "jeden Tag",
      "neue Vokabeln",
      "zu wiederholen."
    ],
    "correctOrder": [
      "Es ist wichtig,",
      "jeden Tag",
      "neue Vokabeln",
      "zu wiederholen."
    ],
    "correctAnswer": [
      "Es ist wichtig,",
      "jeden Tag",
      "neue Vokabeln",
      "zu wiederholen."
    ],
    "explanation": "Die Infinitivgruppe schließt mit \"zu\" + Infinitiv am Satzende ab.",
    "tags": [
      "Infinitiv mit zu",
      "Satzbau",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0005",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit dem reflexiven Verb:",
    "words": [
      "Wir",
      "freuen",
      "uns",
      "sehr auf das Wochenende."
    ],
    "correctOrder": [
      "Wir",
      "freuen",
      "uns",
      "sehr auf das Wochenende."
    ],
    "correctAnswer": [
      "Wir",
      "freuen",
      "uns",
      "sehr auf das Wochenende."
    ],
    "explanation": "Subjekt (Wir) -> finites Verb (freuen) -> Reflexivpronomen (uns) -> präpositionales Objekt.",
    "tags": [
      "Reflexive Verben",
      "Satzbau",
      "Reflexive Verben im Satz",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-SR-0006",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit \"dass\":",
    "words": [
      "Ich weiß genau,",
      "dass",
      "Farh",
      "ein hervorragender Lehrer",
      "ist."
    ],
    "correctOrder": [
      "Ich weiß genau,",
      "dass",
      "Farh",
      "ein hervorragender Lehrer",
      "ist."
    ],
    "correctAnswer": [
      "Ich weiß genau,",
      "dass",
      "Farh",
      "ein hervorragender Lehrer",
      "ist."
    ],
    "explanation": "Im dass-Satz steht das finite Verb \"ist\" ganz am Ende.",
    "tags": [
      "Nebensätze",
      "dass",
      "Dass-Sätze",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0007",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit Konsekutiv-Konnektor \"deshalb\":",
    "words": [
      "Er war müde,",
      "deshalb",
      "ging",
      "er",
      "früh ins Bett."
    ],
    "correctOrder": [
      "Er war müde,",
      "deshalb",
      "ging",
      "er",
      "früh ins Bett."
    ],
    "correctAnswer": [
      "Er war müde,",
      "deshalb",
      "ging",
      "er",
      "früh ins Bett."
    ],
    "explanation": "\"deshalb\" besetzt Position 1 des Hauptsatzes, danach folgt direkt das Prädikat \"ging\".",
    "tags": [
      "Konnektoren",
      "deshalb",
      "Präteritum",
      "Konnektor deshalb",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0008",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit der temporalen Konjunktion \"als\":",
    "words": [
      "Als ich nach Deutschland kam,",
      "konnte",
      "ich",
      "kein Deutsch",
      "sprechen."
    ],
    "correctOrder": [
      "Als ich nach Deutschland kam,",
      "konnte",
      "ich",
      "kein Deutsch",
      "sprechen."
    ],
    "correctAnswer": [
      "Als ich nach Deutschland kam,",
      "konnte",
      "ich",
      "kein Deutsch",
      "sprechen."
    ],
    "explanation": "Nebensatz mit \"als\" vorangestellt -> Hauptsatz beginnt mit Modalverb \"konnte\", Infinitiv \"sprechen\" am Ende.",
    "tags": [
      "Temporalsätze",
      "als",
      "Modalverben",
      "Temporalsatz mit als",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 30
  },
  {
    "id": "A2-SR-0009",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die höfliche indirekte Frage:",
    "words": [
      "Können Sie mir sagen,",
      "wann",
      "der nächste Zug",
      "abfährt",
      "?"
    ],
    "correctOrder": [
      "Können Sie mir sagen,",
      "wann",
      "der nächste Zug",
      "abfährt",
      "?"
    ],
    "correctAnswer": [
      "Können Sie mir sagen,",
      "wann",
      "der nächste Zug",
      "abfährt",
      "?"
    ],
    "explanation": "In der indirekten Frage wandert das trennbare Verb in einem Stück (\"abfährt\") ans Satzende.",
    "tags": [
      "Indirekte Fragen",
      "Verkehr",
      "Indirekte W-Frage",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0010",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Ordne die Satzglieder nach der TeKaMoLo-Regel (Temporal vor Lokal):",
    "words": [
      "Wir fahren",
      "am Wochenende",
      "mit dem Zug",
      "nach Hamburg."
    ],
    "correctOrder": [
      "Wir fahren",
      "am Wochenende",
      "mit dem Zug",
      "nach Hamburg."
    ],
    "correctAnswer": [
      "Wir fahren",
      "am Wochenende",
      "mit dem Zug",
      "nach Hamburg."
    ],
    "explanation": "Reihenfolge der Angaben im Deutschen: Temporal (am Wochenende) -> Modal (mit dem Zug) -> Lokal (nach Hamburg).",
    "tags": [
      "TeKaMoLo",
      "Satzglieder",
      "Reisen",
      "Präpositionalphrase TeKaMoLo",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0011",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz in der Zukunftsform (Futur I):",
    "words": [
      "Nächste Woche",
      "werden",
      "wir",
      "eine schwere Prüfung",
      "schreiben."
    ],
    "correctOrder": [
      "Nächste Woche",
      "werden",
      "wir",
      "eine schwere Prüfung",
      "schreiben."
    ],
    "correctAnswer": [
      "Nächste Woche",
      "werden",
      "wir",
      "eine schwere Prüfung",
      "schreiben."
    ],
    "explanation": "Hilfsverb \"werden\" auf Pos. 2, Vollverb-Infinitiv \"schreiben\" ganz am Satzende.",
    "tags": [
      "Futur",
      "Satzbau",
      "Futur I Satzbau",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0012",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die Erklärung beim Arztbesuch:",
    "words": [
      "Seit gestern",
      "habe",
      "ich",
      "starke Halsschmerzen."
    ],
    "correctOrder": [
      "Seit gestern",
      "habe",
      "ich",
      "starke Halsschmerzen."
    ],
    "correctAnswer": [
      "Seit gestern",
      "habe",
      "ich",
      "starke Halsschmerzen."
    ],
    "explanation": "Temporaladverbial \"Seit gestern\" auf Pos. 1, finites Verb \"habe\" auf Pos. 2, Subjekt \"ich\" auf Pos. 3.",
    "tags": [
      "Gesundheit",
      "Arzt",
      "Inversion",
      "Arztbesuch Dialog",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-SR-0013",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Nebensatz mit \"obwohl\":",
    "words": [
      "Er geht spazieren,",
      "obwohl",
      "es",
      "sehr stark",
      "regnet."
    ],
    "correctOrder": [
      "Er geht spazieren,",
      "obwohl",
      "es",
      "sehr stark",
      "regnet."
    ],
    "correctAnswer": [
      "Er geht spazieren,",
      "obwohl",
      "es",
      "sehr stark",
      "regnet."
    ],
    "explanation": "Im Nebensatz mit der Konjunktion \"obwohl\" steht das konjugierte Verb \"regnet\" am Ende.",
    "tags": [
      "Nebensätze",
      "obwohl",
      "Konnektor obwohl",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0014",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den korrekten Vergleichssatz:",
    "words": [
      "Mein Bruder",
      "ist",
      "zwei Jahre",
      "älter",
      "als ich."
    ],
    "correctOrder": [
      "Mein Bruder",
      "ist",
      "zwei Jahre",
      "älter",
      "als ich."
    ],
    "correctAnswer": [
      "Mein Bruder",
      "ist",
      "zwei Jahre",
      "älter",
      "als ich."
    ],
    "explanation": "Komparativ \"älter\" steht vor der Vergleichspartikel \"als\".",
    "tags": [
      "Komparativ",
      "Vergleich",
      "Vergleich mit als",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-SR-0015",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde eine sehr höfliche Bitte:",
    "words": [
      "Würden",
      "Sie",
      "mir bitte",
      "das Salz",
      "geben",
      "?"
    ],
    "correctOrder": [
      "Würden",
      "Sie",
      "mir bitte",
      "das Salz",
      "geben",
      "?"
    ],
    "correctAnswer": [
      "Würden",
      "Sie",
      "mir bitte",
      "das Salz",
      "geben",
      "?"
    ],
    "explanation": "\"Würden\" an Position 1 leitet die höfliche Frage ein, der Infinitiv \"geben\" steht am Schluss.",
    "tags": [
      "Höflichkeit",
      "Konjunktiv II",
      "Höfliche Bitte mit Konjunktiv II",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-WD-0001",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Medikament",
    "focusWord": "das Medikament",
    "question": "Was bedeutet \"das Medikament\" und wie lautet der Plural?",
    "options": [
      "Medicine / Drug -> die Medikamente",
      "Doctor -> die Ärzte",
      "Hospital -> die Krankenhäuser",
      "Pain -> die Schmerzen"
    ],
    "correctAnswer": "Medicine / Drug -> die Medikamente",
    "explanation": "Das Medikament = medicine/medication, Plural: die Medikamente.",
    "tags": [
      "Gesundheit",
      "Wortschatz",
      "Gesundheit & Medizin",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0002",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Verspätung",
    "focusWord": "die Verspätung",
    "question": "Was bedeutet die Durchsage \"Der Zug hat 15 Minuten Verspätung\"?",
    "options": [
      "The train is delayed by 15 minutes",
      "The train is canceled",
      "The train arrives 15 minutes earlier",
      "The train is fully booked"
    ],
    "correctAnswer": "The train is delayed by 15 minutes",
    "explanation": "\"Die Verspätung\" bedeutet Verzögerung / delay.",
    "tags": [
      "Reisen",
      "Verkehr",
      "Bahn",
      "Reisen & Bahnhof",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0003",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Bewerbung",
    "focusWord": "die Bewerbung",
    "question": "Was ist \"die Bewerbung\"?",
    "options": [
      "Job application",
      "Employment contract (der Arbeitsvertrag)",
      "Salary (das Gehalt)",
      "Resignation (die Kündigung)"
    ],
    "correctAnswer": "Job application",
    "explanation": "\"Die Bewerbung\" sind Anschreiben und Lebenslauf zur Erlangung einer Stelle.",
    "tags": [
      "Arbeit",
      "Beruf",
      "Arbeitswelt",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0004",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Gehalt",
    "focusWord": "das Gehalt",
    "question": "Was bedeutet \"das Gehalt\"?",
    "options": [
      "Salary / Monthly wage",
      "Working hours (die Arbeitszeit)",
      "Boss (der Chef)",
      "Colleague (der Kollege)"
    ],
    "correctAnswer": "Salary / Monthly wage",
    "explanation": "Das Gehalt ist die monatliche Bezahlung für Angestellte.",
    "tags": [
      "Arbeit",
      "Finanzen",
      "Arbeit & Gehalt",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0005",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Nebenkosten",
    "focusWord": "die Nebenkosten",
    "question": "Was sind bei einer Mietwohnung \"die Nebenkosten\"?",
    "options": [
      "Utility costs (water, heating, trash collection)",
      "The deposit (die Kaution)",
      "The furniture price",
      "The agency commission"
    ],
    "correctAnswer": "Utility costs (water, heating, trash collection)",
    "explanation": "Nebenkosten umfassen laufende Betriebskosten wie Heizung, Wasser und Müllabfuhr.",
    "tags": [
      "Wohnen",
      "Miete",
      "Wohnen & Umgebung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0006",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Unterkunft",
    "focusWord": "die Unterkunft",
    "question": "Was bedeutet \"die Unterkunft\" auf Reisen?",
    "options": [
      "Accommodation / Lodging",
      "Flight ticket (das Flugticket)",
      "Luggage (das Gepäck)",
      "Sightseeing tour"
    ],
    "correctAnswer": "Accommodation / Lodging",
    "explanation": "Die Unterkunft ist der Ort, an dem man übernachtet (Hotel, Ferienwohnung, Hostel).",
    "tags": [
      "Reisen",
      "Urlaub",
      "Urlaub & Unterkunft",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0007",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Husten",
    "focusWord": "der Husten",
    "question": "Was bedeutet das Krankheitssymptom \"der Husten\"?",
    "options": [
      "Cough",
      "Fever (das Fieber)",
      "Runny nose (der Schnupfen)",
      "Dizziness (der Schwindel)"
    ],
    "correctAnswer": "Cough",
    "explanation": "Husten = cough; Schnupfen = cold/sniffles.",
    "tags": [
      "Gesundheit",
      "Krankheit",
      "Gesundheit & Symptome",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 12
  },
  {
    "id": "A2-WD-0008",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Rezept",
    "focusWord": "das Rezept",
    "question": "Was bedeutet \"das Rezept\" im medizinischen Kontext beim Arzt?",
    "options": [
      "Doctor's prescription for medication",
      "Cooking recipe",
      "Invoice (die Rechnung)",
      "Sick note (die Krankschreibung)"
    ],
    "correctAnswer": "Doctor's prescription for medication",
    "explanation": "Beim Arzt ist das Rezept die Verschreibung von Medikamenten für die Apotheke.",
    "tags": [
      "Gesundheit",
      "Arzt",
      "Rezept & Apotheke",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0009",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Erdgeschoss",
    "focusWord": "das Erdgeschoss",
    "question": "Welches Stockwerk ist \"das Erdgeschoss (EG)\"?",
    "options": [
      "Ground floor",
      "First floor (1. Obergeschoss)",
      "Basement (das Untergeschoss / der Keller)",
      "Attic (das Dachgeschoss)"
    ],
    "correctAnswer": "Ground floor",
    "explanation": "Das Erdgeschoss (EG) ist die ebenerdige Eingangsetage.",
    "tags": [
      "Einkaufen",
      "Gebäude",
      "Kaufhaus & Etagen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0010",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Fahrkarte / das Ticket",
    "focusWord": "die Fahrkarte",
    "question": "Was bedeutet \"die Fahrkarte\"?",
    "options": [
      "Transit ticket / Fare ticket",
      "Timetable (der Fahrplan)",
      "Platform (das Gleis)",
      "Seat reservation"
    ],
    "correctAnswer": "Transit ticket / Fare ticket",
    "explanation": "Eine Fahrkarte ist der gültige Fahrschein für Bus und Bahn.",
    "tags": [
      "Verkehr",
      "Reisen",
      "Verkehr & Tickets",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 12
  },
  {
    "id": "A2-WD-0011",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "bequem",
    "focusWord": "bequem",
    "question": "Was ist das Gegenteil von \"bequem\" (comfortable)?",
    "options": [
      "unbequem (uncomfortable)",
      "gemütlich",
      "weich",
      "angenehm"
    ],
    "correctAnswer": "unbequem (uncomfortable)",
    "explanation": "Das Gegenteil von bequem ist unbequem.",
    "tags": [
      "Adjektive",
      "Antonyme",
      "Gegenteile Adjektive",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 12
  },
  {
    "id": "A2-WD-0012",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "pünktlich",
    "focusWord": "pünktlich",
    "question": "Was ist das Gegenteil von \"pünktlich\" (punctual)?",
    "options": [
      "unpünktlich / verspätet",
      "schnell",
      "fleißig",
      "höflich"
    ],
    "correctAnswer": "unpünktlich / verspätet",
    "explanation": "Wer nicht pünktlich ist, ist unpünktlich oder verspätet.",
    "tags": [
      "Adjektive",
      "Antonyme",
      "Gegenteile Adjektive",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 12
  },
  {
    "id": "A2-WD-0013",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Kreuzung",
    "focusWord": "die Kreuzung",
    "question": "Was bedeutet die Wegbeschreibung: \"Biegen Sie an der nächsten Kreuzung rechts ab\"?",
    "options": [
      "Intersection / Crossroad",
      "Traffic light (die Ampel)",
      "Roundabout (der Kreisverkehr)",
      "Bridge (die Brücke)"
    ],
    "correctAnswer": "Intersection / Crossroad",
    "explanation": "Die Kreuzung ist der Schnittpunkt von zwei oder mehr Straßen.",
    "tags": [
      "Wegbeschreibung",
      "Stadt",
      "Stadt & Orientierung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0014",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Gewitter",
    "focusWord": "das Gewitter",
    "question": "Was ist \"das Gewitter\"?",
    "options": [
      "Thunderstorm with lightning and thunder",
      "Gentle breeze",
      "Sunny day",
      "Snowfall"
    ],
    "correctAnswer": "Thunderstorm with lightning and thunder",
    "explanation": "Ein Gewitter ist ein Unwetter mit Blitz (lightning) und Donner (thunder).",
    "tags": [
      "Wetter",
      "Natur",
      "Umwelt & Wetter",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0015",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "kochen vs braten",
    "focusWord": "braten",
    "question": "Was bedeutet das Kochverb \"braten\"?",
    "options": [
      "To fry / roast in a pan",
      "To boil in water (kochen)",
      "To bake bread (backen)",
      "To cut vegetables (schneiden)"
    ],
    "correctAnswer": "To fry / roast in a pan",
    "explanation": "\"braten\" bedeutet Fleisch oder Gemüse in der Pfanne mit Fett heiß braten.",
    "tags": [
      "Essen",
      "Kochen",
      "Küche & Zubereitung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0016",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Veranstaltung",
    "focusWord": "die Veranstaltung",
    "question": "Was bedeutet \"die Veranstaltung\"?",
    "options": [
      "Event / Performance / Function",
      "Building (das Gebäude)",
      "Exhibition item",
      "Ticket booth"
    ],
    "correctAnswer": "Event / Performance / Function",
    "explanation": "Eine Veranstaltung ist ein organisiertes Event (Konzert, Theater, Vortrag).",
    "tags": [
      "Kultur",
      "Freizeit",
      "Freizeit & Kultur",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0017",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Kündigung",
    "focusWord": "die Kündigung",
    "question": "Was ist \"die Kündigung\"?",
    "options": [
      "Termination / Resignation notice",
      "Promotion (die Beförderung)",
      "Job interview (das Vorstellungsgespräch)",
      "Overtime (die Überstunden)"
    ],
    "correctAnswer": "Termination / Resignation notice",
    "explanation": "Die Kündigung beendet offiziell ein Vertragsverhältnis (Arbeitsvertrag, Mietvertrag).",
    "tags": [
      "Arbeit",
      "Recht",
      "Arbeit & Vertrag",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0018",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Paket",
    "focusWord": "das Paket",
    "question": "Was bedeutet \"das Paket\" bei der Post?",
    "options": [
      "Parcel / Package",
      "Letter (der Brief)",
      "Stamp (die Briefmarke)",
      "Mailbox (der Briefkasten)"
    ],
    "correctAnswer": "Parcel / Package",
    "explanation": "Ein Paket ist eine Postsendung für größere Gegenstände.",
    "tags": [
      "Post",
      "Alltag",
      "Post & Versand",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 12
  },
  {
    "id": "A2-WD-0019",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "zuverlässig",
    "focusWord": "zuverlässig",
    "question": "Was bedeutet die Eigenschaft \"zuverlässig\"?",
    "options": [
      "Reliable / Dependable",
      "Lazy (faul)",
      "Stubborn (stur)",
      "Impatient (ungeduldig)"
    ],
    "correctAnswer": "Reliable / Dependable",
    "explanation": "Wer zuverlässig ist, hält Versprechen und Vereinbarungen immer ein.",
    "tags": [
      "Persönlichkeit",
      "Adjektive",
      "Charaktereigenschaften",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0020",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Zeugnis",
    "focusWord": "das Zeugnis",
    "question": "Was ist \"das Zeugnis\" am Ende des Schuljahres?",
    "options": [
      "Report card / Certificate of grades",
      "Homework notebook",
      "Textbook",
      "School bag"
    ],
    "correctAnswer": "Report card / Certificate of grades",
    "explanation": "Das Zeugnis ist die offizielle Bescheinigung der erbrachten Noten und Leistungen.",
    "tags": [
      "Bildung",
      "Schule",
      "Bildung & Schule",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WB-0001",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Beruf im Gesundheitswesen:",
    "clues": [
      "Hinweis 1: Ich arbeite in der Apotheke.",
      "Hinweis 2: Ich lese die Rezepte der Ärzte und gebe den Kunden Medikamente.",
      "Hinweis 3: Ich erkläre Patienten ganz genau, wie oft und wann sie ihre Tabletten einnehmen müssen."
    ],
    "options": [
      "Der Apotheker",
      "Der Krankenpfleger",
      "Der Zahnarzt",
      "Der Optiker"
    ],
    "correctAnswer": "Der Apotheker",
    "explanation": "Der Apotheker verkauft und berät über Arzneimittel in der Apotheke.",
    "tags": [
      "Berufe",
      "Gesundheit",
      "Medizinische Berufe",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0002",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte städtische Einrichtung:",
    "clues": [
      "Hinweis 1: Ich bin das wichtigste Gebäude der Stadtverwaltung.",
      "Hinweis 2: Hier arbeitet der Bürgermeister und der Stadtrat.",
      "Hinweis 3: Bürger melden hier ihren neuen Wohnsitz im Bürgeramt an."
    ],
    "options": [
      "Das Rathaus",
      "Das Museum",
      "Die Universität",
      "Die Bank"
    ],
    "correctAnswer": "Das Rathaus",
    "explanation": "Im Rathaus sitzt die Stadtverwaltung mit Bürgermeister und Bürgerbüro.",
    "tags": [
      "Stadt",
      "Verwaltung",
      "Stadt & Gebäude",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0003",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Haushaltsgerät:",
    "clues": [
      "Hinweis 1: Man füllt schmutzige Kleidung und Waschpulver in mich hinein.",
      "Hinweis 2: Meine Trommel dreht sich schnell und wäscht alles mit heißem Wasser sauber.",
      "Hinweis 3: Nach dem Schleudern holt man saubere, feuchte Wäsche heraus."
    ],
    "options": [
      "Die Waschmaschine",
      "Die Spülmaschine",
      "Der Staubsauger",
      "Der Wäschetrockner"
    ],
    "correctAnswer": "Die Waschmaschine",
    "explanation": "Die Waschmaschine reinigt Textilien mit Wasser und Waschmittel.",
    "tags": [
      "Haushalt",
      "Geräte",
      "Haushalt & Technik",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0004",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Reisegegenstand:",
    "clues": [
      "Hinweis 1: Vor dem Urlaub packt man Hosen, T-Shirts und Schuhe in mich hinein.",
      "Hinweis 2: Ich habe Rollen und einen Teleskopgriff zum Ziehen.",
      "Hinweis 3: Am Flughafen gibt man mich am Check-in-Schalter als Reisegepäck ab."
    ],
    "options": [
      "Der Koffer",
      "Die Geldbörse",
      "Der Plastikbeutel",
      "Der Briefumschlag"
    ],
    "correctAnswer": "Der Koffer",
    "explanation": "Im Koffer transportiert man Kleidung und Reiseutensilien.",
    "tags": [
      "Reisen",
      "Gepäck",
      "Reisen & Gepäck",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0005",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten medizinischen Gegenstand:",
    "clues": [
      "Hinweis 1: Wenn man sich heiß fühlt und schwitzt, holt man mich aus dem Schrank.",
      "Hinweis 2: Man steckt mich unter die Zunge oder ins Ohr.",
      "Hinweis 3: Ein Display zeigt nach wenigen Sekunden die genaue Körpertemperatur an."
    ],
    "options": [
      "Das Fieberthermometer",
      "Das Pflaster",
      "Der Verband",
      "Die Spritze"
    ],
    "correctAnswer": "Das Fieberthermometer",
    "explanation": "Mit dem Fieberthermometer misst man die Körpertemperatur.",
    "tags": [
      "Gesundheit",
      "Medizin",
      "Medizinische Geräte",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0006",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Arbeitsdokument:",
    "clues": [
      "Hinweis 1: Man schickt mich mit, wenn man sich auf eine freie Arbeitsstelle bewirbt.",
      "Hinweis 2: In mir stehen tabellarisch Schule, Ausbildung, Studium und bisherige Berufserfahrungen.",
      "Hinweis 3: Auf Lateinisch nennt man mich oft \"Curriculum Vitae\" (CV)."
    ],
    "options": [
      "Der Lebenslauf",
      "Der Arbeitsvertrag",
      "Das Kündigungsschreiben",
      "Die Rechnung"
    ],
    "correctAnswer": "Der Lebenslauf",
    "explanation": "Der Lebenslauf dokumentiert den bisherigen beruflichen Werdegang.",
    "tags": [
      "Arbeit",
      "Bewerbung",
      "Arbeit & Büro",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0007",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Küchengerät:",
    "clues": [
      "Hinweis 1: Ich werde bis zu 250 Grad heiß.",
      "Hinweis 2: Man backt in mir leckere Kuchen, frische Pizza und knuspriges Brot.",
      "Hinweis 3: Ich habe ein Glasfenster und eine Lampe, damit man das Essen beim Backen beobachten kann."
    ],
    "options": [
      "Der Backofen",
      "Der Toaster",
      "Der Wasserkocher",
      "Die Kaffeemaschine"
    ],
    "correctAnswer": "Der Backofen",
    "explanation": "Im Backofen backt und brät man bei hohen Temperaturen.",
    "tags": [
      "Küche",
      "Kochen",
      "Küche & Backen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0008",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Ort am Bahnhof:",
    "clues": [
      "Hinweis 1: Ich bin die erhöhte Fläche neben den Zugschienen.",
      "Hinweis 2: Hier warten die Passagiere mit ihren Koffern auf die Einfahrt des Zuges.",
      "Hinweis 3: Auf der Anzeigetafel steht: \"Zug nach Berlin fährt ein auf Gleis 4\"."
    ],
    "options": [
      "Der Bahnsteig",
      "Der Wartesaal",
      "Der Fahrkartenschalter",
      "Das Fundbüro"
    ],
    "correctAnswer": "Der Bahnsteig",
    "explanation": "Der Bahnsteig (Gleis) ist der Einstiegsbereich für Passagiere.",
    "tags": [
      "Bahn",
      "Verkehr",
      "Bahn & Gleise",
      "Reisen & Mobilität"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0009",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Beruf im Dienstleistungsbereich:",
    "clues": [
      "Hinweis 1: Ich wasche, schneide und färbe Haare.",
      "Hinweis 2: In meinem Salon benutze ich Schere, Kamm und Föhn.",
      "Hinweis 3: Nach dem Besuch bei mir haben die Kunden eine tolle neue Frisur."
    ],
    "options": [
      "Der Friseur",
      "Der Schneider",
      "Der Verkäufer",
      "Der Kellner"
    ],
    "correctAnswer": "Der Friseur",
    "explanation": "Der Friseur schneidet und pflegt Haare.",
    "tags": [
      "Berufe",
      "Alltag",
      "Dienstleistungsberufe",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0010",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Begriff aus dem Mietrecht:",
    "clues": [
      "Hinweis 1: Ich bin ein Geldbetrag von meist 2 bis 3 Monatskaltmieten.",
      "Hinweis 2: Der Mieter zahlt mich vor dem Einzug als Sicherheit an den Vermieter.",
      "Hinweis 3: Wenn beim Auszug keine Schäden in der Wohnung sind, bekommt der Mieter mich komplett zurück."
    ],
    "options": [
      "Die Kaution",
      "Die Provision",
      "Die Nebenkosten",
      "Die Mahngebühr"
    ],
    "correctAnswer": "Die Kaution",
    "explanation": "Die Mietkaution dient dem Vermieter als finanzielle Sicherheitsleistung.",
    "tags": [
      "Wohnen",
      "Recht",
      "Miete",
      "Recht & Finanzen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0011",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Medium:",
    "clues": [
      "Hinweis 1: Man abonniert mich digital oder bekommt mich morgens in den Briefkasten geworfen.",
      "Hinweis 2: Journalisten schreiben in mir Berichte über Politik, Sport, Kultur und das Weltgeschehen.",
      "Hinweis 3: Ich habe Schlagzeilen, Artikel und Fotos auf Papier."
    ],
    "options": [
      "Die Zeitung",
      "Das Wörterbuch",
      "Der Kalender",
      "Das Kochbuch"
    ],
    "correctAnswer": "Die Zeitung",
    "explanation": "Die Tageszeitung informiert über aktuelle Nachrichten und Ereignisse.",
    "tags": [
      "Medien",
      "Nachrichten",
      "Medien & Freizeit",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0012",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte Maschine:",
    "clues": [
      "Hinweis 1: Ich stehe in jeder Bankfiliale und oft auch im Einkaufszentrum.",
      "Hinweis 2: Man steckt seine Bankkarte hinein und tippt seine vierstellige Geheimzahl (PIN) ein.",
      "Hinweis 3: Ich spucke Geldscheine (Bargeld) aus."
    ],
    "options": [
      "Der Geldautomat (ATM)",
      "Der Parkscheinautomat",
      "Die Kaffeemaschine",
      "Der Drucker"
    ],
    "correctAnswer": "Der Geldautomat (ATM)",
    "explanation": "Am Geldautomaten hebt man Bargeld vom Bankkonto ab.",
    "tags": [
      "Bank",
      "Finanzen",
      "Bank & Finanzen",
      "Reisen & Mobilität"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0013",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Spezialfahrzeug:",
    "clues": [
      "Hinweis 1: Ich habe Blaulicht auf dem Dach und eine laute Sirene (Tatütata).",
      "Hinweis 2: Notärzte und Rettungssanitäter fahren mit mir schnell zu verletzten Menschen.",
      "Hinweis 3: Ich transportiere Notfallpatienten mit Höchstgeschwindigkeit ins Krankenhaus."
    ],
    "options": [
      "Der Krankenwagen / Rettungswagen",
      "Das Polizeiauto",
      "Das Feuerwehrauto",
      "Das Taxi"
    ],
    "correctAnswer": "Der Krankenwagen / Rettungswagen",
    "explanation": "Der Rettungswagen bringt Notfallpatienten ins Krankenhaus.",
    "tags": [
      "Gesundheit",
      "Notfall",
      "Gesundheit & Rettung",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0014",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten amtlichen Nachweis im Straßenverkehr:",
    "clues": [
      "Hinweis 1: Ich bin eine Plastikkarte mit Foto, die man nach bestandener Theorie- und Praxisprüfung erhält.",
      "Hinweis 2: Ohne mich darf man in Deutschland kein Auto legal auf öffentlichen Straßen fahren.",
      "Hinweis 3: Die Polizei verlangt mich bei jeder Verkehrskontrolle."
    ],
    "options": [
      "Der Führerschein",
      "Die Fahrkarte",
      "Der Personalausweis",
      "Der Fahrzeugbrief"
    ],
    "correctAnswer": "Der Führerschein",
    "explanation": "Der Führerschein berechtigt zum Führen eines Kraftfahrzeugs.",
    "tags": [
      "Verkehr",
      "Dokumente",
      "Fahrzeugtechnik",
      "Reisen & Mobilität"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0015",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Bereich einer Wohnung:",
    "clues": [
      "Hinweis 1: Ich bin eine kleine Plattform im Freien, die an der Außenwand der Wohnung befestigt ist.",
      "Hinweis 2: Hier stellt man Pflanzen, Blumen, einen kleinen Tisch und Stühle auf.",
      "Hinweis 3: Im Sommer frühstücken viele Menschen hier an der frischen Luft."
    ],
    "options": [
      "Der Balkon",
      "Der Keller",
      "Der Flur",
      "Der Dachboden"
    ],
    "correctAnswer": "Der Balkon",
    "explanation": "Auf dem Balkon genießt man die frische Luft und die Sonne.",
    "tags": [
      "Wohnen",
      "Erholung",
      "Wohnen & Erholung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-TB-0001",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wie bittet man im Restaurant höflich um die Rechnung?",
    "options": [
      "Zahlen, bitte! / Wir möchten bitte bezahlen.",
      "Geld her!",
      "Gib mir die Rechnung!",
      "Ich gehe jetzt."
    ],
    "correctAnswer": "Zahlen, bitte! / Wir möchten bitte bezahlen.",
    "explanation": "\"Zahlen, bitte!\" oder \"Wir möchten bitte bezahlen\" ist die korrekte und höfliche Formulierung.",
    "tags": [
      "Restaurant",
      "Höflichkeit",
      "Restaurant & Rechnung",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0002",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Was stellt der Arzt aus, wenn ein Arbeitnehmer wegen Krankheit nicht arbeiten kann?",
    "options": [
      "Eine Arbeitsunfähigkeitsbescheinigung (Krankschreibung)",
      "Einen neuen Pass",
      "Eine Quittung",
      "Einen Arbeitsvertrag"
    ],
    "correctAnswer": "Eine Arbeitsunfähigkeitsbescheinigung (Krankschreibung)",
    "explanation": "Die Krankschreibung (AU-Bescheinigung) belegt die Arbeitsunfähigkeit für den Arbeitgeber.",
    "tags": [
      "Gesundheit",
      "Arbeit",
      "Arzt & Krankschreibung",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0003",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was bedeutet die Anweisung: \"Gehen Sie geradeaus bis zur Ampel\"?",
    "options": [
      "Go straight ahead until the traffic light",
      "Turn left immediately",
      "Go backwards",
      "Stop and wait"
    ],
    "correctAnswer": "Go straight ahead until the traffic light",
    "explanation": "\"geradeaus\" = straight ahead; \"bis zur Ampel\" = until the traffic light.",
    "tags": [
      "Stadt",
      "Orientierung",
      "Wegbeschreibung",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0004",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Dein Freund lädt dich zu seiner Geburtstagsparty ein. Wie sagst du begeistert zu?",
    "options": [
      "Vielen Dank für die Einladung! Ich komme sehr gerne.",
      "Ich habe keine Lust.",
      "Vielleicht, wenn ich nichts Besseres finde.",
      "Warum feierst du?"
    ],
    "correctAnswer": "Vielen Dank für die Einladung! Ich komme sehr gerne.",
    "explanation": "\"Vielen Dank für die Einladung! Ich komme sehr gerne\" ist die freundliche Standardzusage.",
    "tags": [
      "Kommunikation",
      "Feier",
      "Einladung & Zusage",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0005",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Was ist der Unterschied zwischen einem Einzelzimmer (EZ) und einem Doppelzimmer (DZ)?",
    "options": [
      "Das EZ ist für 1 Person, das DZ für 2 Personen.",
      "Das EZ hat kein Bad.",
      "Das DZ ist immer billiger.",
      "Das EZ hat zwei Betten."
    ],
    "correctAnswer": "Das EZ ist für 1 Person, das DZ für 2 Personen.",
    "explanation": "Einzelzimmer = 1 Person (1 Bett), Doppelzimmer = 2 Personen (Doppelbett).",
    "tags": [
      "Hotel",
      "Reisen",
      "Hotel & Buchung",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0006",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was sagt man am Telefon, wenn man den Gesprächspartner akustisch nicht verstanden hat?",
    "options": [
      "Könnten Sie das bitte noch einmal wiederholen?",
      "Halt den Mund!",
      "Warum sprichst du?",
      "Auf Wiederhören!"
    ],
    "correctAnswer": "Könnten Sie das bitte noch einmal wiederholen?",
    "explanation": "Die höfliche Nachfrage lautet: \"Könnten Sie das bitte wiederholen?\".",
    "tags": [
      "Telefon",
      "Höflichkeit",
      "Telefongespräch",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0007",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Welches Verkehrsmittel gilt in Deutschland als das umweltfreundlichste für Fernreisen?",
    "options": [
      "Die Bahn (Elektrozug)",
      "Das Flugzeug",
      "Der Sportwagen",
      "Das Kreuzfahrtschiff"
    ],
    "correctAnswer": "Die Bahn (Elektrozug)",
    "explanation": "Die elektrische Eisenbahn hat die geringsten CO2-Emissionen pro Personenkilometer.",
    "tags": [
      "Umwelt",
      "Verkehr",
      "Verkehrsmittel Vergleich",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0008",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Rechnung im Café beträgt 8,40 Euro. Du gibst 10 Euro und sagst: \"Stimmt so!\". Wie viel Trinkgeld gibst du?",
    "options": [
      "1,60 Euro Trinkgeld",
      "10 Euro Trinkgeld",
      "Kein Trinkgeld",
      "8,40 Euro Trinkgeld"
    ],
    "correctAnswer": "1,60 Euro Trinkgeld",
    "explanation": "\"Stimmt so!\" bedeutet, dass die Bedienung den Restbetrag (10,00 - 8,40 = 1,60 €) als Trinkgeld behalten darf.",
    "tags": [
      "Geld",
      "Kultur",
      "Restaurant",
      "Einkaufen & Trinkgeld",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0009",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wohin gehören leere Zeitungen, Hefte und Pappkartons in Deutschland?",
    "options": [
      "In die blaue Papiertonne (Altpapier)",
      "In den Biomüll",
      "In den Glascontainer",
      "In den Sondermüll"
    ],
    "correctAnswer": "In die blaue Papiertonne (Altpapier)",
    "explanation": "Papier und Pappe werden in Deutschland in der blauen Papiertonne gesammelt und recycelt.",
    "tags": [
      "Landeskunde",
      "Umwelt",
      "Alltag",
      "Mülltrennung in Deutschland",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0010",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Du hast um 10:00 Uhr ein Vorstellungsgespräch. Wann solltest du idealerweise eintreffen?",
    "options": [
      "Um 09:50 bis 09:55 Uhr (etwa 5 bis 10 Minuten vorher)",
      "Um 10:30 Uhr",
      "Um 08:00 Uhr",
      "Um 10:15 Uhr"
    ],
    "correctAnswer": "Um 09:50 bis 09:55 Uhr (etwa 5 bis 10 Minuten vorher)",
    "explanation": "In Deutschland gilt ein Eintreffen 5-10 Minuten vor dem vereinbarten Termin als ideal pünktlich.",
    "tags": [
      "Arbeit",
      "Kultur",
      "Pünktlichkeit & Kultur",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0011",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was wünscht man jemandem am 31. Dezember bzw. zum neuen Jahr?",
    "options": [
      "Einen guten Rutsch! / Frohes neues Jahr!",
      "Frohe Ostern!",
      "Herzliches Beileid!",
      "Gute Reise!"
    ],
    "correctAnswer": "Einen guten Rutsch! / Frohes neues Jahr!",
    "explanation": "Vor Silvester wünscht man \"Einen guten Rutsch!\", am Neujahrstag \"Frohes neues Jahr!\".",
    "tags": [
      "Feste",
      "Bräuche",
      "Glückwünsche & Feste",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0012",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Wie viele direkte Nachbarländer grenzen an die Bundesrepublik Deutschland?",
    "options": [
      "9 Nachbarländer",
      "5 Nachbarländer",
      "12 Nachbarländer",
      "3 Nachbarländer"
    ],
    "correctAnswer": "9 Nachbarländer",
    "explanation": "Deutschland grenzt an 9 Länder: Dänemark, Polen, Tschechien, Österreich, Schweiz, Frankreich, Luxemburg, Belgien, Niederlande.",
    "tags": [
      "Geografie",
      "Landeskunde",
      "Geografie & Nachbarländer",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0013",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was macht ein \"Mechatroniker\"?",
    "options": [
      "Er repariert und wartet Fahrzeuge und Maschinen (Mechanik & Elektronik).",
      "Er kocht im Hotel.",
      "Er pflanzt Bäume im Wald.",
      "Er malt Bilder im Museum."
    ],
    "correctAnswer": "Er repariert und wartet Fahrzeuge und Maschinen (Mechanik & Elektronik).",
    "explanation": "Der Mechatroniker verbindet Mechanik, Elektronik und Informatik.",
    "tags": [
      "Berufe",
      "Technik",
      "Berufsberatung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0014",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "In deutschen Mietshäusern gilt die gesetzliche Nachtruhe ab wann?",
    "options": [
      "Ab 22:00 Uhr abends",
      "Ab 18:00 Uhr",
      "Ab 01:00 Uhr nachts",
      "Es gibt keine Nachtruhe"
    ],
    "correctAnswer": "Ab 22:00 Uhr abends",
    "explanation": "Ab 22:00 Uhr gilt in Deutschland Zimmerlautstärke (Nachtruhe).",
    "tags": [
      "Wohnen",
      "Kultur",
      "Regeln",
      "Ruhezeiten & Nachbarschaft",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-TB-0015",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was singt und wünscht man in Deutschland zum Geburtstag?",
    "options": [
      "Zum Geburtstag viel Glück! / Herzlichen Glückwunsch!",
      "Frohes Fest!",
      "Gute Besserung!",
      "Guten Appetit!"
    ],
    "correctAnswer": "Zum Geburtstag viel Glück! / Herzlichen Glückwunsch!",
    "explanation": "Zum Geburtstag gratuliert man mit \"Herzlichen Glückwunsch zum Geburtstag!\".",
    "tags": [
      "Feste",
      "Geburtstag",
      "Feste & Geburtstag",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0036",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich bleibe heute im Bett, ___ ich Fieber und Halsschmerzen habe.",
    "options": [
      "weil",
      "denn",
      "deshalb",
      "trotzdem"
    ],
    "correctAnswer": "weil",
    "explanation": "Die subordinierende Kausalkonjunktion \"weil\" leitet einen Nebensatz ein und verbannt das finite Verb (\"habe\") ans Satzende.",
    "tags": [
      "Konnektoren",
      "Nebensatz",
      "Gesundheit",
      "Kausalität / Konnektoren",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0037",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wann ___ du heute Morgen aufgestanden?",
    "options": [
      "bist",
      "hast",
      "seid",
      "haben"
    ],
    "correctAnswer": "bist",
    "explanation": "Verben der Orts- oder Zustandsveränderung wie \"aufstehen\" bilden das Perfekt mit dem Hilfsverb \"sein\": \"du bist aufgestanden\".",
    "tags": [
      "Perfekt",
      "Hilfsverben",
      "Alltag",
      "Perfekt mit sein",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0038",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wir freuen ___ schon sehr auf den Sommerurlaub.",
    "options": [
      "uns",
      "euch",
      "sich",
      "mich"
    ],
    "correctAnswer": "uns",
    "explanation": "Das reflexive Verb \"sich freuen\" verlangt für \"wir\" das Reflexivpronomen \"uns\".",
    "tags": [
      "Reflexivpronomen",
      "Urlaub",
      "Verben",
      "Reflexive Verben",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0039",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Zug ist schnell, aber das Flugzeug ist noch ___ .",
    "options": [
      "schneller",
      "am schnellsten",
      "schnellere",
      "schnellest"
    ],
    "correctAnswer": "schneller",
    "explanation": "Beim direkten Vergleich zweier Dinge verwendet man den Komparativ: schnell -> schneller.",
    "tags": [
      "Komparativ",
      "Adjektive",
      "Verkehr",
      "Komparativ & Superlativ",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0040",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Er hat sich ein neu___ Auto gekauft.",
    "options": [
      "es",
      "er",
      "en",
      "em"
    ],
    "correctAnswer": "es",
    "explanation": "\"Auto\" ist Neutrum (das Auto). Nach unbestimmtem Artikel (\"ein\") im Akkusativ Neutrum lautet die Endung -es: \"ein neues Auto\".",
    "tags": [
      "Adjektivdeklination",
      "Akkusativ",
      "Neutrum",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0041",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Wohin stellst du die Tasse? — Ich stelle sie auf ___ Tisch.",
    "options": [
      "den",
      "dem",
      "das",
      "der"
    ],
    "correctAnswer": "den",
    "explanation": "Die Frage \"Wohin?\" (Richtung/Aktion) verlangt den Akkusativ: maskulin \"auf den Tisch\" (stellen + Akkusativ).",
    "tags": [
      "Wechselpräpositionen",
      "Akkusativ",
      "Wohnen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0042",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Gestern war ich krank und ___ nicht zur Arbeit gehen.",
    "options": [
      "konnte",
      "kann",
      "gekonnt",
      "könnte"
    ],
    "correctAnswer": "konnte",
    "explanation": "Das Präteritum von \"können\" für 1. Person Singular lautet \"ich konnte\".",
    "tags": [
      "Präteritum",
      "Modalverben",
      "Arbeit",
      "Präteritum Modalverben",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0043",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich weiß genau, dass Deutsch lernen viel Spaß ___ .",
    "options": [
      "macht",
      "machen",
      "machte",
      "gemacht"
    ],
    "correctAnswer": "macht",
    "explanation": "Im Nebensatz mit \"dass\" steht das finite Verb am Satzende (\"... Spaß macht\").",
    "tags": [
      "Nebensatz",
      "dass",
      "Grammatik",
      "Dass-Sätze",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0044",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "___ Sie mir bitte sagen, wo der Ausgang ist?",
    "options": [
      "Könnten",
      "Können",
      "Kann",
      "Könntet"
    ],
    "correctAnswer": "Könnten",
    "explanation": "\"Könnten Sie...\" ist die höfliche Bitte im Konjunktiv II für die formelle Anrede \"Sie\".",
    "tags": [
      "Konjunktiv II",
      "Höflichkeit",
      "Orientierung",
      "Konjunktiv II Höflichkeit",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0045",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich habe vor, dieses Jahr eine Reise nach Wien ___ .",
    "options": [
      "zu machen",
      "machen",
      "gemacht",
      "zu machend"
    ],
    "correctAnswer": "zu machen",
    "explanation": "Nach Wendungen wie \"vorhaben\" folgt der Infinitiv mit \"zu\" am Satzende: \"zu machen\".",
    "tags": [
      "Infinitiv mit zu",
      "Reisen",
      "Grammatik",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0046",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "___ das Wetter schön ist, machen wir ein Picknick im Park.",
    "options": [
      "Wenn",
      "Wann",
      "Weil",
      "Ob"
    ],
    "correctAnswer": "Wenn",
    "explanation": "Bedingungen und wiederkehrende Gegenwartshandlungen werden mit der Konjunktion \"wenn\" eingeleitet.",
    "tags": [
      "Konnektoren",
      "Konditionalsatz",
      "Freizeit",
      "Temporale Konjunktion wenn",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0047",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "___ wir gestern Abend im Restaurant ankamen, war unser Tisch schon reserviert.",
    "options": [
      "Als",
      "Wenn",
      "Wann",
      "Während"
    ],
    "correctAnswer": "Als",
    "explanation": "Für ein einmaliges Ereignis in der Vergangenheit verwendet man die temporale Konjunktion \"als\".",
    "tags": [
      "Temporalsatz",
      "Vergangenheit",
      "als-wenn",
      "Temporale Konjunktion als vs wenn",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0048",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Lisa wartet an der Haltestelle ___ den Bus.",
    "options": [
      "auf",
      "für",
      "an",
      "über"
    ],
    "correctAnswer": "auf",
    "explanation": "Die feste Verbindung lautet \"warten auf + Akkusativ\": \"auf den Bus\".",
    "tags": [
      "Präpositionen",
      "Verben",
      "Verkehr",
      "Verben mit Präpositionen",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0049",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Das neue Kleid gefällt ___ sehr gut.",
    "options": [
      "ihr",
      "sie",
      "ihn",
      "ihrer"
    ],
    "correctAnswer": "ihr",
    "explanation": "Das Verb \"gefallen\" verlangt das Dativobjekt: \"sie\" (feminin) wird zu \"ihr\" im Dativ.",
    "tags": [
      "Dativ",
      "Verben",
      "Kleidung",
      "Verben mit Dativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0050",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Können Sie mir sagen, wann der Supermarkt ___ ?",
    "options": [
      "schließt",
      "schließen",
      "geschlossen",
      "schloss"
    ],
    "correctAnswer": "schließt",
    "explanation": "Im indirekten Fragesatz steht das Verb am Satzende (\"... wann der Supermarkt schließt\").",
    "tags": [
      "Indirekte Fragen",
      "Nebensatz",
      "Alltag",
      "Indirekte Fragesätze",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0051",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich lerne schon seit ___ Monat Deutsch bei Farh.",
    "options": [
      "einem",
      "einen",
      "eines",
      "einer"
    ],
    "correctAnswer": "einem",
    "explanation": "\"Seit\" verlangt immer den Dativ: maskulin \"der Monat\" -> \"seit einem Monat\".",
    "tags": [
      "Dativ",
      "Präpositionen",
      "Zeit",
      "Präposition seit",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0052",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Das ist das Auto mein___ Vaters.",
    "options": [
      "es",
      "en",
      "em",
      "er"
    ],
    "correctAnswer": "es",
    "explanation": "Der Genitiv Maskulinum verlangt beim Possessivartikel die Endung -es: \"meines Vaters\".",
    "tags": [
      "Genitiv",
      "Familie",
      "Grammatik",
      "Genitiv Grundlagen",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0053",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Er geht joggen, ___ es in Strömen regnet.",
    "options": [
      "obwohl",
      "weil",
      "damit",
      "dass"
    ],
    "correctAnswer": "obwohl",
    "explanation": "\"Obwohl\" drückt einen Gegengrund/Konzession aus: trotz Regen geht er joggen.",
    "tags": [
      "Konnektoren",
      "Konzessivsatz",
      "Sport",
      "Konzessivsatz obwohl",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0054",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Im Juli ist es in Deutschland meistens ___ .",
    "options": [
      "am wärmsten",
      "wärmer",
      "wärmste",
      "warm"
    ],
    "correctAnswer": "am wärmsten",
    "explanation": "Der prädikative Superlativ wird mit \"am\" + Adjektiv-Stamm + \"-sten\" gebildet: \"am wärmsten\".",
    "tags": [
      "Superlativ",
      "Wetter",
      "Grammatik",
      "Superlativ Formen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0055",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Herr Becker schickt seinem Kollegen eine wichtige ___ .",
    "options": [
      "E-Mail",
      "Bewerbung",
      "Kündigung",
      "Rechnung"
    ],
    "correctAnswer": "E-Mail",
    "explanation": "Im Büroalltag schickt man Kollegen Nachrichten per \"E-Mail\".",
    "tags": [
      "Arbeit",
      "Büro",
      "Kommunikation",
      "Arbeitswelt & Büro",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0056",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Mein Kopf tut weh, ich habe starke ___ .",
    "options": [
      "Kopfschmerzen",
      "Bauchschmerzen",
      "Halsschmerzen",
      "Zahnschmerzen"
    ],
    "correctAnswer": "Kopfschmerzen",
    "explanation": "Schmerzen am Kopf nennt man \"Kopfschmerzen\".",
    "tags": [
      "Gesundheit",
      "Körper",
      "Wortschatz",
      "Gesundheit & Symptome",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0057",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Kaltmiete beträgt 600 Euro und die ___ für Heizung und Wasser 150 Euro.",
    "options": [
      "Nebenkosten",
      "Kaution",
      "Provision",
      "Zinsen"
    ],
    "correctAnswer": "Nebenkosten",
    "explanation": "Die zusätzlichen monatlichen Kosten für Heizung, Wasser und Müllabfuhr heißen \"Nebenkosten\".",
    "tags": [
      "Wohnen",
      "Miete",
      "Wortschatz",
      "Wohnen & Miete",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0058",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Achtung an Gleis 4: Der ICE nach Berlin hat heute 20 Minuten ___ .",
    "options": [
      "Verspätung",
      "Abfahrt",
      "Ankunft",
      "Fahrkarte"
    ],
    "correctAnswer": "Verspätung",
    "explanation": "Wenn ein Zug später als im Fahrplan ankommt, hat er \"Verspätung\".",
    "tags": [
      "Reisen",
      "Bahn",
      "Verkehr",
      "Reisen & Bahn",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0059",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Interessierst du dich ___ klassische Musik?",
    "options": [
      "für",
      "über",
      "an",
      "auf"
    ],
    "correctAnswer": "für",
    "explanation": "Das reflexive Verb heißt \"sich interessieren für + Akkusativ\".",
    "tags": [
      "Reflexiv",
      "Präpositionen",
      "Kultur",
      "Reflexive Verben Präposition",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SA-0060",
    "level": "A2",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "In Deutschland ___ viel Brot gegessen.",
    "options": [
      "wird",
      "wurde",
      "ist",
      "hat"
    ],
    "correctAnswer": "wird",
    "explanation": "Das Vorgangspassiv im Präsens bildet man mit \"werden\" + Partizip II (\"wird gegessen\").",
    "tags": [
      "Passiv",
      "Grammatik",
      "Kultur",
      "Passiv Präsens Einblick",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-SR-0016",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Kausalsatz mit \"weil\":",
    "words": [
      "Ich gehe nicht zur Party",
      "weil",
      "ich sehr müde",
      "bin."
    ],
    "correctOrder": [
      "Ich gehe nicht zur Party",
      "weil",
      "ich sehr müde",
      "bin."
    ],
    "correctAnswer": [
      "Ich gehe nicht zur Party",
      "weil",
      "ich sehr müde",
      "bin."
    ],
    "explanation": "Im Nebensatz mit \"weil\" wandert das finite Hilfsverb/Kopulaverb \"bin\" ans Satzende.",
    "tags": [
      "Nebensatz",
      "weil",
      "Satzbau",
      "Konnektoren / Nebensatz",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0017",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz im Perfekt:",
    "words": [
      "Sie",
      "am Wochenende",
      "nach Hamburg",
      "gefahren.",
      "ist"
    ],
    "correctOrder": [
      "Sie",
      "ist",
      "am Wochenende",
      "nach Hamburg",
      "gefahren."
    ],
    "correctAnswer": [
      "Sie",
      "ist",
      "am Wochenende",
      "nach Hamburg",
      "gefahren."
    ],
    "explanation": "Subjekt (Sie) -> Hilfsverb (ist) auf Pos. 2 -> Zeitangabe -> Richtungsangabe -> Partizip II (gefahren) am Ende.",
    "tags": [
      "Perfekt",
      "Reisen",
      "Satzklammer",
      "Perfekt mit unregelmäßigen Verben",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0018",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit der Konjunktion \"dass\":",
    "words": [
      "Der Arzt sagt",
      "dass",
      "viel Wasser trinken",
      "ich",
      "soll."
    ],
    "correctOrder": [
      "Der Arzt sagt",
      "dass",
      "ich",
      "viel Wasser trinken",
      "soll."
    ],
    "correctAnswer": [
      "Der Arzt sagt",
      "dass",
      "ich",
      "viel Wasser trinken",
      "soll."
    ],
    "explanation": "Hauptsatz -> Komma -> dass -> Subjekt (ich) -> Objekt (viel Wasser) -> Vollverb Infinitiv -> Modalverb (soll) am Ende.",
    "tags": [
      "dass-Satz",
      "Gesundheit",
      "Nebensatz",
      "Dass-Sätze",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 30
  },
  {
    "id": "A2-SR-0019",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde eine höfliche Anfrage mit Konjunktiv II:",
    "words": [
      "Würden",
      "Sie",
      "das Fenster",
      "bitte",
      "schließen",
      "?"
    ],
    "correctOrder": [
      "Würden",
      "Sie",
      "bitte",
      "das Fenster",
      "schließen",
      "?"
    ],
    "correctAnswer": [
      "Würden",
      "Sie",
      "bitte",
      "das Fenster",
      "schließen",
      "?"
    ],
    "explanation": "Hilfsverb \"Würden\" auf Pos. 1 -> Subjekt (Sie) -> Modalpartikel (bitte) -> Akkusativobjekt -> Infinitiv (schließen).",
    "tags": [
      "Konjunktiv II",
      "Höflichkeit",
      "Fragesatz",
      "Konjunktiv II Wunsch / Höflichkeit",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0020",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Konditionalsatz (Nebensatz zuerst):",
    "words": [
      "Wenn es regnet",
      "nehme",
      "einen Regenschirm",
      "ich",
      "mit."
    ],
    "correctOrder": [
      "Wenn es regnet",
      "nehme",
      "ich",
      "einen Regenschirm",
      "mit."
    ],
    "correctAnswer": [
      "Wenn es regnet",
      "nehme",
      "ich",
      "einen Regenschirm",
      "mit."
    ],
    "explanation": "Wenn der Nebensatz an Pos. 1 steht, folgt im Hauptsatz sofort das konjugierte Verb (nehme) an Pos. 2.",
    "tags": [
      "Konditionalsatz",
      "wenn",
      "Inversion",
      "Konditionalsatz wenn",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0021",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit dem reflexiven Verb \"sich interessieren\":",
    "words": [
      "Mein Bruder",
      "interessiert sich",
      "sehr",
      "für moderne Kunst."
    ],
    "correctOrder": [
      "Mein Bruder",
      "interessiert sich",
      "sehr",
      "für moderne Kunst."
    ],
    "correctAnswer": [
      "Mein Bruder",
      "interessiert sich",
      "sehr",
      "für moderne Kunst."
    ],
    "explanation": "Subjekt (Mein Bruder) -> Verb + Reflexivpronomen (interessiert sich) -> Gradadverb (sehr) -> Präpositionalobjekt (für moderne Kunst).",
    "tags": [
      "Reflexiv",
      "Kultur",
      "Satzbau",
      "Reflexive Verben Satzbau",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0022",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bringe den Satz im Präteritum in die richtige Reihenfolge:",
    "words": [
      "Wegen des Sturms",
      "mussten",
      "die Flüge",
      "annulliert werden."
    ],
    "correctOrder": [
      "Wegen des Sturms",
      "mussten",
      "die Flüge",
      "annulliert werden."
    ],
    "correctAnswer": [
      "Wegen des Sturms",
      "mussten",
      "die Flüge",
      "annulliert werden."
    ],
    "explanation": "Kausale Angabe (Wegen des Sturms) -> Modalverb Präteritum (mussten) -> Subjekt -> Passivinfinitiv am Ende.",
    "tags": [
      "Präteritum",
      "Reisen",
      "Passiv",
      "Präteritum Modalverben",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 30
  },
  {
    "id": "A2-SR-0023",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die indirekte Frage:",
    "words": [
      "Wissen Sie",
      "wann",
      "der Zug",
      "abfährt",
      "?"
    ],
    "correctOrder": [
      "Wissen Sie",
      "wann",
      "der Zug",
      "abfährt",
      "?"
    ],
    "correctAnswer": [
      "Wissen Sie",
      "wann",
      "der Zug",
      "abfährt",
      "?"
    ],
    "explanation": "Hauptsatz (Wissen Sie) -> Fragewort (wann) -> Subjekt (der Zug) -> finites trennbares Verb (abfährt) am Satzende.",
    "tags": [
      "Indirekte Fragen",
      "Nebensatz",
      "Verkehr",
      "Indirekte Fragesätze",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0024",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit Infinitivgruppe:",
    "words": [
      "Es ist wichtig",
      "jeden Tag",
      "neue Vokabeln",
      "zu wiederholen."
    ],
    "correctOrder": [
      "Es ist wichtig",
      "jeden Tag",
      "neue Vokabeln",
      "zu wiederholen."
    ],
    "correctAnswer": [
      "Es ist wichtig",
      "jeden Tag",
      "neue Vokabeln",
      "zu wiederholen."
    ],
    "explanation": "Unpersönlicher Hauptsatz (Es ist wichtig) -> Zeitangabe -> Akkusativobjekt -> \"zu\" + Infinitiv am Satzende.",
    "tags": [
      "Infinitiv mit zu",
      "Lernen",
      "Grammatik",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-SR-0025",
    "level": "A2",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit \"obwohl\":",
    "words": [
      "Er geht zur Arbeit",
      "obwohl",
      "er sich",
      "krank fühlt."
    ],
    "correctOrder": [
      "Er geht zur Arbeit",
      "obwohl",
      "er sich",
      "krank fühlt."
    ],
    "correctAnswer": [
      "Er geht zur Arbeit",
      "obwohl",
      "er sich",
      "krank fühlt."
    ],
    "explanation": "Hauptsatz -> obwohl -> Subjekt (er) -> Reflexivpronomen (sich) -> Prädikativ (krank) -> finites Verb (fühlt) am Ende.",
    "tags": [
      "obwohl",
      "Konzessivsatz",
      "Gesundheit",
      "Konzessivsatz obwohl",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A2-WD-0021",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Bewerbung",
    "focusWord": "die Bewerbung",
    "question": "Was bedeutet \"die Bewerbung\" im beruflichen Kontext?",
    "options": [
      "Job application",
      "Employment contract",
      "Resignation letter",
      "Work certificate"
    ],
    "correctAnswer": "Job application",
    "explanation": "\"Die Bewerbung\" sind die Unterlagen für eine neue Arbeitsstelle (job application).",
    "tags": [
      "Arbeit",
      "Beruf",
      "Wortschatz",
      "Arbeit & Beruf",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0022",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Gehalt",
    "focusWord": "das Gehalt",
    "question": "Welcher Artikel und welche Übersetzung passen zu \"Gehalt\"?",
    "options": [
      "das Gehalt (Salary)",
      "der Gehalt (Tax)",
      "die Gehalt (Bonus)",
      "das Gehalte (Loan)"
    ],
    "correctAnswer": "das Gehalt (Salary)",
    "explanation": "\"Gehalt\" ist Neutrum: das Gehalt (monatliche Bezahlung / salary).",
    "tags": [
      "Arbeit",
      "Finanzen",
      "Artikel",
      "Arbeit & Finanzen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0023",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Prescription (medical)",
    "focusWord": "Prescription (medical)",
    "question": "Wie heißt das ärztliche Dokument \"Prescription\" auf Deutsch?",
    "options": [
      "das Rezept",
      "die Überweisung",
      "das Attest",
      "die Quittung"
    ],
    "correctAnswer": "das Rezept",
    "explanation": "Das ärztliche Rezept (Prescription) benötigt man in der Apotheke, um Medikamente zu erhalten.",
    "tags": [
      "Gesundheit",
      "Medizin",
      "Wortschatz",
      "Gesundheit & Medizin",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0024",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Kaution",
    "focusWord": "die Kaution",
    "question": "Was ist \"die Kaution\" beim Mieten einer Wohnung?",
    "options": [
      "Security deposit (money held for damages)",
      "Monthly heating cost",
      "Real estate broker fee",
      "Key copy fee"
    ],
    "correctAnswer": "Security deposit (money held for damages)",
    "explanation": "Die Mietkaution (oft 2-3 Kaltmieten) dient dem Vermieter als Sicherheitsleistung (security deposit).",
    "tags": [
      "Wohnen",
      "Miete",
      "Wortschatz",
      "Wohnen & Vertrag",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0025",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Verspätung",
    "focusWord": "die Verspätung",
    "question": "Was bedeutet \"die Verspätung\"?",
    "options": [
      "Delay",
      "Departure",
      "Arrival",
      "Cancellation"
    ],
    "correctAnswer": "Delay",
    "explanation": "\"Die Verspätung\" bedeutet, dass etwas später als geplant eintrifft (delay).",
    "tags": [
      "Reisen",
      "Verkehr",
      "Wortschatz",
      "Reisen & Verkehr",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0026",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Krankenversicherung",
    "focusWord": "die Krankenversicherung",
    "question": "Was bedeutet \"die Krankenversicherung\"?",
    "options": [
      "Health insurance",
      "Life insurance",
      "Car insurance",
      "Travel cancellation insurance"
    ],
    "correctAnswer": "Health insurance",
    "explanation": "\"Die Krankenversicherung\" übernimmt in Deutschland die Behandlungskosten beim Arzt und im Krankenhaus (health insurance).",
    "tags": [
      "Gesundheit",
      "Versicherung",
      "Gesellschaft",
      "Gesundheit & Versicherung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0027",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Overtime (working hours)",
    "focusWord": "Overtime (working hours)",
    "question": "Wie heißen zusätzliche Arbeitsstunden auf Deutsch?",
    "options": [
      "die Überstunden",
      "die Gleitzeit",
      "der Feierabend",
      "der Urlaub"
    ],
    "correctAnswer": "die Überstunden",
    "explanation": "Arbeitszeit über die vertragliche Arbeitszeit hinaus nennt man \"die Überstunden\" (Plural).",
    "tags": [
      "Arbeit",
      "Beruf",
      "Wortschatz",
      "Arbeit & Vertrag",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0028",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Sehenswürdigkeit",
    "focusWord": "die Sehenswürdigkeit",
    "question": "Was bedeutet \"die Sehenswürdigkeit\"?",
    "options": [
      "Sight / Tourist attraction",
      "Viewpoint",
      "Souvenir shop",
      "Tour guide"
    ],
    "correctAnswer": "Sight / Tourist attraction",
    "explanation": "Bedeutende Denkmäler und historische Bauwerke nennt man \"Sehenswürdigkeiten\" (tourist sights).",
    "tags": [
      "Reisen",
      "Tourismus",
      "Kultur",
      "Reisen & Tourismus",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0029",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Zeugnis",
    "focusWord": "das Zeugnis",
    "question": "Was ist \"das Zeugnis\"?",
    "options": [
      "Report card / Certificate / Diploma",
      "School bag",
      "Class test",
      "Grading scale"
    ],
    "correctAnswer": "Report card / Certificate / Diploma",
    "explanation": "\"Das Zeugnis\" dokumentiert offizielle Noten und Leistungen in Schule oder Beruf (certificate/report card).",
    "tags": [
      "Bildung",
      "Schule",
      "Arbeit",
      "Bildung & Schule",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0030",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Waste separation / Sorting",
    "focusWord": "Waste separation / Sorting",
    "question": "Wie heißt das umweltfreundliche Trennen von Abfall auf Deutsch?",
    "options": [
      "die Mülltrennung",
      "die Verschmutzung",
      "der Hausmüll",
      "das Recycling"
    ],
    "correctAnswer": "die Mülltrennung",
    "explanation": "In Deutschland trennt man Papier, Plastik, Bio und Restmüll: \"die Mülltrennung\".",
    "tags": [
      "Umwelt",
      "Alltag",
      "Nachhaltigkeit",
      "Umwelt & Alltag",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0031",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Nachricht",
    "focusWord": "die Nachricht",
    "question": "Welche Übersetzung passt zu \"die Nachricht\"?",
    "options": [
      "Message / News",
      "Postcard",
      "Advertisement",
      "Newspaper title"
    ],
    "correctAnswer": "Message / News",
    "explanation": "\"Die Nachricht\" bezeichnet eine Mitteilung oder News (message/news).",
    "tags": [
      "Medien",
      "Kommunikation",
      "Wortschatz",
      "Kommunikation & Medien",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0032",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Emergency doctor / Ambulance",
    "focusWord": "Emergency doctor / Ambulance",
    "question": "Wie heißt das Rettungsfahrzeug bei medizinischen Notfällen auf Deutsch?",
    "options": [
      "der Krankenwagen / Rettungswagen",
      "das Feuerwehrauto",
      "der Polizeiwagen",
      "das Taxi"
    ],
    "correctAnswer": "der Krankenwagen / Rettungswagen",
    "explanation": "Der Krankenwagen transportiert verletzte Personen schnell ins Krankenhaus.",
    "tags": [
      "Gesundheit",
      "Notfall",
      "Verkehr",
      "Gesundheit & Notfall",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0033",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "sourceWord": "geduldig",
    "focusWord": "geduldig",
    "question": "Was ist das Antonym (Gegenteil) von \"geduldig\"?",
    "options": [
      "ungeduldig",
      "höflich",
      "freundlich",
      "fleißig"
    ],
    "correctAnswer": "ungeduldig",
    "explanation": "Das Gegenteil von geduldig (patient) wird mit der Vorsilbe un- gebildet: ungeduldig (impatient).",
    "tags": [
      "Charakter",
      "Adjektive",
      "Gegenteile",
      "Charakter & Gefühle",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0034",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Quittung / der Kassenbon",
    "focusWord": "die Quittung / der Kassenbon",
    "question": "Was bedeutet \"der Kassenbon / die Quittung\"?",
    "options": [
      "Receipt",
      "Invoice",
      "Menu",
      "Discount coupon"
    ],
    "correctAnswer": "Receipt",
    "explanation": "Der Kassenbon/die Quittung ist der Zahlungsnachweis beim Einkaufen (receipt).",
    "tags": [
      "Einkaufen",
      "Alltag",
      "Wortschatz",
      "Alltag & Kleidung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WD-0035",
    "level": "A2",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Ruhezeit",
    "focusWord": "die Ruhezeit",
    "question": "Was ist \"die Ruhezeit\" in einer deutschen Wohnanlage?",
    "options": [
      "Quiet hours (e.g., 22:00 - 07:00, no loud noise)",
      "Lunch break at work",
      "Holiday period",
      "Office closing time"
    ],
    "correctAnswer": "Quiet hours (e.g., 22:00 - 07:00, no loud noise)",
    "explanation": "Ruhezeiten (Nachtruhe & Mittagsruhe) sind gesetzlich/hausordnungsrechtlich geschützte Zeiten gegen Lärm.",
    "tags": [
      "Wohnen",
      "Kultur",
      "Regeln",
      "Wohnen & Nachbarschaft",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A2-WB-0016",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte medizinische Rettungsfahrzeug:",
    "clues": [
      "Hinweis 1: Ich habe ein lautes Martinshorn und blaues Blinklicht (Blaulicht).",
      "Hinweis 2: In meinem Inneren gibt es eine Trage, Sauerstoffmasken und medizinische Notfallgeräte.",
      "Hinweis 3: Sanitäter und Notärzte fahren mit mir schnell zu verletzten Menschen."
    ],
    "options": [
      "Der Rettungswagen / Krankenwagen",
      "Das Feuerwehrauto",
      "Der Polizeiwagen",
      "Der Müllwagen"
    ],
    "correctAnswer": "Der Rettungswagen / Krankenwagen",
    "explanation": "Der Rettungswagen fährt Notfallpatienten schnell und erstversorgt ins Hospital.",
    "tags": [
      "Gesundheit",
      "Fahrzeuge",
      "Notfall",
      "Gesundheit & Rettung",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0017",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Transportmittel:",
    "clues": [
      "Hinweis 1: Ich habe Flügel, zwei oder vier Triebwerke und fliege in 10.000 Metern Höhe.",
      "Hinweis 2: Passagiere müssen sich anschnallen, wenn die Kontrollleuchten leuchten.",
      "Hinweis 3: Piloten und Flugbegleiter arbeiten an Bord."
    ],
    "options": [
      "Das Flugzeug",
      "Der Hubschrauber",
      "Der Heißluftballon",
      "Der Schnellzug"
    ],
    "correctAnswer": "Das Flugzeug",
    "explanation": "Das Flugzeug befördert Fluggäste auf langen Strecken durch die Luft.",
    "tags": [
      "Reisen",
      "Verkehr",
      "Technik",
      "Verkehr & Reisen",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0018",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte Hilfsorganisation:",
    "clues": [
      "Hinweis 1: In Deutschland wählt man die Notrufnummer 112, um uns zu rufen.",
      "Hinweis 2: Wir tragen rote oder gelbe Helme und feuerfeste Schutzkleidung.",
      "Hinweis 3: Wir löschen gefährliche Brände und retten Menschen und Tiere aus Notlagen."
    ],
    "options": [
      "Die Feuerwehr",
      "Die Polizei",
      "Der ADAC",
      "Das Rote Kreuz"
    ],
    "correctAnswer": "Die Feuerwehr",
    "explanation": "Die Feuerwehr bekämpft Brände und führt technische Hilfeleistungen durch.",
    "tags": [
      "Sicherheit",
      "Hilfe",
      "Berufe",
      "Notdienste & Sicherheit",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0019",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Nachschlagewerk:",
    "clues": [
      "Hinweis 1: Ich enthalte zehntausende Wörter in alphabetischer Reihenfolge.",
      "Hinweis 2: Hinter jedem Wort erkläre ich die Bedeutung, den Artikel oder die Übersetzung in eine andere Sprache.",
      "Hinweis 3: Bekannte deutsche Verlage für mich sind Duden, Langenscheidt und Pons."
    ],
    "options": [
      "Das Wörterbuch",
      "Der Roman",
      "Das Kochbuch",
      "Der Reiseführer"
    ],
    "correctAnswer": "Das Wörterbuch",
    "explanation": "Im Wörterbuch schlägt man Wortbedeutungen, Rechtschreibung und Übersetzungen nach.",
    "tags": [
      "Sprachen",
      "Lernen",
      "Bücher",
      "Lernen & Sprachen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0020",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Geschäft mit dem roten \"A\"-Symbol:",
    "clues": [
      "Hinweis 1: Mein Logo in Deutschland ist ein großes rotes \"A\" mit einer Schlange und einer Schale.",
      "Hinweis 2: Hier arbeiten Fachkräfte wie Pharmazeuten und pharmazeutisch-kaufmännische Angestellte.",
      "Hinweis 3: Man kauft hier Schmerzmittel, Hustensaft, Pflaster und löst ärztliche Rezepte ein."
    ],
    "options": [
      "Die Apotheke",
      "Die Drogerie",
      "Die Arztpraxis",
      "Das Sanitätshaus"
    ],
    "correctAnswer": "Die Apotheke",
    "explanation": "In der Apotheke erhält man rezeptpflichtige und freiverkäufliche Arzneimittel.",
    "tags": [
      "Gesundheit",
      "Medizin",
      "Orte",
      "Gesundheit & Orte",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0021",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das elektrische Reinigungsgerät:",
    "clues": [
      "Hinweis 1: Ich mache beim Putzen ein lautes Sauggeräusch.",
      "Hinweis 2: Ich habe ein langes Stromkabel, einen Schlauch und eine Bürste für Teppiche und Parkett.",
      "Hinweis 3: Ich sauge Krümel, Haare und Staub in einen Beutel oder Staubbehälter."
    ],
    "options": [
      "Der Staubsauger",
      "Der Föhn",
      "Die Waschmaschine",
      "Der Mixer"
    ],
    "correctAnswer": "Der Staubsauger",
    "explanation": "Der Staubsauger befreit Böden und Teppiche von Staub und Schmutz.",
    "tags": [
      "Haushalt",
      "Geräte",
      "Wohnen",
      "Wohnen & Reinigung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0022",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte Führungskraft im Unternehmen:",
    "clues": [
      "Hinweis 1: Ich leite eine Abteilung oder ein gesamtes Unternehmen.",
      "Hinweis 2: Ich verteile Aufgaben an Mitarbeiter, führe Feedbackgespräche und unterschreibe Arbeitsverträge.",
      "Hinweis 3: Meine Mitarbeiter nennen mich Chef, Vorgesetzter oder Geschäftsführer."
    ],
    "options": [
      "Der Chef / Vorgesetzte",
      "Der Praktikant",
      "Der Hausmeister",
      "Der Kunde"
    ],
    "correctAnswer": "Der Chef / Vorgesetzte",
    "explanation": "Der Vorgesetzte leitet das Team und trägt die Verantwortung für die Arbeitsergebnisse.",
    "tags": [
      "Arbeit",
      "Beruf",
      "Führung",
      "Arbeitswelt & Führung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0023",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Freizeitort:",
    "clues": [
      "Hinweis 1: Hier gibt es Hanteln, Laufbänder, Ergometer und Trainingskurse.",
      "Hinweis 2: Menschen kommen hierher, um Muskeln aufzubauen, Ausdauer zu trainieren und fit zu bleiben.",
      "Hinweis 3: Man schließt meist einen Mitgliedsvertrag ab und trainiert in Sportkleidung."
    ],
    "options": [
      "Das Fitnessstudio",
      "Das Schwimmbad",
      "Die Sporthalle",
      "Der Fußballplatz"
    ],
    "correctAnswer": "Das Fitnessstudio",
    "explanation": "Im Fitnessstudio trainiert man an Geräten und mit Gewichten für körperliche Fitness.",
    "tags": [
      "Sport",
      "Gesundheit",
      "Freizeit",
      "Sport & Freizeit",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0024",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das bargeldlose Zahlungsmittel:",
    "clues": [
      "Hinweis 1: Ich bin eine kleine Plastikkarte mit einem goldenen Chip und einem Magnetstreifen.",
      "Hinweis 2: Man kann mit mir kontaktlos an der Kasse oder online im Internet bezahlen.",
      "Hinweis 3: Bekannte Anbieter sind Visa, Mastercard oder Girocard."
    ],
    "options": [
      "Die Bankkarte / Kreditkarte",
      "Der Personalausweis",
      "Die Krankenkassenkarte",
      "Die Kundenkarte"
    ],
    "correctAnswer": "Die Bankkarte / Kreditkarte",
    "explanation": "Mit der Bank- oder Kreditkarte bezahlt man bargeldlos im Geschäft oder online.",
    "tags": [
      "Finanzen",
      "Einkaufen",
      "Technik",
      "Finanzen & Bezahlen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-WB-0025",
    "level": "A2",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Teil der Wohnung:",
    "clues": [
      "Hinweis 1: Ich bin eine Plattform im Freien an der Außenwand eines Hauses in höheren Stockwerken.",
      "Hinweis 2: Man stellt Pflanzen, Stühle und einen kleinen Tisch auf mich.",
      "Hinweis 3: Im Sommer frühstückt man gerne auf mir an der frischen Luft."
    ],
    "options": [
      "Der Balkon",
      "Der Keller",
      "Der Dachboden",
      "Die Garage"
    ],
    "correctAnswer": "Der Balkon",
    "explanation": "Auf dem Balkon genießt man die frische Luft und die Aussicht im Freien.",
    "tags": [
      "Wohnen",
      "Möbel",
      "Architektur",
      "Wohnen & Außenbereich",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A2-TB-0016",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du bist krank und kannst nicht arbeiten. Was musst du am ersten Morgen tun?",
    "options": [
      "Den Arbeitgeber vor Arbeitsbeginn telefonisch oder per E-Mail informieren und zum Arzt gehen.",
      "Einfach zu Hause bleiben und nichts sagen.",
      "Den Kollegen bitten, die Arbeit heimlich zu machen.",
      "Erst nach zwei Wochen anrufen."
    ],
    "correctAnswer": "Den Arbeitgeber vor Arbeitsbeginn telefonisch oder per E-Mail informieren und zum Arzt gehen.",
    "explanation": "In Deutschland ist man verpflichtet, den Arbeitgeber unverzüglich vor Dienstbeginn über die Arbeitsunfähigkeit zu informieren.",
    "tags": [
      "Arbeit",
      "Krankheit",
      "Regeln",
      "Arbeit & Krankmeldung",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0017",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Ein neu gekaufter Toaster funktioniert zu Hause nicht. Wie reklamierst du sachlich im Geschäft?",
    "options": [
      "Guten Tag, ich habe das Gerät gestern hier gekauft, aber es ist defekt. Hier ist mein Kassenbon.",
      "Ihr Geschäft verkauft nur Müll!",
      "Ich werfe das Gerät auf den Boden.",
      "Geben Sie mir einfach ein Auto als Entschädigung."
    ],
    "correctAnswer": "Guten Tag, ich habe das Gerät gestern hier gekauft, aber es ist defekt. Hier ist mein Kassenbon.",
    "explanation": "Bei einer Reklamation beschreibt man sachlich den Mangel und zeigt den Kaufbeleg (Kassenbon) vor.",
    "tags": [
      "Einkaufen",
      "Reklamation",
      "Kommunikation",
      "Einkaufen & Reklamation",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0018",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du möchtest eine Wohnung besichtigen. Welcher Satz in der schriftlichen Anfrage ist am besten?",
    "options": [
      "Sehr geehrte Damen und Herren, ich interessiere mich sehr für die 2-Zimmer-Wohnung und würde mich über einen Besichtigungstermin freuen.",
      "Hallo, ich nehme die Wohnung ab morgen.",
      "Wie viel kostet die Wohnung? Bitte billiger machen.",
      "Ich ziehe sofort ein ohne Vertrag."
    ],
    "correctAnswer": "Sehr geehrte Damen und Herren, ich interessiere mich sehr für die 2-Zimmer-Wohnung und würde mich über einen Besichtigungstermin freuen.",
    "explanation": "Eine formelle, höfliche Anfrage mit Anschreiben erhöht die Chancen auf einen Besichtigungstermin deutlich.",
    "tags": [
      "Wohnen",
      "Bewerbung",
      "Höflichkeit",
      "Wohnungssuche",
      "Arbeit & Beruf"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0019",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Am Fahrkartenschalter möchtest du ein Ticket nach Hamburg und nach einer Umsteigeverbindung fragen. Was sagst du?",
    "options": [
      "Ich möchte bitte eine einfache Fahrt nach Hamburg. Muss ich unterwegs umsteigen?",
      "Gibt es in Hamburg überhaupt Züge?",
      "Ich fahre lieber mit dem Fahrrad nach Hamburg.",
      "Verkaufen Sie mir Kaffee und Kuchen."
    ],
    "correctAnswer": "Ich möchte bitte eine einfache Fahrt nach Hamburg. Muss ich unterwegs umsteigen?",
    "explanation": "Am Schalter nennt man Reiseziel, Ticketart und erkundigt sich nach Umstiegen.",
    "tags": [
      "Reisen",
      "Bahn",
      "Dialog",
      "Reisen & Schalter",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0020",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Ein Freund hat starken Husten und Fieber. Welchen gut gemeinten Ratschlag mit Modalverb gibst du ihm?",
    "options": [
      "Du solltest unbedingt zum Arzt gehen und viel heißen Kräutertee trinken.",
      "Du musst jetzt 10 Kilometer rennen.",
      "Du darfst nichts mehr essen.",
      "Bleib wach und schlaf auf keinen Fall."
    ],
    "correctAnswer": "Du solltest unbedingt zum Arzt gehen und viel heißen Kräutertee trinken.",
    "explanation": "Für Ratschläge verwendet man das Konjunktiv-II-Modalverb \"solltest\": \"Du solltest zum Arzt gehen\".",
    "tags": [
      "Gesundheit",
      "Ratschlag",
      "Modalverben",
      "Gesundheit & Ratschlag",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0021",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Nach dem Umzug in eine neue deutsche Stadt musst du zum Bürgeramt. Was ist der Hauptgrund?",
    "options": [
      "Man muss sich innerhalb von zwei Wochen offiziell an der neuen Adresse anmelden (Wohnsitzanmeldung).",
      "Man muss dort seine Möbel abgeben.",
      "Man kauft dort Lebensmittel.",
      "Man muss dort eine Prüfung ablegen."
    ],
    "correctAnswer": "Man muss sich innerhalb von zwei Wochen offiziell an der neuen Adresse anmelden (Wohnsitzanmeldung).",
    "explanation": "In Deutschland gilt die gesetzliche Meldepflicht (Anmeldung des Wohnsitzes beim Einwohnermeldeamt / Bürgeramt).",
    "tags": [
      "Behörden",
      "Alltag",
      "Kultur",
      "Behörden & Amt",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0022",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du möchtest am Wochenende deinen Geburtstag feiern und es könnte etwas lauter werden. Wie verhältst du dich vorbildlich?",
    "options": [
      "Einen freundlichen Zettel im Hausflur aufhängen, die Nachbarn vorwarnen und um Verständnis bitten.",
      "Die Musik ohne Vorwarnung auf maximale Lautstärke drehen.",
      "Den Nachbarn verbieten, im Haus zu wohnen.",
      "Die Polizei vorab anrufen und beschimpfen."
    ],
    "correctAnswer": "Einen freundlichen Zettel im Hausflur aufhängen, die Nachbarn vorwarnen und um Verständnis bitten.",
    "explanation": "Eine schriftliche Ankündigung im Hausflur zeugt von Respekt und beugt Nachbarschaftskonflikten vor.",
    "tags": [
      "Wohnen",
      "Nachbarschaft",
      "Kultur",
      "Nachbarschaft & Höflichkeit",
      "Arbeit & Beruf"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0023",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Die Restaurantrechnung beträgt 36,50 Euro. Der Service war sehr aufmerksam und freundlich. Wie viel gibst du inklusive angemessenem Trinkgeld?",
    "options": [
      "Man rundet auf ca. 40 Euro auf (\"Machen Sie 40 Euro, bitte\").",
      "Man bezahlt exakt 36,50 Euro und verlangt 50 Cent Rabatt.",
      "Man gibt 100 Euro Trinkgeld zusätzlich.",
      "Man bezahlt gar nichts und rennt weg."
    ],
    "correctAnswer": "Man rundet auf ca. 40 Euro auf (\"Machen Sie 40 Euro, bitte\").",
    "explanation": "In Deutschland sind 5-10% Trinkgeld üblich. Man rundet den Betrag beim Bezahlen direkt auf (z. B. auf 40 Euro).",
    "tags": [
      "Restaurant",
      "Trinkgeld",
      "Kultur",
      "Restaurant & Trinkgeld",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0024",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du musst einen geschäftlichen Termin mit einem Kunden verschieben. Welcher Satz ist professionell?",
    "options": [
      "Leider muss ich unseren Termin verschieben. Passt es Ihnen am kommenden Donnerstag um 14 Uhr?",
      "Ich habe keine Lust auf den Termin heute.",
      "Kommen Sie nie wieder zu mir.",
      "Termine sind unnötig."
    ],
    "correctAnswer": "Leider muss ich unseren Termin verschieben. Passt es Ihnen am kommenden Donnerstag um 14 Uhr?",
    "explanation": "Professionelle Terminabsagen nennen Bedauern und schlagen sofort einen Alternativtermin vor.",
    "tags": [
      "Arbeit",
      "Termine",
      "Höflichkeit",
      "Arbeitswelt & Terminabsage",
      "Arbeit & Beruf"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0025",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du möchtest ein Girokonto bei einer deutschen Bank eröffnen. Was musst du mitbringen?",
    "options": [
      "Gültigen Personalausweis oder Reisepass und die Meldebescheinigung der Stadt.",
      "Nur ein altes Schulfoto.",
      "Ein Spielzeugauto als Pfand.",
      "Gar keine Dokumente."
    ],
    "correctAnswer": "Gültigen Personalausweis oder Reisepass und die Meldebescheinigung der Stadt.",
    "explanation": "Banken verlangen zur gesetzlichen Identitätsprüfung einen amtlichen Lichtbildausweis und die Meldebescheinigung.",
    "tags": [
      "Bank",
      "Finanzen",
      "Alltag",
      "Bank & Finanzen",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0026",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Im Hotelzimmer funktioniert die Heizung nicht und es ist eiskalt. Was sagst du an der Rezeption?",
    "options": [
      "Guten Abend, in Zimmer 204 funktioniert leider die Heizung nicht. Könnten Sie bitte jemanden schicken?",
      "Ihr ganzes Hotel ist eine Katastrophe!",
      "Ich zünde das Hotel an, damit es warm wird.",
      "Kälte ist gesund, danke schön."
    ],
    "correctAnswer": "Guten Abend, in Zimmer 204 funktioniert leider die Heizung nicht. Könnten Sie bitte jemanden schicken?",
    "explanation": "Eine höfliche, präzise Mängelanzeige ermöglicht dem Personal eine schnelle Behebung des Problems.",
    "tags": [
      "Hotel",
      "Beschwerde",
      "Höflichkeit",
      "Hotel & Beschwerde",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0027",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Welche Glückwunschformel wünscht man in Deutschland am 31. Dezember / 1. Januar?",
    "options": [
      "Einen guten Rutsch! / Ein frohes neues Jahr!",
      "Frohe Ostern!",
      "Herzliches Beileid!",
      "Gute Besserung!"
    ],
    "correctAnswer": "Einen guten Rutsch! / Ein frohes neues Jahr!",
    "explanation": "Zu Silvester und Neujahr wünscht man \"Einen guten Rutsch\" bzw. \"Ein frohes neues Jahr\".",
    "tags": [
      "Feste",
      "Kultur",
      "Bräuche",
      "Kultur & Feste",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0028",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Ihr plant einen Ausflug ins Grüne. Welche Frage klärt die gemeinsame Organisation am besten?",
    "options": [
      "Wollen wir am Samstag mit der S-Bahn zum See fahren und jeder bringt etwas zum Picknicken mit?",
      "Wer zahlt alles für mich?",
      "Warum fahrt ihr ohne mich?",
      "Ist der Wald gefährlich?"
    ],
    "correctAnswer": "Wollen wir am Samstag mit der S-Bahn zum See fahren und jeder bringt etwas zum Picknicken mit?",
    "explanation": "Ein strukturierter Vorschlag nennt Zeit, Verkehrsmittel, Zielort und Aufgabenverteilung.",
    "tags": [
      "Freizeit",
      "Planung",
      "Ausflug",
      "Freizeit & Verabredung",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0029",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Dein Auto hat auf der Autobahn eine Panne. Was musst du zur eigenen Sicherheit sofort tun?",
    "options": [
      "Warnblinkanlage einschalten, Warnweste anziehen, Warndreieck aufstellen und hinter die Leitplanke treten.",
      "Mitten auf der Autobahn stehen bleiben und Fotos machen.",
      "Im Auto sitzen bleiben und laut Musik hören.",
      "Zu Fuß über die Autobahn laufen."
    ],
    "correctAnswer": "Warnblinkanlage einschalten, Warnweste anziehen, Warndreieck aufstellen und hinter die Leitplanke treten.",
    "explanation": "Sicherheitsregeln bei Pannen: Warnweste, Warndreieck und Aufenthalt hinter der Schutzplanke.",
    "tags": [
      "Verkehr",
      "Sicherheit",
      "Notfall",
      "Verkehr & Autopanne",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A2-TB-0030",
    "level": "A2",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Am letzten Tag des Deutschkurses bedankt sich die Gruppe bei Lehrer Farh. Welcher Satz drückt die Wertschätzung am besten aus?",
    "options": [
      "Lieber Farh, vielen herzlichen Dank für den tollen Unterricht! Wir haben sehr viel gelernt.",
      "Der Kurs ist endlich vorbei, tschüss.",
      "Wir haben gar nichts verstanden.",
      "Geben Sie uns allen die Note 1 ohne Test."
    ],
    "correctAnswer": "Lieber Farh, vielen herzlichen Dank für den tollen Unterricht! Wir haben sehr viel gelernt.",
    "explanation": "Ein herzlicher Dank an die Lehrkraft würdigt das Engagement und den Lernerfolg der Klasse.",
    "tags": [
      "Schule",
      "Höflichkeit",
      "Sprachkurs",
      "Bildung & Kursabschluss",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  }
];
