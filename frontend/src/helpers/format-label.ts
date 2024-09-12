const formatLabel = (label: string) => {
  return label.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
};

export default formatLabel;
