// Função global para iniciar o jogo
function iniciaJogo() {
    var jogador1 = $("#nome_jogador_1").val().trim();
    var jogador2 = $("#nome_jogador_2").val().trim();

    if (jogador1 === "" || jogador2 === "") {
        alert("Por favor, informe o apelido dos dois jogadores!");
        return;
    }

    sessionStorage.setItem("jogador1", jogador1);
    sessionStorage.setItem("jogador2", jogador2);


    window.location.href = "jogo.html";
}
$(document).ready(function() {
    if (window.location.pathname.includes("jogo.html")) {
        $("#apelidoJogador1").text(sessionStorage.getItem("jogador1"));
        $("#apelidoJogador2").text(sessionStorage.getItem("jogador2"));
    }

    var vez = 1;
    var jogoFinalizado = false;
    var tabuleiro = ["", "", "", "", "", "", "", "", ""];

    function atualizarVez() {
        var nomeJogador = vez === 1 ? sessionStorage.getItem("jogador1") : sessionStorage.getItem("jogador2");
        $("#vezJogador").text("Vez de: " + nomeJogador);
    }

    function verificarVencedor() {
        const combinacoes = [
            [0,1,2], [3,4,5], [6,7,8], 
            [0,3,6], [1,4,7], [2,5,8], 
            [0,4,8], [2,4,6]           
        ];

        for (let c of combinacoes) {
            if (tabuleiro[c[0]] !== "" && tabuleiro[c[0]] === tabuleiro[c[1]] && tabuleiro[c[1]] === tabuleiro[c[2]]) {
                return tabuleiro[c[0]];
            }
        }

        if (!tabuleiro.includes("")) {
            return "empate";
        }

        return null;
    }

    atualizarVez();

    $("#palco_jogo .col-4").click(function() {
        if (jogoFinalizado) return;

        var celula = $(this);
        var index = $("#palco_jogo .col-4").index(celula);

        if (tabuleiro[index] !== "") return; 

        if (vez === 1) {
            celula.html('<img src="assets/css/img/marcacao_1.png" class="img-fluid">');
            tabuleiro[index] = "1";
            vez = 2;
        } else {
            celula.html('<img src="assets/css/img/marcacao_2.png" class="img-fluid">');
            tabuleiro[index] = "2";
            vez = 1;
        }

        var resultado = verificarVencedor();
        if (resultado) {
            jogoFinalizado = true;
            setTimeout(function() {
                if (resultado === "empate") {
                    if (confirm("Empate! Deseja jogar novamente?")) {
                        reiniciarJogo();
                    } else {
                        voltarInicio();
                    }
                } else {
                    var vencedor = resultado === "1" ? sessionStorage.getItem("jogador1") : sessionStorage.getItem("jogador2");
                    if (confirm(vencedor + " venceu! Deseja jogar novamente?")) {
                        reiniciarJogo();
                    } else {
                        voltarInicio();
                    }
                }
            }, 100);
        } else {
            atualizarVez();
        }
    });

    function reiniciarJogo() {
        $("#palco_jogo .col-4").empty();
        tabuleiro = ["", "", "", "", "", "", "", "", ""];
        vez = 1;
        jogoFinalizado = false;
        atualizarVez();
    }

    function voltarInicio() {
        window.location.href = "index.html";
    }
});
