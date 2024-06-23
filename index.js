import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyDV7AWgfuD1f3kke1aKDrGG-vRWlLr4Zzs"; // Replace with your actual API key

const getAdviceBtn = document.getElementById("get-advice-btn");
getAdviceBtn.addEventListener("click", getAdvice);

const questionInput = document.getElementById("question-input");

async function getAdvice() {
  const question = questionInput.value.trim();

  if (!question) {
    alert("Please enter your question or challenge.");
    return;
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const spinner = document.getElementById("spinner");
  spinner.style.display = "flex";

  try {
    const result = await model.generateContent(question);
    const response = await result.response;
    let advice = await response.text();

    advice = advice.replace(/\*/g, "");
    advice = advice.replace(/\s(?=\w)/g, " ");
    advice = advice.replace(/(?:\r\n|\r|\n)/g, "<br />");

    displayAdvice(advice);
  } catch (error) {
    console.error("Error generating advice:", error);
    displayError("Sorry, I am having trouble generating advice.");
  } finally {
    spinner.style.display = "none";
  }
}

function displayAdvice(advice) {
  const generatedContent = document.getElementById("generated-content");
  generatedContent.innerHTML = `<p>${advice}</p><hr />`;
}

function displayError(message) {
  const generatedContent = document.getElementById("generated-content");
  generatedContent.innerHTML = `<p class="error">${message}</p>`;
}
