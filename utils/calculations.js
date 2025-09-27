// utils/calculations.js - CommonJS синтаксис
const calculateTotalScore = (score1, score2, score3) => {
  return parseInt(score1) + parseInt(score2) + parseInt(score3);
};

const isValidScore = (score) => {
  return !isNaN(score) && score >= 0 && score <= 100;
};

// CommonJS экспорт
module.exports = {
  calculateTotalScore,
  isValidScore
};

// ES modules экспорт (если нужно)
if (typeof exports !== 'undefined') {
  exports.calculateTotalScore = calculateTotalScore;
  exports.isValidScore = isValidScore;
}