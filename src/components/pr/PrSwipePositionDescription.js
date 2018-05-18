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
