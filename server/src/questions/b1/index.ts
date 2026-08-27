import { BankQuestion } from '../questionTypes.js';

/**
 * B1 Level Question Bank - Farh SprachArena
 * Exactly 175 Questions categorized by the 6 Canonical Categories:
 * - Grammatik & Satzbau
 * - Wortschatz & Synonyme
 * - Alltag & Konversation
 * - Reisen & Mobilität
 * - Arbeit & Beruf
 * - Gesundheit & Ernährung
 */
export const B1_QUESTIONS: BankQuestion[] = [
  {
    "id": "B1-SA-0001",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Viele Studenten interessieren sich sehr ___ moderne Künstliche Intelligenz.",
    "options": [
      "für",
      "über",
      "an",
      "auf"
    ],
    "correctAnswer": "für",
    "explanation": "Das reflexive Verb \"sich interessieren\" verlangt fest die Präposition \"für\" + Akkusativ.",
    "tags": [
      "Präpositionen",
      "Verben",
      "Technologie",
      "Verben mit Präpositionen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0002",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wir freuen uns schon alle riesig ___ unseren gemeinsamen Urlaub im August.",
    "options": [
      "auf",
      "über",
      "an",
      "für"
    ],
    "correctAnswer": "auf",
    "explanation": "\"sich freuen auf\" bezieht sich auf ein zukünftiges Ereignis (\"sich freuen über\" auf ein vergangenes/gegenwärtiges).",
    "tags": [
      "Präpositionen",
      "Verben",
      "Reisen",
      "Verben mit Präpositionen",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0003",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Erfolg des Projekts hängt stark ___ der guten Zusammenarbeit im Team ab.",
    "options": [
      "von",
      "an",
      "bei",
      "aus"
    ],
    "correctAnswer": "von",
    "explanation": "\"abhängen von\" verlangt die Präposition \"von\" mit dem Dativ.",
    "tags": [
      "Präpositionen",
      "Verben",
      "Arbeit",
      "Verben mit Dativ-Präposition",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0004",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Bewerber wartet seit zwei Wochen ungeduldig ___ eine Rückmeldung des Unternehmens.",
    "options": [
      "auf",
      "nach",
      "für",
      "an"
    ],
    "correctAnswer": "auf",
    "explanation": "\"warten auf\" verlangt fest die Präposition \"auf\" + Akkusativ.",
    "tags": [
      "Präpositionen",
      "Bewerbung",
      "Arbeit",
      "Verben mit Präpositionen",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0005",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "In dieser modernen Fabrik ___ täglich über tausend Elektroautos hergestellt.",
    "options": [
      "werden",
      "wurden",
      "worden",
      "sein"
    ],
    "correctAnswer": "werden",
    "explanation": "Das Vorgangspassiv im Präsens Plural wird gebildet mit: \"werden\" + Partizip II (\"hergestellt\").",
    "tags": [
      "Passiv",
      "Präsens",
      "Industrie",
      "Vorgangspassiv Präsens",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0006",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Die berühmte Frauenkirche in Dresden ___ nach der Wiedervereinigung aufwendig wiederaufgebaut.",
    "options": [
      "wurde",
      "worden",
      "hatte",
      "geworden"
    ],
    "correctAnswer": "wurde",
    "explanation": "Das Vorgangspassiv im Präteritum Singular lautet: \"wurde\" + Partizip II (\"wiederaufgebaut\").",
    "tags": [
      "Passiv",
      "Präteritum",
      "Geschichte",
      "Vorgangspassiv Präteritum",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0007",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "An deiner Stelle ___ ich mich direkt bei dieser internationalen Firma bewerben.",
    "options": [
      "würde",
      "wurde",
      "werde",
      "wäre"
    ],
    "correctAnswer": "würde",
    "explanation": "\"An deiner Stelle würde ich...\" drückt mit dem Konjunktiv II einen höflichen Ratschlag aus.",
    "tags": [
      "Konjunktiv II",
      "Ratschläge",
      "Bewerbung",
      "Konjunktiv II Wunsch / Ratschlag",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0008",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wenn ich doch nur mehr Freizeit ___ ! Dann würde ich eine Weltreise machen.",
    "options": [
      "hätte",
      "habe",
      "hatte",
      "hätten"
    ],
    "correctAnswer": "hätte",
    "explanation": "Irreale Wünsche werden mit dem Konjunktiv II von haben (\"hätte\") gebildet.",
    "tags": [
      "Konjunktiv II",
      "Wünsche",
      "Konjunktiv II sein/haben",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0009",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Dort drüben steht der Lehrer, ___ uns in Farh SprachArena unterrichtet.",
    "options": [
      "der",
      "den",
      "dem",
      "dessen"
    ],
    "correctAnswer": "der",
    "explanation": "\"Der Lehrer\" ist maskulin und fungiert im Relativsatz als Subjekt (Nominativ -> der).",
    "tags": [
      "Relativsätze",
      "Nominativ",
      "Maskulinum",
      "Relativpronomen Nominativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0010",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Das ist der neue Laptop, ___ ich mir gestern gekauft habe.",
    "options": [
      "den",
      "der",
      "dem",
      "dessen"
    ],
    "correctAnswer": "den",
    "explanation": "\"Der Laptop\" ist maskulin und ist im Relativsatz das Akkusativobjekt (den ich gekauft habe).",
    "tags": [
      "Relativsätze",
      "Akkusativ",
      "Technik",
      "Relativpronomen Akkusativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0011",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Das ist die nette Kollegin, ___ ich bei der Präsentation geholfen habe.",
    "options": [
      "der",
      "die",
      "den",
      "deren"
    ],
    "correctAnswer": "der",
    "explanation": "Das Verb \"helfen\" verlangt den Dativ: \"die Kollegin\" wird im Relativsatz-Dativ zu \"der\".",
    "tags": [
      "Relativsätze",
      "Dativ",
      "Arbeit",
      "Relativpronomen Dativ",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0012",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Hier ist der wichtige Vertrag, ___ dem wir gestern so intensiv gesprochen haben.",
    "options": [
      "über",
      "mit",
      "von",
      "an"
    ],
    "correctAnswer": "über",
    "explanation": "Das Verb lautet \"sprechen über\" + Akkusativ bzw. \"über den wir gesprochen haben\". Hier mit Dativ: \"von dem\" oder \"mit dem\"? Achtung: \"von dem wir gesprochen haben\"!",
    "tags": [
      "Relativsätze",
      "Präpositionen",
      "Relativsätze mit Präpositionen",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0013",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "___ sie für die Abschlussprüfung lernte, hörte sie leise klassische Musik.",
    "options": [
      "Während",
      "Nachdem",
      "Bevor",
      "Seitdem"
    ],
    "correctAnswer": "Während",
    "explanation": "\"Während\" drückt die Gleichzeitigkeit zweier Handlungen aus.",
    "tags": [
      "Temporalsätze",
      "während",
      "Gleichzeitigkeit",
      "Temporale Konjunktionen während",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0014",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wasche dir bitte gründlich die Hände, ___ du dich an den Esstisch setzt.",
    "options": [
      "bevor",
      "nachdem",
      "seitdem",
      "während"
    ],
    "correctAnswer": "bevor",
    "explanation": "\"bevor\" / \"ehe\" leitet eine Handlung ein, die zeitlich nach der Hauptsatzhandlung stattfindet.",
    "tags": [
      "Temporalsätze",
      "bevor",
      "Temporale Konjunktionen bevor",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0015",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Nachdem er alle E-Mails beantwortet ___ , verließ er erleichtert das Büro.",
    "options": [
      "hatte",
      "hat",
      "hätte",
      "war"
    ],
    "correctAnswer": "hatte",
    "explanation": "Vorzeitigkeit in der Vergangenheit (Präteritum im Hauptsatz) verlangt im nachdem-Satz das Plusquamperfekt (\"beantwortet hatte\").",
    "tags": [
      "Plusquamperfekt",
      "nachdem",
      "Vorzeitigkeit",
      "Plusquamperfekt & nachdem",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0016",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Er ging zur Arbeit, ___ er sich überhaupt nicht wohlfühlte.",
    "options": [
      "obwohl",
      "trotzdem",
      "deshalb",
      "sodass"
    ],
    "correctAnswer": "obwohl",
    "explanation": "\"obwohl\" ist eine unterordnende Konjunktion (Nebensatz mit finitem Verb am Ende).",
    "tags": [
      "Konnektoren",
      "obwohl",
      "Nebensätze",
      "Konnektoren obwohl vs trotzdem",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0017",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Dieses Smartphone ist ___ modern und leistungsstark, ___ auch sehr energieeffizient.",
    "options": [
      "sowohl ... als",
      "weder ... noch",
      "entweder ... oder",
      "zwar ... aber"
    ],
    "correctAnswer": "sowohl ... als",
    "explanation": "Die mehrteilige Konjunktion \"sowohl ... als auch\" verbindet zwei positive Eigenschaften.",
    "tags": [
      "Doppelkonnektoren",
      "Grammatik",
      "Doppelkonjunktionen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0018",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Er trinkt ___ Alkohol ___ zuckerhaltige Softdrinks; er trinkt nur reines Wasser.",
    "options": [
      "weder ... noch",
      "sowohl ... als",
      "entweder ... oder",
      "nicht nur ... sondern"
    ],
    "correctAnswer": "weder ... noch",
    "explanation": "\"weder ... noch\" verneint beide Teile einer Aufzählung vollständig.",
    "tags": [
      "Doppelkonnektoren",
      "Negation",
      "Doppelkonjunktionen weder... noch",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0019",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Wir wünschen Ihnen bei Ihrer neuen Arbeitsstelle viel Erfolg und ___ Mut!",
    "options": [
      "großen",
      "großer",
      "großes",
      "große"
    ],
    "correctAnswer": "großen",
    "explanation": "Maskulines Nomen im Akkusativ (\"der Mut\") ohne Artikel übernimmt die Endung des bestimmten Artikels -en (\"großen Mut\").",
    "tags": [
      "Adjektivdeklination",
      "Nullartikel",
      "Akkusativ",
      "Adjektivdeklination ohne Artikel (Nullartikel)",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0020",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Eltern arbeiten hart, ___ ihre Kinder an der Universität studieren können.",
    "options": [
      "damit",
      "um",
      "weil",
      "dass"
    ],
    "correctAnswer": "damit",
    "explanation": "Wenn Subjekt im Hauptsatz (die Eltern) und Nebensatz (ihre Kinder) verschieden sind, MUSS \"damit\" verwendet werden.",
    "tags": [
      "Finalsätze",
      "damit-um_zu",
      "Satzbau",
      "Finale Nebensätze um... zu vs damit",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0021",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Er lernt jeden Tag Deutsch, ___ später in Deutschland als Ingenieur zu arbeiten.",
    "options": [
      "um",
      "damit",
      "weil",
      "ohne"
    ],
    "correctAnswer": "um",
    "explanation": "Bei gleichem Subjekt bildet man den Finalsatz mit \"um ... zu + Infinitiv\".",
    "tags": [
      "Finalsätze",
      "um_zu",
      "Infinitiv",
      "Finalsatz mit um... zu",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0022",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Plötzlich ___ der Wind so stark, dass die Fensterläden klapperten.",
    "options": [
      "blies",
      "blaste",
      "geblasen",
      "bläst"
    ],
    "correctAnswer": "blies",
    "explanation": "Das Präteritum des unregelmäßigen Verbs blasen lautet: \"er/sie/es blies\".",
    "tags": [
      "Präteritum",
      "Starke Verben",
      "Präteritum starker Verben",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0023",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Forscher ___ eine bahnbrechende Entdeckung in der Medizin.",
    "options": [
      "machten",
      "schufen",
      "fanden",
      "brachten"
    ],
    "correctAnswer": "machten",
    "explanation": "Die feste Wendung heißt \"eine Entdeckung machen\" (Präteritum: machten).",
    "tags": [
      "Präteritum",
      "Nomen-Verb-Verbindung",
      "Wissenschaft",
      "Präteritum starker Verben",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0024",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Denkst du oft an deine Zukunft? — Ja, ich denke sehr oft ___ .",
    "options": [
      "daran",
      "darüber",
      "davon",
      "darauf"
    ],
    "correctAnswer": "daran",
    "explanation": "\"denken an\" wird bei Sachen durch das Pronominaladverb \"daran\" (da + r + an) ersetzt.",
    "tags": [
      "Pronominaladverbien",
      "daran",
      "Pronominaladverbien da(r)+Präposition",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0025",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "___ ärgerst du dich denn schon den ganzen Morgen so sehr?",
    "options": [
      "Worüber",
      "Woran",
      "Worauf",
      "Womit"
    ],
    "correctAnswer": "Worüber",
    "explanation": "\"sich ärgern über\" bildet die Frage nach einer Sache mit \"Worüber?\".",
    "tags": [
      "Fragewörter",
      "Pronominaladverbien",
      "Fragewörter worüber / worauf",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0026",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Meiner ___ nach sollten erneuerbare Energien viel stärker gefördert werden.",
    "options": [
      "Meinung",
      "Ansicht",
      "Gedanke",
      "Überlegung"
    ],
    "correctAnswer": "Meinung",
    "explanation": "Die feste idiomatische Wendung lautet: \"Meiner Meinung nach...\".",
    "tags": [
      "Meinung",
      "Diskussion",
      "Umwelt",
      "Meinungsäußerung & Argumentation",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0027",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Da haben Sie vollkommen recht! Ich bin ganz ___ Meinung.",
    "options": [
      "Ihrer",
      "Ihre",
      "Ihren",
      "Ihrem"
    ],
    "correctAnswer": "Ihrer",
    "explanation": "\"Ich bin Ihrer Meinung\" steht im Genitiv (\"einer Meinung sein\").",
    "tags": [
      "Meinung",
      "Zustimmung",
      "Genitiv",
      "Zustimmung ausdrücken",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0028",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich verstehe Ihren Standpunkt, aber ich sehe das etwas ___ .",
    "options": [
      "anders",
      "falsch",
      "schlecht",
      "gegeneinander"
    ],
    "correctAnswer": "anders",
    "explanation": "\"etwas anders sehen\" ist eine diplomatische und höfliche Formulierung von Widerspruch.",
    "tags": [
      "Diskussion",
      "Höflichkeit",
      "Widerspruch & Höflichkeit",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0029",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Hiermit möchte ich mich über den mangelhaften Service in Ihrem Hotel ___ .",
    "options": [
      "beschweren",
      "bedanken",
      "entschuldigen",
      "freuen"
    ],
    "correctAnswer": "beschweren",
    "explanation": "\"sich beschweren über\" ist die standardmäßige Formulierung in einer Reklamation oder einem Beschwerdebrief.",
    "tags": [
      "Schreiben",
      "Beschwerde",
      "Hotel",
      "Beschwerdebrief",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0030",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Um das Immunsystem zu stärken, sollte man sich ausgewogen ___ .",
    "options": [
      "ernähren",
      "füttern",
      "essen",
      "schlucken"
    ],
    "correctAnswer": "ernähren",
    "explanation": "\"sich ausgewogen ernähren\" bedeutet, gesund und vielseitig zu essen.",
    "tags": [
      "Gesundheit",
      "Ernährung",
      "Medizin & Prävention",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0031",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Es ist wichtig, im Alltag Plastikmüll zu ___ , um die Meere zu schützen.",
    "options": [
      "vermeiden",
      "vermehren",
      "zerstören",
      "kaufen"
    ],
    "correctAnswer": "vermeiden",
    "explanation": "\"vermeiden\" bedeutet dafür zu sorgen, dass etwas Unerwünschtes gar nicht erst entsteht.",
    "tags": [
      "Umwelt",
      "Nachhaltigkeit",
      "Umweltschutz & Ressourcen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0032",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Immer mehr Angestellte arbeiten flexibel von zu Hause aus im sogenannten ___ .",
    "options": [
      "Homeoffice",
      "Hausarbeit",
      "Wohnbüro",
      "Fernsehen"
    ],
    "correctAnswer": "Homeoffice",
    "explanation": "Der Begriff \"Homeoffice\" bzw. \"mobiles Arbeiten\" bezeichnet die Arbeit in den eigenen vier Wänden.",
    "tags": [
      "Arbeit",
      "Modernes Leben",
      "Arbeitswelt & Homeoffice",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0033",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Professor empfiehlt ___ (wir) dieses lehrreiche Buch.",
    "options": [
      "uns",
      "wir",
      "unser",
      "euch"
    ],
    "correctAnswer": "uns",
    "explanation": "\"empfehlen\" verlangt die Person im Dativ: wir -> uns.",
    "tags": [
      "Pronomen",
      "Dativ",
      "Verben",
      "Verben mit Dativ und Akkusativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0034",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "___ des starken Sturms fiel der gesamte Zugverkehr für mehrere Stunden aus.",
    "options": [
      "Wegen",
      "Trotz",
      "Statt",
      "Während"
    ],
    "correctAnswer": "Wegen",
    "explanation": "\"Wegen\" verlangt im Standarddeutsch den Genitiv (\"wegen des starken Sturms\") und gibt die Ursache an.",
    "tags": [
      "Präpositionen",
      "Genitiv",
      "Kausal",
      "Präpositionen mit Genitiv",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0035",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Experten vermuten, dass die Temperaturen in den kommenden Jahrzehnten weiter steigen ___ .",
    "options": [
      "werden",
      "worden",
      "würden",
      "waren"
    ],
    "correctAnswer": "werden",
    "explanation": "Zukunftsprognosen werden im Nebensatz mit \"werden\" am Satzende gebildet.",
    "tags": [
      "Futur",
      "Klima",
      "Wissenschaft",
      "Zukunft & Prognosen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SR-0001",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz im Passiv Präsens:",
    "words": [
      "Das neue Firmengebäude",
      "wird",
      "von renommierten Architekten",
      "entworfen."
    ],
    "correctOrder": [
      "Das neue Firmengebäude",
      "wird",
      "von renommierten Architekten",
      "entworfen."
    ],
    "correctAnswer": [
      "Das neue Firmengebäude",
      "wird",
      "von renommierten Architekten",
      "entworfen."
    ],
    "explanation": "Subjekt (Das neue Gebäude) -> Hilfsverb (wird) -> Urheberangabe (von...) -> Partizip II (entworfen).",
    "tags": [
      "Passiv",
      "Präsens",
      "Satzbau",
      "Passiv Satzbau",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0002",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde das Satzgefüge mit Relativsatz:",
    "words": [
      "Das ist das Projekt,",
      "an dem",
      "wir seit drei Monaten",
      "intensiv arbeiten."
    ],
    "correctOrder": [
      "Das ist das Projekt,",
      "an dem",
      "wir seit drei Monaten",
      "intensiv arbeiten."
    ],
    "correctAnswer": [
      "Das ist das Projekt,",
      "an dem",
      "wir seit drei Monaten",
      "intensiv arbeiten."
    ],
    "explanation": "Präposition + Relativpronomen im Dativ (\"an dem\") leiten den Relativsatz ein, finite Verbform am Ende.",
    "tags": [
      "Relativsätze",
      "Präpositionen",
      "Relativsatz mit Präposition",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0003",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit der Konjunktion \"zwar ... aber\":",
    "words": [
      "Die Wohnung ist zwar klein,",
      "aber",
      "sie",
      "liegt",
      "sehr zentral."
    ],
    "correctOrder": [
      "Die Wohnung ist zwar klein,",
      "aber",
      "sie",
      "liegt",
      "sehr zentral."
    ],
    "correctAnswer": [
      "Die Wohnung ist zwar klein,",
      "aber",
      "sie",
      "liegt",
      "sehr zentral."
    ],
    "explanation": "\"zwar ... aber\" schränkt eine Aussage ein; nach \"aber\" folgt normale Hauptsatzstellung.",
    "tags": [
      "Doppelkonnektoren",
      "Wohnen",
      "Doppelkonnektor zwar... aber",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0004",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den irrealen Bedingungssatz der Gegenwart:",
    "words": [
      "Wenn ich mehr Zeit hätte,",
      "würde",
      "ich",
      "ein Buch",
      "schreiben."
    ],
    "correctOrder": [
      "Wenn ich mehr Zeit hätte,",
      "würde",
      "ich",
      "ein Buch",
      "schreiben."
    ],
    "correctAnswer": [
      "Wenn ich mehr Zeit hätte,",
      "würde",
      "ich",
      "ein Buch",
      "schreiben."
    ],
    "explanation": "Bedingungssatz mit \"hätte\" -> Hauptsatz mit \"würde\" + Infinitiv am Ende.",
    "tags": [
      "Konjunktiv II",
      "Konditionalsatz",
      "Konjunktiv II irrealer Konditionalsatz",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0005",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bringe den Satz mit \"während\" in die richtige Form:",
    "words": [
      "Während die Kollegen diskutierten,",
      "notierte",
      "sie",
      "die wichtigsten Punkte."
    ],
    "correctOrder": [
      "Während die Kollegen diskutierten,",
      "notierte",
      "sie",
      "die wichtigsten Punkte."
    ],
    "correctAnswer": [
      "Während die Kollegen diskutierten,",
      "notierte",
      "sie",
      "die wichtigsten Punkte."
    ],
    "explanation": "Nach dem temporale Nebensatz folgt das finite Verb \"notierte\" auf Position 1 des Hauptsatzes.",
    "tags": [
      "Temporalsätze",
      "während",
      "Präteritum",
      "Temporalsatz während",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0006",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit Vorzeitigkeit:",
    "words": [
      "Nachdem er den Vertrag unterschrieben hatte,",
      "feierte",
      "er",
      "mit seiner Familie."
    ],
    "correctOrder": [
      "Nachdem er den Vertrag unterschrieben hatte,",
      "feierte",
      "er",
      "mit seiner Familie."
    ],
    "correctAnswer": [
      "Nachdem er den Vertrag unterschrieben hatte,",
      "feierte",
      "er",
      "mit seiner Familie."
    ],
    "explanation": "Nebensatz im Plusquamperfekt (\"unterschrieben hatte\") drückt die Vorzeitigkeit zum Präteritum (\"feierte\") aus.",
    "tags": [
      "Plusquamperfekt",
      "nachdem",
      "Vorzeitigkeit",
      "Plusquamperfekt Satzgefüge",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 30
  },
  {
    "id": "B1-SR-0007",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die finale Infinitivkonstruktion:",
    "words": [
      "Sie spart jeden Monat Geld,",
      "um",
      "sich ein neues Auto",
      "zu kaufen."
    ],
    "correctOrder": [
      "Sie spart jeden Monat Geld,",
      "um",
      "sich ein neues Auto",
      "zu kaufen."
    ],
    "correctAnswer": [
      "Sie spart jeden Monat Geld,",
      "um",
      "sich ein neues Auto",
      "zu kaufen."
    ],
    "explanation": "\"um\" leitet die finale Zielhandlung ein, \"zu kaufen\" schließt am Ende ab.",
    "tags": [
      "Finalsätze",
      "Infinitiv mit zu",
      "Finalsatz um... zu",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0008",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde das Satzgefüge mit \"obwohl\":",
    "words": [
      "Obwohl der Zug Verspätung hatte,",
      "kamen",
      "alle Teilnehmer",
      "rechtzeitig an."
    ],
    "correctOrder": [
      "Obwohl der Zug Verspätung hatte,",
      "kamen",
      "alle Teilnehmer",
      "rechtzeitig an."
    ],
    "correctAnswer": [
      "Obwohl der Zug Verspätung hatte,",
      "kamen",
      "alle Teilnehmer",
      "rechtzeitig an."
    ],
    "explanation": "Nach vorangestelltem obwohl-Nebensatz folgt direkt das finite Verb \"kamen\" im Hauptsatz.",
    "tags": [
      "Konzessivsatz",
      "obwohl",
      "Inversion",
      "Konzessivsatz mit obwohl",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0009",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit Konsekutivadverb:",
    "words": [
      "Es gab einen technischen Defekt,",
      "deshalb",
      "wurde",
      "die Konferenz",
      "verschoben."
    ],
    "correctOrder": [
      "Es gab einen technischen Defekt,",
      "deshalb",
      "wurde",
      "die Konferenz",
      "verschoben."
    ],
    "correctAnswer": [
      "Es gab einen technischen Defekt,",
      "deshalb",
      "wurde",
      "die Konferenz",
      "verschoben."
    ],
    "explanation": "\"deshalb\" besetzt Position 1, danach folgt das finite Passivverb \"wurde\".",
    "tags": [
      "Konnektoren",
      "Passiv",
      "Konnektor folglich / infolgedessen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0010",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den mehrteiligen Konnektorensatz:",
    "words": [
      "Er spricht nicht nur fließend Deutsch,",
      "sondern",
      "auch",
      "ausgezeichnetes Französisch."
    ],
    "correctOrder": [
      "Er spricht nicht nur fließend Deutsch,",
      "sondern",
      "auch",
      "ausgezeichnetes Französisch."
    ],
    "correctAnswer": [
      "Er spricht nicht nur fließend Deutsch,",
      "sondern",
      "auch",
      "ausgezeichnetes Französisch."
    ],
    "explanation": "\"nicht nur ..., sondern auch ...\" verbindet zwei hervorgehobene Elemente.",
    "tags": [
      "Doppelkonnektoren",
      "Sprachen",
      "Doppelkonnektor nicht nur... sondern auch",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0011",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die höfliche Aussage:",
    "words": [
      "Der Sprecher betonte,",
      "dass",
      "alle Maßnahmen",
      "erfolgreich umgesetzt",
      "wurden."
    ],
    "correctOrder": [
      "Der Sprecher betonte,",
      "dass",
      "alle Maßnahmen",
      "erfolgreich umgesetzt",
      "wurden."
    ],
    "correctAnswer": [
      "Der Sprecher betonte,",
      "dass",
      "alle Maßnahmen",
      "erfolgreich umgesetzt",
      "wurden."
    ],
    "explanation": "Im dass-Satz mit Passiv Präteritum steht das Hilfsverb \"wurden\" ganz am Ende.",
    "tags": [
      "Nebensätze",
      "Passiv",
      "Bericht",
      "Indirekte Rede im Konjunktiv I/II",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0012",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die strukturierte Meinungsäußerung:",
    "words": [
      "Meiner Ansicht nach",
      "sollte",
      "der öffentliche Nahverkehr",
      "günstiger sein."
    ],
    "correctOrder": [
      "Meiner Ansicht nach",
      "sollte",
      "der öffentliche Nahverkehr",
      "günstiger sein."
    ],
    "correctAnswer": [
      "Meiner Ansicht nach",
      "sollte",
      "der öffentliche Nahverkehr",
      "günstiger sein."
    ],
    "explanation": "\"Meiner Ansicht nach\" bildet das Vorfeld, gefolgt vom Modalverb \"sollte\".",
    "tags": [
      "Meinung",
      "Diskussion",
      "Meinung einleiten",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-SR-0013",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit Pronominaladverb:",
    "words": [
      "Wir",
      "beschäftigen",
      "uns",
      "seit Wochen mit diesem schwierigen Thema."
    ],
    "correctOrder": [
      "Wir",
      "beschäftigen",
      "uns",
      "seit Wochen mit diesem schwierigen Thema."
    ],
    "correctAnswer": [
      "Wir",
      "beschäftigen",
      "uns",
      "seit Wochen mit diesem schwierigen Thema."
    ],
    "explanation": "Subjekt (Wir) -> Verb (beschäftigen) -> Reflexivpronomen (uns) -> Zeitangabe -> Präpositionalobjekt (mit...).",
    "tags": [
      "Präpositionen",
      "Reflexiv",
      "Verben mit fester Präposition",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0014",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Nebensatz mit \"seitdem\":",
    "words": [
      "Seitdem er in Deutschland lebt,",
      "hat",
      "er",
      "viele neue Freunde",
      "gefunden."
    ],
    "correctOrder": [
      "Seitdem er in Deutschland lebt,",
      "hat",
      "er",
      "viele neue Freunde",
      "gefunden."
    ],
    "correctAnswer": [
      "Seitdem er in Deutschland lebt,",
      "hat",
      "er",
      "viele neue Freunde",
      "gefunden."
    ],
    "explanation": "\"Seitdem\" leitet den Nebensatz ein (Verb \"lebt\" am Ende); Hauptsatz beginnt mit finitem Verb \"hat\".",
    "tags": [
      "Temporalsätze",
      "seitdem",
      "Perfekt",
      "Temporalsatz seitdem",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0015",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit dekliniertem Komparativ:",
    "words": [
      "Wir suchen",
      "nach einer",
      "besseren Lösung",
      "für dieses Problem."
    ],
    "correctOrder": [
      "Wir suchen",
      "nach einer",
      "besseren Lösung",
      "für dieses Problem."
    ],
    "correctAnswer": [
      "Wir suchen",
      "nach einer",
      "besseren Lösung",
      "für dieses Problem."
    ],
    "explanation": "\"nach einer besseren Lösung\" (Dativ feminin mit unbestimmtem Artikel: -en Endung).",
    "tags": [
      "Adjektivdeklination",
      "Komparativ",
      "Adjektivdeklination mit Komparativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-WD-0001",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Nachhaltigkeit",
    "focusWord": "die Nachhaltigkeit",
    "question": "Was bedeutet \"die Nachhaltigkeit\"?",
    "options": [
      "Sustainability / Sustainable development",
      "Pollution (die Verschmutzung)",
      "Energy consumption",
      "Extinction"
    ],
    "correctAnswer": "Sustainability / Sustainable development",
    "explanation": "Nachhaltigkeit bedeutet, Ressourcen so zu nutzen, dass sie auch künftigen Generationen erhalten bleiben.",
    "tags": [
      "Umwelt",
      "Gesellschaft",
      "Umwelt & Ökologie",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0002",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Verhandlung",
    "focusWord": "die Verhandlung",
    "question": "Was bedeutet \"die Verhandlung\"?",
    "options": [
      "Negotiation / Bargaining",
      "Presentation",
      "Dismissal / Layoff",
      "Application"
    ],
    "correctAnswer": "Negotiation / Bargaining",
    "explanation": "In Verhandlungen sprechen zwei Parteien, um einen gemeinsamen Kompromiss oder Vertrag zu erzielen.",
    "tags": [
      "Arbeit",
      "Wirtschaft",
      "Wirtschaft & Finanzen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0003",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Datenschutz",
    "focusWord": "der Datenschutz",
    "question": "Was ist \"der Datenschutz\"?",
    "options": [
      "Data privacy / Data protection",
      "Data loss (der Datenverlust)",
      "Software update",
      "Screen brightness"
    ],
    "correctAnswer": "Data privacy / Data protection",
    "explanation": "Datenschutz schützt persönliche Nutzerdaten vor Missbrauch und unbefugtem Zugriff.",
    "tags": [
      "Technik",
      "Recht",
      "Technik & Medien",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0004",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Überstunden",
    "focusWord": "die Überstunden",
    "question": "Was sind \"die Überstunden\"?",
    "options": [
      "Overtime / Hours worked beyond regular schedule",
      "Holidays (der Urlaub)",
      "Break times (die Pausen)",
      "Sick days"
    ],
    "correctAnswer": "Overtime / Hours worked beyond regular schedule",
    "explanation": "Überstunden sind Arbeitszeiten, die über die vertraglich vereinbarte Arbeitszeit hinausgehen.",
    "tags": [
      "Arbeit",
      "Recht",
      "Arbeitswelt",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0005",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Chancengleichheit",
    "focusWord": "die Chancengleichheit",
    "question": "Was bedeutet \"die Chancengleichheit\"?",
    "options": [
      "Equal opportunities / Equal chances for all",
      "Competition (der Wettbewerb)",
      "Social division",
      "Privilege"
    ],
    "correctAnswer": "Equal opportunities / Equal chances for all",
    "explanation": "Chancengleichheit bezeichnet das Recht aller Menschen auf gleiche Bildungs- und Entwicklungsmöglichkeiten.",
    "tags": [
      "Gesellschaft",
      "Politik",
      "Gesellschaft & Zusammenleben",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0006",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Experiment",
    "focusWord": "das Experiment",
    "question": "Welches Verb passt fest zu \"ein Experiment\" (Nomen-Verb-Verbindung)?",
    "options": [
      "durchführen (to conduct an experiment)",
      "kochen",
      "bauen",
      "schlafen"
    ],
    "correctAnswer": "durchführen (to conduct an experiment)",
    "explanation": "Die feste Verbindung heißt \"ein Experiment durchführen\" (ein Experiment machen/testen).",
    "tags": [
      "Wissenschaft",
      "Kollokation",
      "Wissenschaft & Forschung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0007",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Enttäuschung",
    "focusWord": "die Enttäuschung",
    "question": "Was bedeutet \"die Enttäuschung\"?",
    "options": [
      "Disappointment / Letdown",
      "Enthusiasm (die Begeisterung)",
      "Relief (die Erleichterung)",
      "Curiosity (die Neugier)"
    ],
    "correctAnswer": "Disappointment / Letdown",
    "explanation": "Eine Enttäuschung empfindet man, wenn eine positive Erwartung nicht erfüllt wird.",
    "tags": [
      "Gefühle",
      "Psychologie",
      "Psychologie & Gefühle",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0008",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Frist",
    "focusWord": "die Frist",
    "question": "Was bedeutet \"die Frist\" bei einer behördlichen oder vertraglichen Aufgabe?",
    "options": [
      "Deadline / Fixed time limit",
      "Delay (die Verspätung)",
      "Fine (die Strafe)",
      "Permission (die Erlaubnis)"
    ],
    "correctAnswer": "Deadline / Fixed time limit",
    "explanation": "Eine Frist ist ein festgelegter Zeitraum, bis zu dessen Ende eine Handlung erledigt sein muss.",
    "tags": [
      "Recht",
      "Verwaltung",
      "Recht & Vertrag",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0009",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Quelle",
    "focusWord": "die Quelle",
    "question": "Was bedeutet \"die Quelle\" bei einem wissenschaftlichen Text oder Zeitungsbericht?",
    "options": [
      "Source / Origin of information",
      "Author's signature",
      "Summary",
      "Title page"
    ],
    "correctAnswer": "Source / Origin of information",
    "explanation": "Die Quelle ist der Ursprung, aus dem Daten oder Zitate entnommen wurden.",
    "tags": [
      "Medien",
      "Wissenschaft",
      "Medien & Information",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0010",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Unverträglichkeit",
    "focusWord": "die Unverträglichkeit",
    "question": "Was bedeutet \"die Nahrungsmittelunverträglichkeit / Laktoseintoleranz\"?",
    "options": [
      "Food intolerance / Inability to digest certain foods",
      "Hunger strike",
      "Special appetite",
      "Cooking method"
    ],
    "correctAnswer": "Food intolerance / Inability to digest certain foods",
    "explanation": "Eine Unverträglichkeit (Intoleranz) führt zu Beschwerden nach dem Verzehr bestimmter Stoffe.",
    "tags": [
      "Gesundheit",
      "Ernährung",
      "Gesundheit & Ernährung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0011",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "zielstrebig",
    "focusWord": "zielstrebig",
    "question": "Wie verhält sich eine Person, die \"zielstrebig\" ist?",
    "options": [
      "Goal-oriented / Determined to achieve objectives",
      "Easily distracted",
      "Lazy and indifferent",
      "Shy and quiet"
    ],
    "correctAnswer": "Goal-oriented / Determined to achieve objectives",
    "explanation": "Zielstrebige Menschen verfolgen ihre Pläne mit großem Einsatz und klarer Ausrichtung.",
    "tags": [
      "Persönlichkeit",
      "Adjektive",
      "Charakter & Persönlichkeit",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0012",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Vorlesung",
    "focusWord": "die Vorlesung",
    "question": "Was ist \"die Vorlesung\" an einer Hochschule oder Universität?",
    "options": [
      "University lecture given by a professor",
      "Written exam (die Klausur)",
      "Student dormitory",
      "Cafeteria (die Mensa)"
    ],
    "correctAnswer": "University lecture given by a professor",
    "explanation": "Eine Vorlesung ist eine akademische Lehrveranstaltung im Hörsaal.",
    "tags": [
      "Bildung",
      "Universität",
      "Bildung & Studium",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0013",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Stornierung / stornieren",
    "focusWord": "stornieren",
    "question": "Was bedeutet es, ein Hotelzimmer oder ein Ticket zu \"stornieren\"?",
    "options": [
      "To cancel a booking",
      "To confirm a reservation",
      "To pay in advance",
      "To rebook to next year"
    ],
    "correctAnswer": "To cancel a booking",
    "explanation": "Stornieren bedeutet, eine gebuchte Reise oder Dienstleistung vor Beginn abzusagen.",
    "tags": [
      "Reisen",
      "Dienstleistung",
      "Reise & Storno",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0014",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Tempolimit",
    "focusWord": "das Tempolimit",
    "question": "Was bedeutet \"das Tempolimit / die Geschwindigkeitsbegrenzung\"?",
    "options": [
      "Speed limit on roads",
      "Toll fee on highways",
      "Fuel consumption",
      "Car insurance"
    ],
    "correctAnswer": "Speed limit on roads",
    "explanation": "Ein Tempolimit schreibt die gesetzlich maximal zulässige Fahrgeschwindigkeit vor.",
    "tags": [
      "Verkehr",
      "Regeln",
      "Verkehr & Mobilität",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0015",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Abstimmung / wählen",
    "focusWord": "die Abstimmung",
    "question": "Was bedeutet \"die Abstimmung / das Referendum\"?",
    "options": [
      "Voting / Ballot / Referendum",
      "Demonstration (der Protest)",
      "Government formation",
      "Press conference"
    ],
    "correctAnswer": "Voting / Ballot / Referendum",
    "explanation": "Bei einer Abstimmung entscheiden Bürger oder Parlamentsmitglieder über Gesetze oder Kandidaten.",
    "tags": [
      "Politik",
      "Demokratie",
      "Politik & Wahlen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0016",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "kompliziert",
    "focusWord": "kompliziert",
    "question": "Was ist das genaue Gegenteil von \"kompliziert\"?",
    "options": [
      "einfach / unkompliziert",
      "schwierig",
      "anstrengend",
      "unmöglich"
    ],
    "correctAnswer": "einfach / unkompliziert",
    "explanation": "Das Gegenteil von kompliziert ist einfach oder simpel.",
    "tags": [
      "Adjektive",
      "Antonyme",
      "Gegenteile Adjektive",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 12
  },
  {
    "id": "B1-WD-0017",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Quittung",
    "focusWord": "die Quittung",
    "question": "Was ist \"die Quittung / der Beleg\"?",
    "options": [
      "Written receipt confirming payment",
      "Bank loan (der Kredit)",
      "Credit card PIN",
      "Price tag (das Preisschild)"
    ],
    "correctAnswer": "Written receipt confirming payment",
    "explanation": "Die Quittung belegt schriftlich den Empfang einer Zahlung.",
    "tags": [
      "Finanzen",
      "Einkaufen",
      "Konsum & Finanzen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0018",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Weiterbildung",
    "focusWord": "die Weiterbildung",
    "question": "Was versteht man unter \"beruflicher Weiterbildung\"?",
    "options": [
      "Further training / Continuing professional education",
      "Early retirement",
      "Job dismissal",
      "Salary cut"
    ],
    "correctAnswer": "Further training / Continuing professional education",
    "explanation": "Weiterbildung vertieft und erweitert berufliche Kenntnisse durch Seminare und Kurse.",
    "tags": [
      "Arbeit",
      "Bildung",
      "Arbeit & Qualifikation",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0019",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Ausstellung",
    "focusWord": "die Ausstellung",
    "question": "Was ist \"die Ausstellung\" in einem Museum oder einer Galerie?",
    "options": [
      "Art exhibition / Display",
      "Theater play (das Theaterstück)",
      "Cinema movie",
      "Book sale"
    ],
    "correctAnswer": "Art exhibition / Display",
    "explanation": "In einer Ausstellung werden Gemälde, Skulpturen oder historische Exponate öffentlich gezeigt.",
    "tags": [
      "Kultur",
      "Kunst",
      "Kultur & Kunst",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0020",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Schlagzeile",
    "focusWord": "die Schlagzeile",
    "question": "Was ist \"die Schlagzeile\" in der Zeitung?",
    "options": [
      "Headline printed in large letters on front page",
      "Comment section",
      "Weather forecast",
      "Obituary notice"
    ],
    "correctAnswer": "Headline printed in large letters on front page",
    "explanation": "Die Schlagzeile ist die große, aufmerksamkeitsstarke Überschrift auf der Titelseite.",
    "tags": [
      "Medien",
      "Journalismus",
      "Medien & Kommunikation",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WB-0001",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte Anlage zur Energiegewinnung:",
    "clues": [
      "Hinweis 1: Ich habe riesige weiße Rotorblätter, die sich im Wind drehen.",
      "Hinweis 2: Man sieht mich oft in großen Windparks auf Feldern oder im Meer (Offshore).",
      "Hinweis 3: Ich erzeuge sauberen, emissionsfreien Strom aus erneuerbarer Windenergie."
    ],
    "options": [
      "Das Windrad / Die Windkraftanlage",
      "Das Atomkraftwerk",
      "Das Kohlekraftwerk",
      "Der Staudamm"
    ],
    "correctAnswer": "Das Windrad / Die Windkraftanlage",
    "explanation": "Windkraftanlagen wandeln die kinetische Energie des Windes in Strom um.",
    "tags": [
      "Umwelt",
      "Technologie",
      "Energie",
      "Umwelt & Energie",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0002",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Beruf:",
    "clues": [
      "Hinweis 1: Menschen kommen zu mir, wenn sie seelische Probleme, Ängste oder Stress im Alltag haben.",
      "Hinweis 2: Ich verschreibe normalerweise keine Medikamente, sondern führe therapeutische Gespräche.",
      "Hinweis 3: Ich helfe Klienten dabei, ihr Verhalten und ihre Gedankenmuster positiv zu verändern."
    ],
    "options": [
      "Der Psychologe / Psychotherapeut",
      "Der Chirurg",
      "Der Anwalt",
      "Der Notar"
    ],
    "correctAnswer": "Der Psychologe / Psychotherapeut",
    "explanation": "Der Psychologe/Psychotherapeut behandelt psychische Beschwerden im vertraulichen Gespräch.",
    "tags": [
      "Berufe",
      "Gesundheit",
      "Berufe & Psychologie",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0003",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten wirtschaftlichen Prozess:",
    "clues": [
      "Hinweis 1: Ich sorge dafür, dass Waren und Dienstleistungen im Laufe der Zeit immer teurer werden.",
      "Hinweis 2: Die Kaufkraft des Geldes nimmt durch mich kontinuierlich ab.",
      "Hinweis 3: Die Europäische Zentralbank (EZB) versucht, meine Rate bei etwa 2 Prozent stabil zu halten."
    ],
    "options": [
      "Die Inflation",
      "Die Deflation",
      "Die Rezession",
      "Die Subvention"
    ],
    "correctAnswer": "Die Inflation",
    "explanation": "Inflation bezeichnet die allgemeine Erhöhung des Preisniveaus und Geldentwertung.",
    "tags": [
      "Wirtschaft",
      "Finanzen",
      "Wirtschaft & Finanzen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0004",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Computerprogramm:",
    "clues": [
      "Hinweis 1: Mit mir öffnet man Webseiten wie Google, Wikipedia oder Farh SprachArena.",
      "Hinweis 2: Bekannte Beispiele für mich heißen Chrome, Firefox, Safari oder Edge.",
      "Hinweis 3: Man tippt eine URL in meine Adressleiste ein, um im Internet zu surfen."
    ],
    "options": [
      "Der Webbrowser",
      "Das Antivirenprogramm",
      "Die Tabellenkalkulation",
      "Das Betriebssystem"
    ],
    "correctAnswer": "Der Webbrowser",
    "explanation": "Ein Webbrowser stellt Websites und Inhalte des Internets dar.",
    "tags": [
      "Technik",
      "Internet",
      "Technik & Software",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0005",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte Arbeitnehmerorganisation:",
    "clues": [
      "Hinweis 1: Ich vertrete die Rechte und Interessen von Beschäftigten gegenüber Arbeitgebern.",
      "Hinweis 2: Ich verhandle Tarifverträge über höhere Gehälter und bessere Arbeitsbedingungen.",
      "Hinweis 3: Wenn Verhandlungen scheitern, kann ich zum legalen Arbeitsstreik aufrufen."
    ],
    "options": [
      "Die Gewerkschaft",
      "Die Handelskammer",
      "Das Finanzamt",
      "Der Aufsichtsrat"
    ],
    "correctAnswer": "Die Gewerkschaft",
    "explanation": "Gewerkschaften organisieren Arbeitnehmer und verhandeln Tarifverträge.",
    "tags": [
      "Arbeit",
      "Gesellschaft",
      "Arbeitswelt & Interessenvertretung",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0006",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte medizinische Schutzmaßnahme:",
    "clues": [
      "Hinweis 1: Der Arzt injiziert mit einer feinen Spritze einen Wirkstoff in den Oberarm.",
      "Hinweis 2: Dadurch bildet der menschliche Körper Antikörper gegen gefährliche Viren oder Bakterien.",
      "Hinweis 3: Der Eintrag wird im gelben internationalen Impfpass dokumentiert."
    ],
    "options": [
      "Die Schutzimpfung",
      "Die Bluttransfusion",
      "Die Röntgenaufnahme",
      "Die Operation"
    ],
    "correctAnswer": "Die Schutzimpfung",
    "explanation": "Eine Impfung schützt vor Infektionskrankheiten durch gezielte Immunisierung.",
    "tags": [
      "Gesundheit",
      "Medizin",
      "Medizin & Prävention",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0007",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte globale Phänomen:",
    "clues": [
      "Hinweis 1: Treibhausgase wie CO2 in der Atmosphäre verstärken mich erheblich.",
      "Hinweis 2: Die weltweiten Durchschnittstemperaturen steigen, und Gletscher schmelzen ab.",
      "Hinweis 3: Extreme Wetterereignisse wie Hitzewellen, Dürren und Überschwemmungen nehmen durch mich zu."
    ],
    "options": [
      "Der Klimawandel / Die Erderwärmung",
      "Die Eiszeit",
      "Das Ozonloch",
      "Der Vulkanausbruch"
    ],
    "correctAnswer": "Der Klimawandel / Die Erderwärmung",
    "explanation": "Der Klimawandel bezeichnet die menschengemachte langfristige Erwärmung der Erde.",
    "tags": [
      "Umwelt",
      "Klima",
      "Klima & Umweltphänomen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0008",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte Form des Zusammenlebens:",
    "clues": [
      "Hinweis 1: Besonders Studierende und junge Berufstätige gründen mich gern.",
      "Hinweis 2: Jeder Bewohner hat sein eigenes Schlafzimmer, aber Küche und Bad werden geteilt.",
      "Hinweis 3: Man teilt sich die Miete, putzt nach Plan und kocht oft zusammen."
    ],
    "options": [
      "Die Wohngemeinschaft (WG)",
      "Das Einfamilienhaus",
      "Das Altersheim",
      "Das Hotel"
    ],
    "correctAnswer": "Die Wohngemeinschaft (WG)",
    "explanation": "In einer WG teilen sich mehrere Personen gemeinsam eine Wohnung.",
    "tags": [
      "Wohnen",
      "Kultur",
      "Wohnen & Genossenschaft",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0009",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Vertrag zur Risikovorsorge:",
    "clues": [
      "Hinweis 1: Man zahlt monatlich oder jährlich einen festen Beitrag an ein Unternehmen.",
      "Hinweis 2: Wenn ein Unfall passiert oder ein teurer Schaden entsteht, übernimmt sie die Kosten.",
      "Hinweis 3: In Deutschland hat fast jeder Erwachsene eine Privathaftpflicht-..."
    ],
    "options": [
      "Die Versicherung",
      "Der Sparvertrag",
      "Die Steuererklärung",
      "Der Mietvertrag"
    ],
    "correctAnswer": "Die Versicherung",
    "explanation": "Versicherungen schützen vor finanziellen Verlusten im Schadensfall.",
    "tags": [
      "Finanzen",
      "Alltag",
      "Recht",
      "Finanzen & Absicherung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0010",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte akustische Medienformat:",
    "clues": [
      "Hinweis 1: Man kann mich jederzeit auf dem Smartphone oder Computer online streamen und herunterladen.",
      "Hinweis 2: Meistens unterhalten sich zwei oder mehr Moderatoren über ein bestimmtes Thema.",
      "Hinweis 3: Viele Menschen hören mich beim Autofahren, Kochen oder beim Sport über Kopfhörer."
    ],
    "options": [
      "Der Podcast",
      "Das Hörbuch",
      "Die Fernsehnachrichten",
      "Die Schallplatte"
    ],
    "correctAnswer": "Der Podcast",
    "explanation": "Ein Podcast ist eine abonnierbare Serie von Audiobeiträgen im Internet.",
    "tags": [
      "Medien",
      "Technik",
      "Kultur & Unterhaltung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0011",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten juristischen Beruf:",
    "clues": [
      "Hinweis 1: Ich habe Rechtswissenschaften (Jura) studiert.",
      "Hinweis 2: Vor Gericht verteidige ich Mandanten oder setze ihre Rechtsansprüche durch.",
      "Hinweis 3: Ich berate Mandanten bei Verträgen, Streitigkeiten und Klagen."
    ],
    "options": [
      "Der Rechtsanwalt",
      "Der Richter",
      "Der Polizist",
      "Der Steuerberater"
    ],
    "correctAnswer": "Der Rechtsanwalt",
    "explanation": "Der Rechtsanwalt berät und vertritt Klienten in Rechtsfragen.",
    "tags": [
      "Berufe",
      "Recht",
      "Berufe & Recht",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0012",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte staatliche Institution:",
    "clues": [
      "Hinweis 1: Einmal im Jahr reichen Arbeitnehmer ihre Unterlagen bei mir ein.",
      "Hinweis 2: Ich berechne die Einkommensteuer und prüfe Werbungskosten.",
      "Hinweis 3: Bei zu viel gezahlten Steuern überweise ich eine Erstattung zurück auf das Bankkonto."
    ],
    "options": [
      "Das Finanzamt",
      "Das Arbeitsamt",
      "Das Einwohnermeldeamt",
      "Das Grundbuchamt"
    ],
    "correctAnswer": "Das Finanzamt",
    "explanation": "Das Finanzamt ist für die Festsetzung und Erhebung von Steuern zuständig.",
    "tags": [
      "Verwaltung",
      "Finanzen",
      "Staat & Steuern",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0013",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "CLUE_GUESS",
    "question": "Errate das moderne Mobilitätskonzept:",
    "clues": [
      "Hinweis 1: Man besitzt kein eigenes Fahrzeug, sondern bucht Autos spontan per App.",
      "Hinweis 2: Man zahlt nur für die tatsächlich gefahrenen Minuten oder Kilometer.",
      "Hinweis 3: Es spart Parkplatzsuche und Unterhaltskosten in Großstädten."
    ],
    "options": [
      "Das Carsharing",
      "Das Leasing",
      "Die Fahrgemeinschaft",
      "Der Autokauf"
    ],
    "correctAnswer": "Das Carsharing",
    "explanation": "Beim Carsharing teilt man sich gemeinschaftlich genutzte Fahrzeuge.",
    "tags": [
      "Mobilität",
      "Stadt",
      "Transport & Logistik",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0014",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte Ernährungsweise:",
    "clues": [
      "Hinweis 1: Anhänger dieser Ernährungsform verzichten komplett auf Fleisch und Fisch.",
      "Hinweis 2: Sie meiden darüber hinaus auch alle tierischen Produkte wie Milch, Käse, Eier und Honig.",
      "Hinweis 3: Sie ernähren sich ausschließlich rein pflanzlich."
    ],
    "options": [
      "Der Veganismus / Die vegane Ernährung",
      "Die vegetarische Ernährung",
      "Die Pescetarische Ernährung",
      "Die Rohkost"
    ],
    "correctAnswer": "Der Veganismus / Die vegane Ernährung",
    "explanation": "Vegane Ernährung schließt alle Produkte tierischen Ursprungs strikt aus.",
    "tags": [
      "Ernährung",
      "Lebensstil",
      "Ernährung & Lifestyle",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0015",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate den gesuchten Lebensabschnitt:",
    "clues": [
      "Hinweis 1: Man erreicht mich nach vielen Jahrzehnten aktiver Berufstätigkeit (meist ab 65 bis 67 Jahren).",
      "Hinweis 2: Man muss nicht mehr zur Arbeit gehen, sondern bezieht eine monatliche Altersversorgung.",
      "Hinweis 3: Viele Menschen nutzen diese Zeit für Hobbys, Reisen und die Enkelkinder."
    ],
    "options": [
      "Der Ruhestand / Die Rente",
      "Das Sabbatical",
      "Die Elternzeit",
      "Die Ausbildung"
    ],
    "correctAnswer": "Der Ruhestand / Die Rente",
    "explanation": "Der Ruhestand (Rente / Pension) ist der Lebensabschnitt nach dem Berufsleben.",
    "tags": [
      "Gesellschaft",
      "Arbeit",
      "Gesellschaft & Alter",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-TB-0001",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Welcher Ausdruck leitet ein Pro-Argument in einer Debatte am besten ein?",
    "options": [
      "Ein wesentlicher Vorteil besteht darin, dass...",
      "Das ist mir völlig egal.",
      "Ich habe keine Lust zu diskutieren.",
      "Hör auf zu reden!"
    ],
    "correctAnswer": "Ein wesentlicher Vorteil besteht darin, dass...",
    "explanation": "\"Ein wesentlicher Vorteil besteht darin, dass...\" formuliert sachlich und überzeugend ein Argument.",
    "tags": [
      "Diskussion",
      "Argumentation",
      "Diskussion & Argumente",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0002",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wie leitet man ein Gegenargument (Kontra) sachlich ein?",
    "options": [
      "Dagegen spricht allerdings, dass...",
      "Du hast wie immer keine Ahnung.",
      "Das stimmt sowieso nie.",
      "Das ist Unsinn."
    ],
    "correctAnswer": "Dagegen spricht allerdings, dass...",
    "explanation": "\"Dagegen spricht allerdings, dass...\" ist der Standardausdruck für sachlichen Einwand.",
    "tags": [
      "Diskussion",
      "Argumentation",
      "Diskussion & Kontra",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0003",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Welche Formulierung eignet sich ideal, um einen Kompromiss vorzuschlagen?",
    "options": [
      "Wie wäre es, wenn wir uns in der Mitte treffen und...?",
      "Entweder machen wir es so wie ich will, oder gar nicht!",
      "Ich gebe niemals nach.",
      "Vergiss es einfach."
    ],
    "correctAnswer": "Wie wäre es, wenn wir uns in der Mitte treffen und...?",
    "explanation": "\"Wie wäre es, wenn wir uns in der Mitte treffen...\" signalisiert Kooperationsbereitschaft.",
    "tags": [
      "Verhandlung",
      "Kompromiss",
      "Kompromiss finden",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0004",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Was antwortet man im Vorstellungsgespräch am professionellsten auf die Frage nach Stärken?",
    "options": [
      "Zu meinen größten Stärken zählen Teamfähigkeit, Zuverlässigkeit und eine schnelle Auffassungsgabe.",
      "Ich bin einfach der Beste hier.",
      "Ich mache nie Fehler.",
      "Ich arbeite nur fürs Geld."
    ],
    "correctAnswer": "Zu meinen größten Stärken zählen Teamfähigkeit, Zuverlässigkeit und eine schnelle Auffassungsgabe.",
    "explanation": "Sachliche Nennung von Soft Skills und fachlichen Kompetenzen wirkt professionell.",
    "tags": [
      "Bewerbung",
      "Arbeit",
      "Bewerbungsgespräch Stärken",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0005",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Aus wie vielen Bundesländern besteht die Bundesrepublik Deutschland?",
    "options": [
      "16 Bundesländer",
      "10 Bundesländer",
      "12 Bundesländer",
      "20 Bundesländer"
    ],
    "correctAnswer": "16 Bundesländer",
    "explanation": "Deutschland ist ein Bundesstaat aus genau 16 Bundesländern.",
    "tags": [
      "Landeskunde",
      "Politik",
      "Landeskunde & Bundesländer",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0006",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Welche Verhaltensweise spart im Alltag die meiste Heizenergie ein?",
    "options": [
      "Stoßlüften (mehrmals täglich 5 Minuten Fenster ganz auf) statt Dauerkippen",
      "Die Fenster den ganzen Tag auf Kipp stehen lassen",
      "Die Heizung auf Stufe 5 stellen und Fenster öffnen",
      "Gar nicht mehr lüften"
    ],
    "correctAnswer": "Stoßlüften (mehrmals täglich 5 Minuten Fenster ganz auf) statt Dauerkippen",
    "explanation": "Stoßlüften tauscht die Luft schnell aus, ohne dass Wände und Möbel auskühlen.",
    "tags": [
      "Umwelt",
      "Energie",
      "Alltag",
      "Klimaschutz im Alltag",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0007",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wie beendet man eine mündliche Präsentation vor Publikum professionell?",
    "options": [
      "Ich bedanke mich ganz herzlich für Ihre Aufmerksamkeit und freue mich auf Ihre Fragen.",
      "So, ich bin endlich fertig, tschüss.",
      "Keine Ahnung, was ich noch sagen soll.",
      "Das wars."
    ],
    "correctAnswer": "Ich bedanke mich ganz herzlich für Ihre Aufmerksamkeit und freue mich auf Ihre Fragen.",
    "explanation": "Der Dank für die Aufmerksamkeit mit anschließender Fragerunde ist der professionelle Abschluss.",
    "tags": [
      "Präsentation",
      "Kommunikation",
      "Vortrag & Präsentation",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0008",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Welche Notrufnummer wählt man in Deutschland bei einem akuten medizinischen Notfall oder Feuer?",
    "options": [
      "112",
      "110 (nur Polizei)",
      "911",
      "116117"
    ],
    "correctAnswer": "112",
    "explanation": "112 ist der europaweite Notruf für Feuerwehr und Rettungsdienst; 110 ist die Polizei.",
    "tags": [
      "Gesundheit",
      "Notfall",
      "Alltag",
      "Gesundheitswesen Deutschland",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0009",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was feiern die Menschen in Deutschland am 3. Oktober (Tag der Deutschen Einheit)?",
    "options": [
      "Die Wiedervereinigung von Ost- und Westdeutschland im Jahr 1990",
      "Das Ende des Ersten Weltkriegs",
      "Den Geburtstag des Bundeskanzlers",
      "Die Erfindung des Buchdrucks"
    ],
    "correctAnswer": "Die Wiedervereinigung von Ost- und Westdeutschland im Jahr 1990",
    "explanation": "Der 3. Oktober ist der deutsche Nationalfeiertag zum Gedenken an die Wiedervereinigung 1990.",
    "tags": [
      "Geschichte",
      "Landeskunde",
      "Kulturelle Feiertage",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0010",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Was zeichnet das deutsche \"Duale Ausbildungssystem\" aus?",
    "options": [
      "Die Kombination aus praktischer Arbeit im Betrieb und theoretischem Unterricht in der Berufsschule",
      "Dass man zwei Berufe gleichzeitig lernt",
      "Dass man zwei Gehälter bekommt",
      "Dass man nur online studiert"
    ],
    "correctAnswer": "Die Kombination aus praktischer Arbeit im Betrieb und theoretischem Unterricht in der Berufsschule",
    "explanation": "Das duale System verknüpft betriebliche Praxis mit schulischer Theorie.",
    "tags": [
      "Bildung",
      "Arbeit",
      "Kultur",
      "Dualsystem Ausbildung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0011",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Wie überprüft man am zuverlässigsten, ob eine reißerische Online-Nachricht der Wahrheit entspricht?",
    "options": [
      "Fakten bei mehreren unabhängigen, seriösen Quellen und Faktencheckern gegenchecken",
      "Die Nachricht sofort ungeprüft mit allen Freunden teilen",
      "Nur auf die Likes in sozialen Medien schauen",
      "Der Überschrift blind vertrauen"
    ],
    "correctAnswer": "Fakten bei mehreren unabhängigen, seriösen Quellen und Faktencheckern gegenchecken",
    "explanation": "Quellenkritik und Gegenchecks bei mehreren etablierten Medien entlarven Falschmeldungen.",
    "tags": [
      "Medien",
      "Kritisches Denken",
      "Medienkompetenz Fake News",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0012",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wie beginnt man eine formelle E-Mail, wenn der genaue Name des Ansprechpartners nicht bekannt ist?",
    "options": [
      "Sehr geehrte Damen und Herren,",
      "Hallo Leute,",
      "Liebe Freunde,",
      "Hi zusammen,"
    ],
    "correctAnswer": "Sehr geehrte Damen und Herren,",
    "explanation": "\"Sehr geehrte Damen und Herren,\" ist die offizielle neutrale Anrede für formelle Anschreiben.",
    "tags": [
      "Schreiben",
      "Höflichkeit",
      "Arbeit",
      "Berufliche E-Mail Anrede",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0013",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was bedeutet das deutsche Einwegpfand-Symbol auf Plastikflaschen und Dosen?",
    "options": [
      "Man zahlt 25 Cent Pfand beim Kauf und erhält das Geld am Pfandautomaten bei Rückgabe zurück.",
      "Man muss die Flasche in den Restmüll werfen.",
      "Die Flasche ist giftig.",
      "Das Getränk ist kostenlos."
    ],
    "correctAnswer": "Man zahlt 25 Cent Pfand beim Kauf und erhält das Geld am Pfandautomaten bei Rückgabe zurück.",
    "explanation": "Das deutsche Pfandsystem fördert Recycling durch finanzielle Rückvergütung (25 Cent Einwegpfand).",
    "tags": [
      "Umwelt",
      "Alltag",
      "Landeskunde",
      "Pfandsystem in Deutschland",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0014",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Welches Verfassungsorgan wählt in Deutschland den Bundeskanzler oder die Bundeskanzlerin?",
    "options": [
      "Der Deutsche Bundestag",
      "Die Bundesversammlung",
      "Der Bundesrat",
      "Das Bundesverfassungsgericht"
    ],
    "correctAnswer": "Der Deutsche Bundestag",
    "explanation": "Die Abgeordneten des Deutschen Bundestages wählen den Bundeskanzler mit absoluter Mehrheit.",
    "tags": [
      "Politik",
      "Demokratie",
      "Landeskunde",
      "Demokratie & Wahlen",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-TB-0015",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Was bedeutet das deutsche Sprichwort: \"Übung macht den Meister\"?",
    "options": [
      "Wer regelmäßig trainiert und lernt, wird mit der Zeit sehr gut in einer Sache.",
      "Nur Lehrer können Deutsch sprechen.",
      "Man muss niemals Hausaufgaben machen.",
      "Perfektion ist sofort da."
    ],
    "correctAnswer": "Wer regelmäßig trainiert und lernt, wird mit der Zeit sehr gut in einer Sache.",
    "explanation": "\"Übung macht den Meister\" betont die Bedeutung von kontinuierlichem Lernen und Training.",
    "tags": [
      "Sprichwörter",
      "Kultur",
      "Sprichwörter & Redewendungen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0036",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die alten Unterlagen müssen bis Ende des Monats digitalisiert ___ .",
    "options": [
      "werden",
      "worden",
      "geworden",
      "wurden"
    ],
    "correctAnswer": "werden",
    "explanation": "Das Passiv mit Modalverben wird mit \"Modalverb + Partizip II + werden (Infinitiv)\" gebildet.",
    "tags": [
      "Passiv",
      "Modalverben",
      "Arbeitswelt",
      "Vorgangspassiv mit Modalverben",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0037",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Wenn ich damals mehr Zeit gehabt hätte, ___ ich gerne mitgekommen.",
    "options": [
      "wäre",
      "hätte",
      "würde",
      "sei"
    ],
    "correctAnswer": "wäre",
    "explanation": "Bei Verben der Fortbewegung bildet man den Konjunktiv II der Vergangenheit mit \"wäre\" + Partizip II (\"wäre mitgekommen\").",
    "tags": [
      "Konjunktiv II",
      "Vergangenheit",
      "Irrealer Konditionalsatz",
      "Konjunktiv II Vergangenheit",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0038",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Wir können ___ heute Abend ins Kino gehen ___ gemütlich zu Hause kochen.",
    "options": [
      "entweder ... oder",
      "weder ... noch",
      "zwar ... aber",
      "sowohl ... als auch"
    ],
    "correctAnswer": "entweder ... oder",
    "explanation": "\"entweder ... oder\" drückt eine echte Alternative zwischen zwei Optionen aus.",
    "tags": [
      "Doppelkonnektoren",
      "Grammatik",
      "Freizeit",
      "Doppelkonnektor entweder... oder",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0039",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die neue Kollegin spricht ___ fließend Spanisch ___ hervorragend Deutsch.",
    "options": [
      "sowohl ... als auch",
      "weder ... noch",
      "entweder ... oder",
      "nicht nur ... als auch"
    ],
    "correctAnswer": "sowohl ... als auch",
    "explanation": "\"sowohl ... als auch\" verbindet zwei positive Aussagen gleichwertig (kopulativ).",
    "tags": [
      "Doppelkonnektoren",
      "Sprachen",
      "Arbeitswelt",
      "Doppelkonnektor sowohl... als auch",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0040",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Das ist das Thema, ___ wir uns gestern so intensiv gestritten haben.",
    "options": [
      "über das",
      "auf das",
      "an dem",
      "für das"
    ],
    "correctAnswer": "über das",
    "explanation": "Die Rektion lautet \"streiten über + Akkusativ\": \"über das Thema\" (Neutrum: über das).",
    "tags": [
      "Relativsätze",
      "Präpositionen",
      "Rektion",
      "Relativsätze mit Präpositionen",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0041",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Herr Meier, ___ Hund entlaufen war, hat ihn glücklicherweise wiedergefunden.",
    "options": [
      "dessen",
      "deren",
      "dem",
      "den"
    ],
    "correctAnswer": "dessen",
    "explanation": "Das Relativpronomen im Genitiv Maskulinum (\"der Hund von Herrn Meier\") lautet \"dessen\".",
    "tags": [
      "Relativpronomen",
      "Genitiv",
      "Grammatik",
      "Relativpronomen Genitiv",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0042",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Nachdem er die Prüfung bestanden ___ , feierte er mit seinen Freunden.",
    "options": [
      "hatte",
      "hat",
      "wurde",
      "hätte"
    ],
    "correctAnswer": "hatte",
    "explanation": "Bei \"nachdem\" im Vergangenheitskontext verlangt die Vorzeitigkeit das Plusquamperfekt (\"bestanden hatte\").",
    "tags": [
      "Temporalsatz",
      "Plusquamperfekt",
      "Vorzeitigkeit",
      "Temporalsatz nachdem",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0043",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Ich lerne jeden Tag Deutsch, ___ ich in Deutschland studieren kann.",
    "options": [
      "damit",
      "um",
      "weil",
      "obwohl"
    ],
    "correctAnswer": "damit",
    "explanation": "Kommen Subjekt im Hauptsatz (\"ich\") und Nebensatz vor, oder bei modalem Hilfsverb, leitet \"damit\" den Finalsatz ein.",
    "tags": [
      "Finalsatz",
      "damit",
      "Bildung",
      "Finalsatz um... zu vs damit",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0044",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Denkst du oft an deine Heimat? — Ja, ich denke sehr oft ___ .",
    "options": [
      "daran",
      "darüber",
      "damit",
      "dafür"
    ],
    "correctAnswer": "daran",
    "explanation": "\"Denken an + Sache\" wird mit dem Pronominaladverb \"daran\" (da + r + an) ersetzt.",
    "tags": [
      "Pronominaladverbien",
      "Grammatik",
      "Heimat",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0045",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "___ freust du dich am meisten bei deiner neuen Arbeitsstelle?",
    "options": [
      "Worüber",
      "Woran",
      "Wofür",
      "Womit"
    ],
    "correctAnswer": "Worüber",
    "explanation": "\"sich freuen über + Zustand/Sache\" erfordert die Fragestellung \"Worüber...?\".",
    "tags": [
      "Fragewörter",
      "Pronominaladverbien",
      "Arbeit",
      "Pronominaladverb Fragewort",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0046",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "___ des schlechten Wetters fand das Fußballspiel trotzdem statt.",
    "options": [
      "Trotz",
      "Wegen",
      "Während",
      "Wegen dem"
    ],
    "correctAnswer": "Trotz",
    "explanation": "\"Trotz\" verlangt standardsprachlich den Genitiv (\"Trotz des schlechten Wetters\") und drückt einen Gegengrund aus.",
    "tags": [
      "Genitiv",
      "Präpositionen",
      "Wetter",
      "Präpositionen mit Genitiv",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0047",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "___ des Urlaubs habe ich mein Handy komplett ausgeschaltet.",
    "options": [
      "Während",
      "Seit",
      "Vor",
      "Nach"
    ],
    "correctAnswer": "Während",
    "explanation": "\"Während\" steht mit Genitiv für eine Zeitdauer: \"Während des Urlaubs\".",
    "tags": [
      "Präpositionen",
      "Genitiv",
      "Urlaub",
      "Präposition während",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0048",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Energiewende spielt für den Klimaschutz eine entscheidende ___ .",
    "options": [
      "Rolle",
      "Wahl",
      "Stimme",
      "Hilfe"
    ],
    "correctAnswer": "Rolle",
    "explanation": "Die feste Nomen-Verb-Verbindung heißt \"eine Rolle spielen\" (von Bedeutung sein).",
    "tags": [
      "Nomen-Verb-Verbindungen",
      "Umwelt",
      "Bedeutung",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0049",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Für weitere Fragen stehe ich Ihnen jederzeit gerne zur ___ .",
    "options": [
      "Verfügung",
      "Entscheidung",
      "Auswahl",
      "Besprechung"
    ],
    "correctAnswer": "Verfügung",
    "explanation": "Die feste Gruß- und Korrespondenzformel lautet: \"zur Verfügung stehen\" (erreichbar/hilfsbereit sein).",
    "tags": [
      "Nomen-Verb-Verbindungen",
      "Büro",
      "Höflichkeit",
      "Nomen-Verb-Verbindung zur Verfügung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0050",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Minister teilte mit, die Wirtschaft ___ sich stabil auf Wachstumskurs.",
    "options": [
      "befinde",
      "befindet",
      "befand",
      "befunden"
    ],
    "correctAnswer": "befinde",
    "explanation": "In der formellen indirekten Rede der Nachrichtensprache steht der Konjunktiv I: 3. Person Singular von befinden -> \"befinde\".",
    "tags": [
      "Konjunktiv I",
      "Indirekte Rede",
      "Medien",
      "Indirekte Rede Konjunktiv I",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0051",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Wir brauchen dringend eine schnell___ Lösung für dieses Problem.",
    "options": [
      "ere",
      "er",
      "eres",
      "erem"
    ],
    "correctAnswer": "ere",
    "explanation": "\"Lösung\" ist feminin (die Lösung). Nach unbestimmtem Artikel im Akkusativ Femininum lautet die Deklinationsendung: schnell + er + e = \"schnellere\".",
    "tags": [
      "Adjektivdeklination",
      "Komparativ",
      "Problemlösung",
      "Adjektivdeklination Komparativ",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0052",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Die Tür zum Konferenzraum ist schon seit einer Stunde ___ .",
    "options": [
      "geöffnet",
      "öffnen",
      "eröffnet",
      "aufgemacht"
    ],
    "correctAnswer": "geöffnet",
    "explanation": "Das Zustandspassiv (Zustand als Resultat) wird mit \"sein + Partizip II\" gebildet: \"ist geöffnet\".",
    "tags": [
      "Zustandspassiv",
      "Grammatik",
      "Büro",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0053",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Der Zug hatte einen technischen Defekt, ___ alle Passagiere umsteigen mussten.",
    "options": [
      "sodass",
      "weil",
      "obwohl",
      "während"
    ],
    "correctAnswer": "sodass",
    "explanation": "\"sodass\" leitet einen Konsekutivsatz ein und drückt die logische Folge einer Handlung aus.",
    "tags": [
      "Konsekutivsatz",
      "sodass",
      "Reisen",
      "Konnektor sodass",
      "Reisen & Mobilität"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0054",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Im Vorstellungsgespräch sollte man seine Stärken überzeugend ___ .",
    "options": [
      "präsentieren",
      "vergessen",
      "verstecken",
      "kritisieren"
    ],
    "correctAnswer": "präsentieren",
    "explanation": "Im Bewerbungsgespräch stellt man seine beruflichen Qualifikationen und Stärken überzeugend vor/präsentiert sie.",
    "tags": [
      "Bewerbung",
      "Arbeit",
      "Vorstellungsgespräch",
      "Beruf & Bewerbung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0055",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Erneuerbare Energien wie Wind und Sonne helfen dabei, die CO2-Emissionen zu ___ .",
    "options": [
      "reduzieren",
      "verdoppeln",
      "beschleunigen",
      "erhöhen"
    ],
    "correctAnswer": "reduzieren",
    "explanation": "Klimaschutzmaßnahmen dienen der Senkung/Reduzierung von schädlichen Treibhausgasen.",
    "tags": [
      "Umwelt",
      "Klimaschutz",
      "Energie",
      "Umwelt & Nachhaltigkeit",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0056",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "In Zeiten von Social Media ist es wichtig, die Glaubwürdigkeit von Quellen kritisch zu ___ .",
    "options": [
      "hinterfragen",
      "löschen",
      "verbreiten",
      "ignorieren"
    ],
    "correctAnswer": "hinterfragen",
    "explanation": "Medienkompetenz erfordert es, Meldungen und Online-Quellen kritisch zu überprüfen und zu hinterfragen.",
    "tags": [
      "Medien",
      "Digitalisierung",
      "Kritisches Denken",
      "Medien & Digitalisierung",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0057",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "Eine ausgewogene Ernährung und regelmäßige Bewegung stärken das menschliche ___ .",
    "options": [
      "Immunsystem",
      "Skelett",
      "Gehalt",
      "Internet"
    ],
    "correctAnswer": "Immunsystem",
    "explanation": "Das Immunsystem schützt den Organismus vor Infekten und Krankheitserregern.",
    "tags": [
      "Gesundheit",
      "Ernährung",
      "Biologie",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0058",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Viele Menschen in Deutschland engagieren sich freiwillig in einem ___ .",
    "options": [
      "Ehrenamt",
      "Reisebüro",
      "Finanzamt",
      "Einkaufszentrum"
    ],
    "correctAnswer": "Ehrenamt",
    "explanation": "Eine unbezahlte, gemeinnützige Tätigkeit zum Wohle der Gesellschaft nennt man \"Ehrenamt\".",
    "tags": [
      "Gesellschaft",
      "Ehrenamt",
      "Kultur",
      "Gesellschaft & Engagement",
      "Alltag & Konversation"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0059",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "Meiner Meinung ___ sollten Schüler mehr praktische Fähigkeiten in der Schule lernen.",
    "options": [
      "nach",
      "zu",
      "von",
      "über"
    ],
    "correctAnswer": "nach",
    "explanation": "Die feste Redewendung lautet: \"Meiner Meinung nach + Verb\" (nachgestellt).",
    "tags": [
      "Meinungsäußerung",
      "Argumentation",
      "Diskussion",
      "Meinung & Argumentation",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SA-0060",
    "level": "B1",
    "gameType": "SCHNELLANTWORT",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "Falls Sie die Reise nicht antreten können, müssen Sie das Hotel rechtzeitig ___ .",
    "options": [
      "stornieren",
      "unterschreiben",
      "überweisen",
      "beschädigen"
    ],
    "correctAnswer": "stornieren",
    "explanation": "Eine Buchung vor Antritt offiziell absagen heißt \"stornieren\".",
    "tags": [
      "Reisen",
      "Hotel",
      "Vertrag",
      "Reisen & Stornierung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-SR-0016",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde einen Satz im Vorgangspassiv Präteritum:",
    "words": [
      "Das historische Rathaus",
      "im letzten Jahr",
      "aufwendig",
      "wurde",
      "renoviert."
    ],
    "correctOrder": [
      "Das historische Rathaus",
      "wurde",
      "im letzten Jahr",
      "aufwendig",
      "renoviert."
    ],
    "correctAnswer": [
      "Das historische Rathaus",
      "wurde",
      "im letzten Jahr",
      "aufwendig",
      "renoviert."
    ],
    "explanation": "Subjekt -> Hilfsverb \"wurde\" Pos. 2 -> Zeitangabe -> Modaladverb -> Partizip II (renoviert) am Ende.",
    "tags": [
      "Passiv",
      "Präteritum",
      "Architektur",
      "Passiv Satzgefüge",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0017",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde das komplexe Satzgefüge mit Relativsatz:",
    "words": [
      "Das ist der Kollege",
      "mit dem",
      "das Projekt",
      "ich",
      "erfolgreich abgeschlossen habe."
    ],
    "correctOrder": [
      "Das ist der Kollege",
      "mit dem",
      "ich",
      "das Projekt",
      "erfolgreich abgeschlossen habe."
    ],
    "correctAnswer": [
      "Das ist der Kollege",
      "mit dem",
      "ich",
      "das Projekt",
      "erfolgreich abgeschlossen habe."
    ],
    "explanation": "Hauptsatz -> Präposition + Relativpronomen (mit dem) -> Subjekt (ich) -> Objekt -> Prädikat am Satzende.",
    "tags": [
      "Relativsatz",
      "Präpositionen",
      "Arbeitswelt",
      "Relativsatz mit Präposition",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 30
  },
  {
    "id": "B1-SR-0018",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit dem Doppelkonnektor \"zwar ... aber\":",
    "words": [
      "Die Wohnung ist zwar klein",
      "aber",
      "sie hat",
      "eine wunderschöne Aussicht."
    ],
    "correctOrder": [
      "Die Wohnung ist zwar klein",
      "aber",
      "sie hat",
      "eine wunderschöne Aussicht."
    ],
    "correctAnswer": [
      "Die Wohnung ist zwar klein",
      "aber",
      "sie hat",
      "eine wunderschöne Aussicht."
    ],
    "explanation": "\"zwar ... aber\" verbindet eine einschränkende Bemerkung mit einem gewichtigen Vorteil.",
    "tags": [
      "Doppelkonnektoren",
      "Wohnen",
      "Satzbau",
      "Doppelkonnektor zwar... aber",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0019",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Temporalsatz mit \"während\":",
    "words": [
      "Während ich kochte",
      "hat",
      "meine Schwester",
      "die Hausaufgaben gemacht."
    ],
    "correctOrder": [
      "Während ich kochte",
      "hat",
      "meine Schwester",
      "die Hausaufgaben gemacht."
    ],
    "correctAnswer": [
      "Während ich kochte",
      "hat",
      "meine Schwester",
      "die Hausaufgaben gemacht."
    ],
    "explanation": "Nebensatz mit \"während\" an Pos. 1 -> finites Verb \"hat\" des Hauptsatzes an Pos. 2.",
    "tags": [
      "Temporalsatz",
      "während",
      "Familie",
      "Temporalsatz während",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0020",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den irrealen Konditionalsatz:",
    "words": [
      "Wenn ich mehr Geld hätte",
      "würde",
      "eine Weltreise",
      "ich",
      "machen."
    ],
    "correctOrder": [
      "Wenn ich mehr Geld hätte",
      "würde",
      "ich",
      "eine Weltreise",
      "machen."
    ],
    "correctAnswer": [
      "Wenn ich mehr Geld hätte",
      "würde",
      "ich",
      "eine Weltreise",
      "machen."
    ],
    "explanation": "Konditionaler Nebensatz -> \"würde\" auf Pos. 2 -> Subjekt (ich) -> Akkusativobjekt -> Infinitiv (machen).",
    "tags": [
      "Konjunktiv II",
      "Wunsch",
      "Reisen",
      "Konjunktiv II irreale Bedingung",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 30
  },
  {
    "id": "B1-SR-0021",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die finale Infinitivkonstruktion mit \"um ... zu\":",
    "words": [
      "Er spart jeden Monat Geld",
      "um",
      "sich ein neues Auto",
      "kaufen zu können."
    ],
    "correctOrder": [
      "Er spart jeden Monat Geld",
      "um",
      "sich ein neues Auto",
      "kaufen zu können."
    ],
    "correctAnswer": [
      "Er spart jeden Monat Geld",
      "um",
      "sich ein neues Auto",
      "kaufen zu können."
    ],
    "explanation": "Hauptsatz -> \"um\" -> Objektergänzung -> Infinitiv + \"zu können\" am Ende der Infinitivklammer.",
    "tags": [
      "um zu",
      "Finalsatz",
      "Finanzen",
      "Finalsatz um... zu",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 30
  },
  {
    "id": "B1-SR-0022",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Satz mit \"nicht nur ... sondern auch\":",
    "words": [
      "Sie ist nicht nur sehr intelligent",
      "sondern",
      "auch",
      "unglaublich hilfsbereit."
    ],
    "correctOrder": [
      "Sie ist nicht nur sehr intelligent",
      "sondern",
      "auch",
      "unglaublich hilfsbereit."
    ],
    "correctAnswer": [
      "Sie ist nicht nur sehr intelligent",
      "sondern",
      "auch",
      "unglaublich hilfsbereit."
    ],
    "explanation": "\"nicht nur ... sondern auch\" verstärkt zwei positive Eigenschaften nebeneinander.",
    "tags": [
      "Doppelkonnektoren",
      "Charakter",
      "Satzbau",
      "Doppelkonnektor nicht nur... sondern auch",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0023",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Temporalsatz mit \"seitdem\":",
    "words": [
      "Seitdem er in Deutschland lebt",
      "spricht er",
      "deutlich besser",
      "Deutsch."
    ],
    "correctOrder": [
      "Seitdem er in Deutschland lebt",
      "spricht er",
      "deutlich besser",
      "Deutsch."
    ],
    "correctAnswer": [
      "Seitdem er in Deutschland lebt",
      "spricht er",
      "deutlich besser",
      "Deutsch."
    ],
    "explanation": "Nebensatz mit \"seitdem\" -> Hauptsatzverb \"spricht\" + Subjekt \"er\" auf Pos. 2.",
    "tags": [
      "Temporalsatz",
      "seitdem",
      "Integration",
      "Temporalsatz seitdem",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0024",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "MEDIUM",
    "type": "SENTENCE_ORDER",
    "question": "Bilde die formelle Meinungsäußerung:",
    "words": [
      "Aus meiner Sicht",
      "sollte",
      "der öffentliche Nahverkehr",
      "kostenlos sein."
    ],
    "correctOrder": [
      "Aus meiner Sicht",
      "sollte",
      "der öffentliche Nahverkehr",
      "kostenlos sein."
    ],
    "correctAnswer": [
      "Aus meiner Sicht",
      "sollte",
      "der öffentliche Nahverkehr",
      "kostenlos sein."
    ],
    "explanation": "Standpunktphrase (Aus meiner Sicht) -> Modalverb Pos. 2 (sollte) -> Subjekt -> Infinitivgruppe am Ende.",
    "tags": [
      "Meinungsäußerung",
      "Politik",
      "Verkehr",
      "Meinungsäußerung Struktur",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 25
  },
  {
    "id": "B1-SR-0025",
    "level": "B1",
    "gameType": "SATZ_RENNEN",
    "category": "Grammatik & Satzbau",
    "difficulty": "HARD",
    "type": "SENTENCE_ORDER",
    "question": "Bilde den Nebensatz im Passiv mit Modalverb:",
    "words": [
      "Der Chef betont",
      "dass",
      "die Frist unbedingt",
      "eingehalten werden muss."
    ],
    "correctOrder": [
      "Der Chef betont",
      "dass",
      "die Frist unbedingt",
      "eingehalten werden muss."
    ],
    "correctAnswer": [
      "Der Chef betont",
      "dass",
      "die Frist unbedingt",
      "eingehalten werden muss."
    ],
    "explanation": "Hauptsatz -> dass -> Subjekt (die Frist) -> Adverb (unbedingt) -> Partizip II (eingehalten) + werden + finites Modalverb (muss).",
    "tags": [
      "Passiv",
      "Modalverben",
      "Arbeitswelt",
      "Passiv mit Modalverb Nebensatz",
      "Grammatik & Satzbau"
    ],
    "timeLimit": 30
  },
  {
    "id": "B1-WD-0021",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der ökologische Fußabdruck",
    "focusWord": "der ökologische Fußabdruck",
    "question": "Was bezeichnet \"der ökologische Fußabdruck\"?",
    "options": [
      "Ecological footprint (measure of human demand on nature)",
      "Shoe recycling program",
      "Nature park hiking trail",
      "Forest biodiversity index"
    ],
    "correctAnswer": "Ecological footprint (measure of human demand on nature)",
    "explanation": "Der ökologische Fußabdruck misst den Ressourcenverbrauch und die Umweltbelastung des Menschen.",
    "tags": [
      "Umwelt",
      "Ökologie",
      "Wortschatz",
      "Umwelt & Ökologie",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0022",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Weiterbildung",
    "focusWord": "die Weiterbildung",
    "question": "Was versteht man unter \"der Weiterbildung\"?",
    "options": [
      "Further training / Professional development",
      "Initial schooling",
      "Retirement process",
      "Employment termination"
    ],
    "correctAnswer": "Further training / Professional development",
    "explanation": "\"Die Weiterbildung\" umfasst zusätzliche berufliche Kurse und Qualifizierungen (further training).",
    "tags": [
      "Arbeit",
      "Bildung",
      "Karriere",
      "Arbeitswelt & Weiterbildung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0023",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Betriebsrat",
    "focusWord": "der Betriebsrat",
    "question": "Was ist \"der Betriebsrat\" in einem deutschen Unternehmen?",
    "options": [
      "Works council (elected employee representation)",
      "Board of directors / Executive board",
      "Customer support team",
      "Accounting department"
    ],
    "correctAnswer": "Works council (elected employee representation)",
    "explanation": "Der Betriebsrat vertritt die Interessen der Arbeitnehmer gegenüber der Unternehmensleitung (works council).",
    "tags": [
      "Arbeit",
      "Recht",
      "Gesellschaft",
      "Gesellschaft & Mitbestimmung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0024",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Inflation",
    "focusWord": "die Inflation",
    "question": "Was bedeutet \"die Inflation\"?",
    "options": [
      "Devaluation of money / Price increases over time",
      "Stock market boom",
      "Tax reduction",
      "Currency stability"
    ],
    "correctAnswer": "Devaluation of money / Price increases over time",
    "explanation": "Inflation bezeichnet den anhaltenden Prozess der Geldentwertung und allgemeinen Preissteigerung.",
    "tags": [
      "Wirtschaft",
      "Finanzen",
      "Gesellschaft",
      "Wirtschaft & Finanzen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0025",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_REVERSE",
    "sourceWord": "Scholarship / Grant",
    "focusWord": "Scholarship / Grant",
    "question": "Wie heißt die finanzielle Studienförderung auf Deutsch?",
    "options": [
      "das Stipendium",
      "der Studienkredit",
      "die Studiengebühr",
      "das Gehalt"
    ],
    "correctAnswer": "das Stipendium",
    "explanation": "Ein Stipendium ist eine finanzielle Unterstützung für begabte oder engagierte Studierende.",
    "tags": [
      "Bildung",
      "Studium",
      "Finanzen",
      "Bildung & Studium",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0026",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Künstliche Intelligenz",
    "focusWord": "die Künstliche Intelligenz",
    "question": "Was bedeutet die Abkürzung \"KI\" auf Deutsch?",
    "options": [
      "Künstliche Intelligenz (AI)",
      "Kreative Inspiration",
      "Kulturelle Initiative",
      "Kaufmännische Information"
    ],
    "correctAnswer": "Künstliche Intelligenz (AI)",
    "explanation": "KI steht im Deutschen für \"Künstliche Intelligenz\" (engl. AI = Artificial Intelligence).",
    "tags": [
      "Technologie",
      "Wissenschaft",
      "Medien",
      "Wissenschaft & Innovation",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0027",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Barrierefreiheit",
    "focusWord": "die Barrierefreiheit",
    "question": "Was bedeutet \"die Barrierefreiheit\"?",
    "options": [
      "Accessibility (barrier-free access for people with disabilities)",
      "Free admission to cultural museums",
      "Highway speed limit exemption",
      "Tax-free shopping zone"
    ],
    "correctAnswer": "Accessibility (barrier-free access for people with disabilities)",
    "explanation": "Barrierefreiheit bedeutet, dass Gebäude, Verkehrsmittel und Websites für Menschen mit Behinderungen uneingeschränkt zugänglich sind.",
    "tags": [
      "Gesellschaft",
      "Inklusion",
      "Wortschatz",
      "Gesellschaft & Inklusion",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0028",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Kündigungsfrist",
    "focusWord": "die Kündigungsfrist",
    "question": "Was ist \"die Kündigungsfrist\"?",
    "options": [
      "Notice period before contract termination",
      "Probation period",
      "Overtime limit",
      "Fixed contract duration"
    ],
    "correctAnswer": "Notice period before contract termination",
    "explanation": "Die Kündigungsfrist ist der vertragliche oder gesetzliche Zeitraum zwischen Kündigungserklärung und Vertragsende.",
    "tags": [
      "Arbeit",
      "Vertrag",
      "Recht",
      "Arbeitswelt & Vertrag",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0029",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "EASY",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Pressefreiheit",
    "focusWord": "die Pressefreiheit",
    "question": "Was bedeutet \"die Pressefreiheit\"?",
    "options": [
      "Freedom of the press (uncensored journalism)",
      "Free newspaper distribution",
      "Press conference ticket",
      "Printing discount"
    ],
    "correctAnswer": "Freedom of the press (uncensored journalism)",
    "explanation": "Die Pressefreiheit schützt Journalistinnen und Journalisten vor staatlicher Zensur.",
    "tags": [
      "Medien",
      "Demokratie",
      "Recht",
      "Medien & Kommunikation",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0030",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Wohlbefinden",
    "focusWord": "das Wohlbefinden",
    "question": "Was bedeutet \"das Wohlbefinden\"?",
    "options": [
      "Well-being / Physical and mental wellness",
      "Illness symptom",
      "Restlessness",
      "Fatigue"
    ],
    "correctAnswer": "Well-being / Physical and mental wellness",
    "explanation": "\"Das Wohlbefinden\" bezeichnet den positiven Zustand körperlicher und seelischer Gesundheit.",
    "tags": [
      "Gesundheit",
      "Psychologie",
      "Alltag",
      "Psychologie & Gesundheit",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0031",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "sourceWord": "die Daumen drücken",
    "focusWord": "jemandem die Daumen drücken",
    "question": "Was bedeutet die Redewendung \"Ich drücke dir die Daumen!\"?",
    "options": [
      "Ich wünsche dir viel Erfolg und Glück!",
      "Ich bin wütend auf dich.",
      "Ich helfe dir beim Tragen.",
      "Ich drücke deine Hand."
    ],
    "correctAnswer": "Ich wünsche dir viel Erfolg und Glück!",
    "explanation": "\"Jemandem die Daumen drücken\" bedeutet bildhaft, ihm viel Erfolg bei einer Prüfung oder Herausforderung zu wünschen.",
    "tags": [
      "Redewendungen",
      "Kultur",
      "Alltag",
      "Redewendungen & Sprichwörter",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0032",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "sourceWord": "zuverlässig",
    "focusWord": "zuverlässig",
    "question": "Was bedeutet \"zuverlässig\"?",
    "options": [
      "Man kann sich immer auf diese Person verlassen.",
      "Die Person kommt ständig zu spät.",
      "Die Person redet ununterbrochen.",
      "Die Person wechselt oft ihre Meinung."
    ],
    "correctAnswer": "Man kann sich immer auf diese Person verlassen.",
    "explanation": "Eine zuverlässige Person (reliable) hält Termine und Versprechen gewissenhaft ein.",
    "tags": [
      "Charakter",
      "Adjektive",
      "Arbeit",
      "Charakter & Persönlichkeit",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0033",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "das Pfand / das Pfandsystem",
    "focusWord": "das Pfand",
    "question": "Was ist \"das Pfand\" in Deutschland beim Flaschenkauf?",
    "options": [
      "Deposit paid on beverage containers, refunded upon return",
      "Environmental fine",
      "Plastic recycling tax",
      "Bottle manufacturing fee"
    ],
    "correctAnswer": "Deposit paid on beverage containers, refunded upon return",
    "explanation": "Das Einweg- und Mehrwegpfand (z. B. 0,25 €) wird beim Kauf erhoben und bei der Flaschenrückgabe am Automaten erstattet.",
    "tags": [
      "Umwelt",
      "Alltag",
      "Kultur",
      "Umwelt & Recycling",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0034",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "die Gleitzeit",
    "focusWord": "die Gleitzeit",
    "question": "Was versteht man unter \"Gleitzeit\" am Arbeitsplatz?",
    "options": [
      "Flexible working hours (within agreed core windows)",
      "Mandatory shift work",
      "Unpaid overtime",
      "Holiday replacement time"
    ],
    "correctAnswer": "Flexible working hours (within agreed core windows)",
    "explanation": "Gleitzeit ermöglicht es Beschäftigten, Beginn und Ende der täglichen Arbeitszeit flexibel zu gestalten.",
    "tags": [
      "Arbeit",
      "Beruf",
      "Organisation",
      "Arbeitswelt & Struktur",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WD-0035",
    "level": "B1",
    "gameType": "WORTSCHATZ_DUELL",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "VOCABULARY_TRANSLATION",
    "sourceWord": "der Kompromiss",
    "focusWord": "der Kompromiss",
    "question": "Was ist \"ein Kompromiss\"?",
    "options": [
      "A mutual agreement where both sides make concessions",
      "A total victory in debate",
      "A complete disagreement",
      "A legal verdict"
    ],
    "correctAnswer": "A mutual agreement where both sides make concessions",
    "explanation": "Ein Kompromiss ist eine Einigung durch gegenseitiges Nachgeben beider Verhandlungspartner.",
    "tags": [
      "Diskussion",
      "Verhandlung",
      "Politik",
      "Diskussion & Argumentation",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 15
  },
  {
    "id": "B1-WB-0016",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte berufliche Treffen:",
    "clues": [
      "Hinweis 1: Man bereitet sich intensiv darauf vor, zieht formelle Kleidung an und bringt seinen Lebenslauf mit.",
      "Hinweis 2: Personalverantwortliche und Vorgesetzte stellen Fragen zu Fachwissen, Motivation und Gehaltsvorstellungen.",
      "Hinweis 3: Es entscheidet darüber, ob man den gewünschten Arbeitsvertrag erhält."
    ],
    "options": [
      "Das Vorstellungsgespräch / Bewerbungsgespräch",
      "Die Betriebsversammlung",
      "Die Weihnachtsfeier",
      "Das Kündigungsgespräch"
    ],
    "correctAnswer": "Das Vorstellungsgespräch / Bewerbungsgespräch",
    "explanation": "Im Vorstellungsgespräch prüfen Bewerber und Arbeitgeber die gegenseitige Eignung für eine Arbeitsstelle.",
    "tags": [
      "Bewerbung",
      "Karriere",
      "Kommunikation",
      "Arbeitswelt & Bewerbung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0017",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte saubere Energieform:",
    "clues": [
      "Hinweis 1: Photovoltaik-Module auf Hausdächern oder in Solarparks fangen Sonnenstrahlen auf.",
      "Hinweis 2: Ich erzeuge emissionsfreien, sauberen Ökostrom ohne fossile Brennstoffe.",
      "Hinweis 3: Zusammen mit Windenergie bin ich eine tragende Säule der deutschen Energiewende."
    ],
    "options": [
      "Die Solarenergie / Sonnenenergie",
      "Die Kernenergie",
      "Die Kohlekraft",
      "Das Erdgas"
    ],
    "correctAnswer": "Die Solarenergie / Sonnenenergie",
    "explanation": "Solarenergie wandelt Sonnenlicht direkt in umweltfreundlichen Strom um.",
    "tags": [
      "Umwelt",
      "Energie",
      "Technologie",
      "Umwelt & Technologie",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0018",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "CLUE_GUESS",
    "question": "Errate das traditionsreiche deutsche Ausbildungsmodell:",
    "clues": [
      "Hinweis 1: Auszubildende (Azubis) lernen 2 bis 3,5 Jahre lang abwechselnd an zwei verschiedenen Lernorten.",
      "Hinweis 2: Die praktische Arbeit erfolgt direkt im Betrieb, der theoretische Unterricht in der staatlichen Berufsschule.",
      "Hinweis 3: Dieses System ist weltweit für seine hohe Qualität und geringe Jugendarbeitslosigkeit berühmt."
    ],
    "options": [
      "Das duale Ausbildungssystem",
      "Das Universitätsstudium",
      "Das Fernstudium",
      "Das unbezahlte Praktikum"
    ],
    "correctAnswer": "Das duale Ausbildungssystem",
    "explanation": "Das duale Ausbildungssystem verbindet praktische Betriebsausbildung und theoretische Berufsschulbildung.",
    "tags": [
      "Bildung",
      "Beruf",
      "Kultur",
      "Bildungssystem Deutschland",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0019",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte ökonomische Phänomen:",
    "clues": [
      "Hinweis 1: Wenn ich steige, verliert das Geld auf dem Sparkonto schrittweise an Kaufkraft.",
      "Hinweis 2: Waren des täglichen Bedarfs wie Butter, Benzin und Strom werden spürbar teurer.",
      "Hinweis 3: Zentralbanken wie die Europäische Zentralbank (EZB) versuchen, mich bei etwa 2% stabil zu halten."
    ],
    "options": [
      "Die Inflation",
      "Die Deflation",
      "Die Rezession",
      "Die Dividende"
    ],
    "correctAnswer": "Die Inflation",
    "explanation": "Die Inflation beschreibt den allgemeinen Anstieg des Preisniveaus und den Kaufkraftverlust.",
    "tags": [
      "Wirtschaft",
      "Finanzen",
      "Geld",
      "Wirtschaft & Finanzen",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0020",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "HARD",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte gewerbliche Schutzrecht:",
    "clues": [
      "Hinweis 1: Ingenieure und Erfinder melden mich beim Deutschen Patent- und Markenamt (DPMA) an.",
      "Hinweis 2: Ich schütze eine innovative technische Erfindung für bis zu 20 Jahre vor Nachahmung durch Konkurrenten.",
      "Hinweis 3: Nur der Inhaber darf die Erfindung herstellen, verkaufen oder Lizenzen vergeben."
    ],
    "options": [
      "Das Patent",
      "Das Copyright",
      "Das Zeugnis",
      "Die Quittung"
    ],
    "correctAnswer": "Das Patent",
    "explanation": "Ein Patent sichert dem Erfinder das zeitlich begrenzte Monopolrecht zur gewerblichen Nutzung.",
    "tags": [
      "Wissenschaft",
      "Recht",
      "Innovation",
      "Forschung & Erfindung",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0021",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte digitale Arbeitsform:",
    "clues": [
      "Hinweis 1: Beschäftigte arbeiten nicht im Büro der Firma, sondern am heimischen Schreibtisch.",
      "Hinweis 2: Man nutzt Laptop, VPN-Zugang, Videokonferenzen und E-Mails zur Zusammenarbeit.",
      "Hinweis 3: Man spart sich den täglichen Arbeitsweg und die Rushhour im Berufsverkehr."
    ],
    "options": [
      "Das Homeoffice / Mobiles Arbeiten",
      "Die Schichtarbeit",
      "Die Kurzarbeit",
      "Die Dienstreise"
    ],
    "correctAnswer": "Das Homeoffice / Mobiles Arbeiten",
    "explanation": "Im Homeoffice oder mobilen Arbeiten erledigen Angestellte ihre Aufgaben digital von zu Hause aus.",
    "tags": [
      "Arbeit",
      "Digitalisierung",
      "Alltag",
      "Medien & IT",
      "Arbeit & Beruf"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0022",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das globale Umweltphänomen:",
    "clues": [
      "Hinweis 1: Die weltweite Durchschnittstemperatur der Atmosphäre und der Ozeane steigt kontinuierlich.",
      "Hinweis 2: Gletscher schmelzen, der Meeresspiegel steigt und extreme Wetterereignisse nehmen zu.",
      "Hinweis 3: Hauptursache ist der Ausstoß von Treibhausgasen durch Industrie, Verkehr und Landwirtschaft."
    ],
    "options": [
      "Der Klimawandel / Die Erderwärmung",
      "Das Ozonloch",
      "Die Eiszeit",
      "Der saure Regen"
    ],
    "correctAnswer": "Der Klimawandel / Die Erderwärmung",
    "explanation": "Der menschengemachte Klimawandel ist eine der größten ökologischen Herausforderungen der Gegenwart.",
    "tags": [
      "Klima",
      "Umwelt",
      "Global",
      "Umwelt & Klima",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0023",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das demokratische Grundrecht und Verfahren:",
    "clues": [
      "Hinweis 1: Bürgerinnen und Bürger ab 18 Jahren gehen sonntags ins Wahllokal oder nutzen die Briefwahl.",
      "Hinweis 2: In einer Wahlkabine setzt man seine Kreuze geheim auf dem Stimmzettel.",
      "Hinweis 3: Dadurch bestimmt das Volk die Abgeordneten für den Deutschen Bundestag oder den Landtag."
    ],
    "options": [
      "Die Bundestagswahl / Parlamentswahl",
      "Die Demonstration",
      "Die Volkszählung",
      "Die Gerichtsverhandlung"
    ],
    "correctAnswer": "Die Bundestagswahl / Parlamentswahl",
    "explanation": "In freien, gleichen und geheimen Wahlen bestimmen Bürger ihre parlamentarische Vertretung.",
    "tags": [
      "Politik",
      "Demokratie",
      "Gesellschaft",
      "Politik & Demokratie",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0024",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Gesundheit & Ernährung",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate die gesuchte Versicherungspolice:",
    "clues": [
      "Hinweis 1: Man schließt mich vor Antritt einer teuren Urlaubsreise oder Flugbuchung ab.",
      "Hinweis 2: Wenn man vor der Reise plötzlich schwer krank wird, übernimmt sie die Stornierungskosten.",
      "Hinweis 3: Dadurch bleibt man im Notfall nicht auf den hohen Hotel- und Flugkosten sitzen."
    ],
    "options": [
      "Die Reiserücktrittsversicherung",
      "Die Kfz-Haftpflichtversicherung",
      "Die Hausratversicherung",
      "Die Rechtsschutzversicherung"
    ],
    "correctAnswer": "Die Reiserücktrittsversicherung",
    "explanation": "Die Reiserücktrittsversicherung erstattet Stornokosten bei unvorhersehbarer schwerer Krankheit vor Reisebeginn.",
    "tags": [
      "Reisen",
      "Versicherung",
      "Finanzen",
      "Reisen & Absicherung",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-WB-0025",
    "level": "B1",
    "gameType": "WAS_BIN_ICH",
    "category": "Wortschatz & Synonyme",
    "difficulty": "MEDIUM",
    "type": "CLUE_GUESS",
    "question": "Errate das gesuchte Medienphänomen:",
    "clues": [
      "Hinweis 1: Ich bin eine bewusst erfundene, falsche Nachricht im Internet oder in sozialen Netzwerken.",
      "Hinweis 2: Mein Ziel ist es, Leser zu manipulieren, Klicks zu generieren oder gesellschaftliche Wut zu erzeugen.",
      "Hinweis 3: Faktenchecker entlarven meine Behauptungen durch unabhängige Recherche."
    ],
    "options": [
      "Die Falschmeldung / Fake News",
      "Der Leitartikel",
      "Die Reportage",
      "Das Interview"
    ],
    "correctAnswer": "Die Falschmeldung / Fake News",
    "explanation": "Fake News sind gezielte Desinformationen zur Manipulation der öffentlichen Meinung.",
    "tags": [
      "Medien",
      "Internet",
      "Gesellschaft",
      "Medien & Fake News",
      "Wortschatz & Synonyme"
    ],
    "timeLimit": 24
  },
  {
    "id": "B1-TB-0016",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: In einer Debatte möchtest du einem Argument höflich, aber bestimmt widersprechen. Welche Formulierung passt am besten?",
    "options": [
      "Da bin ich anderer Meinung, denn wir müssen auch die finanziellen Konsequenzen bedenken.",
      "Du redest absoluten Unsinn!",
      "Halt den Mund, ich habe recht!",
      "Ich stimme dir zu 100% zu."
    ],
    "correctAnswer": "Da bin ich anderer Meinung, denn wir müssen auch die finanziellen Konsequenzen bedenken.",
    "explanation": "In einer sachlichen Diskussion drückt man Gegenargumente respektvoll mit Begründung aus (\"Da bin ich anderer Meinung, denn...\").",
    "tags": [
      "Diskussion",
      "Rhetorik",
      "Höflichkeit",
      "Diskussion & Höflicher Widerspruch",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0017",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du führst ein Jahresgespräch mit deinem Vorgesetzten und möchtest eine Gehaltserhöhung begründen. Was ist das überzeugendste Argument?",
    "options": [
      "Aufgrund meiner erfolgreichen Projektergebnisse und der Übernahme zusätzlicher Teamverantwortung halte ich eine Gehaltsanpassung für angemessen.",
      "Alles im Supermarkt ist teurer geworden, also will ich mehr Geld.",
      "Mein Kollege verdient mehr als ich, das ist unfair.",
      "Geben Sie mir mehr Geld, sonst arbeite ich ab morgen nicht mehr."
    ],
    "correctAnswer": "Aufgrund meiner erfolgreichen Projektergebnisse und der Übernahme zusätzlicher Teamverantwortung halte ich eine Gehaltsanpassung für angemessen.",
    "explanation": "Erfolgreiche Gehaltsverhandlungen stützen sich auf messbare Leistungen, Erfolge und erweiterte Verantwortung.",
    "tags": [
      "Arbeit",
      "Verhandlung",
      "Karriere",
      "Arbeitswelt & Gehaltsverhandlung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0018",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du formulierst einen formellen Beschwerdebrief an einen Reiseveranstalter wegen gravierender Hotelmängel. Welcher Einleitungssatz ist stilistisch passend?",
    "options": [
      "Sehr geehrte Damen und Herren, hiermit möchte ich mich über die unzumutbaren Zustände in dem von mir gebuchten Hotel beschweren.",
      "Hallo Leute, euer Urlaub war richtig schlecht.",
      "Ich verlange sofort 1 Million Euro Schadenersatz!",
      "Guten Tag, ich fahre nie wieder mit euch."
    ],
    "correctAnswer": "Sehr geehrte Damen und Herren, hiermit möchte ich mich über die unzumutbaren Zustände in dem von mir gebuchten Hotel beschweren.",
    "explanation": "Ein formeller Beschwerdebrief beginnt mit der korrekten Anrede und einer präzisen Sachverhaltsschilderung.",
    "tags": [
      "Schreiben",
      "Beschwerde",
      "Reisen",
      "Schriftliche Beschwerde",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0019",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Zu Beginn einer Fachpräsentation stellst du den Ablauf vor. Welcher Satz leitet die Gliederung professionell ein?",
    "options": [
      "Ich habe meinen Vortrag in drei Hauptteile gegliedert: Zunächst stelle ich die Fakten vor, danach analysiere ich die Ursachen und abschließend gebe ich Handlungsempfehlungen.",
      "Ich rede jetzt einfach mal drauflos und gucke, was passiert.",
      "Hoffentlich dauert mein Vortrag nicht zu lange.",
      "Gibt es Fragen, bevor ich überhaupt anfange?"
    ],
    "correctAnswer": "Ich habe meinen Vortrag in drei Hauptteile gegliedert: Zunächst stelle ich die Fakten vor, danach analysiere ich die Ursachen und abschließend gebe ich Handlungsempfehlungen.",
    "explanation": "Eine strukturierte Gliederung mit Zeit- und Themenmarkern (zunächst, danach, abschließend) erleichtert dem Publikum das Verfolgen des Vortrags.",
    "tags": [
      "Präsentation",
      "Rhetorik",
      "Bildung",
      "Vortrag & Präsentation",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0020",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Reisen & Mobilität",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Welche Maßnahme leistet im Alltag den effektivsten Beitrag zur persönlichen Reduzierung des CO2-Fußabdrucks?",
    "options": [
      "Möglichst oft auf Bahn, Fahrrad und ÖPNV umsteigen statt Kurzstreckenflüge und Einzelfahrten mit dem Auto zu nutzen.",
      "Das Licht im Zimmer den ganzen Tag brennen lassen.",
      "Alte Plastiktüten im Wald verbrennen.",
      "Täglich dreimal heiß baden."
    ],
    "correctAnswer": "Möglichst oft auf Bahn, Fahrrad und ÖPNV umsteigen statt Kurzstreckenflüge und Einzelfahrten mit dem Auto zu nutzen.",
    "explanation": "Verkehrsvermeidung und die Nutzung öffentlicher Verkehrsmittel senken den individuellen Treibhausgasausstoß drastisch.",
    "tags": [
      "Umwelt",
      "Klimaschutz",
      "Mobilität",
      "Umwelt & Klimaschutz",
      "Reisen & Mobilität"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0021",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Zwei Kollegen in deinem Team sind sich über die Arbeitsteilung uneinig. Wie moderierst du lösungsorientiert?",
    "options": [
      "Lasst uns die offenen Aufgaben auflisten und gemeinsam nach den Stärken und zeitlichen Ressourcen jedes Einzelnen fair aufteilen.",
      "Wer am lautesten schreit, bekommt die leichtere Aufgabe.",
      "Ihr müsst euch streiten, bis einer kündigt.",
      "Ich mache gar nichts mehr mit euch."
    ],
    "correctAnswer": "Lasst uns die offenen Aufgaben auflisten und gemeinsam nach den Stärken und zeitlichen Ressourcen jedes Einzelnen fair aufteilen.",
    "explanation": "Konfliktlösung im Team basiert auf Transparenz, sachlicher Kriterienfindung und fairer Aufgabenverteilung.",
    "tags": [
      "Teamarbeit",
      "Kommunikation",
      "Problemlösung",
      "Teamarbeit & Konfliktlösung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0022",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: In Deutschland zahlen gesetzliche Krankenkassen regelmäßige Vorsorgeuntersuchungen (z. B. Check-up 35). Welcher Vorteil steht im Vordergrund?",
    "options": [
      "Krankheiten wie Diabetes oder Herz-Kreislauf-Probleme können frühzeitig erkannt und erfolgreich behandelt werden.",
      "Man bekommt Geld geschenkt beim Arztbesuch.",
      "Man muss nie wieder gesund essen.",
      "Man darf auf der Arbeit fehlen ohne Grund."
    ],
    "correctAnswer": "Krankheiten wie Diabetes oder Herz-Kreislauf-Probleme können frühzeitig erkannt und erfolgreich behandelt werden.",
    "explanation": "Medizinische Früherkennung (Prävention) verhindert schwere Krankheitsverläufe durch rechtzeitige Intervention.",
    "tags": [
      "Gesundheit",
      "Prävention",
      "Gesellschaft",
      "Gesundheit & Prävention",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0023",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Ein reißerischer Social-Media-Beitrag behauptet unglaubliche Neuigkeiten ohne Quellenangabe. Was sollte man tun, bevor man ihn teilt?",
    "options": [
      "Die Information über seriöse Nachrichtenagenturen, Qualitätsmedien oder offizielle Faktenchecker überprüfen.",
      "Den Beitrag sofort an alle Freunde weiterleiten.",
      "Einen wütenden Kommentar verfassen ohne nachzudenken.",
      "Den Computer sofort ausschalten und wegwerfen."
    ],
    "correctAnswer": "Die Information über seriöse Nachrichtenagenturen, Qualitätsmedien oder offizielle Faktenchecker überprüfen.",
    "explanation": "Quellenkritik und Fact-Checking verhindern die unbedachte Verbreitung von Falschmeldungen im Netz.",
    "tags": [
      "Medien",
      "Digitalisierung",
      "Kritisches Denken",
      "Medienkompetenz",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0024",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Was fördert den Spracherwerb und die soziale Integration im Alltag am schnellsten?",
    "options": [
      "Aktive Teilnahme an Vereinen, Gespräche mit Nachbarn und Kollegen sowie regelmäßiges Lesen deutscher Medien.",
      "Nur in der eigenen Muttersprache Filme schauen.",
      "Keinen Kontakt zu Einheimischen suchen.",
      "Das Haus niemals verlassen."
    ],
    "correctAnswer": "Aktive Teilnahme an Vereinen, Gespräche mit Nachbarn und Kollegen sowie regelmäßiges Lesen deutscher Medien.",
    "explanation": "Praktische Sprachimmersion und gesellschaftliches Engagement beschleunigen die Sprachkompetenz enorm.",
    "tags": [
      "Integration",
      "Kultur",
      "Sprachkurs",
      "Gesellschaft & Integration",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0025",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Gesundheit & Ernährung",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Der Vermieter möchte ohne Ankündigung die Wohnung betreten. Welche Rechtslage gilt in Deutschland?",
    "options": [
      "Der Vermieter darf die Wohnung grundsätzlich nur nach rechtzeitiger Terminabsprache und mit berechtigtem Grund betreten.",
      "Der Vermieter hat einen Generalschlüssel und darf jederzeit ohne Erlaubnis eintreten.",
      "Der Mieter muss dem Vermieter die Wohnung sofort überlassen.",
      "In Mietwohnungen gibt es keine Gesetze."
    ],
    "correctAnswer": "Der Vermieter darf die Wohnung grundsätzlich nur nach rechtzeitiger Terminabsprache und mit berechtigtem Grund betreten.",
    "explanation": "Das Hausrecht des Mieters ist grundgesetzlich geschützt (Art. 13 GG); unangekündigte Besuche ohne Notfall sind unzulässig.",
    "tags": [
      "Wohnen",
      "Recht",
      "Miete",
      "Wohnungsmarkt & Mietrecht",
      "Gesundheit & Ernährung"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0026",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Was versteht man unter dem Begriff \"Lebenslanges Lernen\"?",
    "options": [
      "Die Bereitschaft, sich auch im Erwachsenen- und Berufsleben kontinuierlich neues Wissen und neue Fähigkeiten anzueignen.",
      "Dass man für immer in der Grundschule sitzen bleibt.",
      "Dass man keine Prüfungen mehr ablegen darf.",
      "Dass alle Bücher verboten werden."
    ],
    "correctAnswer": "Die Bereitschaft, sich auch im Erwachsenen- und Berufsleben kontinuierlich neues Wissen und neue Fähigkeiten anzueignen.",
    "explanation": "Lebenslanges Lernen beschreibt die kontinuierliche Weiterentwicklung von Kompetenzen über die gesamte Lebensspanne.",
    "tags": [
      "Bildung",
      "Zukunft",
      "Karriere",
      "Bildung & lebenslanges Lernen",
      "Arbeit & Beruf"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0027",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Du kaufst im deutschen Online-Handel ein Produkt. Welches gesetzliche Widerrufsrecht hast du in der Regel?",
    "options": [
      "Ein 14-tägiges gesetzliches Widerrufsrecht ohne Angabe von Gründen.",
      "Gar kein Rückgaberecht.",
      "Nur ein Rückgaberecht, wenn der Händler zustimmt.",
      "Ein 10-jähriges Rückgaberecht bei voller Geld-zurück-Garantie."
    ],
    "correctAnswer": "Ein 14-tägiges gesetzliches Widerrufsrecht ohne Angabe von Gründen.",
    "explanation": "Im EU-Fernabsatzrecht haben Verbraucher grundsätzlich 14 Tage Zeit, Verträge ohne Begründung zu widerrufen.",
    "tags": [
      "Verbraucherschutz",
      "Einkaufen",
      "Recht",
      "Verbraucherschutz & Online-Shopping",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0028",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Alltag & Konversation",
    "difficulty": "EASY",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Welcher Feiertag wird in ganz Deutschland am 3. Oktober als Nationalfeiertag begangen?",
    "options": [
      "Der Tag der Deutschen Einheit",
      "Der Tag der Arbeit",
      "Der Tag des Grundgesetzes",
      "Der Neujahrstag"
    ],
    "correctAnswer": "Der Tag der Deutschen Einheit",
    "explanation": "Am 3. Oktober feiert Deutschland den Tag der Deutschen Einheit (Wiedervereinigung 1990).",
    "tags": [
      "Geschichte",
      "Feiertage",
      "Kultur",
      "Kultur & Bräuche",
      "Alltag & Konversation"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0029",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "MEDIUM",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: Wie schließt man eine formelle geschäftliche E-Mail an eine unbekannte Ansprechperson in Deutschland korrekt ab?",
    "options": [
      "Mit freundlichen Grüßen",
      "Liebe Grüße und Küsse",
      "Bis später, machs gut",
      "Tschüssi"
    ],
    "correctAnswer": "Mit freundlichen Grüßen",
    "explanation": "\"Mit freundlichen Grüßen\" ist der standardisierte, respektvolle Gruß für formelle Geschäftskorrespondenz.",
    "tags": [
      "Schreiben",
      "Höflichkeit",
      "Geschäftsdeutsch",
      "Arbeitswelt & E-Mail-Schlussformel",
      "Arbeit & Beruf"
    ],
    "timeLimit": 20
  },
  {
    "id": "B1-TB-0030",
    "level": "B1",
    "gameType": "TEAM_BATTLE",
    "category": "Arbeit & Beruf",
    "difficulty": "HARD",
    "type": "MULTIPLE_CHOICE",
    "question": "TEAM-AUFGABE: In einer Projektbesprechung gibt es zwei gegensätzliche Vorschläge. Welcher Satz führt zu einem konstruktiven Konsens?",
    "options": [
      "Lassen Sie uns versuchen, die Vorteile beider Ansätze zu kombinieren und einen tragfähigen Mittelweg zu erarbeiten.",
      "Mein Vorschlag ist der einzige richtige, der andere ist wertlos.",
      "Wir brechen das Projekt jetzt ab.",
      "Wir werfen eine Münze und diskutieren nie wieder darüber."
    ],
    "correctAnswer": "Lassen Sie uns versuchen, die Vorteile beider Ansätze zu kombinieren und einen tragfähigen Mittelweg zu erarbeiten.",
    "explanation": "Ein integrativer Lösungsansatz kombiniert Stärken beider Seiten zu einem belastbaren Konsens.",
    "tags": [
      "Kommunikation",
      "Verhandlung",
      "Teamarbeit",
      "Diskussion & Kompromissfindung",
      "Arbeit & Beruf"
    ],
    "timeLimit": 20
  }
];
