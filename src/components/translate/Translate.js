export const translationMap = {
  CONTRIBUTION_TO_COMPANY_DEVELOPMENT: 'Beitrag zur Unternehmensentwicklung',
  CUSTOMER_INTERACTION: 'Kundeninteraktion und -veränderung',
  CUSTOMER_RETENTION: 'Kundenbindung und Mandatsgenerierung',
  DONE: 'Fertig',
  END_PROBATION: 'Ende der Probezeit',
  EXECUTION: 'In Durchführung',
  INFLUENCE_OF_LEADER_AND_ENVIRONMENT:
    'Reflektion Beitrag des Vorgesetzten und Umfeld zur eigenen Entwicklung',
  LEADERSHIP: 'Coaching, Leadership und Personalführung',
  ON_DEMAND: 'Auf Nachfrage',
  PLACEHOLDER_INFLUENCE_OF_LEADER_AND_ENVIRONMENT:
    'Was ist mir für meine Entwicklung wichtig? Welchen Beitrag leistet mein Umfeld und mein Vorgesetzter, was sollte sich ändern und wie kann ich dazu beitragen?',
  PLACEHOLDER_ROLE_AND_PROJECT_ENVIRONMENT:
    'Beschreibung Projekt, Aufgabe und Rolle',
  POST_PROCESSING: 'Nachbearbeitung',
  PREPARATION: 'In Vorbereitung',
  PROBLEM_ANALYSIS: 'Problemanalyse und -lösung',
  ROLE_AND_PROJECT_ENVIRONMENT: 'Rolle und Projektumfeld',
  TEAMWORK: 'Effektives Arbeiten im Team und Teamführung',
  WORKING_MANNER: 'Arbeitsweise',
  WORK_RESULTS: 'Arbeitsergebnisse',
  YEARLY: 'Jährlich'
};

export default function Translate(props) {
  return translateContent(props.content);
}

export function translateContent(key) {
  if (translationMap[key]) {
    return translationMap[key];
  }

  throw new Error(`Missing translation key ${key}`);
}
