/*global _,angular,window*/
(function () {
    "use strict";

    angular
        .module("playground", [])
        .controller("EjectorController", EjectorController);

    var deps = [
        "$scope",  // Not a service

        "$anchorScroll",
        "$animate",
        "$animateCss",
        "$cacheFactory",
        "$templateCache",
        "$compile",
        "$controller",
        "$document",
        "$exceptionHandler",
        "$filter",
        "$httpParamSerializer",
        "$httpParamSerializerJQLike",
        "$http",
        "$xhrFactory",
        "$httpBackend",
        "$injector",  // Special
        "$interpolate",
        "$interval",
        "$locale",
        "$location",
        "$log",
        "$parse",
        "$q",
        "$rootElement",
        "$rootScope",
        "$sceDelegate",
        "$sce",
        "$templateRequest",
        "$timeout",
        "$window"
    ];

    function EjectorController($scope) {
        var args = Array.prototype.slice.call(arguments);

        _.each(_.zip(deps, args)).map(function (comb) {
            window[comb[0]] = comb[1];
        });

        $scope.eval = function () {
            //noinspection Eslint
            eval($scope.eval.code);
        };
        $scope.eval.code = "alert($scope.deps);";

        $scope.angular = angular;
        $scope.deps = deps;
    }
    EjectorController.$inject = deps;
}());
