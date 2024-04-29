const arr = [10, 12, 15, 21];

// Первый вариант

for (let i = 0; i < arr.length; i++) {
  setTimeout(function () {
    if (arr[i] > 13) {
      console.log(`Good: ${arr[i]}`);
    } else {
      console.log(`Bad: ${arr[i]}`);
    }
  }, 3000);
}

// Второй вариант
for (let i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(`${arr[i] > 13 ? 'Good' : 'Bad'}: ${arr[i]}`);
  }, 3000);
}
