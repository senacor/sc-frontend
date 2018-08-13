export const translationMap = {
  ACCEPT: 'Angenommen',
  ACCEPTED_DATE_REVIEWER: 'Termin akzeptiert',
  ALL_DATES_ACCEPTED: 'Termin festgesetzt',
  ARCHITECT: 'Architekt',
  CONTRIBUTION_TO_COMPANY_DEVELOPMENT: 'Beitrag zur Unternehmensentwicklung',
  CUSTOMER_INTERACTION: 'Kundeninteraktion und -veränderung',
  CUSTOMER_RETENTION: 'Kundenbindung und Mandatsgenerierung',
  DECLINE: 'Abgelehnt',
  DONE: 'Fertig',
  END_PROBATION: 'Ende der Probezeit',
  EXECUTION: 'In Durchführung',
  FILLED_SHEET_EMPLOYEE: 'Freigabe Mitarbeiter',
  FILLED_SHEET_REVIEWER: 'Freigabe Beurteiler',
  FULFILLMENT_OF_REQUIREMENT:
    'Gesamteinschätzung; Erfüllung der Anforderungen für aktuelle Stufe',
  INFLUENCE_OF_LEADER_AND_ENVIRONMENT:
    'Reflektion Beitrag des Vorgesetzten und Umfeld zur eigenen Entwicklung',
  IT_LIEFERSTEUERER: 'IT Liefersteuerer',
  IT_SOLUTION_LEADER: 'IT Solution Leader',
  LEADERSHIP: 'Coaching, Leadership und Personalführung',
  LEAD_DEVELOPER: 'Lead Developer',
  MODIFICATIONS_ACCEPTED_EMPLOYEE: 'Änderungen Mitarbeiter',
  MODIFICATIONS_ACCEPTED_REVIEWER: 'Änderungen Beurteiler',
  NORESPONSERECEIVED: 'Noch keine Antwort erhalten',
  ON_DEMAND: 'Auf Nachfrage',
  PLACEHOLDER_INFLUENCE_OF_LEADER_AND_ENVIRONMENT:
    'Was ist mir für meine Entwicklung wichtig? Welchen Beitrag leistet mein Umfeld und mein Vorgesetzter, was sollte sich ändern und wie kann ich dazu beitragen?',
  PLACEHOLDER_ROLE_AND_PROJECT_ENVIRONMENT:
    'Beschreibung Projekt, Aufgabe und Rolle',
  PLATTFORMGESTALTER: 'Plattformgestalter',
  POST_PROCESSING: 'Nachbearbeitung',
  PREPARATION: 'In Vorbereitung',
  PROBLEM_ANALYSIS: 'Problemanalyse und -lösung',
  ROLE_AND_PROJECT_ENVIRONMENT: 'Rolle und Projektumfeld',
  TARGET_ROLE: 'Zielrolle (ab Senior Level ausfüllen)',
  TEAMWORK: 'Effektives Arbeiten im Team und Teamführung',
  TECHNICAL_EXPERT: 'Technischer Experte',
  TENTATIVE: 'Unter Vorbehalt',
  TRANSFORMATION_MANAGER: 'Transformation Manager',
  UNKNOWN: 'Unbekannt',
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
