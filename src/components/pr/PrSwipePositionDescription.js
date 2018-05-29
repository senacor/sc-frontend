import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import ReactSwipe from 'react-swipe';

const styles = theme => ({
  swipe: {
    overflow: 'hidden',
    visibility: 'hidden',
    position: 'relative',
    width: '400px',
    [theme.breakpoints.down('md')]: {
      width: '200px'
    }
  },
  swipeWrapInside: {
    float: 'left',
    position: 'relative'
  },
  description: {
    paddingLeft: '0',
    paddingRight: '0'
  },
  titleSize: {
    paddingLeft: '0',
    paddingRight: '0',
    fontSize: '0.8rem',
    fontWeight: '450'
  }
});

class PrSwipePositionDescription extends React.Component {
  positionText = position => {
    switch (position) {
      case 'PROBLEM_ANALYSIS':
        return 'Problemverständnis und Analysestruktur | Relevanz und Korrektheit Analyseergebnisse | korrekte Ableitung von Implikationen';

      case 'WORK_RESULTS':
        return 'Geeignete und fehlerfreie Ergebnisse | Einhaltung eigener Lieferzusagen | innovative Lösungen';

      case 'WORKING_MANNER':
        return 'Pro-aktive Verantwortungsübernahme | pragmatische Herangehensweise | Qualitätsanspruch (Drive for Excellence)';

      case 'TEAMWORK':
        return 'Aktive Informationssuche und -verteilung | gezielte Einbindung Teamleads und -mitglieder | Unterstützung anderer Teammitglieder | fachlich-konzeptionelle Teamsteuerung | Liefersteuerung Gesamtteam';

      case 'LEADERSHIP':
        return 'Betreuung und Coaching anderer Teammitglieder | operative Steuerung anderer Teammitglieder | Mitarbeiterbewertung und -entwicklung | Mitarbeiterbindung';

      case 'CUSTOMER_INTERACTION':
        return 'Verständnis für Kundensituation | angemessene, professionelle Kommunikation | Motivation von Veränderungen';

      case 'CUSTOMER_RETENTION':
        return 'Positive Kundenwahrnehmung | Beitrag zu Auf- und Ausbau von Kundenbeziehungen | Identifikation & Entwicklung neuer Themen | Vertriebswirkung';

      case 'FULFILLMENT_OF_REQUIREMENT':
        return '';

      case 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT':
        return 'Recruiting (Interviews, Hochschulaktivitäten) | Knowledge Management | Mentoring neuer Kollegen | Community Engagement';

      default:
        return;
    }
  };
  categoryText = category => {
    switch (category) {
      case 'PROBLEM_ANALYSIS':
        return {
          junior:
            'Einarbeitung in definierte, abgegrenzte Aufgabenstellung; Durchführung strukturierter Analysen; Entwicklung von Hypothesen zu Implikationen',

          senior:
            'Scoping Problem- und Analysekontext; Entwicklung Analysevorgehen, Durchführung von Analysen inkl. Anleitung von Teammitgliedern; Ableitung Implikationen',

          expert:
            'Scoping Problem- und Analysekontext; Entwicklung Analysevorgehen, Durchführung von Analysen inkl. Anleitung von Teammitgliedern; Ableitung Implikationen',

          lead:
            'Scoping Problem- und Analysekontext; Entwicklung Analysevorgehen, Durchführung von Analysen inkl. Anleitung von Teammitgliedern; Ableitung Implikationen'
        };
      case 'WORK_RESULTS':
        return {
          junior:
            'Termingerechte Erstellung qualitativ hochwertiger Beiträge zu Endprodukten',

          senior:
            'Scoping, Strukturierung und termingerechte Erstellung komplexerer Endprodukte in hoher Qualität inkl. Integration von Zulieferungen Dritter; Vorstellung Ergebnisse bei Kunden-Mitarbeitern/Projektleitern',

          expert:
            'Scoping und Strukturierung erforderlicher Endprodukte zur Absicherung des Projekterfolgs; Absicherung der termingerechten Bereitstellung in hoher Qualität; Vorstellung Ergebnisse bei Kunden-Mitarbeitern/Projektleitern',

          lead:
            'Scoping und Strukturierung erforderlicher Endprodukte zur Absicherung des Projekterfolgs; Absicherung der termingerechten Bereitstellung in hoher Qualität; Vorstellung Ergebnisse bei Entscheidern'
        };

      case 'WORKING_MANNER':
        return {
          junior:
            'Eigenständige Bearbeitung klar umrissener Aufgabenstellungen; Pragmatismus; hoher Anspruch an die Qualität der eigenen Arbeit',

          senior:
            'Übernahme von Verantwortung für eigene Endprodukte; Kalibrierung von Vorgehen und Aufwand gegen Lieferzusagen und Machbarkeit; Absicherung der Qualität der verantworteten Endprodukte',

          expert:
            'Übernahme von Verantwortung für Teilprojekte; Kalibrierung von Vorgehen und Aufwand gegen Lieferzusagen und Machbarkeit; Absicherung der Gesamtqualität aller Endprodukte',

          lead:
            'Übernahme von Verantwortung für größere Projekte und Teilprojekte; Priorisierung und Strukturierung gegen Projektziele; Absicherung der Gesamtqualität aller Endprodukte'
        };

      case 'TEAMWORK':
        return {
          junior:
            'Recherchiert und analysiert verfügbare Informationen (Projekt, andere Quellen) und adressiert konkrete Fragen; integriert sich in Teamstruktur; sucht den Kontakt zu Teammitgliedern, um Kontextwissen für seine Aufgabenstellungen aufzubauen',

          senior:
            'Strukturiert inhaltlich und auf Aufgabenebene die Arbeit für seine Themenstellungen; schafft Rahmen für effektive und effiziente Zusammenarbeit',

          expert:
            'Strukturiert inhaltlich und auf Aufgabenebene die Arbeit für seine Themenstellungen; schafft Rahmen für effektive und effiziente Zusammenarbeit; unterstützt Team als Experte',

          lead:
            'Schafft inhaltlich und organisatorisch Rahmen für effektive und effiziente Zusammenarbeit im Team; integriert Teammitglieder und sorgt für ausreichende Klarheit bezüglich Zielen, Aufgaben und Vorgehen'
        };

      case 'LEADERSHIP':
        return {
          junior:
            'Untertstützt Teammitglieder im Rahmen seiner Möglichkeiten, z. B. mit in seinem Projektbereich aufgebautem Spezialwissen',

          senior:
            'Coached Mitarbeiter im Rahmen ihrer Arbeit und bezüglich der Orientierung in der Firma; gibt Orientierung bezüglich der persönlichen Entwicklung; unterstützt Leads und Partner im Rahmen von Scorecards und PR',

          expert:
            'Coached und unterstützt aktiv Mitarbeiter der Junior und Senior-Ebene; unterstützt Leads und Partner im Rahmen von Scorecards und PR; leistet aktiven Beitrag zur Mitarbeiterbindung',

          lead:
            'Coached, unterstützt und entwickelt aktiv Mitarbeiter der Junior und Senior-Ebene; führt Scorecardsbewertungen und PRs durch; leistet aktiven Beitrag zur Mitarbeiterbindung'
        };

      case 'CUSTOMER_INTERACTION':
        return {
          junior:
            'Grundlegendes Verständnis für spezifische Kundensituation; inhaltlich fundierte Kommunikation',

          senior:
            'Ausgeprägtes Verständnis für spezifische Kundensituation und relevanten Kontext; eigenständige Gestaltung der Kommunikation mit unmittelbarem Umfeld; Identifikation und Motivation von Veränderungen beim Kunden',

          expert:
            'Ausgeprägtes Verständnis für spezifische Kundensituation und relevanten Kontext; eigenständige Gestaltung der Kommunikation mit unmittelbarem Umfeld; Identifikation und Motivation von Veränderungen beim Kunden',

          lead:
            'Ausgeprägtes Verständnis für Geamtkontext und Implikationen für Projektumfeld; Definition und Umsetzung der Kundenkommunikation; Treiben von Veränderungen mit/durch den Kunden'
        };

      case 'CUSTOMER_RETENTION':
        return {
          junior:
            'Arbeitsebene des Kunden empfindet Zusammenarbeit als positiv und zielführend; erzeugt den Wunsch nach weiterer Zusammenarbeit',

          senior:
            'Erzeugt Nachfrage nach sich selbst; erkennt neue Themen und strukturiert mögliche Unterstützung durch Senacor; adressiert Chancen für neue Themen auf Lead- und Partnerebene; unterstützt Angebotsprozesse',

          expert:
            'Erzeugt Nachfrage nach sich selbst und Team; erkennt, strukturiert und gestaltet Ansätze für neue Themen; adressiert Chancen für neuen Themen auf Partnerebene; unterstützt Angebotsprozesse maßgeblich inhaltlich',

          lead:
            'Erzeugt Nachfrage nach sich selbst und Team; erkennt, strukturiert und gestaltet Ansätze für neue Themen; steuert bzw. unterstützt maßgeblich Angebotsprozesse und -präsentationen inhaltlich und kommerziell (nur Consultants)'
        };

      case 'FULFILLMENT_OF_REQUIREMENT':
        return {
          text:
            'In welchem Umfang erfüllt die Mitarbeiterin/der Mitarbeiter die Anforderungen an seine aktuelle Laufbahnstufe vor dem Hintergrund der aktuellen Einstufung? Welche Stärken gilt es auszubauen, welche Lücken sollten geschlossen werden?'
        };

      case 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT':
        return {
          junior:
            'Nimmt Schulungs- und Informationsangebote der Firma wahr; übernimmt Mentoringaufgaben für neue Mitarbeiter; leistet erste Beiträge zu inhaltlichen Diskussionen und Initiativen der Firma',

          senior:
            'Übernimmt Interviews im Rahmen des Recruiting; leistet Beitrag in den Bereichen Hochschulrecruiting, Knowledge-Management und/oder Community-Aktivitäten; übernimmt Mentoringaufgaben',

          expert:
            'Übernimmt Interviews im Rahmen des Recruiting; leistet relevanten Beitrag in den Bereichen Hochschulrecruiting, Knowledge-Management und/oder Community-Aktivitäten; übernimmt Mentoringaufgaben',

          lead:
            'Übernimmt Interviews inkl. Fallverantwortung im Rahmen des Recruitings; leistet relevanten Beitrag in den Bereichen Hochschulrecruiting, Knowledge-Management und/oder Community-Aktivitäten; übernimmt Mentoringaufgaben und coacht Mentoren'
        };

      default:
        return;
    }
  };

