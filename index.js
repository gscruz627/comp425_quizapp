let form = document.getElementById("quiz-form");
let resultContainer = document.getElementById("question-container");
const PROXY_URL = "http://localhost:8000";

let questions = [];
let questionText = "";
let questionIndex = 0;
let questionsTotal = 0;
let questionsCorrect = 0;

let predefinedQuestions = {
    "science": "What is the most abundant gas in Earth's atmosphere?\nOxygen\nCarbon dioxide\nNitrogen\nArgon\n2\nWhich planet has the largest number of moons?\nEarth\nJupiter\nMars\nSaturn\n3\nWhat is the powerhouse of the cell?\nNucleus\nMitochondria\nRibosome\nChloroplast\n1\nWhich element has the chemical symbol ‘Na’?\nNickel\nNitrogen\nSodium\nNeon\n2\nWhat type of energy is stored in a stretched rubber band?\nKinetic energy\nThermal energy\nPotential energy\nChemical energy\n2\nWhat is the speed of light in a vacuum?\n3.0 × 10⁸ m/s\n3.0 × 10⁶ m/s\n3.0 × 10⁴ m/s\n3.0 × 10² m/s\n0\nWhich organ in the human body is primarily responsible for detoxifying chemicals and metabolizing drugs?\nLiver\nKidney\nPancreas\nStomach\n0\nWhat is the chemical formula for table salt?\nNa₂CO₃\nNaCl\nKCl\nCaCl₂\n1\nWhich scientist proposed the three laws of motion?\nAlbert Einstein\nGalileo Galilei\nIsaac Newton\nNiels Bohr\n2\nWhat process do plants use to convert sunlight into chemical energy?\nRespiration\nPhotosynthesis\nFermentation\nTranspiration\n1",
    "history": "Who was the first President of the United States?\nGeorge Washington\nThomas Jefferson\nAbraham Lincoln\nJohn Adams\n0\nIn which year did World War II end?\n1945\n1939\n1918\n1950\n0\nWhich ancient civilization built the pyramids of Giza?\nRomans\nGreeks\nEgyptians\nMayans\n2\nWho wrote the Declaration of Independence?\nBenjamin Franklin\nThomas Jefferson\nJohn Adams\nJames Madison\n1\nWhat was the name of the ship on which the Pilgrims traveled to North America in 1620?\nSanta Maria\nMayflower\nEndeavour\nBeagle\n1\nWhich empire was ruled by Genghis Khan?\nRoman Empire\nOttoman Empire\nMongol Empire\nPersian Empire\n2\nWhat event started World War I?\nThe bombing of Pearl Harbor\nThe assassination of Archduke Franz Ferdinand\nThe invasion of Poland\nThe sinking of the Lusitania\n1\nWho was the British Prime Minister during most of World War II?\nNeville Chamberlain\nWinston Churchill\nMargaret Thatcher\nClement Attlee\n1\nThe Renaissance began in which country?\nFrance\nItaly\nSpain\nGermany\n1\nWhat wall was built in 1961 to divide a European city during the Cold War?\nBerlin Wall\nHadrian’s Wall\nGreat Wall of China\nWailing Wall\n0",
    "mathematics": "What is the value of π (pi) to two decimal places?\n3.12\n3.14\n3.16\n3.18\n1\nWhat is the square root of 144?\n10\n11\n12\n13\n2\nWhat is 7 × 8?\n54\n56\n58\n60\n1\nIf a triangle has sides of 3 cm, 4 cm, and 5 cm, what type of triangle is it?\nEquilateral\nIsosceles\nScalene\nRight-angled\n3\nWhat is the perimeter of a square with a side length of 6 cm?\n12 cm\n18 cm\n24 cm\n36 cm\n2\nSolve for x: 2x + 6 = 14\n3\n4\n5\n6\n1\nWhat is 25% of 200?\n25\n40\n50\n75\n2\nWhat is the value of 5²?\n10\n20\n25\n30\n2\nWhat is the next prime number after 7?\n8\n9\n10\n11\n3\nWhat is the area of a circle with radius 3 cm? (Use π = 3.14)\n18.84 cm²\n28.26 cm²\n30.00 cm²\n31.40 cm²\n1",
    "literature": "Who wrote “Romeo and Juliet”?\nCharles Dickens\nWilliam Shakespeare\nJane Austen\nMark Twain\n1\nWhat is the name of the hobbit played by Elijah Wood in “The Lord of the Rings” films?\nBilbo Baggins\nFrodo Baggins\nSamwise Gamgee\nPippin Took\n1\nWho is the author of “1984”? \nAldous Huxley\nGeorge Orwell\nRay Bradbury\nErnest Hemingway\n1\nWhich novel begins with the line “Call me Ishmael”? \nThe Great Gatsby\nMoby-Dick\nPride and Prejudice\nDracula\n1\nIn Greek mythology, who is the muse of epic poetry?\nCalliope\nClio\nErato\nThalia\n0\nWho wrote “Pride and Prejudice”?\nEmily Brontë\nMary Shelley\nJane Austen\nCharlotte Brontë\n2\nWhich Shakespeare play features the characters Rosencrantz and Guildenstern?\nMacbeth\nHamlet\nOthello\nKing Lear\n1\nWhat is the title of the first Harry Potter book?\nThe Chamber of Secrets\nThe Goblet of Fire\nThe Philosopher’s Stone\nThe Prisoner of Azkaban\n2\nWho wrote “The Catcher in the Rye”? \nF. Scott Fitzgerald\nJ.D. Salinger\nJohn Steinbeck\nHarper Lee\n1\nWhich poet wrote “The Raven”?\nRobert Frost\nWalt Whitman\nEdgar Allan Poe\nWilliam Wordsworth\n2",
    "geography" : "What is the largest continent on Earth?\nAfrica\nAsia\nNorth America\nEurope\n1\nWhich river is the longest in the world?\nAmazon River\nNile River\nYangtze River\nMississippi River\n1\nWhat is the capital city of Australia?\nSydney\nMelbourne\nCanberra\nPerth\n2\nMount Everest lies on the border of Nepal and which other country?\nIndia\nChina\nBhutan\nPakistan\n1\nWhich desert is the largest in the world?\nGobi Desert\nKalahari Desert\nSahara Desert\nAntarctic Desert\n3\nWhat is the smallest country in the world by area?\nMonaco\nVatican City\nSan Marino\nLiechtenstein\n1\nWhich ocean lies on the east coast of the United States?\nPacific Ocean\nIndian Ocean\nAtlantic Ocean\nArctic Ocean\n2\nWhat is the capital of Canada?\nToronto\nVancouver\nOttawa\nMontreal\n2\nWhich country has the most natural lakes?\nRussia\nCanada\nFinland\nUnited States\n1\nWhat is the longest mountain range in the world?\nAndes\nHimalayas\nRockies\nAlps\n0",
    "technology": "Who is the founder of Microsoft?\nSteve Jobs\nBill Gates\nElon Musk\nLarry Page\n1\nWhat does “CPU” stand for?\nCentral Processing Unit\nComputer Power Utility\nControl Processing Unit\nCentral Performance Unit\n0\nWhich company developed the iPhone?\nGoogle\nSamsung\nApple\nHuawei\n2\nWhat does “HTTP” stand for?\nHyperText Transfer Protocol\nHigh Tech Transmission Process\nHyper Terminal Transfer Program\nHost Transfer Type Protocol\n0\nWhich programming language is primarily used for Android app development?\nSwift\nKotlin\nPython\nRuby\n1\nWhat does “AI” stand for?\nAutomated Interface\nArtificial Intelligence\nAdvanced Integration\nAlgorithmic Input\n1\nWhat year was Facebook founded?\n2002\n2004\n2006\n2008\n1\nWho is known as the father of the computer?\nAlan Turing\nCharles Babbage\nJohn von Neumann\nTim Berners-Lee\n1\nWhat is the main function of a router in a network?\nStore data\nConnect devices to the internet\nDisplay web pages\nEncrypt files\n1\nWhat does “USB” stand for?\nUniversal Serial Bus\nUnited System Board\nUser Storage Base\nUniversal System Backup\n0"
}

