global.window = global;
global.assert = require("chai").assert;

require("../src/data/mockFirebase.js");
require("../src/data/data.js");
require("./data.spec.js");
