const title = document.querySelector(".title h2");
const result = document.querySelector(".result");

const fetchData = async () => {
  title.textContent = "Loading ...";
  "".toUpperCase().substring();
  try {
    const { data } = await axios.get("/api/4_survey");
    const response = data
      .map((item) => {
        const { id, vote, room } = item;
        return `<li>
                    <div class="key">${room
                      .toUpperCase()
                      .substring(0, 2)}</div> 
                    <div>
                      <h4>${room}</h4>
                      <p class="vote-${id}" data-votes=${vote}>${vote}</p>
                    </div>
                    <button data-id="${id}">
                      <i class="fas fa-vote-yea"></i>
                    </button>
                </li>`;
      })
      .join("");
    result.innerHTML = response;
    title.textContent = "Survey";
  } catch (error) {
    result.innerHTML = `<h4>There was an error</h4>`;
  }
};

window.addEventListener("load", () => {
  fetchData();
});

result.addEventListener("click", async (e) => {
  if (e.target.classList.contains("fa-vote-yea")) {
    const btn = e.target.parentElement;
    const id = btn.dataset["id"];
    const voteElement = result.querySelector(`.vote-${id}`);
    const votes = voteElement.dataset["votes"];
    const newVote = await updateVotes(id, votes);
    title.textContent = "Survey";

    if (newVote) {
      voteElement.textContent = `${newVote} votes`;
      voteElement.dataset["votes"] = newVote;
    }
  }
});

async function updateVotes(id, votes) {
  title.textContent = "Loading ...";
  try {
    const { data } = await axios.put(`/api/4_survey`, { id, votes });
    const newVotes = data.fields.vote;
    return newVotes;
  } catch (error) {
    console.log(error.response);
    return null;
  }
}
