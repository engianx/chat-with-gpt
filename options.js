import { DEFAULT_OPTIONS, STORAGE_KEY } from './default_options.js'

// Restore the form using the preferences stored in chrome.storage
async function initialize_textarea() {
    const data = await chrome.storage.sync.get(STORAGE_KEY);
    var options = data[STORAGE_KEY];
    if (!options) options = DEFAULT_OPTIONS;

    const box = document.getElementById('json-box');
    box.value = JSON.stringify(options, null, 4);

    document.getElementById('save').addEventListener('click', async function () {
        const error_box = document.getElementById('error-box');
        try {
            let option_obj = {};
            option_obj[STORAGE_KEY] = JSON.parse(box.value);
            await chrome.storage.sync.set(option_obj);
            error_box.textContent = "saved successfully";
        } catch (error) {
            error_box.textContent = JSON.stringify(error);
        }
    });
}

document.addEventListener('DOMContentLoaded', initialize_textarea);