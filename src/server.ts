
import * as express from "express";
import * as morgan from "morgan";
import * as indexRoute from "./routes/index";

import * as Sequelize from "sequelize";

import {CompteService} from "./service/compteService";
import {Compte} from "./classes/comptabilite/compte";

 class Server{
    app:express.Express
    public static bootstrap(): Server {
        return new Server();
    }
    constructor() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();

        //configure routes
        this.routes();

    }

     /**
      * configuration du serveur node
      */
    config(){
        this.app.listen(3000, function(){
            console.log("Demo Express server listening on port %d in %s mode", 3000);
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

        });
        this.app.use(morgan('combined'));
    }

     /**
      * Configure routes
      *
      * @class Server
      * @method routes
      * @return void
      */
     private routes() {
         //get router
         let router: express.Router;
         router = express.Router();

         var index: indexRoute.Index = new indexRoute.Index();

         //home page
         router.get("/", index.index.bind(index.index));


         //use router middleware
         this.app.use(router);
     }
}

var server = Server.bootstrap();
export = server.app;
// Configuration




