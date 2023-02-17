import { DEFAULT_OPTIONS, STORAGE_KEY } from "./default_options.js";

var globalOptions = DEFAULT_OPTIONS;

function createContextMenus() {
    for (let item of globalOptions["ITEMS"]) {
        if (!item.ENABLED) continue;

        chrome.contextMenus.create({
            id: item.PROMPT,
            title: item.NAME,
            type: 'normal',
            contexts: ['selection'],
        })
    }
}

function deleteContextMenus() {
    chrome.contextMenus.removeAll();
}

function getApiKey() {
    // TODO: if no key in the default option, get from tab.
    return globalOptions["OPENAI_API_KEY"];
}

// May throw an error, caller should catch and process the error.
async function callOpenAIApi(prompt) {
    const api_key = getApiKey();
    const prompt_json = JSON.stringify({
        model: globalOptions["MODEL"],
        prompt: prompt,
        max_tokens: globalOptions["MAX_TOKENS"],
        temperature: globalOptions["TEMPERATURE"],
        top_p: globalOptions["TOP_P"],
        n: globalOptions["N"],
    });

    const response = await fetch(globalOptions["OPENAI_API_ENDPOINT"], {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
        body: prompt_json
    });

    if (response.ok) {
        const response_json = await response.json();
        return response_json.choices[0].text; 
    } else {
        const err_msg = await response.text();
        throw new Error(`HTTP error! status: ${err_msg}`);
    }
}

chrome.contextMenus.onClicked.addListener(async (item, tab) => {
    const prompt = item.menuItemId;
    const text = item.selectionText;
    // Bring up content box in the webpage.
    await chrome.tabs.sendMessage(tab.id, {
            prompt: prompt,
            status: "waiting for the response...",
            text: text});

    callOpenAIApi(`${prompt} "${text}"`).then(result => {
        // Send results back to the webpage.
        chrome.tabs.sendMessage(tab.id, {
            prompt: prompt,
            status: 'success',
            text: result});
    }).catch (error => {
        chrome.tabs.sendMessage(tab.id, {
            prompt: prompt,
            status: 'failed',
            text: error.message});
    });
});

chrome.storage.onChanged.addListener((changes, area) => {
    globalOptions = Object.assign({}, DEFAULT_OPTIONS, changes[STORAGE_KEY].newValue);
    deleteContextMenus();
    createContextMenus();
});

// Initialize globalOptions.
chrome.storage.sync.get(STORAGE_KEY, function(result){
    globalOptions = Object.assign({}, DEFAULT_OPTIONS, result[STORAGE_KEY]);
    deleteContextMenus();
    createContextMenus();
});