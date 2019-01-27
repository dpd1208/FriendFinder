// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");
var path = require("path");

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

// creates express server
var app = express();

// sets an initial port
var PORT = process.env.PORT || 8080;

// tells express how to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// ================================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

