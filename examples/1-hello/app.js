const resultElement = document.querySelector(".result");
const fetchData = async () => {
  try {
    const { data } = await axios.get("/api/1_hello");
    resultElement.textContent = data;
  } catch (error) {
    console.log(error.response);
  }
};

fetchData();
