# chat-with-gpt

A Chrome extension for conveniently testing customized chatgpt prompts.

1. In the option page, define context menu name and chat-gpt prompt (multiple ones)
2. Add your openai api key to the option page (stored in your browser's local storage)
3. Load a web page, select some texts, right click and choose a context menu defined in step 1
4. A popup window shows at the bottom-right corner, the extension sends <prompt> + <selected text>
   to the openai api endpoint. 
5. The answer will show in the popup window.
5. Click anywhere in the page to dismiss the popup window.


**Privacy policy**

The extension doesn't collect or store user information. The API key is stored in your local storage.
The text selected is sent to the openai endpoint.
