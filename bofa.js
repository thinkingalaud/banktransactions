function parse() {
  // these are the only columns we care about
  const COLUMNS = [
    'date-cell',
    'amount-cell',
    'type-cell',
    'desc-cell',
  ];

  // these are the rows in the transaction table
  const TRANSACTION_CLASS = 'activity-row';

  const rows = document.getElementsByTagName('tr');

  const transactionRows = Array.from(rows).filter((row) => row.classList.contains(TRANSACTION_CLASS));
  const parsedTransactions = transactionRows.map((row) => {
    const columns = Array.from(row.getElementsByTagName('td'));
    const data = {};
    columns.forEach((column) => {
      const header = COLUMNS.find((c) => column.classList.contains(c));
      if (header) {
        var text = column.innerText;
        if (header == 'date-cell') {
          try {
            text = new Date(text).toISOString().substring(0,10);
          } catch (e) {
          }
        } else if (header == 'desc-cell') {
          text = text.replace('View/Edit', '');
          text = text.trim();
        }
        data[header] = text;
      }
    });
    return data;
  });
  return {
    headers: COLUMNS,
    rows: parsedTransactions,
  };
}

parse();
