angular.module('carteiraVirtual', []);
angular.module('carteiraVirtual').controller('carteiraVirtualCtrl', function($scope){

    $scope.app = 'Carteira Virtual';

    $scope.totais = {caixa: 0, divida: 0};

    $scope.tipo = true;

    $scope.registros = [];

    $scope.mudaTipo = function() {
        $scope.tipo = !$scope.tipo;
    };

    $scope.incrementaTotais = function(registro){
        if (!$scope.tipo) {
            $scope.totais.divida += registro;
            return;
        }
        $scope.totais.caixa += registro;
    };

    $scope.RegistraTabela = function(registro){

    };

    $scope.Adicionar = function(registro){
        $scope.RegistraTabela(registro);
        $scope.incrementaTotais(registro);
        delete $scope.registro
    };

    $scope.verificaRegistro = function(registro) {
        if (registro > 0){
            return false;
        };
        return true;
    };
});