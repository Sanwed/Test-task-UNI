fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then((data) => {
    const table = document.querySelector('#posts');
    
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach((key) => {
      const header = document.createElement('th');
      header.innerHTML = key;
      headerRow.append(header);
    });
    table.append(headerRow);
    
    data.forEach(post => {
      const row = document.createElement('tr');
      Object.keys(post).forEach((el) => {
        const cell = document.createElement('td');
        cell.innerHTML = post[el];
        row.append(cell);
      });
      table.append(row);
    });
  })
  .catch((err) => {
    console.error(err);
  });
