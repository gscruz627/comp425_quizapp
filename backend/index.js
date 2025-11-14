// This is a very simple web server whose role is proxy.
// This is a web application because it serves web content = web server
// Because it does not return html pages, instead it returns JSON strings
// it is called an API, Application Programming Interface
// it is consumed by our html page

// Express is the library that lets us create our api server. 
import express from "express"

// Just import this
import cors from "cors"

// Create an app
const app = express();

// app.use() basically declares what 'things' to use within the app,
// we want to use json strings
app.use(express.json());

// and cors
app.use(cors());

// the only api request to this server is POST / 
app.post("/", async (req, res) => {

    // If you remember, our client javascript passed a body like this:
    /*
    const body = {
        prompt: form.elements["prompt"].value
    };
    */
   // So we retrieve this from req = request . body["prompt"].
    const prompt = req.body["prompt"];
    const numberOfQuestions = req.body["questions"]
    const difficulty = req.body["difficulty"]

    // Make another web request this time to Gemini itself.
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
            // Gemini needs this key, this key is mine and unique but you can use it to test
            // Don't use it too much or it will run out.
            "X-goog-api-key": process.env.GEMINI_API_KEY
        },
        // The Gemini API expects the text prompt on this format:
        // contents > parts > text.
        // My idea is to insruct Gemini with something like this:
        // Create a multiple choice quiz on the format
        // question answer x 4 correct index, and do not reply with anything else 
        // besides that format, also the prompt is {prompt from user}.
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `Instructions: Create a multiple choice quiz on this format: [question] newline [answer1] newline [answer2] newline [answer3] newline [answer4] newline [index for the correct answer 0-3]. Have exactly ${numberOfQuestions} questions and a difficulty of ${difficulty}. Do not give me anything else as a response. Just the questions and answers, the topic is: ${prompt}`
                }]
            }]
        })
    });
    // Once we get a response from Gemini, we parse into JSON and send back to the javascript client
    // in our HTML page
    // This is why this is called a 'proxy' it just serves as a middle-man between our HTML and Gemini
    // This is because Gemini does not accept api request from the browsers, this is for security
    // So we make a request from our HTML into this proxy and this proxy acts as the requestor 
    // for Gemini
    const content = await response.json();
    res.send(content);
});

// Start the server in port 8000
// So we can request at http://localhost:8000

app.listen(8000);

