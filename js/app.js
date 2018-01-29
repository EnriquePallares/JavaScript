window.onload = function () {
    Calculadora = {
        swNumero:1,
        numero1: 0,
        numero2:0,
        operacion:null,
        resultado:0,
        punto:false,
        ultimaTeclaPresionada:null,
        formaNumero:function(numero,valor){
            //Concatena el numero para se visualizado
            if(numero=='0'&&!calculadora.punto){
                numero = '';
            }
            var numAux = numero + '' + valor;
            return numAux;
        },
        mostrarEnPantalla : function(valor){
            //Visualiza el valor en el display con 8 caracteres
            valor = valor+'';
            valor = valor.substring(0,8);
            document.getElementById("display").innerHTML = valor;
        },
        iniciar:function(){
            //Asigna las el evento onclick a cada boton de la calculadora
            var arrayTeclas = document.getElementsByClassName("tecla");
            for(var i = 0; i< arrayTeclas.length; i++){
                arrayTeclas[i].addEventListener('click', calculadora.presionaTecla, false);
            }
        },
        presionaOperador:function(operador){
            //Funcion para asignar el operador
            calculadora.operacion = operador;
        },
        presionaNumero:function(valor){
            //Funcion para presionar un nunero
            if(calculadora.swNumero == 1 ){
                calculadora.numero1 = calculadora.formaNumero(calculadora.numero1,valor);
                return calculadora.numero1;
            }else if(calculadora.swNumero == 2){
                calculadora.numero2 = calculadora.formaNumero(calculadora.numero2,valor);
                return calculadora.numero2;
            }
        },
        esNumero:function (valor){
            //Funcion para saber si el parametro ingresado es un numero
            var numeros = ["0","1","2","3","4","5","6","7","8","9"];
            for(var i = 0;i<numeros.length;i++){
                if(valor==numeros[i]){
                    return true;
                }
            }
            return false;
        },
        esOperador:function (valor){
            //Funcion para saber si el parametro ingresado es un operador
            var operadores = ["mas","menos","por","dividido"];
            for(var i = 0;i<operadores.length;i++){
                if(valor==operadores[i]){
                    return true;
                }
            }
            return false;
        },
        realizarOperacion:function(){
            //Funcion para realizar una operacion aritmetica
            if(calculadora.operacion == "mas"){
                calculadora.resultado = parseFloat(calculadora.numero1) + parseFloat(calculadora.numero2);
            } else if(calculadora.operacion == "menos"){
                calculadora.resultado = parseFloat(calculadora.numero1) - parseFloat(calculadora.numero2);
            } else if(calculadora.operacion == "por"){
                calculadora.resultado = parseFloat(calculadora.numero1) * parseFloat(calculadora.numero2);
            } else if(calculadora.operacion == "dividido"){
                calculadora.resultado = parseFloat(calculadora.numero1) / parseFloat(calculadora.numero2);
            }
            calculadora.numero1 = calculadora.resultado;
        },
        existePuntoNumero:function(){
            //Funcion para saber si el numero almacenado tiene el caracter punto
            var nroIndexOf;
            if(calculadora.swNumero == 1 ){
                nroIndexOf = calculadora.numero1.toString().indexOf(".");
            }else{
                nroIndexOf = calculadora.numero2.toString().indexOf(".");
            }
            return nroIndexOf >=0;
        },
        addPunto:function(){
            //Adiciona un punto si no existe en el numero
            if(calculadora.swNumero == 1 ){
                return calculadora.numero1 + '.';
            }else{
                return calculadora.numero2 + '.';
            }
        },
        getSignoModificado: function () {
            //Cambia el signo del numero almacenado
            if(calculadora.swNumero == 1 ){
                if(calculadora.numero1>0){
                    calculadora.numero1=calculadora.numero1 * -1;
                }
                return calculadora.numero1;
            }else{
                if(calculadora.numero2>0){
                    calculadora.numero2=calculadora.numero2 * -1;
                }
                return calculadora.numero2 + '.';
            }
        },
        resetCalculadora: function () {
            //Resetear los valores de la calculadora
            calculadora.swNumero = 1;
            calculadora.numero1 = 0;
            calculadora.numero2 = 0;
            calculadora.punto = false;
            calculadora.mostrarEnPantalla('0');
        },
        reduceHeight:function(idTecla){
            //Reduce el alto de las teclas
            var heightOriginal = 62.91;
            var unidadMedida = 'px';
            var heightModificado = heightOriginal -4;
            if(idTecla=='mas'){
                unidadMedida = '%';
                heightModificado = 97;
                heightOriginal = 100;
            }
            document.getElementById(idTecla).style.height = heightModificado + unidadMedida;

            setTimeout(function () {
                document.getElementById(idTecla).style.height = heightOriginal + unidadMedida;
            },100);
        },
        presionaTecla:function(event) {
            //Funcion generica para presionar cualquier tecla
            var idTecla = event.path[0].id;
            calculadora.reduceHeight(idTecla);
            if(calculadora.esNumero(idTecla)){
                if(calculadora.ultimaTeclaPresionada=='igual'){
                    calculadora.resetCalculadora();
                }
                if(!calculadora.existePuntoNumero()&&calculadora.punto) {
                    idTecla = "." + idTecla;
                }
                calculadora.mostrarEnPantalla(calculadora.presionaNumero(idTecla));
            }
            else if(calculadora.esOperador(idTecla)){
                calculadora.numero2 = '';
                calculadora.swNumero = 2;
                calculadora.punto = false;
                calculadora.presionaOperador(idTecla);
                calculadora.mostrarEnPantalla('');
            }else if(idTecla == 'on'){
                calculadora.resetCalculadora();
            }else if(idTecla=="igual"){
                calculadora.realizarOperacion();
                calculadora.mostrarEnPantalla(calculadora.resultado);
                calculadora.swNumero = 1;
            }else if(idTecla=="punto"){
                if(!calculadora.existePuntoNumero()){
                    calculadora.punto = true;
                    calculadora.mostrarEnPantalla(calculadora.addPunto());
                }
            }else if(idTecla=="sign"){
                calculadora.mostrarEnPantalla(calculadora.getSignoModificado());
            }
            calculadora.ultimaTeclaPresionada=idTecla;
        }
    };

    calculadora = Calculadora;
    calculadora.iniciar();
};