form.addEventListener("submit", async function(event){
    event.preventDefault();

    let prompt = form.elements["prompt"].value;
    let questions = form.elements["questions"].value;
    let difficulty = form.elements["difficulty"].value;

    await generateQuiz(prompt, questions, difficulty);
    
})

async function generateQuiz(prompt, numberOfQuestions, difficulty){
// Reset state
    questions = [];
    questionsCorrect = 0;
    questionIndex = 0;
    questionText = "";
    document.getElementById("quiz-results").style.display = "none";
    document.getElementById("score-container").style.display = "none";
    document.getElementById("loading").style.display = "block";

    if (!prompt.trim()) {
        document.getElementById("loading").style.display = "none";
        return;
    }

    const body = {
        prompt, questions: numberOfQuestions, difficulty
    };

    const headers = {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    };

    try{
        const request = await fetch(PROXY_URL, {
            method: "POST", headers, body: JSON.stringify(body)
        });
        const response = await request.json();
        // This has all the questions and answers in their format.
        const text = response["candidates"][0]["content"]["parts"][0].text;
        questionText = text;
        const lines = text.split("\n");
        for(let i = 0; i < lines.length; i += 6){
            const question = lines[i];
            const answers = lines.slice(i + 1, i + 5);
            const correctIndex = parseInt(lines[i + 5], 10);
            questions.push({question: question, answers: answers, correctIndex: correctIndex})
        }

        questionsTotal = numberOfQuestions;
        if (!questionsTotal) {
            alert("No questions were generated. Try again.");
            return;
        }
        // At this point, all questions are in object format. We proceed to display the quiz with the initial question.
        questionIndex = 0;
        displayQuestion(0)
        document.getElementById("quiz-results").style.display = "block";
        document.getElementById("question-container").style.display = "block";
        document.getElementById("next-btn").style.display = "block";
        document.getElementById("action-btn").style.display = "inline";

    } finally {
       document.getElementById("loading").style.display = "none";
    }
}

