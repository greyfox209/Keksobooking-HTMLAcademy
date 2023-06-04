const filterMarkersByType = (markers, type) => {
  return markers.filter((marker) => {
    const offerType = marker.offer.type;
    return type === 'any' || offerType === type;
  });
};

export { filterMarkersByType };
