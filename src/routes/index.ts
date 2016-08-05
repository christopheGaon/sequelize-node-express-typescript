/**
 * Created by Christophe on 05/08/2016.
 */
import * as express from "express";

module Route {

    export class Index {

        public index(req: express.Request, res: express.Response, next: express.NextFunction) {
            //render page
           console.log("dans index ");
            next();
        }
    }
}

export = Route;