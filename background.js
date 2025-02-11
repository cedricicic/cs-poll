chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'POLL_ACTIVE') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon128.png',
            title: 'CS136 Poll Active!',
            message: 'The poll is now active! Click to open the page.',
            priority: 2
        });
    }
});

chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({
        url: 'https://student.cs.uwaterloo.ca/~cs136/poll-2/'
    });
});