# handlebars-parser

Get requested paths from Handlebars templates.

```
var HandlebarsParser = require('handlebars-parser');
var Handlebars = require('handlebars');
// other deps

var parser = new HandlebarsParser();
var template = Handlebars.parse(" *some template string* ");
var requestedPaths = parser.getPaths(template);
// other code

```

# requirements
The template passed in the getPaths-function should be parsed with handlebars version 2.0