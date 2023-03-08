# chat-with-gpt

A Chrome extension for customizing prompts easily.

1. in the option page, define context menu name and chat-gpt prompt (multiple ones)
2. add your chat-gpt api key to the option page
3. navigate to a page, select texts, right click and choose a context mene defined in step 1
4. a popup window shows at the bottom-right corner, a background job sends <prompt> + <selected text>
   to openai api endpoint. the result will show in the popup window
5. click anywhere in the page to dismiss the popup window.


**Privacy policy**

The extension doesn't collect or store user information. The API key is stored in your local storage.
The text selected is sent to api.openai.com.
