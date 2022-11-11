import { onAuthStateChanged, 
         auth,
         get,
         child, 
         databaseRef,
         Logout
        } from "../../database/firebasePagesSetup.js";

//! Verificando se a página está totalmente carregada
window.onload = () => {
    //? Verificando se o usuário está logado
    onAuthStateChanged(auth, (user) => {
        if(user){
            let userData = {};
            let userIDsObject = {};
            let userIDsArray = [];
            let userInformationsArray = [];

            //? Coletar dados do usuário
            get(child(databaseRef, `users/${user.uid}`))
                .then((snapshot) => {
                    if(snapshot.exists()) {
                        //? Coletando dados atuais do usuário
                        userData = snapshot.val();

                        if(userData.userType === 'terapeuta'){
                            console.log('Esse usuário pode acessar a página dos pacientes');
                            //? Função que faz essa janela ser vísivel

                            //? Exibir email no navbar
                            document.getElementById('pacients-email').innerHTML = userData.email;

                            get(child(databaseRef, `users`))
                                .then((snapshot) => {
                                    //? Coletando o objeto que contém os dados dos usuários
                                    userIDsObject = snapshot.val();
                                    //? Transformando o objeto em um 'array'
                                    userIDsArray = Object.entries(userIDsObject);

                                    console.log(userIDsObject);
                                    console.log(userIDsArray);
                                    
                                    //? Pegando apenas os dados de cada usuário, um objeto por elemento
                                    userIDsArray.forEach(user => userInformationsArray.push(user[1]))

                                    console.log(userInformationsArray);
                                })
                                .then(() => {
                                    const container = document.getElementById('pacients-usersList');

                                    userInformationsArray.forEach((user) => {
                                        if(user.userType === 'paciente'){
                                            const card = document.createElement('div');
                                            card.className = 'card-body';

                                            const content = 
                                            `
                                            <div class="m-4">
                                                <div class="card" style="width: 300px;">
                                                    <img src="https://robohash.org/${user.email}" class="w-100 border-bottom" alt="Sample Image">
                                                    <div class="card-body bg-blue bg-dark" align="center">
                                                        <h5 class="card-title text-white">${user.email}</h5>
                                                        <p class="card-text text-white">${user.userType.toUpperCase()}</p>
                                                    </div>
                                                    <ul class="list-group list-group-flush">
                                                        <li class="list-group-item">Partidas jogadas: ${user.gamesPlayed}</li>
                                                        <li class="list-group-item">Moedas coletadas: ${user.totalCoins}</li>
                                                        <li class="list-group-item">Colisões totais: ${user.totalCollisions}</li>
                                                        <li class="list-group-item">Pontuação total: ${user.totalPoints}</li>
                                                        <li class="list-group-item">Precisão total: ${(user.totalPrecision*100).toFixed(5)}%</li>
                                                        <li class="list-group-item">Tempo jogado: ${(user.totalTime/60).toFixed(2)} minutos</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            `
                                            container.innerHTML += content;
                                        }
                                    })
                                })
                        } else{
                            Logout();
                        }
                    }
                    else console.log('Erro ao coletar dados');
                });
            
            //! === REDIRECIONANDO DE PÁGINAS
                //? Deslogar usuário
            document.getElementById('pacients-logout').addEventListener ("click", Logout);
                //? Página do jogo
            document.getElementById('pacients-gamePage').addEventListener ("click", () => window.location = '/Virtualter-Domiciliar/gamePage/index.html');
                //? Página do jogo
            document.getElementById('pacients-userPage').addEventListener ("click", () => window.location = '/Virtualter-Domiciliar/userPage/user.html');
                
        } else{
            console.log('Usuário não logado');
            window.location = './index.html';
        } 
    });
}