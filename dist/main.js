const source = $("#wonders-template").html();
const template = Handlebars.compile(source);

const render = function (wonders) {
  $("#wonders").empty();
  let newHtml = template({ wonders });
  $("#wonders").append(newHtml);
};

const fetchData = function () {
  $.get("/wonders", function (response) {
    render(response);
  });
};

const addWonder = async function () {
  let newWonder = $("#new-wonder-input").val();
  let newLocation = $("#new-location-input").val();
  await fetch("/wonder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wonder: newWonder,
      location: newLocation,
      visited: false,
    }),
  });
  console.log("POST complete");
  fetchData();
};

$("#wonders").on("click", ".visit", function () {
  let wonder = $(this).closest(".wonder").find(".name").text();
  //PUT this to the server: update the wonder's `visited` status to `true`
});

fetchData(); //load the data on page load
