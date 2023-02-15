const CHATGPT_DIV_ID = 'chatgpt_div';
const CHATGPT_TITLE_DIV_ID = "chatgpt_title_div";
const CHATGPT_ANSWER_DIV_ID = "chatgpt_answer_div";

function showChatGPTBox(title, text) {
    const chatgpt_div = document.createElement('div');
    // add to top right corner
    chatgpt_div.id = CHATGPT_DIV_ID;
    chatgpt_div.style.width = '400px';

    chatgpt_div.style.position = 'fixed';
    chatgpt_div.style.zIndex = '9999';
    chatgpt_div.style.bottom = '0';
    chatgpt_div.style.right = '0';

    const title_div = document.createElement('div');
    title_div.id = CHATGPT_TITLE_DIV_ID;
    title_div.textContent = title;

    title_div.style.backgroundColor = 'grey';

    chatgpt_div.appendChild(title_div);

    const answer_div = document.createElement('div');
    answer_div.id = CHATGPT_ANSWER_DIV_ID;
    answer_div.textContent = text;

    // Arrange one after the question.
    answer_div.style.position = 'relative';
    answer_div.style.top = '0';
    answer_div.style.backgroundColor = 'white';
    answer_div.style.color = 'black';

    chatgpt_div.appendChild(answer_div);

    document.body.append(chatgpt_div);   
}

function withinBounds(x, y, bounds) {
    return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
}

function listenToMouseClick(event) {
    const chatgpt_box = document.getElementById(CHATGPT_DIV_ID);
    if (!chatgpt_box) return;

    const {clientX: x, clientY: y} = event;
    if (withinBounds(x, y, chatgpt_box.getBoundingClientRect())) return;

    // Click outside of the box, remove the box
    chatgpt_box.remove();
}

function updateChatGPTBox(title, text) {
    const chatgpt_box = document.getElementById(CHATGPT_DIV_ID);
    if (!chatgpt_box) {
        showChatGPTBox(title, text);
        return;
    }
    // Otherwise, update the prompt and answer
    const title_div = document.getElementById(CHATGPT_TITLE_DIV_ID);
    if (title_div) title_div.textContent = title;
    const answer_div = document.getElementById(CHATGPT_ANSWER_DIV_ID);
    if (answer_div) answer_div.textContent = text;
}

function init() {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (!sender.tab) {  // from extension
                if (!request.prompt || !request.text) return;
                const title = request.prompt + ': ' + request.status;
                updateChatGPTBox(title, request.text);
                sendResponse({response: "ok"});
            }
        }
    )

    document.addEventListener("click", listenToMouseClick);
}

init();