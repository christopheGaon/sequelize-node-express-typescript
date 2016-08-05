import { expect } from 'chai';
import {Compte} from "../../../src/classes/comptabilite/compte";



/**
 * Created by Christophe on 03/08/2016.
 */

describe('Compte', function() {
    describe('get numero', function() {
        it('should return le numero du compte ', function() {
            var us:Compte=new Compte();
            us.numero="test sur le numero";
            var res="test sur le numero";
            expect(us.numero).to.equal(res);
        });
    });
});