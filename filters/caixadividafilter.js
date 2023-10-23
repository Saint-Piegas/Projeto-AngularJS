angular.module("carteiraVirtual").filter("caixadivida", function(){
    return function(input) {
        if (input) {
            return "Caixa";
        };
        return "Dívida";
    };
});