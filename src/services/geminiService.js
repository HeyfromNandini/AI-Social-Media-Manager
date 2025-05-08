const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
console.log('API Key available:', !!API_KEY); // This will log true/false without exposing the key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" + API_KEY;

export const generateSocialMediaPost = async (prompt, platform) => {
  try {
    const platformPrompt = `Generate a social media post for ${platform} about: ${prompt}.
    Consider the following:
    - Platform's tone and style
    - Character limits
    - Best practices for ${platform}
    - Engagement optimization
    - Hashtags if appropriate
    Please format the response as a JSON object with the following structure:
    {
      "content": "the post content",
      "hashtags": ["relevant", "hashtags"],
      "characterCount": number,
      "platform": "${platform}"
    }`;

    console.log('Making request to:', GEMINI_API_URL);
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: platformPrompt
          }]
        }]
      })
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      // Try to extract error message from response
      let errorMsg = "Failed to generate post";
      try {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        if (errorData && errorData.error && errorData.error.message) {
          errorMsg = errorData.error.message;
        }
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    // Gemini returns the text in data.candidates[0].content.parts[0].text
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("No content generated");

    // Extract JSON from the text response (removing the ```json and ``` markers)
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) throw new Error("Invalid response format");
    
    // Parse the extracted JSON
    return JSON.parse(jsonMatch[1]);
  } catch (error) {
    console.error("Error generating social media post:", error);
    throw error;
  }
};

// genAI.listModels().then(console.log); 