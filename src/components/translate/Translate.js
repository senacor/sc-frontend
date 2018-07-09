export const translationMap = {
  DONE: 'Fertig',
  END_PROBATION: 'Ende der Probezeit',
  EXECUTION: 'In Durchführung',
  ON_DEMAND: 'Auf Nachfrage',
  POST_PROCESSING: 'Nachbearbeitung',
  PREPARATION: 'In Vorbereitung',
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
