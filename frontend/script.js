window.onload = ()=>{
  document.getElementById('loader').innerHTML = `<i class="material-icons m-4">file_download</i>`
}

function download() {
  const URLinput = document.querySelector(".searchInput");
  if (URLinput.value) {
    closeAlert();
    console.log(URLinput.value);
    sendURL(URLinput.value);
  }
}

function sendURL(URL) {
  document.getElementById('loader').innerHTML = `<div class='loader' />`; 
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const url = `http://localhost:3000/download/youtube?URL=${URL}`;
  let result = {};
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      result = { ...res };
    })
    .catch((error) => {
      result = { ...error };
    })
    .finally(() => {
      // if (result.data){
      //   var file = escape(result.data.file).replace('%3A',':');
      //   while (file.includes('%5C')){
      //       file = file.replace('%5C','/');
      //   }
      // }
      document.getElementById('loader').innerHTML = '<i class="material-icons m-4">file_download</i>';
      html = `
		<div class='alert  ${result.status === 201 ? "blue" : result.status === 200 ? "green" : "red"}'>
        <span class="closebtn" onclick="closeAlert()">&times;</span>
        ${result.message}.
        <i class="material-icons closebtn ${result.status === 400 ? 'd-none':null}" onclick="window.open('file:///${result.data.file}') ">folder</i>
    </div>`;

      document.getElementById("alert").innerHTML = html;
    });
}

function closeAlert() {
  document.getElementById("alert").innerHTML = "";
}

                    