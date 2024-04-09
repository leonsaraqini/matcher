let text = '[{"class":"1","src":"pictures/1.png"},{"class":"2","src":"pictures/2.png"},{"class":"3","src":"pictures/3.png"},{"class":"4","src":"pictures/4.png"},{"class":"5","src":"pictures/5.png"},{"class":"6","src":"pictures/6.png"},{"class":"7","src":"pictures/7.png"},{"class":"8","src":"pictures/8.png"},{"class":"1","src":"pictures/1.png"},{"class":"2","src":"pictures/2.png"},{"class":"3","src":"pictures/3.png"},{"class":"4","src":"pictures/4.png"},{"class":"5","src":"pictures/5.png"},{"class":"6","src":"pictures/6.png"},{"class":"7","src":"pictures/7.png"},{"class":"8","src":"pictures/8.png"}]';
let data;
let imgTags;
let score;

window.onload = function(){
    initilize();
    
    const tdTags = document.querySelectorAll("#tableGame > tbody > tr > td");

    for(let td of tdTags){
        td.setAttribute("onclick", "change(this)");
    }

    let i = 0;

    for(let image of imgTags){
        image.className = data[i++].class;
    }
}


function initilize(){
    imgTags = document.querySelectorAll("#tableGame > tbody > tr > td > img");
    data = JSON.parse(text);
    shuffle(data);
    addBorderToImages();
    score = 0;
}


function addBorderToImages(){

    for(let image of imgTags){
        if(image.getAttribute('class') != `closed`){
            image.src = `pictures/0.jpg`;
        }  
    }
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}


function change(td){
    let image = td.firstChild;
    
    for(let element of data){
        if(element.class == image.className){
            image.src = element.src;
            break;
        }
    }
    

    if(countOfSameSrc() % 2 == 0){

        for(let img of imgTags){
            if(img.getAttribute('src') == image.getAttribute('src') && img !== image){
                image.className = "closed";
                img.className = "closed";
                document.getElementById("score").innerText =`Score: ${++score}`;
                setTimeout(checkScore(),2000);

                return;
            }
        }

        setTimeout(addBorderToImages,600)
    }  
    
    
        

}

function checkScore(){
    if(score == 8)
        document.getElementById("score").innerHTML = `<i>Congrats, you won!!!</i>`;
}

function countOfSameSrc(){
    let count = 0;

    for(let img of imgTags){
        if(img.getAttribute('src') == `pictures/0.jpg`)
            count++;
    }

    return count;
}