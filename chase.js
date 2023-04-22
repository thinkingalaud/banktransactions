function parse() {
  // these are the only columns we care about
  const COLUMNS = [
    'Date',
    'Amount',
    'Category',
    'Description',
  ];

  // these are the rows in the transaction table
  const TRANSACTION_ID_REGEX = /transactionslideInActivity-.*/;

  const rows = document.getElementsByTagName('tr');

  const transactionRows = Array.from(rows).filter((row) => row.id.match(TRANSACTION_ID_REGEX));
  const parsedTransactions = transactionRows.map((row) => {
    const columns = Array.from(row.getElementsByTagName('td')).filter((column) => COLUMNS.includes(column.dataset.th));
    const data = {};
    columns.forEach((column) => {
      var text = column.innerText;
      if (column.dataset.th == 'Category') {
        text = column.getElementsByTagName('mds-link')[0]?.attributes?.text?.value;
      } else if (column.dataset.th == 'Date') {
        text = new Date(text).toISOString().substring(0,10);
      }
      data[column.dataset.th] = text;
    });
    return data;
  });
  return {
    headers: COLUMNS,
    rows: parsedTransactions,
  };
}

parse();
