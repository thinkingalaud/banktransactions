// status: boolean
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

// results: {
//   headers: [string],
//   rows: [Row],
// }
// each Row should contain keys that match the list of headers
function setResults(results) {
  const resultsElement = document.getElementById('results');
  if (resultsElement) {
    resultsElement.style.display = 'block';

    const button = document.createElement('button');
    button.appendChild(document.createTextNode('Copy as CSV'));
    button.addEventListener('click', () => {
      var csv = '';
      results.rows.forEach((row) => {
        csv += results.headers.map((header) => row[header]).join(',');
        csv += '\n';
      });
      navigator.clipboard.writeText(csv);
    });
    resultsElement.appendChild(button);

    const table = document.createElement('table');
    const tableHeaders = document.createElement('tr');
    results.headers.forEach((header) => {
      const headerElement = document.createElement('th');
      headerElement.appendChild(document.createTextNode(header));
      tableHeaders.appendChild(headerElement);
    });
    table.appendChild(tableHeaders);
    results.rows.forEach((row) => {
      const rowElement = document.createElement('tr');
      results.headers.forEach((header) => {
        const dataElement = document.createElement('td');
        dataElement.appendChild(document.createTextNode(row[header]));
        rowElement.appendChild(dataElement);
      });
      table.appendChild(rowElement);
    });
    resultsElement.appendChild(table);
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
