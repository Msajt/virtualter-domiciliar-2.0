// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getAuth,
         onAuthStateChanged,
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword, 
         deleteUser, 
         signOut,
         updateEmail,
         updatePassword,
         EmailAuthProvider,
         reauthenticateWithCredential
        } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase,
         ref,
         set,
         child,
         get,
         update
        } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//! ===== C O N F I G U R A Ç Ã O     D O     F I R E B A S E =====
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();
const databaseRef = ref(database);

//! ===== R E G I S T R A R      U S U Á R I O ======
function Register(){
    //? Coletar o email, senha e tipo de usuário
    let userEmail = document.getElementById('register-email').value;
    let userPassword = document.getElementById('register-password').value;
    let userType = document.getElementById('register-userType').value;
    
    //? Registrar no autenticador
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const dbUserID = userCredential.user.uid;
            const dbUserEmail = userCredential.user.email;
            const dbUserType = userType;

            //? Registrar no banco de dados
            InsertData(dbUserID, dbUserEmail, dbUserType);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(`Houve um problema ao cadastrar o usuário:\n${errorCode}\n\n${errorMessage}`);
        });
}

    //? ===== I N S E R I R     D A D O S     P A R A     R E G I S T R O =====
function InsertData(userId, userEmail, userType){
    //? Pegando os dados da criação de usuário do 'auth' e adicionando no banco de dados
    set(ref(database, `users/${userId}`), {
        email: userEmail,
        userType: userType,
        games: [0],
        gamesPlayed: 0,
        totalPoints: 0,
        totalTime: 0,
        totalCoins: 0,
        totalEnergies: 0,
        totalCollisions: 0,
        totalPrecision: 0
    })
        .then(() => {
            alert(`${userEmail} foi cadastrado com sucesso`);

            //TODO Encaminhar para a página de 'Login'
            //? Limpando os dados
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            window.location = '../login/login.view.html';
        })
        .catch((error)=> {
            const errorCode = error.code;
            const errorMessage = error.message;
            const delUser = auth.currentUser;

            alert(`Houve um problema ao cadastrar no banco de dados:\n${errorCode}\n\n${errorMessage}`);

            //? Deleta usuário caso houver um erro na criação do banco de dados
            deleteUser(delUser);
        });
}

    //? Verificando se a página é a 'register.html' (registro)
    //if(window.location.pathname == '/Virtualter-Domiciliar/register.html') document.getElementById('register-button').addEventListener ("click", Register);

//! ===== L O G I N     D O     U S U Á R I O ======
function Login(){
    //? Coletar o email e senha
    let userEmail = document.getElementById('login-email').value;
    let userPassword = document.getElementById('login-password').value;

    //? Verificando no autenticador e encaminhar pra página do jogo/dados
    signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            //TODO Encaminhar para a página
            //window.location = '../game/game.view.html';
            window.location = '../user/user.view.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(`Houve um problema ao logar o usuário:\n${errorCode}\n\n${errorMessage}`);
        })
}

//! ===== L O G O U T =====
const Logout = () => {
    auth.signOut()
        .then(() => {
			console.log('Usuário deslogado')
            window.location = '../login/login.view.html';
        })
        .catch((error) => {

        });
}

//! ===== U P D A T E      D E     U S U Á R I O =====
async function ChangeLoginData(userId){
    //? Coletar os novos email e/ou senha
    let updatedUserEmail = document.getElementById('user-changeEmail').value;
    let oldPassword = document.getElementById('user-oldPassword').value;
    let updatedUserPassword = document.getElementById('user-newPassword').value;
    
    const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);

    reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
        //? Trocar o email e/ou senha
            if(updatedUserPassword !== '' && updatedUserEmail !== ''){
                //! Atualiza o email e senha do usuário
                UpdateEmail(updatedUserEmail, userId)
                setTimeout(() => UpdatePassword(updatedUserPassword), 4000); 
                setTimeout(() => window.location.reload(), 8000); 
            }
            else if(updatedUserPassword === '' && updatedUserEmail !== ''){
                //! Atualiza somente o email
                UpdateEmail(updatedUserEmail, userId)
                setTimeout(() => window.location.reload(), 5000);
            } 
            else if(updatedUserPassword !== '' && updatedUserEmail === ''){
                //! Atualiza somente a senha
                UpdatePassword(updatedUserPassword)
                setTimeout(() => window.location.reload(), 3000);
            }
        })
        .catch((error) => {alert(`Falha ao autenticar o usuário:\n${error.message}`)});  
}

    //? ===== F U N Ç Õ E S     A U X I L I A R E S     D O     U P D A T E =====
    function UpdateEmail(newEmail, userId){
        document.getElementById('user-loadingState').className = "fa fa-spinner fa-spin";
        updateEmail(auth.currentUser, newEmail)
            .then(() => {
                //? Mensagem de confirmação
                console.log(`O email do usuário foi atualizado`);
                //? Dar update no email do usuário
                update(ref(database, `users/${userId}`), {
                    email: newEmail
                })
                    .then(() => console.log('Email do usuário foi atualizado no banco de dados'))
                document.getElementById('user-changeEmail').value = '';
                document.getElementById('user-oldPassword').value = '';
            })
            .catch((error) => {
                //? Mensagem de erro
                console.log(`Houve um problema ao trocar o email:\n${error.message}`);
            });
    }

    function UpdatePassword(newPassword){
        document.getElementById('user-loadingState').className = "fa fa-spinner fa-spin";
        updatePassword(auth.currentUser, newPassword)
            .then(() => {
                //? Mensagem de confirmação
                console.log(`A senha do usuário foi atualizada`);
                document.getElementById('user-oldPassword').value = '';
                document.getElementById('user-newPassword').value = '';
            })
            .catch((error) => {
                //? Mensagem de erro
                console.log(`Houve um problema ao trocar a senha:\n${error.message}`);
            });
    }

export {
    Login, 
    Register, 
    InsertData,
    ChangeLoginData,
    auth,
    databaseRef,
    onAuthStateChanged,
    child,
    ref,
    get,
    Logout
}