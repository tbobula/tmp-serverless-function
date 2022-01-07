const result = document.querySelector(".result");

const fetchData = async (req, res) => {
  try {
    // const { data } = await axios.get("/api/3_airtable");
    const { data } = await axios.get("/api/3_z_complete");
    const products = data
      .map((product) => {
        const { id, name, url, price } = product;
        return `
            <a href="product.html?id=${id}" class="product">
              <img src="${url}" alt="${name}" width="368" height="200" />
              <div class="info">
                <h5>${name}</h5>
                <h5 class="price">$${price}</h5>
              </div>
            </a>`;
      })
      .join("");

    result.innerHTML = products;
  } catch (error) {
    result.innerHTML = "<h4>Error while fetching data</h4>";
  }
};

fetchData();
