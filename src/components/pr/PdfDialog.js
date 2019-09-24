import React, { useContext, useEffect, useState, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PrState from './prDetail/PrState';
import PrTabs from './prDetail/PrTabs';
import PrDetailInformation from './prDetail/PrDetailInformation';
import { fetchMeeting } from '../../actions/calls/meetings';
import { fetchPrById } from '../../actions/calls/pr';
import { ErrorContext, MeetingContext, PrContext } from '../App';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid/Grid';
import Divider from '@material-ui/core/Divider';

const PdfDialog = ({ id, closeDialog, classes, intl }) => {
  const { value: pr, setValue: setPr } = useContext(PrContext.context);
  const [isLoading, setIsLoading] = useState({});
  const errorContext = useContext(ErrorContext.context);
  const { value: meeting, setValue: setMeeting } = useContext(
    MeetingContext.context
  );

  useEffect(() => {
    const afterPrFetched = pr => {
      setPr(pr);
      fetchMeeting(pr, setMeeting, errorContext);
    };
    fetchPrById(id, afterPrFetched, setIsLoading, errorContext);
  }, []);

  if (isLoading || !pr || Object.entries(pr).length === 0) {
    return <CircularProgress />;
  }

  const downloadPdf = id => {
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
  };

  return (
    <div>
      <Dialog open={id !== undefined} close={closeDialog}>
        <DialogTitle>
          <Grid container>
            <Grid item xs={10}>
              <iframe
                id="pr"
                src={`prDetailWithoutAppbar/${pr.id}`}
                style={{ display: 'none' }}
                title="Pr"
              />
              <Button onClick={() => downloadPdf('pr')}>
                {`${intl.formatMessage({
                  id: 'pdfprint'
                })}`}
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={closeDialog}>X</Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Fragment style={{ pointerEvents: 'none' }}>
            {pr && <PrDetailInformation pr={pr} meeting={meeting} />}
            {pr && <PrState prById={pr} />}
            {pr && <PrTabs pr={pr} meeting={meeting} />}
          </Fragment>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default injectIntl(PdfDialog);
