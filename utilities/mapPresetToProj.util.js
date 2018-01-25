module.exports = ({ presetMap }) => ({ preset = '', fields }) => {
  return presetMap[preset] || fields.self;
};
