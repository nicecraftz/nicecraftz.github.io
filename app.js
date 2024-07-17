const test = () => {
  const dynamicTestElement = document.getElementById("dynamic-test");
  dynamicTestElement.innerHTML = "Hello World!";

  fetch("https://api.hypixel.net/skyblock/bazaar?api_key=abc")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dynamicTestElement.innerHTML = JSON.stringify(data);
      console.log(data);
    });
};

test();
