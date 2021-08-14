/* istanbul ignore file */

module.exports = {
  getCacheKey() {
    return 'cssTransform';
  },
  process() {
    return 'module.exports = {};';
  },
};
