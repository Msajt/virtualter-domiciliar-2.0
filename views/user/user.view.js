import { ChangeLoginData,
         onAuthStateChanged, 
         auth, 
         databaseRef,
         Logout,
         child,
         get,
        } from "../../database/firebasePagesSetup.js";

//! Verificando se a página já carregou totalmente
window.onload = () => {
    //? Verificando se o usuário está realmente online
    onAuthStateChanged(auth, (user) => {
        if(user){
            let userData = {};

            //? Coletar dados do usuário
            get(child(databaseRef, `users/${user.uid}`))
                .then((snapshot) => {
                    if(snapshot.exists()) {
                        //? Coletando dados atuais do usuário
                        userData = snapshot.val();
                        //? Exibindo o avatar do usuário
                        document.getElementById('user-image').src = `https://robohash.org/${user.email}`;
                        //? Exibindo dados 'escritos'
                        document.getElementById('user-email').innerHTML = userData.email;
                        document.getElementById('user-email-card').innerHTML = userData.email;
                        document.getElementById('user-userType').innerHTML = userData.userType.toUpperCase();
                        //? Exibindo dados 'numéricos'
                        document.getElementById('user-timesPlayed').innerHTML = `Vezes jogadas: ${userData.gamesPlayed}`;
                        document.getElementById('user-totalCoins').innerHTML = `Moedas coletadas: ${userData.totalCoins}`;
                        document.getElementById('user-totalCollisions').innerHTML = `Colisões realizadas: ${userData.totalCollisions}`;
                        document.getElementById('user-totalPoints').innerHTML = `Pontuação total: ${userData.totalPoints}`;
                        document.getElementById('user-totalPrecision').innerHTML = `Precisão total: ${(userData.totalPrecision*100).toFixed(5)}%`;
                        document.getElementById('user-totalTime').innerHTML = `Tempo jogado: ${(userData.totalTime/60).toFixed(3)} min`;

                        //? Função que faz essa janela ser vísivel
                        if(userData.userType === 'terapeuta'){
                            console.log('Esse usuário pode acessar a página dos pacientes');
                            document.getElementById('user-pacientsList').addEventListener ("click", () => window.location = '../../views/pacients/pacients.view.html');
                            document.getElementById('user-pacientsList').style.display = 'block';
                        } else document.getElementById('user-pacientsList').style.display = 'none'
                    }
                    else console.log('Erro ao coletar dados');
                });
            
            //! === REDIRECIONANDO DE PÁGINAS
                //? Deslogar usuário
            document.getElementById('user-logout').addEventListener ("click", Logout);
                //? Página do jogo
            document.getElementById('user-game').addEventListener ("click", () => window.location = '../../views/game/game.view.html');
                //? Trocar email e/ou senha
            document.getElementById('user-changeLogin').addEventListener ("click", () => ChangeLoginData(user.uid));

        } else{
            //! Caso o usuário não esteja logado, ele volta para a página inicial
            console.log('Usuário não logado');
            window.location = '../../views/login/login.view.html';
        } 
    });
}