  render() {
    const { category, classes } = this.props;

    return (
      <div>
        <ListItem>
          <IconButton
            className={classes.button}
            aria-label="Links"
            onClick={() => this.refs.swiper.prev()}
          >
            <Icon>keyboard_arrow_left</Icon>
          </IconButton>
          <ReactSwipe
            ref="swiper"
            className={classes.swipe}
            swipeOptions={{ continuous: false }}
          >
            <div className={classes.swipeWrapInside}>
              <ListItemText
                className={classes.titleSize}
                primary="Anforderung an Junior: "
              />
              <ListItemText
                className={classes.description}
                secondary={this.categoryText(category).junior}
              />
            </div>
            <div className={classes.swipeWrapInside}>
              <ListItemText
                className={classes.titleSize}
                primary="Anforderung an Senior: "
              />
              <ListItemText
                className={classes.description}
                secondary={this.categoryText(category).senior}
              />
            </div>
            <div className={classes.swipeWrapInside}>
              <ListItemText
                className={classes.titleSize}
                primary="Anforderung an Expert: "
              />
              <ListItemText
                className={classes.description}
                secondary={this.categoryText(category).expert}
              />
            </div>
            <div className={classes.swipeWrapInside}>
              <ListItemText
                className={classes.titleSize}
                primary="Anforderung an Lead: "
              />
              <ListItemText
                className={classes.description}
                secondary={this.categoryText(category).lead}
              />
            </div>
          </ReactSwipe>
          <IconButton
            className={classes.button}
            aria-label="Rechts"
            onClick={() => this.refs.swiper.next()}
          >
            <Icon>keyboard_arrow_right</Icon>
          </IconButton>
        </ListItem>
        <ListItem>
          <ListItemText secondary={this.positionText(category)} />
        </ListItem>
      </div>
    );
  }
}
export default withStyles(styles)(PrSwipePositionDescription);
