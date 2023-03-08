# chat-with-gpt

A Chrome extension for conveniently testing customized chatgpt prompts.

1. In the option page, define context menu name and chat-gpt prompt (multiple ones)
2. Add your openai api key to the option page (stored in your browser's local storage)
3. Load a web page, select some texts, right click and choose a context menu defined in step 1
4. A popup window shows at the bottom-right corner, the extension sends prompt + selected text
   to the openai api endpoint. 
5. The answer will show in the popup window.
5. Click anywhere in the page to dismiss the popup window.


**Privacy policy**

The extension doesn't collect nor store user information. The API key is stored in your local storage. The text selected is sent to the openai endpoint, just like you copy-paste them to chat.openai.com.

**Instructions**
1. git clone https://github.com/engianx/chat-with-gpt
2. click on the extension icon on the top-right of Chrome's address bar, and choose "Manage Extensions" at the bottom. OR type "chrome://extensions" in the address bar directly
3. turn on "Developer mode" on the top-right corner
4. click on "Load unpacked" button, and select the directory cloned. You should see a new "Chat with GPT x.x" extension
5. get your openai API key following instructions here "https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key"
6. click on the extension icon on the menu bar, then click on three dots of "Chat with GPT" and select "Options", you should see the option page like this: https://github.com/engianx/chat-with-gpt/blob/main/screenshots/option-page.jpeg
7. add your openai API key to "OPENAI_API_KEY" field
8. define and customize your own context menu and chatgpt prompt in the "ITEMS" section
9. save and load a web page, select some texts, right click on selected texts, and you should see "Chat with GPT" in the context menu (not working with sites such as Google docs), then select a menu item you defined in the "ITEMS" section (e.g., "To French")
10. the extension sends "prompt + selected text" to openai API, e.g., "Translate to French: texts"
10. a popup window will show up at the bottom-right corner of the page, showing the results from chatgpt
