const url = "http://86.57.17.229:3000";
const loginSubmit = document.getElementById("loginSubmit");
const signupSubmit = document.getElementById("signupSubmit");
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.submitter.id == "loginSubmit") login();
    if (event.submitter.id == "signupSubmit") signup();
});

function login(event) {
    const membershipID = loginForm.children[1].value;
    fetch(url + "/hasMember/" + membershipID)
        .then((response) => response.json())
        .then((response) => {
            if (response == "no such a member") {
                alert(response);
                return response;
            }
            console.log(response);
            sessionStorage.setItem("currentLogin", membershipID);
            goTOHomePage();
        })
        .catch((error) => {
            console.log(error);
        });
}

function signup(event) {
    const membershipID = loginForm.children[1].value;
    const name = loginForm.children[3].value;
    fetch(url + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            membershipID: membershipID,
            name: name,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            if (response == "you already have registered!") {
                alert(response);
                return response;
            }
            console.log(response);
            sessionStorage.setItem("currentLogin", membershipID);
            goTOHomePage();
        })
        .catch((err) => {
            console.log(err);
        });
}
function goTOHomePage() {
    window.location.href = "home.html";
}
