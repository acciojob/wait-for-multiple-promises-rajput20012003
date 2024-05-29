document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("output");

  // Function to generate a random time between 1 and 3 seconds
  function randomTime() {
    return Math.floor(Math.random() * 3 + 1) * 1000;
  }

  // Function to create a Promise that resolves after a random time
  function createPromise(id) {
    const time = randomTime();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: id, time: time / 1000 });
      }, time);
    });
  }

  // Array to store all promises
  const promises = [];

  // Add loading text to the table
  output.innerHTML += `
    <tr>
      <td colspan="2">Loading...</td>
    </tr>
  `;

  // Create 3 promises and push them to the array
  for (let i = 1; i <= 3; i++) {
    promises.push(createPromise(i));
  }

  // Wait for all promises to resolve using Promise.all
  Promise.all(promises)
    .then((results) => {
      // Remove loading text
      output.innerHTML = "";

      // Populate the table with results
      results.forEach((result) => {
        output.innerHTML += `
          <tr>
            <td>Promise ${result.id}</td>
            <td>${result.time}</td>
          </tr>
        `;
      });

      // Calculate and display total time taken
      const totalTime = results.reduce((acc, curr) => acc + curr.time, 0);
      output.innerHTML += `
        <tr>
          <td>Total</td>
          <td>${totalTime.toFixed(3)}</td>
        </tr>
      `;
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
});
