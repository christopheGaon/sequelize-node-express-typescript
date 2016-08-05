import { Compte } from "../classes/comptabilite/compte";
import { Model } from "sequelize";
import * as Sequelize from "sequelize";
import * as Q from "q";
export interface Model extends Model<Compte, Compte> {
}
export declare class CompteService {
    /**
     * connexion au gestionnaire de compte
     */
    seq: Sequelize.Sequelize;
    /**
     * Model des compte utilisé par le service pour faire les opérations usuelles , crud
     */
    model: Model<Compte, Compte>;
    constructor(seq: Sequelize.Sequelize);
    /**
     * initialise la table des comptes
     * @returns {Promise<U>}
     */
    build(): Promise<any>;
    /**
     * ajoute un compte
     * @param newCompte compte à ajouter
     * @returns {Promise<Compte>}
     */
    addCompte(newCompte: Compte): Q.Promise<Compte>;
    /**
     * recupere un compte à parti de son numero
     * @param numero
     * @returns {Promise<Compte>}
     */
    getCompteByNumero(numero: string): Q.Promise<Compte>;
    traitementLourdSurCompte(compte: Compte): void;
}
