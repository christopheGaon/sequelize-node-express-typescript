"use strict";
var express = require("express");
var morgan = require("morgan");
var indexRoute = require("./routes/index");
var Sequelize = require("sequelize");
var compteService_1 = require("./service/compteService");
var compte_1 = require("./classes/comptabilite/compte");
var Server = (function () {
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //configure routes
        this.routes();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * configuration du serveur node
     */
    Server.prototype.config = function () {
        this.app.listen(3000, function () {
            console.log("Demo Express server listening on port %d in %s mode", 3000);
            var config = require('../../config/' + process.env.NODE_ENV + '.json');
            var seq = new Sequelize(config.db, config.username, config.password, config.options);
            var compteService = new compteService_1.CompteService(seq);
            var initCompte = new compte_1.Compte();
            initCompte.numero = "numero de compte";
            initCompte.pointable = true;
            initCompte.lettrable = true;
            var onCompteGet = function (newCompte) {
                console.log("compte getted ", newCompte.numero);
            };
            var onCompteCreated = function (newCompte) {
                console.log("compte created", newCompte.numero);
                compteService.getCompteByNumero(newCompte.numero).then(onCompteGet);
            };
            var onTableCreated = function () {
                compteService.addCompte(initCompte).then(onCompteCreated, onFail);
            };
            var onConnexion = function () {
                console.log("connection ok");
                compteService.build().then(onTableCreated, onFail);
            };
            var onFail = function () {
                console.log("connection ko");
            };
            seq.authenticate().then(onConnexion, onFail);
        });
        this.app.use(morgan('combined'));
    };
    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    Server.prototype.routes = function () {
        //get router
        var router;
        router = express.Router();
        var index = new indexRoute.Index();
        //home page
        router.get("/", index.index.bind(index.index));
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
// Configuration
