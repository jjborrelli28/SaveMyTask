const formatLabel = (label: string) =>
  label.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());

export default formatLabel;
