const API_URL = "https://reqres.in/api/users";

let userInfoData = [];
const userContainer = document.getElementById("user-container");
const userClickedInfo = document.getElementById("user-clicked-info");


async function getUserInfo() {
    // JUST TO UNDERSTAND HOW IT WORKS WITH THEN CATCH BLOCK
    // fetch(API_URL).then((data) => {
    //     return data.json();
    // }).then((dataJSON) => {
    //     createCardUI();
    // }).catch((error) => {
    //     userInfoData = dataInJson.data || [];
    // })
    try {
        const data = await fetch(API_URL);
        const dataInJson = await data.json();
        userInfoData = dataInJson.data;
        generateAllCards(userInfoData);
    } catch (error) {
        console.log("There was an error", error);
        userInfoData = [];
    }
}

function createCardUI(user) {
    let cardUI = `
        <div class="card  m-4" style="width: 18rem;">
            <img src=${user.avatar} class="card-img-top" alt="...">
            <div class="card-body">
                <h1>${user.first_name} ${user.last_name}</h1>
                <p class="card-text">${user.email}</p>
            </div>
            <button id="btn-${user.id}" class="btn btn-primary" onclick="getUserDetails(${user.id})">Get Details</button>
        </div>
    `;
    userContainer.innerHTML += cardUI;
}

function generateAllCards(userData = []) {
    for (let i = 0; i < userData.length; i++) {
        createCardUI(userData[i]);
    }
}

function getUserDetails(userId) {
    const user = userInfoData.find((user) => user.id === userId);
    userClickedInfo.innerHTML = `
        <div class="d-flex justify-content-center align-items-center vh-200">
            <div class="card m-4 shadow-lg" style="width: 20rem;">
                <img src="${user.avatar}" class="card-img-top" alt="User Avatar">
                <div class="card-body">
                    <h2 class="h4 mb-4 text-center text-primary">${user.first_name} ${user.last_name}</h2>
                    <p class="lead mb-4 text-center text-danger">${user.email}</p>
                    <p class="text-muted">User ID: ${user.id}</p>
                </div>
            </div>
        </div>`;
}
getUserInfo();
