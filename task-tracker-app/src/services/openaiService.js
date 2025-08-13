const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const processTaskWithAI = async (userInput) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `
    Parse the following user input for a task and extract:
    1. A clear, concise task name (max 100 characters)
    2. A brief description if more context is provided
    
    User input: "${userInput}"
    
    Respond with a JSON object in this format:
    {
      "task_name": "extracted task name",
      "description": "extracted description or null if none"
    }
    
    Make the task name actionable and clear. If the input is vague, make reasonable assumptions.
  `;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that extracts structured task information from natural language input. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    
    try {
      return JSON.parse(content);
    } catch {
      return {
        task_name: userInput.slice(0, 100),
        description: null
      };
    }
  } catch (error) {
    console.error('Error processing task with AI:', error);
    return {
      task_name: userInput.slice(0, 100),
      description: null
    };
  }
};