const result = document.querySelector(".result");

const fetchProduct = async () => {
  result.innerHTML = `<h2>Loading ... </h2>`;
  try {
    const id = window.location.search;
    // const id = "?id=1";
    // const {
    //   data: { fields },
    // } = await axios.get(`/api/3_product${id}`);
    const {
      data: { fields },
    } = await axios.get(`/api/3_z_complete${id}`);

    const { name, price, desc, image } = fields;
    const url = image[0].url;

    result.innerHTML = `
        <h1 class="title">${name}</h1>
        <article class="product">
        <img class="product-img"
        src="${url}"
        alt="${name}"
        />
        <div class="product-info">
            <h5 class="title">${name}</h5>
            <h5 class="price">$${price}</h5>
            <p class="desc">${desc}</p>
        </div>
        </article>
    `;
  } catch (error) {
    result.innerHTML = `<h4>${error.response.data}</h4>`;
  }
};

fetchProduct();
