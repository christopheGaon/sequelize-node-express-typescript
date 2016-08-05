"use strict";
var chai_1 = require('chai');
var compte_1 = require("../../bld/src/classes/comptabilite/compte");
/**
 * Created by Christophe on 03/08/2016.
 */
describe('CompteService', function () {
    describe('addAccount', function () {
        it('should return new Account ', function () {
            var us = new compte_1.Compte();
            us.numero = "test sur le numero";
            chai_1.expect(us.numero).to.equal(us.numero);
        });
    });
});
