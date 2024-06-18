
const formatNumber = (number) => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + 'tỷ';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'tr';
  }
  return number.toString();
}

export {formatNumber};
