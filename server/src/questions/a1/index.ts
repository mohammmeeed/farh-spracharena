import { BankQuestion } from '../questionTypes.js';

/**
 * A1 Level Question Bank - Farh SprachArena
 * Exactly 175 Questions categorized by the 6 Canonical Categories:
 * - Grammatik & Satzbau
 * - Wortschatz & Synonyme
 * - Alltag & Konversation
 * - Reisen & Mobilität
 * - Arbeit & Beruf
 * - Gesundheit & Ernährung
 */
export const A1_QUESTIONS: BankQuestion[] = [
  {
    "id": "A1-SA-0001",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Guten Morgen! Wie ___ es Ihnen?",
    "options": [
      "geht",
      "gehen",
      "gehe",
      "gehst"
    ],
    "correctAnswer": "geht",
    "explanation": "Die feste Höflichkeitsformel lautet: \"Wie geht es Ihnen?\" (\"geht\" ist 3. Person Singular von \"es geht\").",
    "tags": [
      "Begrüßung",
      "Höflichkeit",
      "Präsens",
      "Begrüßung & Höflichkeit",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0002",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich ___ Deutsch im Unterricht mit Farh.",
    "options": [
      "lerne",
      "lernst",
      "lernt",
      "lernen"
    ],
    "correctAnswer": "lerne",
    "explanation": "Die 1. Person Singular (\"ich\") der regelmäßigen Verben endet auf -e: \"ich lerne\".",
    "tags": [
      "Verben",
      "Konjugation",
      "Präsens",
      "Verben & Konjugation",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0003",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Das ist mein Bruder. ___ heißt Lukas.",
    "options": [
      "Er",
      "Sie",
      "Es",
      "Du"
    ],
    "correctAnswer": "Er",
    "explanation": "\"Der Bruder\" ist maskulin, daher verwendet man das Personalpronomen \"er\".",
    "tags": [
      "Pronomen",
      "Familie",
      "Maskulinum",
      "Personalpronomen",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0004",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was ist das Ergebnis: zehn plus fünf = ___",
    "options": [
      "fünfzehn",
      "fünfzig",
      "vierzehn",
      "sechzehn"
    ],
    "correctAnswer": "fünfzehn",
    "explanation": "10 + 5 = 15 auf Deutsch heißt \"fünfzehn\".",
    "tags": [
      "Zahlen",
      "Grundrechenarten",
      "Zahlen & Mathematik",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0005",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Zum Frühstück trinke ich immer ___ Kaffee.",
    "options": [
      "einen",
      "eine",
      "ein",
      "einem"
    ],
    "correctAnswer": "einen",
    "explanation": "\"Kaffee\" ist maskulin (der Kaffee) und steht als Akkusativobjekt: \"einen Kaffee\".",
    "tags": [
      "Akkusativ",
      "Essen",
      "Artikel",
      "Essen & Trinken",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0006",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Wo ist die Lampe? — Sie steht auf ___ Tisch.",
    "options": [
      "dem",
      "den",
      "das",
      "die"
    ],
    "correctAnswer": "dem",
    "explanation": "Die Frage \"Wo?\" verlangt bei Wechselpräpositionen den Dativ: \"auf dem Tisch\" (maskulin: der -> dem).",
    "tags": [
      "Dativ",
      "Präpositionen",
      "Wohnen",
      "Wohnen & Präpositionen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0007",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Es ist 14:30 Uhr. Auf Deutsch sagt man im Alltag: Es ist ___ drei.",
    "options": [
      "halb",
      "vor",
      "nach",
      "viertel"
    ],
    "correctAnswer": "halb",
    "explanation": "14:30 Uhr bedeutet: eine halbe Stunde bis 15 Uhr, also \"halb drei\".",
    "tags": [
      "Uhrzeit",
      "Alltag",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0008",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Im Sommer scheint die Sonne und es ist sehr ___ .",
    "options": [
      "warm",
      "kalt",
      "schneeig",
      "frostig"
    ],
    "correctAnswer": "warm",
    "explanation": "Im Sommer ist das Wetter typischerweise warm oder heiß.",
    "tags": [
      "Wetter",
      "Jahreszeiten",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0009",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Am Samstag ___ meine Freunde und ich Fußball.",
    "options": [
      "spielen",
      "spielt",
      "spiele",
      "spielst"
    ],
    "correctAnswer": "spielen",
    "explanation": "\"Meine Freunde und ich\" entspricht dem Personalpronomen \"wir\" (1. Person Plural: spielen).",
    "tags": [
      "Verben",
      "Plural",
      "Sport",
      "Freizeit & Verben",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0010",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich fahre jeden Morgen mit ___ Bus zur Sprachschule.",
    "options": [
      "dem",
      "den",
      "das",
      "der"
    ],
    "correctAnswer": "dem",
    "explanation": "Die Präposition \"mit\" verlangt ausnahmslos den Dativ: \"mit dem Bus\" (der Bus -> dem Bus).",
    "tags": [
      "Dativ",
      "Präpositionen",
      "Verkehr",
      "Verkehr & Dativ",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0011",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Entschuldigung, ___ du einen Stift für mich?",
    "options": [
      "hast",
      "hat",
      "haben",
      "habe"
    ],
    "correctAnswer": "hast",
    "explanation": "Die 2. Person Singular (\"du\") vom Verb haben lautet \"du hast\".",
    "tags": [
      "haben",
      "Konjugation",
      "Schule",
      "Verb haben",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0012",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wir ___ heute sehr glücklich.",
    "options": [
      "sind",
      "seid",
      "ist",
      "bin"
    ],
    "correctAnswer": "sind",
    "explanation": "Die 1. Person Plural (\"wir\") vom unregelmäßigen Verb sein lautet \"wir sind\".",
    "tags": [
      "sein",
      "Verben",
      "Verb sein",
      "Grammatik & Satzbau",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0013",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "___ wohnst du? — In Frankfurt.",
    "options": [
      "Wo",
      "Woher",
      "Wohin",
      "Wer"
    ],
    "correctAnswer": "Wo",
    "explanation": "Nach einem festen Ort fragt man mit dem Fragewort \"Wo?\". (\"Woher\" = Herkunft, \"Wohin\" = Richtung).",
    "tags": [
      "W-Fragen",
      "Fragewörter",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0014",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "___ kommst du? — Aus Spanien.",
    "options": [
      "Woher",
      "Wohin",
      "Wo",
      "Was"
    ],
    "correctAnswer": "Woher",
    "explanation": "Nach der Herkunft (\"aus...\") fragt man immer mit \"Woher?\".",
    "tags": [
      "W-Fragen",
      "Herkunft",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0015",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich habe leider ___ Zeit für das Kino.",
    "options": [
      "keine",
      "nicht",
      "kein",
      "keinen"
    ],
    "correctAnswer": "keine",
    "explanation": "\"Zeit\" ist feminin (die Zeit) und ein Nomen ohne bestimmten Artikel; daher wird es mit \"keine\" negiert.",
    "tags": [
      "Negation",
      "kein-nicht",
      "Nomen",
      "Grammatik & Satzbau",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0016",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Das Buch ist ___ teuer, es kostet nur fünf Euro.",
    "options": [
      "nicht",
      "kein",
      "keine",
      "keinen"
    ],
    "correctAnswer": "nicht",
    "explanation": "Adjektive wie \"teuer\" werden im Deutschen immer mit \"nicht\" verneint.",
    "tags": [
      "Negation",
      "Adjektive",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0017",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ist das ___ Tasche, Sarah? — Ja, das ist meine Tasche.",
    "options": [
      "deine",
      "dein",
      "deinen",
      "deinem"
    ],
    "correctAnswer": "deine",
    "explanation": "\"Tasche\" ist feminin (die Tasche). Im Nominativ lautet der Possessivartikel \"deine\".",
    "tags": [
      "Possessivartikel",
      "Femininum",
      "Grammatik & Satzbau",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0018",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Peter sucht ___ Schlüssel. Er kann ihn nicht finden.",
    "options": [
      "seinen",
      "seine",
      "sein",
      "seinem"
    ],
    "correctAnswer": "seinen",
    "explanation": "\"Schlüssel\" ist maskulin (der Schlüssel) und steht im Akkusativ: \"seinen Schlüssel\".",
    "tags": [
      "Possessivartikel",
      "Akkusativ",
      "Maskulinum",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0019",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Deutschkurs ___ um neun Uhr morgens ___ .",
    "options": [
      "fängt ... an",
      "steht ... auf",
      "kauft ... ein",
      "kommt ... mit"
    ],
    "correctAnswer": "fängt ... an",
    "explanation": "\"anfangen\" ist ein trennbares Verb: \"Der Kurs fängt ... an\".",
    "tags": [
      "Trennbare Verben",
      "Präsens",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0020",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Am Samstag kaufe ich im Supermarkt ___ .",
    "options": [
      "ein",
      "auf",
      "aus",
      "ab"
    ],
    "correctAnswer": "ein",
    "explanation": "Das trennbare Verb heißt \"einkaufen\" (ich kaufe ... ein).",
    "tags": [
      "Trennbare Verben",
      "Einkaufen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0021",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Hier im Krankenhaus ___ man nicht rauchen.",
    "options": [
      "darf",
      "muss",
      "will",
      "kannst"
    ],
    "correctAnswer": "darf",
    "explanation": "\"nicht dürfen\" drückt ein striktes Verbot aus: \"Hier darf man nicht rauchen\".",
    "tags": [
      "Modalverben",
      "Verbot",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0022",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich habe morgen eine Prüfung, ich ___ heute viel lernen.",
    "options": [
      "muss",
      "darf",
      "mag",
      "dürfen"
    ],
    "correctAnswer": "muss",
    "explanation": "\"müssen\" drückt eine Notwendigkeit oder Pflicht aus (ich muss lernen).",
    "tags": [
      "Modalverben",
      "Pflicht",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0023",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Mein Vater ___ jeden Tag die Zeitung.",
    "options": [
      "liest",
      "lest",
      "lese",
      "lesen"
    ],
    "correctAnswer": "liest",
    "explanation": "Das Verb \"lesen\" hat einen Vokalwechsel in der 2. und 3. Person Singular: er/sie/es liest (e -> ie).",
    "tags": [
      "Vokalwechsel",
      "Verben",
      "Unregelmäßige Verben",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0024",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Was ___ du heute zu Mittag?",
    "options": [
      "isst",
      "esst",
      "esse",
      "essen"
    ],
    "correctAnswer": "isst",
    "explanation": "Das Verb \"essen\" wechselt im Präsens für \"du\": du isst (e -> i).",
    "tags": [
      "Vokalwechsel",
      "Essen",
      "Unregelmäßige Verben",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0025",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "___ Montag habe ich keinen Unterricht.",
    "options": [
      "Am",
      "Im",
      "Um",
      "An"
    ],
    "correctAnswer": "Am",
    "explanation": "Bei Wochentagen und Tageszeiten verwendet man die Präposition \"am\" (an + dem).",
    "tags": [
      "Zeit",
      "Präpositionen",
      "Wochentage",
      "Wochentage & Präpositionen",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0026",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Film beginnt genau ___ 20:15 Uhr.",
    "options": [
      "um",
      "am",
      "im",
      "von"
    ],
    "correctAnswer": "um",
    "explanation": "Bei präzisen Uhrzeitangaben steht immer die Präposition \"um\".",
    "tags": [
      "Uhrzeit",
      "Präpositionen",
      "Uhrzeit & Präpositionen",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0027",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "___ Juli haben viele Schüler in Deutschland Sommerferien.",
    "options": [
      "Im",
      "Am",
      "Um",
      "Auf"
    ],
    "correctAnswer": "Im",
    "explanation": "Bei Monaten und Jahreszeiten verwendet man die temporale Präposition \"im\" (in + dem).",
    "tags": [
      "Monate",
      "Zeit",
      "Präpositionen",
      "Monate & Jahreszeiten",
      "Alltag & Konversation",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0028",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Kinder, seid leise und ___ eure Hausaufgaben!",
    "options": [
      "macht",
      "machen",
      "mache",
      "machst"
    ],
    "correctAnswer": "macht",
    "explanation": "Der Imperativ Plural (\"ihr\") entspricht dem Verbstamm + -t: \"macht!\".",
    "tags": [
      "Imperativ",
      "Aufforderung",
      "Grammatik & Satzbau",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0029",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Herr Müller, ___ Sie bitte hier Platz!",
    "options": [
      "nehmen",
      "nehmt",
      "nimm",
      "nimmst"
    ],
    "correctAnswer": "nehmen",
    "explanation": "Der Höflichkeits-Imperativ (\"Sie\") wird mit dem Infinitiv + Sie gebildet: \"Nehmen Sie!\".",
    "tags": [
      "Imperativ",
      "Höflichkeit",
      "Imperativ Höflichkeitsform",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0030",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich helfe ___ alten Dame beim Tragen der Taschen.",
    "options": [
      "der",
      "die",
      "das",
      "den"
    ],
    "correctAnswer": "der",
    "explanation": "Das Verb \"helfen\" verlangt immer den Dativ: \"die Dame\" (feminin) wird im Dativ zu \"der Dame\".",
    "tags": [
      "Dativ",
      "Verben",
      "helfen",
      "Dativobjekt Verben",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0031",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ein Apfel schmeckt gut, aber zwei ___ sind noch besser.",
    "options": [
      "Äpfel",
      "Apfeln",
      "Äpfele",
      "Apfels"
    ],
    "correctAnswer": "Äpfel",
    "explanation": "Der Plural von \"der Apfel\" ist mit Umlaut \"die Äpfel\".",
    "tags": [
      "Plural",
      "Nomen",
      "Essen",
      "Pluralbildung",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0032",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Im Klassenzimmer stehen zwanzig Tische und zwanzig ___ .",
    "options": [
      "Stühle",
      "Stuhle",
      "Stühlen",
      "Stühler"
    ],
    "correctAnswer": "Stühle",
    "explanation": "Der Plural von \"der Stuhl\" lautet \"die Stühle\".",
    "tags": [
      "Plural",
      "Möbel",
      "Pluralbildung",
      "Grammatik & Satzbau",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0033",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Danke schön für Ihre Hilfe! — ___ !",
    "options": [
      "Bitte sehr",
      "Guten Tag",
      "Auf Wiedersehen",
      "Entschuldigung"
    ],
    "correctAnswer": "Bitte sehr",
    "explanation": "Auf \"Danke\" oder \"Danke schön\" antwortet man höflich mit \"Bitte\" oder \"Bitte sehr\".",
    "tags": [
      "Kommunikation",
      "Höflichkeit",
      "Alltagskommunikation",
      "Alltag & Konversation"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-SA-0034",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Entschuldigung, was ___ die Tomaten?",
    "options": [
      "kosten",
      "kostet",
      "koste",
      "kostest"
    ],
    "correctAnswer": "kosten",
    "explanation": "\"Die Tomaten\" steht im Plural, daher muss das Verb \"kosten\" im Plural stehen (3. Person Plural).",
    "tags": [
      "Einkaufen",
      "Plural",
      "Verben",
      "Einkaufen & Preise",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0035",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich wohne ___ Deutschland, aber meine Eltern leben ___ der Schweiz.",
    "options": [
      "in ... in",
      "in ... in der",
      "nach ... in",
      "aus ... bei"
    ],
    "correctAnswer": "in ... in der",
    "explanation": "Länder ohne Artikel nehmen \"in Deutschland\", aber feminine Länder wie die Schweiz verlangen im Dativ \"in der Schweiz\".",
    "tags": [
      "Länder",
      "Präpositionen",
      "Dativ",
      "Wohnort & Präpositionen",
      "Grammatik & Satzbau",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SR-0001",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bringe die Wörter in die richtige Reihenfolge:",
    "words": [
      "Ich",
      "gerne",
      "lerne",
      "Deutsch."
    ],
    "correctOrder": [
      "Ich",
      "lerne",
      "gerne",
      "Deutsch."
    ],
    "correctAnswer": [
      "Ich",
      "lerne",
      "gerne",
      "Deutsch."
    ],
    "explanation": "Im deutschen Aussagesatz steht das finite Verb immer an Position 2.",
    "tags": [
      "Satzbau",
      "Hauptsatz",
      "Hauptsatz / Satzbau",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0002",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die richtige Frage nach dem Wohnort:",
    "words": [
      "Wo",
      "du",
      "wohnst",
      "in Deutschland",
      "?"
    ],
    "correctOrder": [
      "Wo",
      "wohnst",
      "du",
      "in Deutschland",
      "?"
    ],
    "correctAnswer": [
      "Wo",
      "wohnst",
      "du",
      "in Deutschland",
      "?"
    ],
    "explanation": "In der W-Frage steht das Fragewort an Position 1, danach folgt das konjugierte Verb.",
    "tags": [
      "Fragesatz",
      "W-Frage",
      "W-Fragen",
      "Grammatik & Satzbau",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-SR-0003",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde eine korrekte Ja/Nein-Frage:",
    "words": [
      "Trinkst",
      "einen Kaffee",
      "du",
      "gerne",
      "?"
    ],
    "correctOrder": [
      "Trinkst",
      "du",
      "gerne",
      "einen Kaffee",
      "?"
    ],
    "correctAnswer": [
      "Trinkst",
      "du",
      "gerne",
      "einen Kaffee",
      "?"
    ],
    "explanation": "In Ja/Nein-Fragen steht das finite Verb an Position 1, gefolgt vom Subjekt.",
    "tags": [
      "Fragesatz",
      "Ja/Nein-Frage",
      "Ja/Nein-Fragen",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0004",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Gesundheit & Ernährung",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bringe den Satz mit Modalverb in die richtige Reihenfolge:",
    "words": [
      "Wir",
      "heute Abend",
      "können",
      "zusammen kochen."
    ],
    "correctOrder": [
      "Wir",
      "können",
      "heute Abend",
      "zusammen kochen."
    ],
    "correctAnswer": [
      "Wir",
      "können",
      "heute Abend",
      "zusammen kochen."
    ],
    "explanation": "Das konjugierte Modalverb steht an Position 2, der Vollverb-Infinitiv am Satzende (Satzklammer).",
    "tags": [
      "Modalverben",
      "Satzklammer",
      "Grammatik & Satzbau",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 30
  },
  {
    "id": "A1-SR-0005",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bringe die Satzglieder in die korrekte Reihenfolge (Zeit an Pos. 1):",
    "words": [
      "Am Morgen",
      "frühstücke",
      "ich",
      "um sieben Uhr."
    ],
    "correctOrder": [
      "Am Morgen",
      "frühstücke",
      "ich",
      "um sieben Uhr."
    ],
    "correctAnswer": [
      "Am Morgen",
      "frühstücke",
      "ich",
      "um sieben Uhr."
    ],
    "explanation": "Steht die Zeitangabe auf Position 1, steht das Verb auf Position 2 und das Subjekt auf Position 3.",
    "tags": [
      "Inversion",
      "Tagesablauf",
      "Inversion / Zeitangabe",
      "Grammatik & Satzbau",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0006",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde einen höflichen Wunsch beim Einkaufen:",
    "words": [
      "Ich",
      "zwei Kilo Äpfel",
      "möchte",
      "bitte."
    ],
    "correctOrder": [
      "Ich",
      "möchte",
      "bitte",
      "zwei Kilo Äpfel."
    ],
    "correctAnswer": [
      "Ich",
      "möchte",
      "bitte",
      "zwei Kilo Äpfel."
    ],
    "explanation": "Das Verb \"möchte\" steht auf Position 2.",
    "tags": [
      "Einkaufen",
      "Höflichkeit",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0007",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit dem trennbaren Verb \"aufstehen\":",
    "words": [
      "Er",
      "jeden Tag",
      "steht",
      "um sechs Uhr",
      "auf."
    ],
    "correctOrder": [
      "Er",
      "steht",
      "jeden Tag",
      "um sechs Uhr",
      "auf."
    ],
    "correctAnswer": [
      "Er",
      "steht",
      "jeden Tag",
      "um sechs Uhr",
      "auf."
    ],
    "explanation": "Der Verbstamm (\"steht\") steht an Position 2, das trennbare Präfix (\"auf\") steht ganz am Satzende.",
    "tags": [
      "Trennbare Verben",
      "Tagesablauf",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0008",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit \"fernsehen\":",
    "words": [
      "Wir",
      "am Abend",
      "sehen",
      "zusammen",
      "fern."
    ],
    "correctOrder": [
      "Wir",
      "sehen",
      "am Abend",
      "zusammen",
      "fern."
    ],
    "correctAnswer": [
      "Wir",
      "sehen",
      "am Abend",
      "zusammen",
      "fern."
    ],
    "explanation": "\"fernsehen\" trennt sich im Hauptsatz: \"sehen\" auf Pos. 2, \"fern\" ans Ende.",
    "tags": [
      "Trennbare Verben",
      "Freizeit",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0009",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde einen verneinten Satz mit \"nicht\":",
    "words": [
      "Ich",
      "heute",
      "verstehe",
      "die Hausaufgabe",
      "nicht."
    ],
    "correctOrder": [
      "Ich",
      "verstehe",
      "die Hausaufgabe",
      "heute",
      "nicht."
    ],
    "correctAnswer": [
      "Ich",
      "verstehe",
      "die Hausaufgabe",
      "heute",
      "nicht."
    ],
    "explanation": "Das finite Verb steht an Position 2, \"nicht\" verneint den gesamten Satzinhalt am Ende.",
    "tags": [
      "Negation",
      "Satzbau",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0010",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bringe die Wörter für eine persönliche Vorstellung in die Reihe:",
    "words": [
      "Mein Name",
      "und",
      "ist Farh",
      "ich bin Lehrer."
    ],
    "correctOrder": [
      "Mein Name",
      "ist Farh",
      "und",
      "ich bin Lehrer."
    ],
    "correctAnswer": [
      "Mein Name",
      "ist Farh",
      "und",
      "ich bin Lehrer."
    ],
    "explanation": "Zwei Hauptsätze werden mit der Konjunktion \"und\" auf Position 0 verbunden.",
    "tags": [
      "Vorstellung",
      "Konnektoren",
      "Familie & Vorstellung",
      "Grammatik & Satzbau",
      "Arbeit & Beruf"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0011",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit Akkusativobjekt:",
    "words": [
      "Der Schüler",
      "einen langen Text",
      "schreibt",
      "im Heft."
    ],
    "correctOrder": [
      "Der Schüler",
      "schreibt",
      "einen langen Text",
      "im Heft."
    ],
    "correctAnswer": [
      "Der Schüler",
      "schreibt",
      "einen langen Text",
      "im Heft."
    ],
    "explanation": "Subjekt (Der Schüler) -> Verb (schreibt) -> Akkusativobjekt (einen langen Text) -> Ortsangabe.",
    "tags": [
      "Akkusativ",
      "Satzbau",
      "Akkusativobjekt",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0012",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Ordne die Satzglieder richtig:",
    "words": [
      "Sie",
      "mit ihrer Freundin",
      "fährt",
      "nach Berlin."
    ],
    "correctOrder": [
      "Sie",
      "fährt",
      "mit ihrer Freundin",
      "nach Berlin."
    ],
    "correctAnswer": [
      "Sie",
      "fährt",
      "mit ihrer Freundin",
      "nach Berlin."
    ],
    "explanation": "Verb an Position 2 (fährt), modale Angabe (mit ihrer Freundin), Richtungsangabe (nach Berlin).",
    "tags": [
      "Dativ",
      "Präpositionen",
      "Reisen",
      "Dativ mit Präposition",
      "Grammatik & Satzbau",
      "Reisen & Mobilität"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0013",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde eine Bestellung im Restaurant:",
    "words": [
      "Wir",
      "ein Mineralwasser",
      "hätten gerne",
      "bitte."
    ],
    "correctOrder": [
      "Wir",
      "hätten gerne",
      "ein Mineralwasser",
      "bitte."
    ],
    "correctAnswer": [
      "Wir",
      "hätten gerne",
      "ein Mineralwasser",
      "bitte."
    ],
    "explanation": "\"hätten gerne\" bildet die höfliche Prädikatsform an Position 2.",
    "tags": [
      "Restaurant",
      "Höflichkeit",
      "Grammatik & Satzbau",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-SR-0014",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde einen Satz mit \"wollen\":",
    "words": [
      "Meine Schwester",
      "im Sommer",
      "will",
      "Spanisch lernen."
    ],
    "correctOrder": [
      "Meine Schwester",
      "will",
      "im Sommer",
      "Spanisch lernen."
    ],
    "correctAnswer": [
      "Meine Schwester",
      "will",
      "im Sommer",
      "Spanisch lernen."
    ],
    "explanation": "Modalverb \"will\" steht an Position 2, der Infinitiv \"lernen\" steht ganz am Satzende.",
    "tags": [
      "Modalverben",
      "Satzklammer",
      "Modalverb wollen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0015",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde eine Frage zur Uhrzeit:",
    "words": [
      "Um wie viel Uhr",
      "der Deutschunterricht",
      "beginnt",
      "?"
    ],
    "correctOrder": [
      "Um wie viel Uhr",
      "beginnt",
      "der Deutschunterricht",
      "?"
    ],
    "correctAnswer": [
      "Um wie viel Uhr",
      "beginnt",
      "der Deutschunterricht",
      "?"
    ],
    "explanation": "Fragewortgruppe (\"Um wie viel Uhr\") an Position 1, finites Verb (\"beginnt\") an Position 2, Subjekt danach.",
    "tags": [
      "Fragesatz",
      "Uhrzeit",
      "W-Fragen mit Präposition",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-WD-0001",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Tisch",
    "focusWord": "der Tisch",
    "question": "Welcher Artikel und welche Bedeutung passen zu diesem Wort?",
    "options": [
      "der Tisch (Table)",
      "die Tisch (Chair)",
      "das Tisch (Bed)",
      "die Tische (Cupboard)"
    ],
    "correctAnswer": "der Tisch (Table)",
    "explanation": "\"Tisch\" ist maskulin: der Tisch (Englisch: table).",
    "tags": [
      "Artikel",
      "Möbel",
      "Möbel & Artikel",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0002",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Apple",
    "focusWord": "Apple",
    "question": "Wie heißt \"Apple\" mit dem richtigen Artikel auf Deutsch?",
    "options": [
      "der Apfel",
      "die Birne",
      "die Banane",
      "die Orange"
    ],
    "correctAnswer": "der Apfel",
    "explanation": "Apple heißt auf Deutsch \"der Apfel\" (maskulin).",
    "tags": [
      "Essen",
      "Obst",
      "Obst & Lebensmittel",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0003",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Hose",
    "focusWord": "die Hose",
    "question": "Was bedeutet \"die Hose\"?",
    "options": [
      "Trousers / Pants",
      "Shirt / T-Shirt",
      "Jacket / Coat",
      "Shoes"
    ],
    "correctAnswer": "Trousers / Pants",
    "explanation": "\"Die Hose\" bezeichnet das Kleidungsstück für die Beine (trousers/pants).",
    "tags": [
      "Kleidung",
      "Wortschatz",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0004",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Red",
    "focusWord": "Red",
    "question": "Wie heißt die Farbe \"Red\" auf Deutsch?",
    "options": [
      "rot",
      "blau",
      "gelb",
      "grün"
    ],
    "correctAnswer": "rot",
    "explanation": "Red = rot.",
    "tags": [
      "Farben",
      "Adjektive",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-WD-0005",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Auge",
    "focusWord": "das Auge",
    "question": "Welcher Plural und welche Bedeutung gehören zu \"das Auge\"?",
    "options": [
      "das Auge (Eye) -> die Augen",
      "der Auge (Ear) -> die Augen",
      "die Auge (Hand) -> die Augen",
      "das Auge (Mouth) -> die Äuger"
    ],
    "correctAnswer": "das Auge (Eye) -> die Augen",
    "explanation": "\"Auge\" ist neutral: das Auge, Plural: die Augen (Englisch: eye/eyes).",
    "tags": [
      "Körper",
      "Plural",
      "Körperteile",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0006",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Schwester",
    "focusWord": "die Schwester",
    "question": "Was bedeutet \"die Schwester\"?",
    "options": [
      "Sister",
      "Brother",
      "Mother",
      "Daughter"
    ],
    "correctAnswer": "Sister",
    "explanation": "\"Die Schwester\" bedeutet Schwester (sister).",
    "tags": [
      "Familie",
      "Personen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-WD-0007",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Gabel",
    "focusWord": "die Gabel",
    "question": "Was bedeutet \"die Gabel\" beim Besteck?",
    "options": [
      "Fork",
      "Spoon (der Löffel)",
      "Knife (das Messer)",
      "Plate (der Teller)"
    ],
    "correctAnswer": "Fork",
    "explanation": "\"Die Gabel\" ist die Fork (Gabel, Messer, Löffel).",
    "tags": [
      "Essen",
      "Küche",
      "Küche & Geschirr",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0008",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Buch",
    "focusWord": "das Buch",
    "question": "Welcher Artikel und Plural gehören zu \"Buch\"?",
    "options": [
      "das Buch -> die Bücher",
      "der Buch -> die Büchern",
      "die Buch -> die Buche",
      "das Buch -> die Buchs"
    ],
    "correctAnswer": "das Buch -> die Bücher",
    "explanation": "\"Buch\" ist neutral (das Buch) und bildet den Plural mit Umlaut und -er (die Bücher).",
    "tags": [
      "Schule",
      "Plural",
      "Schule & Büro",
      "Wortschatz & Synonyme",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0009",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Arzt / die Ärztin",
    "focusWord": "der Arzt / die Ärztin",
    "question": "Welcher Beruf ist gemeint?",
    "options": [
      "Doctor / Physician",
      "Teacher (Lehrer)",
      "Driver (Fahrer)",
      "Engineer (Ingenieur)"
    ],
    "correctAnswer": "Doctor / Physician",
    "explanation": "Der Arzt / die Ärztin behandelt Kranke (Doctor).",
    "tags": [
      "Berufe",
      "Gesundheit",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0010",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Water",
    "focusWord": "Water",
    "question": "Wie heißt \"Water\" auf Deutsch mit Artikel?",
    "options": [
      "das Wasser",
      "der Wasser",
      "die Wasser",
      "die Wässer"
    ],
    "correctAnswer": "das Wasser",
    "explanation": "Wasser ist neutral: das Wasser.",
    "tags": [
      "Getränke",
      "Artikel",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-WD-0011",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Zug",
    "focusWord": "der Zug",
    "question": "Was bedeutet \"der Zug\"?",
    "options": [
      "Train",
      "Airplane (das Flugzeug)",
      "Bicycle (das Fahrrad)",
      "Ship (das Schiff)"
    ],
    "correctAnswer": "Train",
    "explanation": "\"Der Zug\" ist die Bahn / der Zug (train).",
    "tags": [
      "Verkehr",
      "Reisen",
      "Verkehrsmittel",
      "Wortschatz & Synonyme",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0012",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Küche",
    "focusWord": "die Küche",
    "question": "Welcher Raum in der Wohnung ist \"die Küche\"?",
    "options": [
      "Kitchen",
      "Bathroom (das Badezimmer)",
      "Bedroom (das Schlafzimmer)",
      "Living room (das Wohnzimmer)"
    ],
    "correctAnswer": "Kitchen",
    "explanation": "\"Die Küche\" ist der Raum zum Kochen (kitchen).",
    "tags": [
      "Wohnen",
      "Räume",
      "Wohnen & Räume",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0013",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "groß",
    "focusWord": "groß",
    "question": "Was ist das genaue Gegenteil (Antonym) von \"groß\"?",
    "options": [
      "klein",
      "alt",
      "schwer",
      "kurz"
    ],
    "correctAnswer": "klein",
    "explanation": "Das Gegenteil von groß (big) ist klein (small).",
    "tags": [
      "Adjektive",
      "Antonyme",
      "Gegenteile / Adjektive",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0014",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "teuer",
    "focusWord": "teuer",
    "question": "Was ist das Gegenteil von \"teuer\"?",
    "options": [
      "billig / günstig",
      "schnell",
      "hell",
      "sauber"
    ],
    "correctAnswer": "billig / günstig",
    "explanation": "Teuer (expensive) <-> billig / preiswert / günstig (cheap).",
    "tags": [
      "Adjektive",
      "Antonyme",
      "Einkaufen",
      "Gegenteile / Adjektive",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0015",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "Mittwoch",
    "focusWord": "Mittwoch",
    "question": "Welcher Wochentag ist \"Mittwoch\"?",
    "options": [
      "Wednesday",
      "Monday (Montag)",
      "Tuesday (Dienstag)",
      "Thursday (Donnerstag)"
    ],
    "correctAnswer": "Wednesday",
    "explanation": "Mittwoch = Wednesday.",
    "tags": [
      "Zeit",
      "Wochentage",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-WD-0016",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Bahnhof",
    "focusWord": "der Bahnhof",
    "question": "Was ist \"der Bahnhof\"?",
    "options": [
      "Train station",
      "Airport (der Flughafen)",
      "Hospital (das Krankenhaus)",
      "Library (die Bibliothek)"
    ],
    "correctAnswer": "Train station",
    "explanation": "\"Der Bahnhof\" ist die Bahnstation für Züge.",
    "tags": [
      "Stadt",
      "Orte",
      "Verkehr",
      "Stadt & Orte",
      "Wortschatz & Synonyme",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0017",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Kopf",
    "focusWord": "der Kopf",
    "question": "Was bedeutet \"der Kopf\" und wie lautet der Plural?",
    "options": [
      "Head -> die Köpfe",
      "Hand -> die Hände",
      "Foot -> die Füße",
      "Arm -> die Arme"
    ],
    "correctAnswer": "Head -> die Köpfe",
    "explanation": "Der Kopf (head), Plural: die Köpfe.",
    "tags": [
      "Körper",
      "Plural",
      "Körper & Gesundheit",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0018",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Abend",
    "focusWord": "der Abend",
    "question": "Welche Begrüßung passt zur Tageszeit \"der Abend\"?",
    "options": [
      "Guten Abend!",
      "Guten Morgen!",
      "Gute Nacht!",
      "Guten Tag!"
    ],
    "correctAnswer": "Guten Abend!",
    "explanation": "Am Abend begrüßt man einander mit \"Guten Abend!\".",
    "tags": [
      "Begrüßung",
      "Tageszeiten",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0019",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Schuhe",
    "focusWord": "die Schuhe",
    "question": "Wie heißt die Einzahl (Singular) von \"die Schuhe\"?",
    "options": [
      "der Schuh",
      "das Schuh",
      "die Schuhe",
      "der Schuher"
    ],
    "correctAnswer": "der Schuh",
    "explanation": "Der Singular ist maskulin: \"der Schuh\" (die Schuhe).",
    "tags": [
      "Kleidung",
      "Singular",
      "Schuhe & Kleidung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0020",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Brötchen",
    "focusWord": "das Brötchen",
    "question": "Was ist \"das Brötchen\"?",
    "options": [
      "Bread roll / Small bread",
      "Cake (der Kuchen)",
      "Butter (die Butter)",
      "Egg (das Ei)"
    ],
    "correctAnswer": "Bread roll / Small bread",
    "explanation": "\"Das Brötchen\" ist ein kleines Brot / eine Semmel (bread roll).",
    "tags": [
      "Essen",
      "Frühstück",
      "Essen & Frühstück",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WB-0001",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Tier anhand der Hinweise:",
    "clues": [
      "Hinweis 1: Ich habe vier Beine und ein weiches Fell.",
      "Hinweis 2: Ich belle und passe auf das Haus auf.",
      "Hinweis 3: Ich bin der treueste Freund des Menschen."
    ],
    "options": [
      "Der Hund",
      "Die Katze",
      "Das Pferd",
      "Der Elefant"
    ],
    "correctAnswer": "Der Hund",
    "explanation": "Der Hund bellt (\"Wau-Wau\") und gilt als bester Freund des Menschen.",
    "tags": [
      "Tiere",
      "Deduction",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0002",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Alltagsgegenstand:",
    "clues": [
      "Hinweis 1: Ich stehe meistens auf dem Tisch oder hänge an der Decke.",
      "Hinweis 2: Man kann mich ein- und ausschalten.",
      "Hinweis 3: Ich mache Licht, wenn es dunkel wird."
    ],
    "options": [
      "Die Lampe",
      "Der Stuhl",
      "Der Kühlschrank",
      "Das Bett"
    ],
    "correctAnswer": "Die Lampe",
    "explanation": "Die Lampe spendet elektrisches Licht.",
    "tags": [
      "Wohnen",
      "Möbel",
      "Möbel & Beleuchtung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0003",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Grundnahrungsmittel:",
    "clues": [
      "Hinweis 1: Man kauft mich jeden Tag frisch in der Bäckerei.",
      "Hinweis 2: Ich habe eine braune, knusprige Kruste.",
      "Hinweis 3: Deutsche schneiden mich in Scheiben und belegen mich mit Käse oder Wurst."
    ],
    "options": [
      "Das Brot",
      "Die Suppe",
      "Der Apfel",
      "Die Schokolade"
    ],
    "correctAnswer": "Das Brot",
    "explanation": "Das deutsche Brot ist weltberühmt und wird in Scheiben geschnitten.",
    "tags": [
      "Essen",
      "Kultur",
      "Lebensmittel & Bäckerei",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0004",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Verkehrsmittel:",
    "clues": [
      "Hinweis 1: Ich habe zwei Räder, aber keinen Benzinmotor.",
      "Hinweis 2: Man muss in die Pedale treten, um zu fahren.",
      "Hinweis 3: Ich habe eine Klingel und einen Lenker."
    ],
    "options": [
      "Das Fahrrad",
      "Das Auto",
      "Der Bus",
      "Das Flugzeug"
    ],
    "correctAnswer": "Das Fahrrad",
    "explanation": "Das Fahrrad hat Pedale, Lenker und zwei Räder.",
    "tags": [
      "Verkehr",
      "Mobilität",
      "Verkehrsmittel",
      "Reisen & Mobilität"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0005",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Küchengerät:",
    "clues": [
      "Hinweis 1: Ich stehe in jeder Küche.",
      "Hinweis 2: In meinem Inneren ist es Tag und Nacht sehr kalt (ca. 4 bis 7 Grad).",
      "Hinweis 3: Man lagert Milch, Butter, Käse und Fleisch in mir."
    ],
    "options": [
      "Der Kühlschrank",
      "Der Backofen",
      "Die Spülmaschine",
      "Die Mikrowelle"
    ],
    "correctAnswer": "Der Kühlschrank",
    "explanation": "Der Kühlschrank kühlt Lebensmittel.",
    "tags": [
      "Küche",
      "Haushalt",
      "Wohnen & Geräte",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0006",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte elektronische Gerät:",
    "clues": [
      "Hinweis 1: Ich bin klein und passe in jede Hosentasche.",
      "Hinweis 2: Mit mir kann man telefonieren und Nachrichten schreiben.",
      "Hinweis 3: Ich habe einen Touchscreen und viele Apps."
    ],
    "options": [
      "Das Smartphone / Handy",
      "Der Fernseher",
      "Die Waschmaschine",
      "Das Radio"
    ],
    "correctAnswer": "Das Smartphone / Handy",
    "explanation": "Das Smartphone / Handy nutzt man zum Telefonieren und für Apps.",
    "tags": [
      "Technik",
      "Kommunikation",
      "Technik & Kommunikation",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0007",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Wetterphänomen:",
    "clues": [
      "Hinweis 1: Ich falle im kalten Winter vom Himmel.",
      "Hinweis 2: Ich bin weiß, weich und sehr kalt.",
      "Hinweis 3: Kinder bauen aus mir einen Mann mit einer Karottennase."
    ],
    "options": [
      "Der Schnee",
      "Der Regen",
      "Der Nebel",
      "Der Wind"
    ],
    "correctAnswer": "Der Schnee",
    "explanation": "Aus Schnee baut man im Winter einen Schneemann.",
    "tags": [
      "Wetter",
      "Winter",
      "Wetter & Natur",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0008",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Zubehör:",
    "clues": [
      "Hinweis 1: Man nimmt mich mit, wenn dunkle Wolken am Himmel stehen.",
      "Hinweis 2: Man spannt mich über den Kopf auf.",
      "Hinweis 3: Ich schütze vor Nässe und Regentropfen."
    ],
    "options": [
      "Der Regenschirm",
      "Die Sonnenbrille",
      "Der Rucksack",
      "Der Gürtel"
    ],
    "correctAnswer": "Der Regenschirm",
    "explanation": "Der Regenschirm schützt vor Regen.",
    "tags": [
      "Kleidung",
      "Wetter",
      "Kleidung & Wetter",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0009",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Gegenstand im Unterricht:",
    "clues": [
      "Hinweis 1: Ich bestehe aus vielen Seiten Papier.",
      "Hinweis 2: Schüler schreiben mit Füller oder Bleistift in mich hinein.",
      "Hinweis 3: In mir stehen Notizen und Hausaufgaben."
    ],
    "options": [
      "Das Heft",
      "Das Lineal",
      "Die Schere",
      "Der Radiergummi"
    ],
    "correctAnswer": "Das Heft",
    "explanation": "In das Schulheft schreibt man Notizen und Aufgaben.",
    "tags": [
      "Schule",
      "Lernen",
      "Schule & Gegenstände",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0010",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Beruf:",
    "clues": [
      "Hinweis 1: Ich arbeite in einer Schule oder Sprachschule.",
      "Hinweis 2: Ich stehe vor der Tafel und erkläre Grammatik und Vokabeln.",
      "Hinweis 3: Ich korrigiere Tests und helfe Schülern beim Lernen."
    ],
    "options": [
      "Der Lehrer",
      "Der Koch",
      "Der Polizist",
      "Der Pilot"
    ],
    "correctAnswer": "Der Lehrer",
    "explanation": "Der Lehrer unterrichtet Schüler in der Schule.",
    "tags": [
      "Berufe",
      "Schule",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0011",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Ort in der Stadt:",
    "clues": [
      "Hinweis 1: Hier gibt es viele Bücher, Zeitungen und Magazine.",
      "Hinweis 2: Man muss hier ganz leise sein.",
      "Hinweis 3: Man kann Bücher kostenlos ausleihen und zum Lesen mitnehmen."
    ],
    "options": [
      "Die Bibliothek",
      "Das Kino",
      "Das Kaufhaus",
      "Das Restaurant"
    ],
    "correctAnswer": "Die Bibliothek",
    "explanation": "In der Bibliothek (Bücherei) leiht man Bücher aus und liest in Ruhe.",
    "tags": [
      "Stadt",
      "Kultur",
      "Gebäude & Orte",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0012",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Getränk:",
    "clues": [
      "Hinweis 1: Ich bin schwarz oder dunkelbraun und dufte herrlich.",
      "Hinweis 2: Viele Erwachsene trinken mich morgens, um wach zu werden.",
      "Hinweis 3: Man trinkt mich oft mit Milch und Zucker aus einer Tasse."
    ],
    "options": [
      "Der Kaffee",
      "Der Orangensaft",
      "Das Bier",
      "Das Mineralwasser"
    ],
    "correctAnswer": "Der Kaffee",
    "explanation": "Kaffee ist das beliebteste Heißgetränk am Morgen.",
    "tags": [
      "Getränke",
      "Frühstück",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0013",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Körperteil:",
    "clues": [
      "Hinweis 1: Jeder Mensch hat zwei davon am Körper.",
      "Hinweis 2: An jedem Ende befinden sich genau fünf Finger.",
      "Hinweis 3: Man benutzt mich zum Schreiben, Greifen und Klatschen."
    ],
    "options": [
      "Die Hand",
      "Der Fuß",
      "Das Knie",
      "Das Ohr"
    ],
    "correctAnswer": "Die Hand",
    "explanation": "Die Hand hat 5 Finger und dient zum Schreiben und Greifen.",
    "tags": [
      "Körper",
      "Anatomie",
      "Körperteile",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0014",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Möbelstück:",
    "clues": [
      "Hinweis 1: Ich stehe im Schlafzimmer.",
      "Hinweis 2: Auf mir liegen eine weiche Matratze, ein Kissen und eine Decke.",
      "Hinweis 3: Man legt sich nachts auf mich, um zu schlafen und zu träumen."
    ],
    "options": [
      "Das Bett",
      "Das Sofa",
      "Der Schrank",
      "Der Schreibtisch"
    ],
    "correctAnswer": "Das Bett",
    "explanation": "Im Bett schläft man nachts.",
    "tags": [
      "Wohnen",
      "Möbel",
      "Möbel & Schlafen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0015",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte offizielle Dokument:",
    "clues": [
      "Hinweis 1: Ich bin ein kleines Buch mit einem Foto und persönlichen Daten.",
      "Hinweis 2: Man braucht mich unbedingt am Flughafen für Reisen ins Ausland.",
      "Hinweis 3: Die Grenzpolizei stempelt mich bei der Passkontrolle ab."
    ],
    "options": [
      "Der Reisepass",
      "Die Fahrkarte",
      "Der Führerschein",
      "Die Kreditkarte"
    ],
    "correctAnswer": "Der Reisepass",
    "explanation": "Der Reisepass weist die Identität und Staatsangehörigkeit bei Auslandsreisen nach.",
    "tags": [
      "Reisen",
      "Dokumente",
      "Reisen & Dokumente",
      "Reisen & Mobilität"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-TB-0001",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Welche Farbe hat eine frische reife Banane?",
    "options": [
      "Gelb",
      "Rot",
      "Blau",
      "Schwarz"
    ],
    "correctAnswer": "Gelb",
    "explanation": "Reife Bananen sind leuchtend gelb.",
    "tags": [
      "Farben",
      "Natur",
      "Farben & Natur",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0002",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Welcher Wochentag kommt direkt nach dem Dienstag?",
    "options": [
      "Mittwoch",
      "Donnerstag",
      "Montag",
      "Freitag"
    ],
    "correctAnswer": "Mittwoch",
    "explanation": "Die Reihenfolge lautet: Montag, Dienstag, Mittwoch.",
    "tags": [
      "Wochentage",
      "Zeit",
      "Wochentage & Reihenfolge",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0003",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was sagt man in Deutschland typischerweise, bevor man schlafen geht?",
    "options": [
      "Gute Nacht!",
      "Guten Morgen!",
      "Guten Tag!",
      "Mahlzeit!"
    ],
    "correctAnswer": "Gute Nacht!",
    "explanation": "Vor dem Zubettgehen wünscht man \"Gute Nacht!\".",
    "tags": [
      "Begrüßung",
      "Alltag",
      "Begrüßung & Tageszeit",
      "Alltag & Konversation",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0004",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wie fragt man korrekt nach dem Alter einer Person?",
    "options": [
      "Wie alt bist du?",
      "Wie viele Jahre hast du?",
      "Wie alt hast du?",
      "Wie viel alt bist du?"
    ],
    "correctAnswer": "Wie alt bist du?",
    "explanation": "Auf Deutsch fragt man mit dem Verb sein: \"Wie alt bist du?\" (nicht mit haben).",
    "tags": [
      "Alter",
      "Fragen",
      "Zahlen & Alter",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0005",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Mutter meiner Mutter ist meine ___ .",
    "options": [
      "Großmutter / Oma",
      "Tante",
      "Schwester",
      "Cousine"
    ],
    "correctAnswer": "Großmutter / Oma",
    "explanation": "Die Mutter der Mutter ist die Großmutter (Oma).",
    "tags": [
      "Familie",
      "Verwandtschaft",
      "Familie & Verwandtschaft",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0006",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Mit welchem Körperteil hört man Musik?",
    "options": [
      "Mit den Ohren",
      "Mit den Augen",
      "Mit der Nase",
      "Mit den Händen"
    ],
    "correctAnswer": "Mit den Ohren",
    "explanation": "Hören tut man mit den Ohren.",
    "tags": [
      "Körper",
      "Sinne",
      "Körperteile",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0007",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Was fragt der Verkäufer an der Kasse?",
    "options": [
      "Zahlen Sie bar oder mit Karte?",
      "Kochen Sie heute?",
      "Wo wohnen Sie?",
      "Wie heißen Sie?"
    ],
    "correctAnswer": "Zahlen Sie bar oder mit Karte?",
    "explanation": "An der Kasse wird nach der Zahlungsart gefragt (bar oder Karte).",
    "tags": [
      "Einkaufen",
      "Kommunikation",
      "Einkaufen & Bezahlen",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0008",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Welcher Monat ist der allererste Monat im Kalenderjahr?",
    "options": [
      "Januar",
      "Februar",
      "Dezember",
      "März"
    ],
    "correctAnswer": "Januar",
    "explanation": "Das Kalenderjahr beginnt mit dem 1. Januar.",
    "tags": [
      "Monate",
      "Kalender",
      "Jahreszeiten & Monate",
      "Alltag & Konversation"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-TB-0009",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Das Thermometer zeigt minus 10 Grad Celsius. Wie ist das Wetter?",
    "options": [
      "Es ist eiskalt.",
      "Es ist sonnig und heiß.",
      "Es ist angenehm warm.",
      "Es ist schwül."
    ],
    "correctAnswer": "Es ist eiskalt.",
    "explanation": "-10 Grad Celsius bedeutet Frost und eisige Kälte.",
    "tags": [
      "Wetter",
      "Temperatur",
      "Wetter & Temperatur",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0010",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Fußgängerampel zeigt Rot. Was musst du tun?",
    "options": [
      "Stehen bleiben und warten",
      "Schnell rennen",
      "Weitergehen",
      "Das Auto anhalten"
    ],
    "correctAnswer": "Stehen bleiben und warten",
    "explanation": "Bei Rot an der Ampel muss man stehen bleiben.",
    "tags": [
      "Verkehr",
      "Regeln",
      "Verkehr & Ampel",
      "Reisen & Mobilität"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-TB-0011",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was macht man typischerweise im Schwimmbad?",
    "options": [
      "Schwimmen",
      "Kochen",
      "Schlafen",
      "Autofahren"
    ],
    "correctAnswer": "Schwimmen",
    "explanation": "Im Schwimmbad geht man schwimmen.",
    "tags": [
      "Freizeit",
      "Sport",
      "Freizeit & Hobbys",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-TB-0012",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Was sagt man in Deutschland höflich vor dem Essen?",
    "options": [
      "Guten Appetit!",
      "Gute Besserung!",
      "Herzlichen Glückwunsch!",
      "Schönes Wochenende!"
    ],
    "correctAnswer": "Guten Appetit!",
    "explanation": "Vor dem Essen wünscht man sich \"Guten Appetit!\".",
    "tags": [
      "Essen",
      "Höflichkeit",
      "Restaurant & Höflichkeit",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0013",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Jemand niest oder ist krank. Was wünscht man der Person?",
    "options": [
      "Gesundheit! / Gute Besserung!",
      "Guten Flug!",
      "Viel Glück zum Geburtstag!",
      "Guten Morgen!"
    ],
    "correctAnswer": "Gesundheit! / Gute Besserung!",
    "explanation": "Beim Niesen sagt man \"Gesundheit!\", Kranken wünscht man \"Gute Besserung!\".",
    "tags": [
      "Gesundheit",
      "Höflichkeit",
      "Gesundheit & Wünsche",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0014",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was ist die offizielle Bundeshauptstadt von Deutschland?",
    "options": [
      "Berlin",
      "München",
      "Hamburg",
      "Frankfurt"
    ],
    "correctAnswer": "Berlin",
    "explanation": "Die Hauptstadt der Bundesrepublik Deutschland ist Berlin.",
    "tags": [
      "Geografie",
      "Landeskunde",
      "Geografie Deutschland",
      "Alltag & Konversation",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-TB-0015",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Welche drei Farben hat die deutsche Nationalflagge von oben nach unten?",
    "options": [
      "Schwarz - Rot - Gold",
      "Schwarz - Weiß - Rot",
      "Rot - Weiß - Blau",
      "Gold - Rot - Schwarz"
    ],
    "correctAnswer": "Schwarz - Rot - Gold",
    "explanation": "Die Flagge der Bundesrepublik Deutschland ist Schwarz-Rot-Gold.",
    "tags": [
      "Landeskunde",
      "Farben",
      "Farben der Flagge",
      "Alltag & Konversation",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0036",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich nehme ___ Apfel und ein Glas Wasser.",
    "options": [
      "einen",
      "ein",
      "eine",
      "einem"
    ],
    "correctAnswer": "einen",
    "explanation": "\"Apfel\" ist maskulin (der Apfel) und steht als Akkusativobjekt nach \"nehmen\": \"einen Apfel\".",
    "tags": [
      "Akkusativ",
      "Essen & Trinken",
      "Artikel",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0037",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Entschuldigung, wie viel ___ das Kilo Bananen?",
    "options": [
      "kostet",
      "kosten",
      "koste",
      "kostest"
    ],
    "correctAnswer": "kostet",
    "explanation": "\"Das Kilo\" ist Singular (3. Person Singular), daher lautet das Verb \"kostet\".",
    "tags": [
      "Einkaufen",
      "Zahlen & Preise",
      "Verben",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0038",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Hallo Peter! Wie geht es ___ ? — Mir geht es super, danke!",
    "options": [
      "dir",
      "dich",
      "du",
      "dein"
    ],
    "correctAnswer": "dir",
    "explanation": "Nach dem Ausdruck \"Wie geht es...\" steht das Personalpronomen im Dativ: \"Wie geht es dir?\".",
    "tags": [
      "Alltag",
      "Dativ",
      "Personalpronomen",
      "Alltag & Konversation",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0039",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Mein Geburtstag ist am ___ Mai.",
    "options": [
      "ersten",
      "eins",
      "erstes",
      "erste"
    ],
    "correctAnswer": "ersten",
    "explanation": "Bei Datumsangaben mit \"am\" (an + dem) verwendet man die Ordinalzahl im Dativ auf -en: \"am ersten\".",
    "tags": [
      "Datum",
      "Zahlen",
      "Präpositionen",
      "Uhrzeit & Termine",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0040",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Welche Sprachen ___ du, Anna?",
    "options": [
      "sprichst",
      "sprecht",
      "spreche",
      "sprechen"
    ],
    "correctAnswer": "sprichst",
    "explanation": "Das Verb \"sprechen\" hat einen Vokalwechsel bei \"du\": du sprichst (e -> i).",
    "tags": [
      "Verben",
      "Vokalwechsel",
      "Sprachen",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0041",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Das sind ___ Eltern. Sie leben in Hamburg.",
    "options": [
      "meine",
      "mein",
      "meinen",
      "meinem"
    ],
    "correctAnswer": "meine",
    "explanation": "\"Eltern\" steht im Plural (die Eltern). Im Nominativ lautet der Possessivartikel \"meine\".",
    "tags": [
      "Familie",
      "Possessivartikel",
      "Plural",
      "Grammatik & Satzbau",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0042",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich gehe jetzt zu ___ Supermarkt.",
    "options": [
      "dem",
      "den",
      "das",
      "die"
    ],
    "correctAnswer": "dem",
    "explanation": "Die Präposition \"zu\" verlangt immer den Dativ: \"zu dem Supermarkt\" (kurz: zum).",
    "tags": [
      "Präpositionen",
      "Dativ",
      "Orte",
      "Verkehr & Reisen",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0043",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wir haben leider ___ Milch mehr im Kühlschrank.",
    "options": [
      "keine",
      "nicht",
      "kein",
      "keinen"
    ],
    "correctAnswer": "keine",
    "explanation": "\"Milch\" ist feminin (die Milch). Die Negation ohne Artikel heißt \"keine Milch\".",
    "tags": [
      "Negation",
      "Essen & Trinken",
      "Artikel",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0044",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wenn man sich formell am Telefon verabschiedet, sagt man: Auf ___ !",
    "options": [
      "Wiederhören",
      "Wiedersehen",
      "Morgen",
      "Tschüss"
    ],
    "correctAnswer": "Wiederhören",
    "explanation": "Am Telefon verabschiedet man sich formell mit \"Auf Wiederhören!\".",
    "tags": [
      "Höflichkeit",
      "Telefon",
      "Kommunikation",
      "Begrüßung & Höflichkeit",
      "Alltag & Konversation"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-SA-0045",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Mensch hat zwei Ohren und zwei ___ .",
    "options": [
      "Augen",
      "Auge",
      "Auges",
      "Auger"
    ],
    "correctAnswer": "Augen",
    "explanation": "Der Plural von \"das Auge\" lautet \"die Augen\".",
    "tags": [
      "Körper",
      "Plural",
      "Wortschatz",
      "Gesundheit & Körper",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0046",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "___ du gut schwimmen?",
    "options": [
      "Kannst",
      "Könnt",
      "Können",
      "Kann"
    ],
    "correctAnswer": "Kannst",
    "explanation": "Die 2. Person Singular (\"du\") vom Modalverb können lautet \"du kannst\".",
    "tags": [
      "Modalverben",
      "Hobbys",
      "Sport",
      "Freizeit & Hobbys",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0047",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Meine Wohnung ist nicht groß, sie ist ziemlich ___ .",
    "options": [
      "klein",
      "hell",
      "dunkel",
      "teuer"
    ],
    "correctAnswer": "klein",
    "explanation": "Das logische Gegenteil von \"groß\" ist \"klein\".",
    "tags": [
      "Wohnen",
      "Adjektive",
      "Gegenteile",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0048",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Frau Schmidt ist krank und heute ___ Arzt.",
    "options": [
      "beim",
      "zum",
      "am",
      "im"
    ],
    "correctAnswer": "beim",
    "explanation": "Wenn man sich bereits bei einer Person oder einem Arzt befindet, verwendet man \"bei + Dativ\" (bei dem Arzt -> beim Arzt).",
    "tags": [
      "Präpositionen",
      "Dativ",
      "Gesundheit",
      "Alltag & Konversation",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0049",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Markus ___ seine Freundin jeden Abend ___ .",
    "options": [
      "ruft ... an",
      "steht ... auf",
      "macht ... zu",
      "sieht ... fern"
    ],
    "correctAnswer": "ruft ... an",
    "explanation": "Das Verb für telefonischen Kontakt heißt \"anrufen\" (er ruft ... an).",
    "tags": [
      "Trennbare Verben",
      "Alltag",
      "Kommunikation",
      "Alltag & Termine",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0050",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "___ Winter ist es in den Bergen oft sehr kalt und es schneit.",
    "options": [
      "Im",
      "Am",
      "Um",
      "In"
    ],
    "correctAnswer": "Im",
    "explanation": "Bei Jahreszeiten verwendet man die Präposition \"im\" (in + dem).",
    "tags": [
      "Jahreszeiten",
      "Wetter",
      "Präpositionen",
      "Wetter & Jahreszeiten",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0051",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was sind Sie von ___ ? — Ich bin Ingenieur.",
    "options": [
      "Beruf",
      "Arbeit",
      "Job",
      "Firma"
    ],
    "correctAnswer": "Beruf",
    "explanation": "Die feste Redewendung lautet: \"Was sind Sie von Beruf?\".",
    "tags": [
      "Berufe",
      "Höflichkeit",
      "Vorstellung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0052",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Entschuldigung, sprechen ___ Deutsch oder Englisch?",
    "options": [
      "Sie",
      "ihr",
      "du",
      "er"
    ],
    "correctAnswer": "Sie",
    "explanation": "Die Verbform \"sprechen\" passt hier zur formellen Höflichkeitsform \"Sie\".",
    "tags": [
      "Höflichkeit",
      "Pronomen",
      "Kommunikation",
      "Alltagskommunikation",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0053",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Im Sommer fliegt meine Familie ___ Spanien.",
    "options": [
      "nach",
      "in",
      "zu",
      "auf"
    ],
    "correctAnswer": "nach",
    "explanation": "Bei Reisezielen wie Ländern und Städten ohne Artikel verwendet man die Richtungspräposition \"nach\".",
    "tags": [
      "Reisen",
      "Präpositionen",
      "Länder",
      "Verkehr & Reisen",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0054",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Welche Farbe hat eine Zitrone? — Sie ist ___ .",
    "options": [
      "gelb",
      "blau",
      "schwarz",
      "rot"
    ],
    "correctAnswer": "gelb",
    "explanation": "Eine Zitrone ist gelb.",
    "tags": [
      "Farben",
      "Essen & Trinken",
      "Adjektive",
      "Einkaufen & Kleidung",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-SA-0055",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Am Sonntag gehen wir gerne ___ Kino.",
    "options": [
      "ins",
      "ans",
      "aufs",
      "vors"
    ],
    "correctAnswer": "ins",
    "explanation": "Die Richtung \"in das Kino\" zieht sich zusammen zu \"ins Kino\" (Akkusativ Neutrum).",
    "tags": [
      "Freizeit",
      "Präpositionen",
      "Akkusativ",
      "Freizeit & Hobbys",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0056",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Wohnung hat drei Zimmer und ___ schönen Balkon.",
    "options": [
      "einen",
      "ein",
      "eine",
      "einem"
    ],
    "correctAnswer": "einen",
    "explanation": "\"Balkon\" ist maskulin (der Balkon) und steht als Objekt im Akkusativ: \"einen schönen Balkon\".",
    "tags": [
      "Wohnen",
      "Akkusativ",
      "Artikel",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0057",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich möchte bitte eine ___ Mineralwasser bestellen.",
    "options": [
      "Flasche",
      "Kilo",
      "Gramm",
      "Stück"
    ],
    "correctAnswer": "Flasche",
    "explanation": "Mineralwasser bestellt man in einer \"Flasche\" oder einem \"Glas\".",
    "tags": [
      "Essen & Trinken",
      "Mengen",
      "Restaurant",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0058",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wie schreibt man die Zahl 43 als Wort?",
    "options": [
      "dreiundvierzig",
      "vierunddreißig",
      "dreißigvier",
      "vierzigsieben"
    ],
    "correctAnswer": "dreiundvierzig",
    "explanation": "Im Deutschen werden die Einer vor den Zehnern genannt: 3 (drei) + und + 40 (vierzig) = dreiundvierzig.",
    "tags": [
      "Zahlen",
      "Aussprache",
      "Grammatik",
      "Zahlen & Mathematik",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SA-0059",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Entschuldigen Sie bitte die Verspätung! — Macht nichts, ___ !",
    "options": [
      "kein Problem",
      "guten Abend",
      "bis bald",
      "vielen Dank"
    ],
    "correctAnswer": "kein Problem",
    "explanation": "Auf eine Entschuldigung reagiert man freundlich mit \"Kein Problem!\" oder \"Macht nichts!\".",
    "tags": [
      "Kommunikation",
      "Höflichkeit",
      "Alltag",
      "Alltagskommunikation",
      "Alltag & Konversation"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-SA-0060",
    "level": "A1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Gehen Sie zuerst ___ und dann nach links.",
    "options": [
      "geradeaus",
      "oben",
      "unten",
      "hinten"
    ],
    "correctAnswer": "geradeaus",
    "explanation": "In der Wegbeschreibung bedeutet \"geradeaus\" direkt vorwärts in gerader Linie.",
    "tags": [
      "Wegbeschreibung",
      "Orientierung",
      "Stadt",
      "Verkehr & Orientierung",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-SR-0016",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bringe die Wörter in die richtige Reihenfolge (Zeitangabe zuerst):",
    "words": [
      "Am Wochenende",
      "lange",
      "schlafe",
      "ich."
    ],
    "correctOrder": [
      "Am Wochenende",
      "schlafe",
      "ich",
      "lange."
    ],
    "correctAnswer": [
      "Am Wochenende",
      "schlafe",
      "ich",
      "lange."
    ],
    "explanation": "Steht die Zeitangabe an Position 1, steht das Verb immer an Position 2 und das Subjekt folgt auf Position 3.",
    "tags": [
      "Satzbau",
      "Inversion",
      "Alltag",
      "Alltag & Konversation",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0017",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde einen korrekten Satz zum Thema Kochen:",
    "words": [
      "Meine Mutter",
      "eine leckere Suppe",
      "kocht",
      "heute Abend."
    ],
    "correctOrder": [
      "Meine Mutter",
      "kocht",
      "heute Abend",
      "eine leckere Suppe."
    ],
    "correctAnswer": [
      "Meine Mutter",
      "kocht",
      "heute Abend",
      "eine leckere Suppe."
    ],
    "explanation": "Subjekt (Meine Mutter) -> Verb Pos. 2 (kocht) -> Zeitangabe (heute Abend) -> Akkusativobjekt (eine leckere Suppe).",
    "tags": [
      "Satzbau",
      "Essen & Trinken",
      "Hauptsatz",
      "Grammatik & Satzbau",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0018",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde eine höfliche Bitte mit dem Modalverb \"können\":",
    "words": [
      "Können",
      "bitte",
      "Sie",
      "helfen",
      "mir",
      "?"
    ],
    "correctOrder": [
      "Können",
      "Sie",
      "mir",
      "bitte",
      "helfen",
      "?"
    ],
    "correctAnswer": [
      "Können",
      "Sie",
      "mir",
      "bitte",
      "helfen",
      "?"
    ],
    "explanation": "Modalverb (Können) auf Pos. 1 -> Subjekt (Sie) -> Dativobjekt (mir) -> Modalpartikel (bitte) -> Infinitiv am Satzende (helfen).",
    "tags": [
      "Höflichkeit",
      "Modalverben",
      "Fragesatz",
      "Begrüßung & Höflichkeit",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0019",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz über den Wohnort:",
    "words": [
      "Wir",
      "seit zwei Jahren",
      "wohnen",
      "in Berlin."
    ],
    "correctOrder": [
      "Wir",
      "wohnen",
      "seit zwei Jahren",
      "in Berlin."
    ],
    "correctAnswer": [
      "Wir",
      "wohnen",
      "seit zwei Jahren",
      "in Berlin."
    ],
    "explanation": "Subjekt (Wir) -> Verb (wohnen) auf Pos. 2 -> Zeitangabe -> Ortsangabe.",
    "tags": [
      "Wohnen",
      "Satzbau",
      "Präpositionen",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0020",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit dem trennbaren Verb \"abfahren\":",
    "words": [
      "Der Zug nach München",
      "fährt",
      "um zehn Uhr",
      "ab."
    ],
    "correctOrder": [
      "Der Zug nach München",
      "fährt",
      "um zehn Uhr",
      "ab."
    ],
    "correctAnswer": [
      "Der Zug nach München",
      "fährt",
      "um zehn Uhr",
      "ab."
    ],
    "explanation": "Subjekt -> Verb Pos. 2 (fährt) -> Zeitangabe -> trennbares Präfix (ab) am Satzende.",
    "tags": [
      "Trennbare Verben",
      "Verkehr & Reisen",
      "Satzklammer",
      "Grammatik & Satzbau",
      "Reisen & Mobilität"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0021",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde einen Satz im Perfekt mit Negation:",
    "words": [
      "Ich",
      "habe",
      "keine Hausaufgaben",
      "gestern",
      "gemacht."
    ],
    "correctOrder": [
      "Ich",
      "habe",
      "gestern",
      "keine Hausaufgaben",
      "gemacht."
    ],
    "correctAnswer": [
      "Ich",
      "habe",
      "gestern",
      "keine Hausaufgaben",
      "gemacht."
    ],
    "explanation": "Subjekt -> Hilfsverb (habe) auf Pos. 2 -> Zeitangabe (gestern) -> Akkusativobjekt -> Partizip II (gemacht) am Ende.",
    "tags": [
      "Perfekt",
      "Negation",
      "Schule",
      "Schule & Lernen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 30
  },
  {
    "id": "A1-SR-0022",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde eine Frage mit dem Modalverb \"möchten\":",
    "words": [
      "Möchtest",
      "heute Abend",
      "du",
      "ins Kino gehen",
      "?"
    ],
    "correctOrder": [
      "Möchtest",
      "du",
      "heute Abend",
      "ins Kino gehen",
      "?"
    ],
    "correctAnswer": [
      "Möchtest",
      "du",
      "heute Abend",
      "ins Kino gehen",
      "?"
    ],
    "explanation": "Verb (Möchtest) auf Pos. 1 -> Subjekt (du) -> Zeitangabe -> Infinitivgruppe am Ende.",
    "tags": [
      "Modalverben",
      "Freizeit",
      "Fragesatz",
      "Freizeit & Hobbys",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0023",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde eine W-Frage zum Fahrkartenkauf:",
    "words": [
      "Wo",
      "kann",
      "Fahrkarten kaufen",
      "man hier",
      "?"
    ],
    "correctOrder": [
      "Wo",
      "kann",
      "man hier",
      "Fahrkarten kaufen",
      "?"
    ],
    "correctAnswer": [
      "Wo",
      "kann",
      "man hier",
      "Fahrkarten kaufen",
      "?"
    ],
    "explanation": "Fragewort (Wo) -> Modalverb Pos. 2 (kann) -> Subjekt (man) + Ortsadverb (hier) -> Infinitiv am Ende.",
    "tags": [
      "W-Frage",
      "Verkehr",
      "Modalverben",
      "Verkehr & Orientierung",
      "Grammatik & Satzbau",
      "Reisen & Mobilität"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0024",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz über den Beruf des Vaters:",
    "words": [
      "Mein Vater",
      "als Arzt",
      "arbeitet",
      "im Krankenhaus."
    ],
    "correctOrder": [
      "Mein Vater",
      "arbeitet",
      "als Arzt",
      "im Krankenhaus."
    ],
    "correctAnswer": [
      "Mein Vater",
      "arbeitet",
      "als Arzt",
      "im Krankenhaus."
    ],
    "explanation": "Subjekt (Mein Vater) -> Verb (arbeitet) auf Pos. 2 -> Berufsangabe (als Arzt) -> Ortsangabe.",
    "tags": [
      "Berufe",
      "Arbeit",
      "Satzbau",
      "Arbeit & Beruf",
      "Grammatik & Satzbau",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-SR-0025",
    "level": "A1",
    "gameType": "SATZ_RENNEN",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz (Angabe zum Frühstück zuerst):",
    "words": [
      "Zum Frühstück",
      "trinke",
      "Orangensaft",
      "ich immer."
    ],
    "correctOrder": [
      "Zum Frühstück",
      "trinke",
      "ich immer",
      "Orangensaft."
    ],
    "correctAnswer": [
      "Zum Frühstück",
      "trinke",
      "ich immer",
      "Orangensaft."
    ],
    "explanation": "Erstes Satzglied (Zum Frühstück) -> Verb (trinke) auf Pos. 2 -> Subjekt (ich) + Adverb (immer) -> Objekt.",
    "tags": [
      "Essen & Trinken",
      "Inversion",
      "Alltag",
      "Grammatik & Satzbau",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 25
  },
  {
    "id": "A1-WD-0021",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Milch",
    "focusWord": "die Milch",
    "question": "Welcher Artikel und welche Übersetzung passen zu \"Milch\"?",
    "options": [
      "die Milch (Milk)",
      "der Milch (Juice)",
      "das Milch (Water)",
      "die Milche (Tea)"
    ],
    "correctAnswer": "die Milch (Milk)",
    "explanation": "\"Milch\" ist feminin: die Milch (Englisch: milk).",
    "tags": [
      "Essen & Trinken",
      "Artikel",
      "Wortschatz",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0022",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Train station",
    "focusWord": "Train station",
    "question": "Wie heißt \"Train station\" mit dem richtigen Artikel auf Deutsch?",
    "options": [
      "der Bahnhof",
      "die Haltestelle",
      "der Flughafen",
      "der Zug"
    ],
    "correctAnswer": "der Bahnhof",
    "explanation": "Train station heißt auf Deutsch \"der Bahnhof\" (maskulin).",
    "tags": [
      "Verkehr & Reisen",
      "Orte",
      "Artikel",
      "Wortschatz & Synonyme",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0023",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Fahrrad",
    "focusWord": "das Fahrrad",
    "question": "Was bedeutet \"das Fahrrad\"?",
    "options": [
      "Bicycle / Bike",
      "Car",
      "Bus",
      "Airplane"
    ],
    "correctAnswer": "Bicycle / Bike",
    "explanation": "\"Das Fahrrad\" (Neutrum) ist das Zweirad (bicycle/bike).",
    "tags": [
      "Verkehr",
      "Wortschatz",
      "Transport",
      "Verkehr & Reisen",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0024",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Küche",
    "focusWord": "die Küche",
    "question": "Was bedeutet \"die Küche\"?",
    "options": [
      "Kitchen",
      "Bathroom",
      "Bedroom",
      "Living room"
    ],
    "correctAnswer": "Kitchen",
    "explanation": "\"Die Küche\" ist der Raum zum Kochen (kitchen).",
    "tags": [
      "Wohnen",
      "Räume",
      "Wortschatz",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0025",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "sourceWord": "schnell",
    "focusWord": "schnell",
    "question": "Was ist das Gegenteil von \"schnell\"?",
    "options": [
      "langsam",
      "laut",
      "leise",
      "teuer"
    ],
    "correctAnswer": "langsam",
    "explanation": "Das Antonym/Gegenteil von schnell (fast) ist langsam (slow).",
    "tags": [
      "Adjektive",
      "Gegenteile",
      "Adjektive & Gegenteile",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0026",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Doctor",
    "focusWord": "Doctor",
    "question": "Wie heißt \"Doctor\" auf Deutsch mit bestimmtem Artikel?",
    "options": [
      "der Arzt",
      "der Lehrer",
      "der Koch",
      "der Polizist"
    ],
    "correctAnswer": "der Arzt",
    "explanation": "Doctor heißt \"der Arzt\" (maskulin) bzw. \"die Ärztin\" (feminin).",
    "tags": [
      "Berufe",
      "Gesundheit",
      "Wortschatz",
      "Arbeit & Beruf",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0027",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Brot",
    "focusWord": "das Brot",
    "question": "Welcher Artikel und welche Bedeutung gehören zu \"Brot\"?",
    "options": [
      "das Brot (Bread)",
      "der Brot (Roll / Bun)",
      "die Brot (Cake)",
      "das Brötchen (Butter)"
    ],
    "correctAnswer": "das Brot (Bread)",
    "explanation": "\"Brot\" ist Neutrum: das Brot (Englisch: bread).",
    "tags": [
      "Essen & Trinken",
      "Artikel",
      "Wortschatz",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0028",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Uhr",
    "focusWord": "die Uhr",
    "question": "Was bedeutet \"die Uhr\"?",
    "options": [
      "Clock / Watch",
      "Calendar",
      "Schedule",
      "Alarm"
    ],
    "correctAnswer": "Clock / Watch",
    "explanation": "\"Die Uhr\" (feminin) zeigt die Zeit an (clock/watch).",
    "tags": [
      "Uhrzeit",
      "Alltag",
      "Wortschatz",
      "Uhrzeit & Termine",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0029",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Schlüssel",
    "focusWord": "der Schlüssel",
    "question": "Was bedeutet \"der Schlüssel\"?",
    "options": [
      "Key",
      "Door",
      "Lock",
      "Window"
    ],
    "correctAnswer": "Key",
    "explanation": "\"Der Schlüssel\" öffnet und schließt Türen (key).",
    "tags": [
      "Wohnen",
      "Alltag",
      "Wortschatz",
      "Alltag & Wohnen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0030",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Supermarket",
    "focusWord": "Supermarket",
    "question": "Wie heißt \"Supermarket\" mit dem passenden Artikel?",
    "options": [
      "der Supermarkt",
      "das Kaufhaus",
      "die Bäckerei",
      "die Apotheke"
    ],
    "correctAnswer": "der Supermarkt",
    "explanation": "Supermarket heißt \"der Supermarkt\" (maskulin).",
    "tags": [
      "Einkaufen",
      "Orte",
      "Artikel",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0031",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "sourceWord": "billig",
    "focusWord": "billig",
    "question": "Was ist das Gegenteil von \"billig / preiswert\"?",
    "options": [
      "teuer",
      "günstig",
      "schön",
      "neu"
    ],
    "correctAnswer": "teuer",
    "explanation": "Das Gegenteil von billig/günstig (cheap) ist teuer (expensive).",
    "tags": [
      "Adjektive",
      "Einkaufen",
      "Gegenteile",
      "Einkaufen & Adjektive",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0032",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Wasser",
    "focusWord": "das Wasser",
    "question": "Welcher Artikel gehört zu \"Wasser\"?",
    "options": [
      "das Wasser",
      "der Wasser",
      "die Wasser",
      "den Wasser"
    ],
    "correctAnswer": "das Wasser",
    "explanation": "\"Wasser\" ist Neutrum: das Wasser.",
    "tags": [
      "Essen & Trinken",
      "Artikel",
      "Wortschatz",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 12
  },
  {
    "id": "A1-WD-0033",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Sister",
    "focusWord": "Sister",
    "question": "Wie heißt \"Sister\" auf Deutsch?",
    "options": [
      "die Schwester",
      "die Mutter",
      "die Tochter",
      "die Tante"
    ],
    "correctAnswer": "die Schwester",
    "explanation": "Sister heißt \"die Schwester\" (feminin).",
    "tags": [
      "Familie",
      "Wortschatz",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0034",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Buch",
    "focusWord": "das Buch",
    "question": "Was bedeutet \"das Buch\" und wie heißt der Plural?",
    "options": [
      "das Buch (Book) -> die Bücher",
      "der Buch (Pen) -> die Buche",
      "die Buch (Notebook) -> die Buchen",
      "das Buch (Desk) -> die Buchs"
    ],
    "correctAnswer": "das Buch (Book) -> die Bücher",
    "explanation": "\"Das Buch\" heißt book; der Plural lautet \"die Bücher\" mit Umlaut.",
    "tags": [
      "Schule",
      "Plural",
      "Wortschatz",
      "Schule & Lernen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WD-0035",
    "level": "A1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Bett",
    "focusWord": "das Bett",
    "question": "Was bedeutet \"das Bett\"?",
    "options": [
      "Bed",
      "Table",
      "Sofa",
      "Wardrobe"
    ],
    "correctAnswer": "Bed",
    "explanation": "\"Das Bett\" (Neutrum) ist das Schlafmöbel (bed).",
    "tags": [
      "Wohnen",
      "Möbel",
      "Wortschatz",
      "Wohnen & Möbel",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "A1-WB-0016",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Fortbewegungsmittel:",
    "clues": [
      "Hinweis 1: Ich habe zwei Räder, einen Lenker und Pedale.",
      "Hinweis 2: Man braucht für mich keinen Motor und kein Benzin.",
      "Hinweis 3: Ich bin umweltfreundlich und man fährt mit mir auf dem Radweg."
    ],
    "options": [
      "Das Fahrrad",
      "Das Auto",
      "Das Motorrad",
      "Der Zug"
    ],
    "correctAnswer": "Das Fahrrad",
    "explanation": "Das Fahrrad hat zwei Räder und wird mit Muskelkraft betrieben.",
    "tags": [
      "Verkehr",
      "Umwelt",
      "Freizeit",
      "Verkehr & Mobilität",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0017",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Tier:",
    "clues": [
      "Hinweis 1: Ich bin ein sehr beliebtes Haustier in vielen Familien.",
      "Hinweis 2: Ich habe vier Beine, belle gerne und liebe lange Spaziergänge.",
      "Hinweis 3: Man nennt mich oft den besten Freund des Menschen."
    ],
    "options": [
      "Der Hund",
      "Die Katze",
      "Das Pferd",
      "Der Vogel"
    ],
    "correctAnswer": "Der Hund",
    "explanation": "Der Hund bellt und gilt als treuer Begleiter des Menschen.",
    "tags": [
      "Tiere",
      "Familie",
      "Alltag",
      "Tiere & Familie",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0018",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Haushaltsgerät:",
    "clues": [
      "Hinweis 1: Ich stehe oft im Badezimmer oder im Keller.",
      "Hinweis 2: Man füllt schmutzige T-Shirts, Hosen und Waschpulver in mich hinein.",
      "Hinweis 3: Ich drehe mich schnell mit Wasser und mache Kleidung wieder sauber."
    ],
    "options": [
      "Die Waschmaschine",
      "Die Spülmaschine",
      "Der Kühlschrank",
      "Der Staubsauger"
    ],
    "correctAnswer": "Die Waschmaschine",
    "explanation": "Die Waschmaschine wäscht Kleidung mit Wasser und Waschmittel.",
    "tags": [
      "Wohnen",
      "Haushalt",
      "Geräte",
      "Wohnen & Haushalt",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0019",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Ort:",
    "clues": [
      "Hinweis 1: Hier starten und landen riesige Flugzeuge.",
      "Hinweis 2: Passagiere geben hier ihre Koffer auf und zeigen ihren Pass.",
      "Hinweis 3: Bekannte deutsche Beispiele sind Frankfurt am Main und München."
    ],
    "options": [
      "Der Flughafen",
      "Der Hauptbahnhof",
      "Der Busbahnhof",
      "Der Hafen"
    ],
    "correctAnswer": "Der Flughafen",
    "explanation": "Am Flughafen heben Flugzeuge ab und landen Passagiere aus aller Welt.",
    "tags": [
      "Reisen",
      "Verkehr",
      "Orte",
      "Verkehr & Reisen",
      "Reisen & Mobilität"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0020",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Gegenstand:",
    "clues": [
      "Hinweis 1: Man trägt mich im Sommer auf der Nase vor den Augen.",
      "Hinweis 2: Meine Gläser sind dunkel getönt.",
      "Hinweis 3: Ich schütze die Augen vor hellem Sonnenlicht."
    ],
    "options": [
      "Die Sonnenbrille",
      "Der Hut",
      "Die Mütze",
      "Der Schal"
    ],
    "correctAnswer": "Die Sonnenbrille",
    "explanation": "Die Sonnenbrille schützt die Augen vor UV-Strahlung und hellem Sonnenlicht.",
    "tags": [
      "Kleidung",
      "Sommer",
      "Alltag",
      "Kleidung & Sommer",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0021",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten wetterfesten Gegenstand:",
    "clues": [
      "Hinweis 1: Man nimmt mich mit, wenn der Himmel grau und bewölkt ist.",
      "Hinweis 2: Man spannt mich auf und hält mich über den Kopf.",
      "Hinweis 3: Ich halte dich trocken, wenn Wassertropfen vom Himmel fallen."
    ],
    "options": [
      "Der Regenschirm",
      "Die Jacke",
      "Der Sonnenhut",
      "Die Tasche"
    ],
    "correctAnswer": "Der Regenschirm",
    "explanation": "Der Regenschirm schützt vor Nässe bei Regenwetter.",
    "tags": [
      "Wetter",
      "Alltag",
      "Gegenstände",
      "Wetter & Alltag",
      "Wortschatz & Synonyme",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0022",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das moderne Gerät:",
    "clues": [
      "Hinweis 1: Fast jeder Erwachsene trägt mich in der Hosentasche oder Handtasche.",
      "Hinweis 2: Man kann mit mir telefonieren, Fotos machen und Nachrichten schreiben.",
      "Hinweis 3: Ich habe einen Touchscreen und muss täglich aufgeladen werden."
    ],
    "options": [
      "Das Smartphone / Handy",
      "Der Fernseher",
      "Die Kamera",
      "Die Armbanduhr"
    ],
    "correctAnswer": "Das Smartphone / Handy",
    "explanation": "Das Smartphone oder Handy ist das mobile Alltagsgerät für Kommunikation und Internet.",
    "tags": [
      "Technik",
      "Kommunikation",
      "Alltag",
      "Technik & Alltag",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0023",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Gebäude:",
    "clues": [
      "Hinweis 1: Hier stehen hunderte Regale voller Bücher, Zeitungen und Hörbücher.",
      "Hinweis 2: Man muss hier sehr leise sein, um andere Leser nicht zu stören.",
      "Hinweis 3: Mit einem Ausweis kann man Medien kostenlos oder günstig ausleihen."
    ],
    "options": [
      "Die Bibliothek / Bücherei",
      "Die Buchhandlung",
      "Das Kino",
      "Das Museum"
    ],
    "correctAnswer": "Die Bibliothek / Bücherei",
    "explanation": "In der Bibliothek leiht man Bücher und Medien zum Lernen und Lesen aus.",
    "tags": [
      "Bildung",
      "Orte",
      "Kultur",
      "Bildung & Orte",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0024",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Handwerksberuf:",
    "clues": [
      "Hinweis 1: Ich stehe sehr früh am Morgen (oft ab 3 Uhr nachts) auf.",
      "Hinweis 2: Ich arbeite mit Mehl, Hefe, Wasser und einem großen Backofen.",
      "Hinweis 3: Ich backe frische Brötchen, Brezeln und knuspriges Brot."
    ],
    "options": [
      "Der Bäcker",
      "Der Metzger",
      "Der Kellner",
      "Der Gärtner"
    ],
    "correctAnswer": "Der Bäcker",
    "explanation": "Der Bäcker stellt Brot und Gebäck in der Backstube her.",
    "tags": [
      "Berufe",
      "Essen & Trinken",
      "Handwerk",
      "Arbeit & Berufe",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-WB-0025",
    "level": "A1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Reisegegenstand:",
    "clues": [
      "Hinweis 1: Vor dem Urlaub packt man Kleidung, Schuhe und Kulturbeutel in mich.",
      "Hinweis 2: Ich habe meist zwei oder vier Rollen und einen Teleskopgriff zum Ziehen.",
      "Hinweis 3: Man gibt mich am Flughafen beim Check-in als Reisegepäck ab."
    ],
    "options": [
      "Der Koffer",
      "Der Rucksack",
      "Die Handtasche",
      "Die Plastiktüte"
    ],
    "correctAnswer": "Der Koffer",
    "explanation": "Im Koffer transportiert man seine Kleidung auf Reisen.",
    "tags": [
      "Reisen",
      "Urlaub",
      "Gepäck",
      "Reisen & Gepäck",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "A1-TB-0016",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Wie meldet man sich in Deutschland höflich und formell am Telefon?",
    "options": [
      "Guten Tag, mein Name ist Schmidt.",
      "Hallo, wer bist du?",
      "Was willst du von mir?",
      "Ja bitte, sprich schnell!"
    ],
    "correctAnswer": "Guten Tag, mein Name ist Schmidt.",
    "explanation": "Am Telefon nennt man im formellen Kontext immer zuerst die Begrüßung und seinen Nachnamen.",
    "tags": [
      "Telefon",
      "Höflichkeit",
      "Alltag",
      "Alltagskommunikation",
      "Alltag & Konversation",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0017",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du möchtest auf dem Wochenmarkt 500g Erdbeeren kaufen. Was sagst du?",
    "options": [
      "Ich hätte gerne ein Pfund Erdbeeren, bitte.",
      "Gib mir die Erdbeeren sofort.",
      "Erdbeeren sind zu rot für mich.",
      "Haben Sie keine Äpfel?"
    ],
    "correctAnswer": "Ich hätte gerne ein Pfund Erdbeeren, bitte.",
    "explanation": "500 Gramm entsprechen in Deutschland traditionell \"einem Pfund\". \"Ich hätte gerne...\" ist die höflichste Einkaufsformel.",
    "tags": [
      "Einkaufen",
      "Höflichkeit",
      "Mengen",
      "Einkaufen & Markt",
      "Alltag & Konversation",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0018",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du rufst in der Arztpraxis an, weil du krank bist. Welcher Satz ist richtig?",
    "options": [
      "Ich brauche bitte einen Termin bei Herrn Dr. Weber.",
      "Ich will heute den Arzt sehen, schnell!",
      "Wo ist das Krankenhaus?",
      "Ich mag keine Medikamente."
    ],
    "correctAnswer": "Ich brauche bitte einen Termin bei Herrn Dr. Weber.",
    "explanation": "In der Praxis bittet man freundlich um einen Termin beim Arzt.",
    "tags": [
      "Gesundheit",
      "Arzt",
      "Termine",
      "Gesundheit & Termine",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0019",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du suchst den Hauptbahnhof in einer fremden Stadt. Wie fragst du einen Passanten höflich?",
    "options": [
      "Entschuldigung, wie komme ich bitte zum Hauptbahnhof?",
      "Wo ist Zug jetzt?",
      "Fahr mich zum Bahnhof!",
      "Ist hier kein Bus?"
    ],
    "correctAnswer": "Entschuldigung, wie komme ich bitte zum Hauptbahnhof?",
    "explanation": "Die Standardfrage zur Wegbeschreibung lautet: \"Entschuldigung, wie komme ich zum... ?\".",
    "tags": [
      "Orientierung",
      "Stadt",
      "Höflichkeit",
      "Verkehr & Orientierung",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0020",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Ein Freund lädt dich zu seiner Geburtstagsparty ein. Du freust dich und nimmst an. Was antwortest du?",
    "options": [
      "Vielen Dank für die Einladung! Ich komme sehr gerne.",
      "Ich habe keine Lust auf deinen Geburtstag.",
      "Geburtstage sind langweilig.",
      "Vielleicht schlafe ich lieber."
    ],
    "correctAnswer": "Vielen Dank für die Einladung! Ich komme sehr gerne.",
    "explanation": "Eine höfliche Zusage drückt Dankbarkeit und Freude aus: \"Vielen Dank für die Einladung! Ich komme sehr gerne.\"",
    "tags": [
      "Einladung",
      "Freunde",
      "Höflichkeit",
      "Freizeit & Feste",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0021",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Ihr habt im Restaurant gegessen und möchtet bezahlen. Was ruft ihr dem Kellner zu?",
    "options": [
      "Wir möchten bitte zahlen! / Die Rechnung, bitte!",
      "Bringen Sie noch mehr Essen!",
      "Hier ist mein Geld, nimm es!",
      "Das Essen war nicht warm genug."
    ],
    "correctAnswer": "Wir möchten bitte zahlen! / Die Rechnung, bitte!",
    "explanation": "Im Restaurant sagt man höflich: \"Wir möchten bitte zahlen\" oder \"Zahlen, bitte!\".",
    "tags": [
      "Restaurant",
      "Essen & Trinken",
      "Kommunikation",
      "Essen & Restaurant",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0022",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: An der Hotelrezeption möchtest du ins Internet. Was fragst du?",
    "options": [
      "Wie lautet bitte das Passwort für das WLAN?",
      "Haben Sie ein Telefon für mich?",
      "Wo kann man hier fernsehen?",
      "Wann fährt der Zug nach Hause?"
    ],
    "correctAnswer": "Wie lautet bitte das Passwort für das WLAN?",
    "explanation": "Im Hotel fragt man nach dem WLAN-Passwort (ausgesprochen [Ve-Lan]).",
    "tags": [
      "Hotel",
      "Reisen",
      "Technik",
      "Reisen & Hotel",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0023",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Der Schaffner im Zug sagt: \"Die Fahrkarten, bitte!\". Was tust du?",
    "options": [
      "Du zeigst dein Zugticket oder Online-Ticket vor.",
      "Du steigst sofort aus dem fahrenden Zug aus.",
      "Du kaufst ein neues Flugzeug.",
      "Du fragst nach der Speisekarte."
    ],
    "correctAnswer": "Du zeigst dein Zugticket oder Online-Ticket vor.",
    "explanation": "Bei der Fahrkartenkontrolle im Zug zeigt man dem Schaffner sein Ticket.",
    "tags": [
      "Verkehr",
      "Bahn",
      "Reisen",
      "Verkehr & Bahn",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0024",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Im Modegeschäft gefällt dir ein Pullover. Du möchtest ihn anprobieren. Was fragst du die Verkäuferin?",
    "options": [
      "Wo ist bitte die Umkleidekabine?",
      "Haben Sie keine Pullover?",
      "Kann ich den Pullover waschen?",
      "Warum ist der Laden so groß?"
    ],
    "correctAnswer": "Wo ist bitte die Umkleidekabine?",
    "explanation": "Im Geschäft probiert man Kleidung in der Umkleidekabine an.",
    "tags": [
      "Einkaufen",
      "Kleidung",
      "Dialog",
      "Einkaufen & Kleidung",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0025",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du kommst 10 Minuten zu spät zum Unterricht. Welcher Satz ist angemessen?",
    "options": [
      "Entschuldigung für die Verspätung, mein Bus hatte Verspätung.",
      "Der Unterricht fängt zu früh an!",
      "Guten Morgen, macht weiter.",
      "Ich wollte nicht kommen."
    ],
    "correctAnswer": "Entschuldigung für die Verspätung, mein Bus hatte Verspätung.",
    "explanation": "Man entschuldigt sich höflich für die Verspätung und nennt kurz den Grund.",
    "tags": [
      "Schule",
      "Höflichkeit",
      "Alltag",
      "Alltagskommunikation",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0026",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du möchtest einen neuen Mitschüler besser kennenlernen. Welche Frage passt am besten?",
    "options": [
      "Was machst du gerne in deiner Freizeit?",
      "Wie viel Geld hast du auf dem Konto?",
      "Warum sprichst du kein Deutsch?",
      "Wann gehst du nach Hause?"
    ],
    "correctAnswer": "Was machst du gerne in deiner Freizeit?",
    "explanation": "Die Frage nach Hobbys und Freizeitaktivitäten ist ideal zum Kennenlernen im Sprachkurs.",
    "tags": [
      "Kennenlernen",
      "Freizeit",
      "Kommunikation",
      "Freizeit & Kennenlernen",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0027",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Im Supermarkt findest du den Zucker nicht. Was fragst du einen Mitarbeiter?",
    "options": [
      "Entschuldigung, wo finde ich bitte den Zucker?",
      "Haben Sie keinen Supermarkt?",
      "Warum gibt es keinen Zucker mehr auf der Welt?",
      "Ich brauche keinen Zucker, danke."
    ],
    "correctAnswer": "Entschuldigung, wo finde ich bitte den Zucker?",
    "explanation": "Im Supermarkt fragt man höflich: \"Entschuldigung, wo finde ich...?\".",
    "tags": [
      "Einkaufen",
      "Supermarkt",
      "Höflichkeit",
      "Einkaufen & Supermarkt",
      "Arbeit & Beruf"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0028",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du sprichst auf einen Anrufbeantworter, um einen Rückruf zu erbitten. Welcher Satz ist korrekt?",
    "options": [
      "Bitte rufen Sie mich unter der Nummer 0170-123456 zurück.",
      "Rufen Sie nicht an, danke.",
      "Ich habe keine Zeit mehr für Sie.",
      "Wer spricht da eigentlich?"
    ],
    "correctAnswer": "Bitte rufen Sie mich unter der Nummer 0170-123456 zurück.",
    "explanation": "Auf der Mailbox hinterlässt man freundlich seine Telefonnummer für den Rückruf.",
    "tags": [
      "Telefon",
      "Termine",
      "Kommunikation",
      "Alltag & Termine",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0029",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du möchtest dich am Samstag mit einem Freund treffen. Was schlägst du vor?",
    "options": [
      "Hast du am Samstag Zeit? Wollen wir einen Kaffee trinken gehen?",
      "Am Samstag musst du für mich arbeiten.",
      "Ich habe am Samstag keine Lust auf dich.",
      "Wann ist eigentlich Samstag?"
    ],
    "correctAnswer": "Hast du am Samstag Zeit? Wollen wir einen Kaffee trinken gehen?",
    "explanation": "Ein freundlicher Vorschlag für eine Verabredung fragt nach Zeit und schlägt eine gemeinsame Aktivität vor.",
    "tags": [
      "Freizeit",
      "Verabredung",
      "Freunde",
      "Freizeit & Verabredung",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "A1-TB-0030",
    "level": "A1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Am ersten Tag im Sprachkurs stellst du dich kurz vor. Welcher Satz ist vollständig und grammatikalisch korrekt?",
    "options": [
      "Hallo, ich heiße Maria, komme aus Italien und lerne seit einem Monat Deutsch.",
      "Hallo, ich Name Maria aus Italien und Deutsch.",
      "Mein Name ist Maria und ich keine Sprache sprechen.",
      "Ich bin Maria aus Italien nach Deutschland gefahren gestern."
    ],
    "correctAnswer": "Hallo, ich heiße Maria, komme aus Italien und lerne seit einem Monat Deutsch.",
    "explanation": "Eine gelungene Selbstvorstellung kombiniert Name, Herkunft und Deutschlerndauer in vollständigen Hauptsätzen.",
    "tags": [
      "Vorstellung",
      "Begrüßung",
      "Sprachkurs",
      "Begrüßung & Vorstellung",
      "Grammatik & Satzbau",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  }
];
