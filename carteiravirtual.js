angular.module('carteiraVirtual', []);
angular.module('carteiraVirtual').controller('carteiraVirtualCtrl', function($scope){

    $scope.app = 'Carteira Virtual';

    $scope.totais = {caixa: 0, divida: 0};

    $scope.tipo = true;

    $scope.registros = [];

    $scope.mudaTipo = function() {
        $scope.tipo = !$scope.tipo;
    };

    $scope.incrementaTotais = function(valor, tipo){
        if (!tipo) {
            $scope.totais.divida += valor;
            return;
        }
        $scope.totais.caixa += valor;
    };

    $scope.RegistraTabela = function(valor, tipo, arrayRegistros){
        arrayRegistros.push({data: new Date(), tipo: tipo, valor: valor});
    };

    $scope.Adicionar = function(valor, tipo, registros){
        $scope.RegistraTabela(valor, tipo, registros);
        $scope.incrementaTotais(valor, tipo);
        delete $scope.valor
    };

    $scope.verificaValor = function(valor) {
        if (valor > 0){
            return false;
        };
        return true;
    };

    $scope.deletaRegistros = function(registros) {
        let nao_selecionados = [];
        
        for (let registro of registros){
            if (registro.selecionado) {
                $scope.incrementaTotais(-1*registro.valor, registro.tipo);
            }
            else {
                nao_selecionados.push(registro);
            };
        };

        $scope.registros = nao_selecionados;
    };

    $scope.verificaEditar = function(registros) {
        return registros.filter(function(registro){
            return registro.selecionado;
        }).length == 1;
    };

    $scope.verificaDeletar = function(registros) {
        return registros.some(function(registro){
            return registro.selecionado;
        });
    };
});