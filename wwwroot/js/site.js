// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const arr = []

function submitlocal() {
  const table = document.getElementsByTagName('table')[0];
  const imelocal = document.getElementById('imelocal').value;
  const starostlocal = document.getElementById('starostlocal').value;
  if (!imelocal == "" && !starostlocal == 0) {
    arr.push({ ime: imelocal, starost: starostlocal });
    console.log(arr);
    const trElement = document.createElement('tr');
    const ime = document.createElement('td');
    const starost = document.createElement('td');
    ime.innerHTML = imelocal;
    starost.innerHTML = starostlocal;
    trElement.appendChild(ime);
    trElement.appendChild(starost);
    table.appendChild(trElement);
    document.getElementById('imelocal').value = "";
    document.getElementById('starostlocal').value = "";
  }
}

server.addEventListener('click', (response) => {
  postList(arr);

})

function resetTable() {
  document.getElementsByTagName('table')[0].innerHTML =
    "<table><tr><th>Ime</th><th>Starost</th></tr></table>";
}

function displayTable(response) {
  $.each(response, function (index, os) {
    $('tbody').append('<tr><td> ' + os.ime + '</td>' +
      '<td>' + os.starost + '</td></tr>');
  });

}



function postList(arr) {
  $.ajax({
    type: "POST",
    url: 'Home/addPersons',
    data: JSON.stringify(arr),
    contentType: "application/json",
    dataType: "json",
    success: (response) => {
      console.log(response);
      if (arr.length != 0) {
        resetTable();
      }
      displayTable(response)
    }
  });
}