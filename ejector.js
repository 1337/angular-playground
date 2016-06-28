/*global _,angular,window*/
(function () {
    "use strict";

    angular
        .module("playground", ["ionic"])
        .config(logProviderConfig)
        .controller("EjectorController", EjectorController)
        .filter("reverse", function () {
            return reverse;
        });

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
        $scope.eval.code = "$http.get('ejector.js').then(function (resp) {\n" +
                           "    $log.info(resp.data);\n" +
                           "});";

        $scope.angular = angular;
        $scope.deps = deps;
    }
    EjectorController.$inject = deps;


    function logProviderConfig($provide) {
        $provide.decorator("$log", function ($delegate, $injector) {
            var levels = ["debug", "info", "warn", "error"];

            angular.forEach(levels, function (level) {
                var oldFunc = $delegate[level];

                $delegate[level] = function () {
                  var $rootScope = $injector.get("$rootScope"),
                      args = [].slice.call(arguments);

                    if (!$rootScope.logs) {
                        $rootScope.logs = [];
                    }

                    $rootScope.logs.push(String(args));

                    $delegate[level].oldFunc.apply(null, args);
                };
                $delegate[level].oldFunc = oldFunc;
            });

            return $delegate;
        });
    }

    function reverse(items) {
        return Array.prototype.slice.call(items || []).reverse();
    }
}());
