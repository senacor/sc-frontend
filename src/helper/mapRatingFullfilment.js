export const mapRatingFullfilment = ratingFulfillment => {
  switch (ratingFulfillment) {
    case 0:
      return 'kein Eintrag';
    case 1:
      return 'nicht erfüllt';
    case 2:
      return 'zT. nicht erfüllt';
    case 3:
      return 'erfüllt';
    case 4:
      return 'zT. übererfüllt';
    case 5:
      return 'übererfüllt';
    default:
      return 'keine Auswahl';
  }
};
