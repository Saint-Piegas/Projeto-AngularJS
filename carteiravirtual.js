angular.module('carteiraVirtual', []);
angular.module('carteiraVirtual').controller('carteiraVirtualCtrl', function($scope){

    $scope.app = 'Carteira Virtual';

    $scope.totais = {caixa: 0, divida: 0};

    $scope.tipo = true;

    $scope.registros = [];

    $scope.mudaTipo = function() {
        $scope.tipo = !$scope.tipo;
    };

    $scope.incrementaTotais = function(valor){
        if (!$scope.tipo) {
            $scope.totais.divida += valor;
            return;
        }
        $scope.totais.caixa += valor;
    };

    $scope.RegistraTabela = function(valor, arrayRegistros){
        arrayRegistros.push({data: new Date(), tipo: $scope.tipo, valor: valor});
    };

    $scope.Adicionar = function(valor){
        $scope.RegistraTabela(valor, $scope.registros);
        $scope.incrementaTotais(valor);
        delete $scope.valor
    };

    $scope.verificaValor = function(valor) {
        if (valor > 0){
            return false;
        };
        return true;
    };
});