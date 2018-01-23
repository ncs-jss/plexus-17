module.exports = ({ allowedIncludes }) => ({ include, fields = {} }) => {
  include = allowedIncludes.filter(allowedField => include.includes(allowedField)); //to check valid include
  return include.map(includedField => ({ path: includedField, select: fields[includedField] }));
};
