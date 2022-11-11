// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0nvap7srcgw5iA9PzBOabxJ-IPOo36Kg",
    authDomain: "virtualter-web.firebaseapp.com",
    databaseURL: "https://virtualter-web-default-rtdb.firebaseio.com",
    projectId: "virtualter-web",
    storageBucket: "virtualter-web.appspot.com",
    messagingSenderId: "379856766015",
    appId: "1:379856766015:web:0d4a801714683cd8f1a48a",
    measurementId: "G-0BHD7LC4PN"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const database = firebase.database();

// Variáveis para o p5 e firebase
let userData = {}, levelData = {};
let gameData = [];
    // Coleta de estados
    let gotUserData = false;
    let updatingData = false;

//! ===== L O G O U T     D E     U S U Á R I O =====
function Logout(){
    auth.signOut()
        .then(() => {
            console.log("Usuário deslogado");
            window.location = ".../../views/login/login.view.html";
        })
        .catch((err) => {
            console.log("Erro de logout");
        });
}

//! ===== C O L E T A     D E     D A D O S     P R É V I O S =====
function GetUserData(userId){
    let previousUserData = database.ref().child('users').child(userId);

    previousUserData.get()
                    .then((snapshot) => {
                        if(snapshot.exists()){
                            userData = snapshot.val();
                            console.log("Dados prévios coletados com sucesso");
                        } else console.log("Não há dados");
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log("Houve um erro ao coletar os dados anteriores");
                        window.location = "../views/game/game.view.html";
                    })
}

//! ===== U P D A T E    D O S     D A D O S     D O     U S U Á R I O =====
function UpdateUserData(userId){
	//? Variáveis para atualizar
	let updatedGamesPlayed = userData.gamesPlayed + 1;
	let updatedTotalCoins = userData.totalCoins + gameData.reduce((n, {coins}) => n + coins, 0);
	let updatedTotalCollisions = userData.totalCollisions + gameData.reduce((n, {collisions}) => n + collisions, 0);
	let updatedTotalPoints = userData.totalPoints + gameData.reduce((n, {points}) => n + points, 0);
	let updatedTotalPrecision = (userData.totalCoins + gameData.reduce((n, {coins}) => n + coins, 0))/(userData.totalCollisions + gameData.reduce((n, {collisions}) => n + collisions, 0));
	let updatedTotalTime = userData.totalTime + gameData.reduce((n, {time}) => n + time, 0);

	const updatedUserData = {
		//games: updatedGames,
		gamesPlayed: updatedGamesPlayed,
		totalCoins: updatedTotalCoins,
		totalCollisions: updatedTotalCollisions,
		totalPoints: updatedTotalPoints,
		totalPrecision: updatedTotalPrecision,
		totalTime: updatedTotalTime
	}
	
	database.ref(`users/${userId}`)
            .update(updatedUserData, (error) => {
                console.log(`Os dados foram atualizados com sucesso`);
                //? Limpar array do gameData, userData e gotUserData = 'false'
                gameData = [];
                userData = {};
                gotUserData = false;
                l1Completed = l2Completed = l3Completed = false;
                updatingData = false;
                GetUserData(userId);
                console.log(gameData);
                console.log(userData);
                console.log(gotUserData);
                //console.log(l1Completed, l2Completed, l3Completed);
                //gotUserData = l1Completed = l2Completed = l3Completed = false;	
            })
		    .catch((error) => {
			    console.log(`Houve um erro: ${error.message}`)
		    });
}

//! Verificando se o usuário está logado
auth.onAuthStateChanged((user) => {
	if(user){
		document.getElementById('game-email').innerHTML = user.email;
		document.getElementById('game-logout').addEventListener ("click", Logout);
		document.getElementById('game-userPage').addEventListener ("click", () => window.location = '../../views/user/user.view.html');
	} else {
		console.log('Usuário não logado');
		window.location = '../../views/login/login.view.html';
	}
});