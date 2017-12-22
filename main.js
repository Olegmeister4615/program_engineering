angular.module('app', []);

angular.module('app').factory('mainFactory',function($http){
    var service = {};
    service.getCourse = function(url, callback){
        $http.get(url).then(callback);
    }
    return service;
})

angular.module('app').controller('main', function($scope, mainFactory) {
    $scope.values = {};
    var bitfinex_url = 'https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD';
    var poloniex_url = 'https://poloniex.com/public?command=returnTicker';
    var livecoin_url = '/livecoin';
    var cex_url = '/cex';
    $scope.values.bfnx;
    $scope.values.plnx;
    $scope.values.cex;
    $scope.values.livecoin;
    function reloadCourse(){
        mainFactory.getCourse(bitfinex_url,function(data){
            $scope.values.bfnx = (+data.data[0][7]).toFixed(2);;
        });
        mainFactory.getCourse(poloniex_url,function(data){
            $scope.values.plnx = (+data.data.USDT_BTC.last).toFixed(2);;
        });
        mainFactory.getCourse(cex_url,function(data){
            $scope.values.cex = (+data.data.last).toFixed(2);;
        });
        mainFactory.getCourse(livecoin_url,function(data){
            $scope.values.livecoin = data.data.last.toFixed(2);;
        });
    }
    function reloadBitcoin(){
        $scope.bitcoinCourse =  ((Number($scope.values.bfnx||0) + Number($scope.values.plnx||0) + Number($scope.values.cex||0) + Number($scope.values.livecoin||0))/4).toFixed(2);
    }
    setInterval(reloadCourse, 1000);
    setInterval(reloadBitcoin, 200);
    
});
