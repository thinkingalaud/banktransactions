function setLoading(status) {
  const loading = document.getElementById('loading');
  if (loading) {
    if (status) {
      loading.style.display = 'block';
    } else {
      loading.style.display = 'none';
    }
  }
}

function setResults(results) {
  const resultsElement = document.getElementById('results');
  if (resultsElement) {
    resultsElement.style.display = 'block';
    resultsElement.innerHTML = results;
  }
}

setLoading(false);

chrome.tabs.query(
  { active: true },
  (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);

    if (url.hostname.endsWith('chase.com')) {
      setLoading(true);
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['chase.js'],
      }).then((results) => {
        setLoading(false);
        setResults(results[0].result);
      });
    }
  },
);