function getPregeneratedQuiz(topic){
    questions = [];
    questionsCorrect = 0;
    questionIndex = 0;
    questionText = "";
    document.getElementById("score-container").style.display = "none";
    document.getElementById("quiz-results").style.display = "block";
    questions = [];
    questionsCorrect = 0;
    questionIndex = 0;
    questionsTotal = 10;
    const text = predefinedQuestions[topic];
    questionText = text;
    const lines = text.split("\n");
    for(let i = 0; i < lines.length; i += 6){
        const question = lines[i];
        const answers = lines.slice(i + 1, i + 5);
        const correctIndex = parseInt(lines[i + 5], 10);
        questions.push({question: question, answers: answers, correctIndex: correctIndex})
    }
    // At this point, all questions are in object format. We proceed to display the quiz with the initial question.
    questionIndex = 0;
    displayQuestion(0);
    document.getElementById("action-btn").style.display = "inline";
}
function displayQuestion(i){

    document.getElementById("next-btn").setAttribute("disabled","true");
    console.log(questions[i])
    document.getElementById("quiz-results").style.display = "block";
    document.getElementsByClassName("question-text")[0].innerHTML = (questionIndex + 1) + "." + questions[i].question;
    let options = document.getElementsByClassName("options-list")[0];

    // Setup all four possible answers
    console.log(options.children);
    options.children[0].innerHTML = questions[i].answers[0];
    options.children[1].innerHTML = questions[i].answers[1];
    options.children[2].innerHTML = questions[i].answers[2];
    options.children[3].innerHTML = questions[i].answers[3];

    document.getElementById("current-question").innerHTML = questionIndex + 1;
    document.getElementById("total-questions").innerHTML = questionsTotal;
}

function clickAnswer(i){
    document.getElementById("next-btn").removeAttribute("disabled");
    if(questions[questionIndex].correctIndex == i){
        // correct answer
        questionsCorrect++;
        document.querySelectorAll(".feedback.correct")[0].style.display = "block";
        document.querySelectorAll(".feedback.correct")[0].innerHTML = "Correct! " + questions[questionIndex].answers[questions[questionIndex].correctIndex] + " is the correct answer";
    } else {
        document.querySelectorAll(".feedback.incorrect")[0].style.display = "block";
        document.querySelectorAll(".feedback.incorrect")[0].innerHTML = "Incorrect. " + questions[questionIndex].answers[questions[questionIndex].correctIndex] + " was the correct answer";
    }
    console.log(questionsCorrect);
}

function moveQuestion(){

    document.querySelector(".feedback.correct").style.display = "none";
    document.querySelector(".feedback.incorrect").style.display = "none";
    console.log(questionIndex);
    console.log(questionsTotal);
    console.log(questionIndex >= questionsTotal-1)
    if(questionIndex >= questionsTotal-1){
        // quiz is over, display results
        document.getElementById("question-container").style.display = "none";
        document.getElementById("score-container").style.display = "block";

        document.getElementById("score-text").innerHTML = "Your Score: " + questionsCorrect + "/" + questionsTotal + ` ( ${(questionsCorrect/questionsTotal)*100}% )`;
        document.getElementById("next-btn").style.display = "none";
        return;
    }
    questionIndex++;
    displayQuestion(questionIndex);
}

function generatePDF(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const lines = questionText.split('\n');
    let y = 20;

    for (let i = 0; i < lines.length; i += 6) {
      const question = lines[i];
      const answers = lines.slice(i + 1, i + 5); // next 4 lines
      // lines[i+5] is the correct index, ignore

      // Add page if near bottom
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text(`${question}`, 10, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      answers.forEach(ans => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(`- ${ans}`, 15, y);
        y += 6;
      });
      y += 4;
    }
    doc.save("quiz.pdf");
}