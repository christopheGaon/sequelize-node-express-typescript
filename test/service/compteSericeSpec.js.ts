import { expect } from 'chai';
import {Compte} from "../../bld/src/classes/comptabilite/compte";




/**
 * Created by Christophe on 03/08/2016.
 */

describe('CompteService', function() {
    describe('addAccount', function() {
        it('should return new Account ', function() {
            var us:Compte=new Compte();
            us.numero="test sur le numero";

            expect(us.numero).to.equal(us.numero);
        });
    });
});