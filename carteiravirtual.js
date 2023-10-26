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

    $scope.adicionaRegistro = function(registro) {
        $scope.registros.push(registro);
        $scope.registros.sort(function(registro1, registro2){
            return registro1.data-registro2.data;
        });
    };

    // Verificadores - Melhorar esse código

    $scope.verificaValor = function(valor) {
        if (valor > 0){
            return false;
        };
        return true;
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

    $scope.verificaEditor = function(registros){
        return registros.some(function(registro){
            return registro.editar;
        });
    };

    // Botões - dar uma olhada em boas práticas

    $scope.Adicionar = function(valor, tipo){
        $scope.adicionaRegistro({data: new Date(), tipo: tipo, valor: valor});
        $scope.incrementaTotais(valor, tipo);
        delete $scope.valor
    };


    $scope.Editar = function() {
        $scope.registros.map(function(registro){
            if (registro.selecionado){
                registro.editar = true;
                return registro;
            }
            else {
                return registro;
            };
        });
    };

    $scope.Deletar = function(registros) {
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

    $scope.Cancelar = function(){
        $scope.registros.map(function(registro){
            if (registro.editar){
                registro.editar = false;
                return registro;
            }
            else {
                return registro;
            };
        });
        $scope.novo_registro = {};
    };

    $scope.Confirmar = function(novo_registro) {
        $scope.adicionaRegistro(novo_registro);
        $scope.registros = $scope.registros.filter(function(registro){
            return !registro.editar
        });
        
        $scope.novo_registro = {}
    };
});