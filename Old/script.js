let originalPlayers = [];

function generateBoxes() {
  const input = document.getElementById('nameList').value;
  const names = input
    .split(/[\n,]+/)
    .map(name => name.trim())
    .filter(name => name.length > 0);

  if (names.length < 2) {
    alert("Please enter at least two player names.");
    return;
  }

  originalPlayers = [...names]; // Save original list

  const col1 = document.getElementById('col1');
  const col2 = document.getElementById('col2');
  const teamsCol = document.getElementById('teamsCol');
  col1.innerHTML = '';
  col2.innerHTML = '';
  teamsCol.innerHTML = '<h3>Teams</h3>';

  let sizeClass = '';
  if (names.length > 8 && names.length <= 12) {
    sizeClass = 'small';
  } else if (names.length > 12) {
    sizeClass = 'xsmall';
  }

  const half = Math.ceil(names.length / 2);
  names.forEach((name, i) => {
    const box = document.createElement('div');
    box.className = `box ${sizeClass}`;
    box.contentEditable = true;
    box.innerText = name;

    if (i < half) {
      col1.appendChild(box);
    } else {
      col2.appendChild(box);
    }
  });

  document.getElementById('gameArea').style.display = 'block';

  const scrollWrapper = document.getElementById('scrollWrapper');
  if (names.length > 10) {
    scrollWrapper.classList.add('scroll-enabled');
  } else {
    scrollWrapper.classList.remove('scroll-enabled');
  }

  document.getElementById('playerInputGroup').style.display = 'none';
}

function showRandomBoxes() {
  const col1Boxes = document.querySelectorAll('#col1 .box');
  const col2Boxes = document.querySelectorAll('#col2 .box');

  if (col1Boxes.length === 0 || col2Boxes.length === 0) {
    alert("No more boxes to pair!");
    return;
  }

  const rand1 = Math.floor(Math.random() * col1Boxes.length);
  const rand2 = Math.floor(Math.random() * col2Boxes.length);

  const box1 = col1Boxes[rand1];
  const box2 = col2Boxes[rand2];

  const name1 = box1.innerText.trim();
  const name2 = box2.innerText.trim();
  const teamName = `${name1} + ${name2}`;

  const teamBox = document.createElement('div');
  teamBox.className = 'box team-box';
  teamBox.innerText = teamName;

  document.getElementById('teamsCol').appendChild(teamBox);

  box1.remove();
  box2.remove();
}

function resetTeams() {
  if (originalPlayers.length === 0) return;

  const col1 = document.getElementById('col1');
  const col2 = document.getElementById('col2');
  const teamsCol = document.getElementById('teamsCol');
  col1.innerHTML = '';
  col2.innerHTML = '';
  teamsCol.innerHTML = '<h3>Teams</h3>';

  let sizeClass = '';
  if (originalPlayers.length > 8 && originalPlayers.length <= 12) {
    sizeClass = 'small';
  } else if (originalPlayers.length > 12) {
    sizeClass = 'xsmall';
  }

  const half = Math.ceil(originalPlayers.length / 2);
  originalPlayers.forEach((name, i) => {
    const box = document.createElement('div');
    box.className = `box ${sizeClass}`;
    box.contentEditable = true;
    box.innerText = name;

    if (i < half) {
      col1.appendChild(box);
    } else {
      col2.appendChild(box);
    }
  });
}

function exportTeams() {
  const teamBoxes = document.querySelectorAll('#teamsCol .box');
  if (teamBoxes.length === 0) {
    alert("No teams to export.");
    return;
  }

  const teamList = Array.from(teamBoxes).map(box => box.innerText).join('\n');
  const blob = new Blob([teamList], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'teams.txt';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
