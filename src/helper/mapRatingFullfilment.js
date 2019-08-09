export const mapRatingFullfilment = (ratingFulfillment, intl) => {
  switch (ratingFulfillment) {
    case 0:
      return intl.formatMessage({ id: 'mapratingfullfilment.noentry' });
    case 1:
      return intl.formatMessage({ id: 'mapratingfullfilment.notfulfilled' });
    case 2:
      return intl.formatMessage({
        id: 'mapratingfullfilment.partlynotfulfilled'
      });
    case 3:
      return intl.formatMessage({ id: 'mapratingfullfilment.fulfilled' });
    case 4:
      return intl.formatMessage({
        id: 'mapratingfullfilment.partlyoverfulfilled'
      });
    case 5:
      return intl.formatMessage({ id: 'mapratingfullfilment.overfulfilled' });
    default:
      return intl.formatMessage({ id: 'mapratingfullfilment.notselected' });
  }
};
