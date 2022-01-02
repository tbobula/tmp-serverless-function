const result = document.querySelector(".result");

const fetchData = async () => {
  try {
    const { data } = await axios.get("/api/2_basic_api");

    const products = data
      .map((item) => {
        const {
          image: { url },
          name,
          price,
        } = item;

        return `<article class="product">
              <img src="${url}" alt="${name}" />
              <div class="info">
                <h5>${name}</h5>
                <h5 class="price">$${price}</h5>
              </div>
              </article>`;
      })
      .join("");
    result.innerHTML = products;
  } catch (error) {
    result.innerHTML = `<h4>Thre was an error please try again later</h4>`;
  }
};

fetchData();
