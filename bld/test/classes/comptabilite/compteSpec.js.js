"use strict";
var chai_1 = require('chai');
var compte_1 = require("../../../src/classes/comptabilite/compte");
/**
 * Created by Christophe on 03/08/2016.
 */
describe('Compte', function () {
    describe('get numero', function () {
        it('should return le numero du compte ', function () {
            var us = new compte_1.Compte();
            us.numero = "test sur le numero";
            var res = "test sur le numero";
            chai_1.expect(us.numero).to.equal(res);
        });
    });
});
