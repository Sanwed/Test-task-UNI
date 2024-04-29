fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then((data) => {
    const table = document.querySelector('#posts-table');
    createHeaderRow(data, table);
    
    createRows(data, table);
    
    const searchInput = document.querySelector('#search-post');
    searchInput.addEventListener('input', () => {
      if (searchInput.value.length >= 3) {
        filterPosts(data, table, searchInput.value);
      } else {
        filterPosts(data, table, '');
      }
    });
    
  })
  .catch((err) => {
    console.error(err);
  });

function filterPosts(data, table, filterValue) {
  const filteredData = data.filter(post => post['title'].includes(filterValue) || post['body'].includes(filterValue));
  const tbody = document.querySelector('#posts');
  removeRows(tbody);
  
  const thead = document.querySelector('#posts-header');
  removeHeaderRow(thead);
  
  createHeaderRow(data, table, filteredData);
  createRows(filteredData, table);
}

function createHeaderRow(data, table, filteredData = null) {
  const thead = document.createElement('thead');
  thead.id = 'posts-header';
  const headerRow = document.createElement('tr');
  
  Object.keys(data[0]).forEach((key) => {
    const header = document.createElement('th');
    
    const btn = document.createElement('button');
    btn.classList.add('btn-sort');
    btn.innerHTML = key;
    
    let order = true;
    
    const image = document.createElement('img');
    image.src = 'arrow.svg';
    
    btn.addEventListener('click', () => {
      if (filteredData) {
        sortPosts(filteredData, table, key, order);
      } else {
        sortPosts(data, table, key, order);
      }
      
      removeSortArrows(table);
      btn.append(image);
      
      if (!order) {
        image.style.transform = 'rotate(180deg)';
      } else {
        image.style.transform = 'rotate(0deg)';
      }
      
      order = !order;
    });
    
    header.append(btn);
    headerRow.append(header);
  });
  
  thead.append(headerRow);
  table.append(thead);
}

function removeSortArrows(table) {
  const headers = table.querySelectorAll('th');
  headers.forEach(header => {
    const arrow = header.querySelector('img');
    if (arrow) {
      arrow.remove();
    }
  });
}

function createRows(data, table) {
  const tbody = document.createElement('tbody');
  tbody.id = 'posts';
  
  data.forEach(post => {
    const row = document.createElement('tr');
    
    Object.keys(post).forEach((el) => {
      const cell = document.createElement('td');
      cell.innerHTML = post[el];
      
      row.append(cell);
    });
    
    tbody.append(row);
  });
  
  table.append(tbody);
}

function removeRows(body) {
  body.remove();
}

function removeHeaderRow(body) {
  body.remove();
}

function sortPosts(data, table, key, order) {
  const tbody = document.querySelector('#posts');
  removeRows(tbody);
  
  const dataCopy = data.map(item => item);
  
  if (!order) {
    dataCopy.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  } else {
    dataCopy.sort((a, b) => {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
      return 0;
    });
  }
  
  createRows(dataCopy, table);
}
