export const DEFAULT_OPTIONS = {
    "VERSION": 1,
    "ITEMS": [
        {"ENABLED": true, "NAME": "To Chinese", "PROMPT": "Translate to Chinese"},
        {"ENABLED": true, "NAME": "Formalize", "PROMPT": "Make it formal"}
    ],
    "OPENAI_API_ENDPOINT": "https://api.openai.com/v1/completions",
    "OPENAI_API_KEY": "",
    "MODEL": "text-davinci-003",
    "MAX_TOKENS": 2048,
    "TEMPERATURE": 0,
    "TOP_P": 1.0,
    "N": 1,
    "STOP": "\n"
};

export const STORAGE_KEY = "chat-with-gpt-options";