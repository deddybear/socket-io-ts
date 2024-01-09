/**
 * Javascript Bidang
 */

const queryString = window.location.search;
const urlPramas   = new URLSearchParams(queryString);
const bidangID    = urlPramas.get('bidang_id')
const idBidang    = document.querySelector("#id-bidang")
const pesan       = document.querySelector("#pesan")
const bodyDiv     = document.querySelector("#body-div")


if (!bidangID) {
    alert('query params bidang_id tidak ditemukan')
} else {
    bodyDiv.classList.replace('d-none', 'd-block')
}


const socket = io("http://localhost:9001/notif");


socket.on("send_to_bidang", data => {
    
    if (data.idBidang == bidangID) {
        console.log(data);
        pesan.innerHTML = `Pesan : ${data.messages}`;
        idBidang.innerHTML = `ID Bidang : ${data.idBidang}`;
    }

})