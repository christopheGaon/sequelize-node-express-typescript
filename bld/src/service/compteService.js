"use strict";
var compte_1 = require("../classes/comptabilite/compte");
var Sequelize = require("sequelize");
var Q = require("q");
var _ = require("lodash");
;
var tableName = "compte";
/**
 * consolide les rows de la db en objet Compte et les passent aux promesses qui écoute le se call du service
 * @param p Promise<Compte>
 * @returns {Promise<Compte>}
 */
var consolideCompte = function (p) {
    var deferred = Q.defer();
    var onResult = function (data) {
        var newCompte = _.assign(new compte_1.Compte(), data.dataValues);
        deferred.resolve(newCompte);
    };
    p.then(onResult);
    return deferred.promise;
};
var CompteService = (function () {
    function CompteService(seq) {
        this.seq = seq;
    }
    /**
     * initialise la table des comptes
     * @returns {Promise<U>}
     */
    CompteService.prototype.build = function () {
        this.model = this.seq.define(tableName, {
            numero: {
                type: Sequelize.STRING
            },
            titulaire: {
                type: Sequelize.STRING
            },
            collectif: {
                type: Sequelize.BOOLEAN
            },
            lettrable: {
                type: Sequelize.BOOLEAN
            },
            pointable: {
                type: Sequelize.BOOLEAN
            }
        });
        return this.seq.sync({ force: true });
    };
    /**
     * ajoute un compte
     * @param newCompte compte à ajouter
     * @returns {Promise<Compte>}
     */
    CompteService.prototype.addCompte = function (newCompte) {
        var promise = this.model.create(newCompte);
        return consolideCompte(promise);
    };
    /**
     * recupere un compte à parti de son numero
     * @param numero
     * @returns {Promise<Compte>}
     */
    CompteService.prototype.getCompteByNumero = function (numero) {
        var promise = this.model.find({ where: { numero: numero } });
        return consolideCompte(promise);
    };
    CompteService.prototype.traitementLourdSurCompte = function (compte) {
    };
    return CompteService;
}());
exports.CompteService = CompteService;
