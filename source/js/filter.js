const filterMarkersByType = (markers, type) => {
  return markers.filter((marker) => {
    const offerType = marker.offer.type;
    return type === 'any' || offerType === type;
  });
};

const filterMarkersByPrice = (markers, price) => {
  return markers.filter((marker) => {
    const offerPrice = marker.offer.price;
    switch (price) {
      case 'low':
        return offerPrice < 10000;
      case 'middle':
        return offerPrice >= 10000 && offerPrice <= 50000;
      case 'high':
        return offerPrice > 50000;
      default:
        return true;
    }
  });
};

const filterMarkersByRooms = (markers, selectedRooms) => {
  if (selectedRooms === 'any') {
    return markers;
  }
  return markers.filter((marker) => marker.offer.rooms === parseInt(selectedRooms, 10));
};

const filterMarkersByGuests = (markers, selectedGuests) => {
  if (selectedGuests === 'any') {
    return markers;
  }
  return markers.filter((marker) => marker.offer.guests === parseInt(selectedGuests, 10));
};

const filterMarkersByFeatures = (markers, selectedFeatures) => {
  return markers.filter((marker) => {
    // Проверяем, есть ли выбранные features в массиве features маркера
    return selectedFeatures.every((feature) => marker.offer.features.includes(feature));
  });
};

export { filterMarkersByType, filterMarkersByPrice, filterMarkersByRooms, filterMarkersByGuests, filterMarkersByFeatures };
