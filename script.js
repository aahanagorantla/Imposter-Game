let words = [];

fetch("words.csv")
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        for (let i = 0; i < lines.length; i++) 
        {
            const word = lines[i].trim();
            if (word) 
                words.push(word);
        }
    })
    .catch(err => console.error("File Error:", err));

let currplayer = 1;
let imposternum = 0;
let word = "";
let playernumbers = 0

async function start()
{
    playernumbers = document.getElementById("playersnumber").value;

    imposternum = Math.floor(Math.random() * playernumbers) + 1;
    
    word = await getRandomWord();

    console.log(`Imposter Number: ${imposternum}`);

    document.getElementById("playernumber").innerText = `Player Number: ${currplayer}`;

    if(currplayer === imposternum)
        document.getElementById("role").innerText = "Word: You are the Imposter!";
    else document.getElementById("role").innerText = `Word: ${word}`;

}

async function getRandomWord() {
    if (words.length === 0) {
        console.error("No words loaded.");
        return null;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function next() 
{
    if(currplayer < playernumbers)
        currplayer++;

    else alert("All players have been assigned!");
    document.getElementById("playernumber").innerText = `Player Number: ${currplayer}`;

    if(currplayer === imposternum)
        document.getElementById("role").innerText = "Word: You are the Imposter!";
    else document.getElementById("role").innerText = `Word: ${word}`;
}