"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("express-async-errors");
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var utils_1 = require("./utils");
var private_routes_1 = __importDefault(require("./private_routes"));
var public_routes_1 = __importDefault(require("./public_routes"));
var PORT = 3001;
var PUBLIC_URL = utils_1.url(PORT);
var app = express_1["default"]();
var connectionPromess = typeorm_1.createConnection();
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use(morgan_1["default"]('dev'));
app.get('/', function (req, res) { return utils_1.renderIndex(app, PUBLIC_URL).then(function (html) { return res.status(404).send(html); }); });
app.use(public_routes_1["default"]);
app.use(private_routes_1["default"]);
app.use(function (req, res) { return res.status(404).json({ "message": "Not found" }); });
app.listen(PORT, function () {
    return console.info("==> \uD83D\uDE0E Listening on port " + PORT + ".\n   Open " + PUBLIC_URL + " in your browser.");
});
