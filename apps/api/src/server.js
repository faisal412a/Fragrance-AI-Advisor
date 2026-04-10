const http = require("http");
const { questionnaire, buildProfileSummary, brands, perfumes, recommendPerfumes } = require("../../../packages/fragrance-engine/src");

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (request.url === "/questionnaire") {
    response.writeHead(200);
    response.end(JSON.stringify(questionnaire));
    return;
  }

  if (request.url === "/profile-preview") {
    response.writeHead(200);
    response.end(
      JSON.stringify(
        buildProfileSummary({
          gender_direction: "unisex",
          age_range: "25-34",
          usage: "office",
          longevity: "long",
          style_preferences: ["woody", "fresh"],
          projection: "moderate",
          budget: "100-200",
          climate: "hot"
        })
      )
    );
    return;
  }

  if (request.url === "/brands") {
    response.writeHead(200);
    response.end(JSON.stringify(brands));
    return;
  }

  if (request.url === "/perfumes") {
    response.writeHead(200);
    response.end(JSON.stringify(perfumes));
    return;
  }

  if (request.url === "/recommendations-preview") {
    response.writeHead(200);
    response.end(
      JSON.stringify(
        recommendPerfumes({
          gender_direction: "unisex",
          age_range: "25-34",
          usage: "office",
          longevity: "long",
          style_preferences: ["woody", "fresh"],
          projection: "moderate",
          budget: "100-200",
          climate: "hot",
          brand_scope: "major-first",
          avoidances: ["too-sweet"]
        })
      )
    );
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({ error: "Not found" }));
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
