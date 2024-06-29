//Виртуальная апи
const API_URL = "http://localhost:4000/api/items";
//POST запрос
document
  .getElementById("dataForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;

    if (name && position) {
      const newItem = { name, position };
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });

        if (response.ok) {
          await fetchData();
          document.getElementById("dataForm").reset();
        }
      } catch (error) {
        console.log("Error");
      }
    }
  });

//GET запрос (по дефолту используется GET)
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.log("Error");
  }
}

//Вывод текста
function renderData(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  data.forEach((item, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
             <div class="card-body">
                <h5 class="card-title">Имя: ${item.name}</h5>
                <p class="card-text">Должность: ${item.position}</p>
                <button class="btn btn-success mr-2" onclick='markItem("${
                  item._id
                }")' ${item.completed ? "disabled" : ""}>Отметить</button>
                <button class="btn btn-danger" onclick='deleteItemClient("${
                  item._id
                }")'>Удалить</button> </div>
        `;
    resultDiv.appendChild(cardDiv);
  });
}

async function deleteItemClient(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Ошибка удаления элемента");
    }
    window.location.reload();
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

async function markItem(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    });

    if (response.ok) {
      await fetchData();
    } else {
      alert("Ошибка в изменении");
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
fetchData();
