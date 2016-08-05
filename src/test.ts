import * as Sequelize from "sequelize";
import * as _ from "lodash";
import {Model} from "sequelize";
import {Compte} from "./classes/comptabilite/compte";
import {CompteService} from "./service/compteService";


var config = require('../../config/'+ process.env.NODE_ENV+'.json');
var seq=new Sequelize(config.db, config.username, config.password,config.options);
var compteService:CompteService = new CompteService(seq);


var initCompte=new Compte();
initCompte.numero="numero de compte";
initCompte.pointable=true;
initCompte.lettrable=true;

var onCompteGet=function (newCompte:Compte) {
    console.log("compte getted ", newCompte.numero);
};

var onCompteCreated=function (newCompte:Compte) {
    console.log("compte created", newCompte.numero);
    compteService.getCompteByNumero(newCompte.numero).then(onCompteGet)
};
var onTableCreated = function () {
    compteService.addCompte(initCompte).then(onCompteCreated,onFail);
};

var onConnexion = function () {
    console.log("connection ok");
    compteService.build().then(onTableCreated,onFail);
};
var onFail = function () {
    console.log("connection ko");
};
seq.authenticate().then(onConnexion,onFail);



