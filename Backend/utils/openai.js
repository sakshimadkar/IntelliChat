import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    }),
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const data = await response.json();
    console.log("OpenAI API raw response:", data); // 🔹 LOG THIS

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      console.log("OpenAI returned no message");
      return "Sorry, I could not generate a reply.";
    }
  } catch (err) {
    console.log("OpenAI fetch error:", err);
    return "Sorry, I could not generate a reply.";
  }
};

export default getOpenAIAPIResponse;


