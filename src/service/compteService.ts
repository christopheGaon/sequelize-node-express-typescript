import {Compte} from "../classes/comptabilite/compte";
import {Model} from "sequelize";
import * as Sequelize from "sequelize";
import * as Q from "q";
import * as _ from "lodash";
export interface Model extends Model<Compte, Compte> {};

const tableName:string="compte";

/**
 * consolide les rows de la db en objet Compte et les passent aux promesses qui écoute le se call du service
 * @param p Promise<Compte>
 * @returns {Promise<Compte>}
 */
var consolideCompte = function(p:Promise<Compte>) {
    var deferred:Q.Deferred<Compte> = Q.defer<Compte>();
    var onResult = function (data:any) {
        var newCompte:Compte = <Compte>_.assign(new Compte(),data.dataValues);
        deferred.resolve(newCompte);
    };
    p.then(onResult);
    return deferred.promise;
};

export class CompteService {
    /**
     * connexion au gestionnaire de compte
     */
    seq:Sequelize.Sequelize;
    /**
     * Model des compte utilisé par le service pour faire les opérations usuelles , crud
     */
    model:Model<Compte, Compte>
    constructor(seq:Sequelize.Sequelize){
        this.seq=seq;
    }

    /**
     * initialise la table des comptes
     * @returns {Promise<U>}
     */
    build(){
        this.model = <Model<Compte, Compte>> this.seq.define(tableName,{
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
        return this.seq.sync({force: true});
    }

    /**
     * ajoute un compte
     * @param newCompte compte à ajouter
     * @returns {Promise<Compte>}
     */
    addCompte(newCompte:Compte):Q.Promise<Compte>{
        var promise:Promise<Compte> = this.model.create(newCompte);
        return  consolideCompte(promise);
    }

    /**
     * recupere un compte à parti de son numero
     * @param numero
     * @returns {Promise<Compte>}
     */
    getCompteByNumero(numero:string){
        var promise:Promise<Compte> = this.model.find({where:{numero:numero}});
        return  consolideCompte(promise);
    }


    traitementLourdSurCompte(compte:Compte){

    }
}

