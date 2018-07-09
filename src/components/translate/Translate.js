export const translationMap = {
  END_PROBATION: 'Ende der Probezeit',
  ON_DEMAND: 'Auf Nachfrage',
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
