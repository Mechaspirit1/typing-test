const display = document.querySelector("#display");
const span = document.querySelector("#span");
const type = document.querySelector("#type");

async function getWords(){
    try{
        const req = await fetch("https://random-word-api.herokuapp.com/word?number=100");
        const reqParsed = await req.json();
        console.log(reqParsed);

        let currentWord = 0
        let currentLetter = 0

        while(true){
            //cria um elemento span e da uma classe 
            const wordGroup = document.createElement("span");
            wordGroup.className = `words${currentWord}`;

            for(let i=0; i<reqParsed[currentWord].length; i++){
                //define que a pagina vai renderizar uma letra por vez
                let letter = reqParsed[currentWord][i];
                console.log(letter)
                //cria um elemento span contendo a letra e da uma classe
                let render = document.createElement("span");
                render.textContent = letter;
                render.className = `letter`

                //adiciona a letra ao span de palavras
                currentLetter++
                wordGroup.appendChild(render)
            }
            
            wordGroup.append(" ");
            span.appendChild(wordGroup)

            currentWord++
            if(currentWord === reqParsed.length){
                break
            }
        }

        let letterIndex = 0;
        let wordIndex = 0;

        //analiza cada tecla pressionada e retorna sum sinal positivo ou negativo caso
        //corresponda com a letra da palavra atual
        type.addEventListener("keydown", function(event){ 
            const expectedLetter = reqParsed[wordIndex][letterIndex];

            if (event.key.length !== 1) return;
            else if (event.key === expectedLetter){
                console.log("Positive");

                let corWord = document.querySelector(`.words${wordIndex}`);
                let corLetter = corWord.querySelectorAll(`.letter`);
                let correct = corLetter[letterIndex]

                correct.style.color = "green";
                letterIndex++;

                if(letterIndex === reqParsed[wordIndex].length){
                    console.log("Word completed !")
                    wordIndex++;
                    letterIndex = 0;
                }
            }
            else {
                console.log("Negative");
            }
        })
    }

    catch(err){
        return err;
    }
}

getWords();