"use strict";
var Route;
(function (Route) {
    var Index = (function () {
        function Index() {
        }
        Index.prototype.index = function (req, res, next) {
            //render page
            console.log("dans index ");
            next();
        };
        return Index;
    }());
    Route.Index = Index;
})(Route || (Route = {}));
module.exports = Route;
