import React from 'react';
import { FormattedMessage } from 'react-intl';

export const mapRatingFullfilment = ratingFulfillment => {
  switch (ratingFulfillment) {
    case 0:
      return <FormattedMessage id="mapratingfullfilment.noentry" />;
    case 1:
      return <FormattedMessage id="mapratingfullfilment.notfulfilled" />;
    case 2:
      return <FormattedMessage id="mapratingfullfilment.partlynotfulfilled" />;
    case 3:
      return <FormattedMessage id="mapratingfullfilment.fulfilled" />;
    case 4:
      return <FormattedMessage id="mapratingfullfilment.partlyoverfulfilled" />;
    case 5:
      return <FormattedMessage id="mapratingfullfilment.overfulfilled" />;
    default:
      return <FormattedMessage id="mapratingfullfilment.notselected" />;
  }
};
