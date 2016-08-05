"use strict";
var Sequelize = require("sequelize");
var compte_1 = require("./classes/comptabilite/compte");
var compteService_1 = require("./service/compteService");
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
