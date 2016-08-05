import {CompteBancaire} from "../tresorie/compteBancaire";
/**
 * Created by Christophe on 03/08/2016.
 */
export class Compte {
    numero:string;
    titulaire:string;
    collectif:boolean;
    lettrable:boolean;
    pointable:boolean;
    compteBanque:CompteBancaire;
};
