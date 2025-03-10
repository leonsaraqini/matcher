import { addPlayer, getPlayers } from "./firebase.js";

let text = `[{"class":"1","src":"pictures/1.png"}, 
    {"class":"2","src":"pictures/2.png"},
    {"class":"3","src":"pictures/3.png"},
    {"class":"4","src":"pictures/4.png"},
    {"class":"5","src":"pictures/5.png"},
    {"class":"6","src":"pictures/6.png"},
    {"class":"7","src":"pictures/7.png"},
    {"class":"8","src":"pictures/8.png"},
    {"class":"1","src":"pictures/1.png"},
    {"class":"2","src":"pictures/2.png"},
    {"class":"3","src":"pictures/3.png"},
    {"class":"4","src":"pictures/4.png"},
    {"class":"5","src":"pictures/5.png"},
    {"class":"6","src":"pictures/6.png"},
    {"class":"7","src":"pictures/7.png"},
    {"class":"8","src":"pictures/8.png"}]`;

let data = JSON.parse(text);

let elements = [];
let score = 0, minutes = 0,  seconds = 0,  milliseconds = 0 , time = 0;
let x;

export function init() {
    document.getElementById("startButton").innerText = 'Start';
    document.getElementById('tableGame').innerHTML = ``;

    shuffle(data);

    for (let i = 0, j = 0; i < 4; i++, j += 4) {
        document.getElementById("tableGame").innerHTML +=
        `<tr>            
        <td><img class="${data[0 + j].class}" src="pictures/0.jpg" alt=""></td>            
        <td><img class="${data[1 + j].class}" src="pictures/0.jpg" alt=""></td>
        <td><img class="${data[2 + j].class}" src="pictures/0.jpg" alt=""></td>
        <td><img class="${data[3 + j].class}" src="pictures/0.jpg" alt=""></td>
        </tr>`;
    }
}

export function start() {
    clearInterval(x);
    elements = [];
    score = minutes = seconds = milliseconds = 0;

    x = setInterval(() => {
        
        if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds >= 60) {
        seconds = 0;
        minutes++;
        }

        document.getElementById("score").innerHTML =
        `${String(minutes).padStart(2, '0')}m ` +
        `${String(seconds).padStart(2, '0')}s ` +
        `${String(milliseconds).padStart(3, '0')}ms`;
        
        milliseconds += 10;
        time += 10;
    }, 10);

    init();

    document.querySelectorAll("td").forEach(td => {
        td.addEventListener("click", function () {
            change(td);
        });
    });

    document.getElementById("startButton").innerText = 'Reset';
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function change(td) {
    let image = td.firstChild;

    if (!image.src.includes("pictures/0.jpg")) return;

    let matchedElement = data.find(element => element.class == image.className);
    image.src = matchedElement.src;

    elements.push(image);

    if (elements.length == 2) {
        let firstElem = elements.pop();
        let secondElem = elements.pop();

        if (firstElem.getAttribute('src') == secondElem.getAttribute('src')) {
            score++;
            
            if(score == 8){
                document.getElementById("startButton").style.display = "none";
                checkScore();
                return;
            }

        } else {
            setTimeout(() => addBorder(firstElem, secondElem), 600);
        }
    }

    
}

function addBorder(first, second) {
    first.src = 'pictures/0.jpg';
    second.src = 'pictures/0.jpg';
}


async function checkScore() {
    clearInterval(x);
    let username = prompt("Enter your name:");
    let finalScore = document.getElementById("score").innerText; 

    const player = { username, score: finalScore, time };

    await addPlayer(player); 

    const playersList = await getPlayers(); 

    alert(playersList); 

    document.getElementById("startButton").style.display = "block";

}

