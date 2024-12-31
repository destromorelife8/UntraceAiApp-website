// script.js
document.getElementById('generate-button').addEventListener('click', async function() {
  const userQuery = document.getElementById('user-query').value;

  if (!userQuery) {
    alert("Please enter a question or topic.");
    return;
  }

  const apiKey = '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'; // Replace with your actual OpenAI API key

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003", // You can choose different models (e.g., GPT-3, GPT-4)
        prompt: userQuery,
        max_tokens: 150,
        temperature: 0.7, // Adjust for creativity in the response
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const generatedContent = data.choices[0].text.trim();
      document.getElementById('content-output').textContent = generatedContent;
    } else {
      document.getElementById('content-output').textContent = "Sorry, I couldn't generate content based on your input.";
    }
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error);
    document.getElementById('content-output').textContent = "An error occurred while processing your request.";
  }
});