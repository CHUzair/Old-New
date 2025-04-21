let column1 = document.getElementById("column1");
let column2 = document.getElementById("column2");
let teamColumn = document.getElementById("teamColumn");
let originalPlayers1 = [];
let originalPlayers2 = [];

function generateBoxes() {
  column1.innerHTML = "";
  column2.innerHTML = "";
  teamColumn.innerHTML = "";

  let names = document.getElementById("nameList").value
    .split("\n")
    .map(name => name.trim())
    .filter(name => name !== "");

  if (names.length < 2) {
    alert("Enter at least two names!");
    return;
  }

  const half = Math.ceil(names.length / 2);
  const names1 = names.slice(0, half);
  const names2 = names.slice(half);

  originalPlayers1 = [...names1];
  originalPlayers2 = [...names2];

  const sizeClass =
    names.length > 10 ? "xsmall" : names.length > 4 ? "small" : "";

  names1.forEach(name => {
    const box = createBox(name, sizeClass);
    column1.appendChild(box);
  });

  names2.forEach(name => {
    const box = createBox(name, sizeClass);
    column2.appendChild(box);
  });

  document.getElementById("box-area").style.display = "block";
  document.getElementById("inputGroup").style.display = "none";

  // Show the buttons after columns are generated
  document.querySelector(".buttons").style.display = "block";

  if (names.length > 10) {
    document.querySelector(".scroll-wrapper").classList.add("scroll-enabled");
  } else {
    document.querySelector(".scroll-wrapper").classList.remove("scroll-enabled");
  }
}

function createBox(name, sizeClass = "") {
  const div = document.createElement("div");
  div.className = `box ${sizeClass}`;
  div.textContent = name;
  return div;
}

function showRandomBoxes() {
  const boxes1 = column1.querySelectorAll(".box");
  const boxes2 = column2.querySelectorAll(".box");

  if (boxes1.length === 0 || boxes2.length === 0) {
    alert("No more pairs to create!");
    return;
  }

  const rand1 = Math.floor(Math.random() * boxes1.length);
  const rand2 = Math.floor(Math.random() * boxes2.length);

  const name1 = boxes1[rand1].textContent;
  const name2 = boxes2[rand2].textContent;

  const team = `${name1} + ${name2}`;
  const teamBox = createBox(team);
  teamBox.classList.add("team-box");
  teamColumn.appendChild(teamBox);

  boxes1[rand1].remove();
  boxes2[rand2].remove();

  if (boxes1.length === 0 && boxes2.length === 0) {
    alert("All players are in teams!");
  }
}

function exportTeams() {
  let teams = [];
  let teamBoxes = teamColumn.querySelectorAll(".team-box");
  teamBoxes.forEach(team => {
    teams.push(team.textContent);
  });

  const blob = new Blob([teams.join("\n")], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "teams.txt";
  link.click();
}

function resetTeams() {
  // Clear the teams
  teamColumn.innerHTML = "";
  
  // Re-populate the columns with the original players
  column1.innerHTML = "";
  column2.innerHTML = "";

  originalPlayers1.forEach(name => {
    const box = createBox(name);
    column1.appendChild(box);
  });

  originalPlayers2.forEach(name => {
    const box = createBox(name);
    column2.appendChild(box);
  });
}
