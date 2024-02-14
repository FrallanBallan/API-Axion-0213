//Global
let teamA = document.querySelector("#teamA");
let teamB = document.querySelector("#teamB");
let teamC = document.querySelector("#teamC");
let teamD = document.querySelector("#teamD");

let btn = document.querySelector("#btn");

//API
const API_URL = "https://randomuser.me/api/";

let getData = async () => {
  let genderChoices = [];
  let natChoices = [];
  let genderChoice = document.querySelectorAll("input[name='gender']:checked");
  genderChoice.forEach((sex) => {
    // console.log(sex.value);
    genderChoices.push(sex.value);
    //Pusha in i gender
  });

  let nationality = document.querySelectorAll("input[name = 'nation']:checked");
  nationality.forEach((country) => {
    // console.log(country.value);
    natChoices.push(country.value);
    //pusha in i nat
  });

  let gender = genderChoices.toString();
  let nat = natChoices.toString();

  console.log(gender, nat);

  let respons = await axios.get(API_URL, {
    params: {
      gender,
      nat,
      inc: "name,gender,nat",
    },
  });
  console.log(respons.data.results);
  console.log(gender, nat);

  return respons.data.results;
};
// getData();

function renderUser(dudeman) {
  console.log(dudeman);
  let teamMember = `${dudeman.name.first} ${dudeman.name.last} ${dudeman.gender} ${dudeman.nat}`;
  console.log(teamMember);

  let paraTeam = document.createElement("p");
  paraTeam.innerText = teamMember;

  if (dudeman.gender === "female") {
    teamA.append(paraTeam);
  } else if (!teamB.innerHTML.includes(dudeman.nat)) {
    teamB.append(paraTeam);
  } else if (dudeman.gender === "male" && dudeman.nat === "US") {
    teamC.append(paraTeam);
  } else if (dudeman.nat === "ES" || "GB") {
    teamD.append(paraTeam);
  }
}

btn.addEventListener("click", async () => {
  let user = await getData();
  user.forEach((user) => {
    renderUser(user);
  });
});
