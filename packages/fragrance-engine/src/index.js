const { questionnaire } = require("./questionnaire");
const { buildProfileSummary } = require("./profile");
const { brands, perfumes, getBrandById } = require("./catalog");
const { recommendPerfumes } = require("./recommend");

module.exports = {
  questionnaire,
  buildProfileSummary,
  brands,
  perfumes,
  getBrandById,
  recommendPerfumes
};
