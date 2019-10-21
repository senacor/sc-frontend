import html2pdf from 'html2pdf.js';
import ReactDOM from 'react-dom';
import { provideContexts } from '../components/Context';
import {
  AuthorizationContext,
  determineLanguage,
  ErrorContext,
  InfoContext,
  LanguageContext,
  MeetingContext,
  messages,
  PrContext,
  UserinfoContext
} from '../components/App';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import senacorTheme from '../styles/colors';
import { IntlProvider } from 'react-intl';
import React from 'react';
import PerformanceReviewDetail from '../components/pr/PerformanceReviewDetail';

export const printPdf = (pr, language, onReadyCallback) => {
  onReadyCallback(true);
  let prId = pr.id ? pr.id : pr.prId;
  let printableContent = document.createElement('div');

  //Callback, because we need to wait for fetching all data for PR
  const printCallback = () => {
    //#1: ignore elements with .ignorePrint class
    const elementsToIgnore = printableContent.getElementsByClassName(
      'ignorePrint'
    );
    while (elementsToIgnore[0]) {
      elementsToIgnore[0].parentNode.removeChild(elementsToIgnore[0]);
    }

    //#2: remove classes to use only 1 column
    const elementsToDeclass = printableContent.getElementsByClassName(
      'printCancelClasses'
    );
    while (elementsToDeclass[0]) {
      elementsToDeclass[0].removeAttribute('class');
    }

    //#3: fix non supported textarea - use div instead
    const changeDivs = printableContent.getElementsByClassName(
      'printChangeToDiv'
    );
    for (let i = 0; i < changeDivs.length; i++) {
      const textArea = changeDivs[i].getElementsByTagName('textarea')[2];
      textArea.style = "height: '0px'";
      textArea.outerHTML = textArea.outerHTML.replace('textarea', 'div');
    }

    //#4: iterate elements marked with 'printAnotherValue' class
    const elementsToChangeValue = printableContent.getElementsByClassName(
      'printAnotherValue'
    );
    for (let i = 0; i < elementsToChangeValue.length; i++) {
      const elementToChangeValue = printableContent.getElementsByClassName(
        'printAnotherValue'
      )[i];
      const targetRoleValue = elementToChangeValue.getAttribute('printValue');
      //set new value - based on headers - language dependent
      const patternElement = getById(
        printableContent,
        'targetRole_' + targetRoleValue
      );
      elementToChangeValue.innerHTML = patternElement
        ? patternElement.innerHTML
        : '-';
    }

    //#5: Fix order: Employee reflections, Reviewer records, assessment, final comments
    const from = getById(printableContent, 'printReplaceFrom');
    getById(printableContent, 'printReplaceTo').innerHTML = from.innerHTML;
    from.innerHTML = '';

    //#6: remove headers from target Role
    const header1 = getById(printableContent, 'targetRole_1');
    const header2 = getById(printableContent, 'targetRole_2');
    const header3 = getById(printableContent, 'targetRole_3');
    [header1, header2, header3]
      .filter(v => v != null)
      .forEach(toDelete => {
        toDelete.parentNode.removeChild(toDelete);
      });

    //FINALLY - print using html2pdf!
    html2pdf()
      .from(printableContent)
      .set({
        pagebreak: { mode: 'avoid-all' },
        margin: 5
      })
      .save();

    onReadyCallback(false);
  };

  ReactDOM.render(renderPr(prId, printCallback, language), printableContent);
  return printableContent;
};

export const renderPr = (prId, printCallback, language) => {
  return provideContexts(
    [
      AuthorizationContext,
      ErrorContext,
      InfoContext,
      MeetingContext,
      UserinfoContext,
      PrContext,
      LanguageContext
    ],
    <BrowserRouter>
      <MuiThemeProvider theme={senacorTheme}>
        <IntlProvider
          locale={determineLanguage(language)}
          messages={
            determineLanguage(language) === 'de' ? messages.de : messages.en
          }
        >
          <PerformanceReviewDetail
            onReady={printCallback}
            printMode={true}
            match={{ params: { id: prId } }}
          />
        </IntlProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

const getById = (element, childID) => {
  let elm = {};
  let elms = element.getElementsByTagName('*');
  for (let i = 0; i < elms.length; i++) {
    if (elms[i].id === childID) {
      elm = elms[i];
      break;
    }
  }
  return elm;
};
