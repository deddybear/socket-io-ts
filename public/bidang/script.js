/**
 * Javascript Bidang
 * ini client (dalam ruang lingkup socket.io)
 */

/** mengeget variable global pada browser */
const queryString = window.location.search;

/** mendapatkan bidang_id dari inputan alert */
const bidangID    = prompt('Masukan id bidang anda');

// /** variabel diatas diget queryparams */
// const urlPramas   = new URLSearchParams(queryString);

const statusServer = document.querySelector("#stateServer")
const statusRoom   = document.querySelector("#stateRoom")

const data       = {
    messages: '',
    idBidang: bidangID
}

/** selector id html */
const idBidang    = document.querySelector("#id-bidang")
const pesan       = document.querySelector("#pesan")
const bodyDiv     = document.querySelector("#body-div")
const unitKerja   = document.querySelector("#unit")


if (!bidangID) {
    alert('query params bidang_id tidak ditemukan')
} else {
    bodyDiv.classList.replace('d-none', 'd-block')
}

/** coba connect ke server socket.io */
const socket = io("http://localhost:6969/notif-rendalev");

/** jika sukses koneksi websocket client dengan server */
socket.on('connect', () => {
    statusServer.innerHTML = 'Connected'
    socket.emit('join_room_bidang', data)
})
 
/** 
 *  reciver atau penerima dari server socket.io
 *  event bernama connectToRoom
 *  berfungsi untuk listening event connectToRoom dari server socket.io 
 * */
socket.on('connectToRoom', (data) => {
    console.log(data);
    statusRoom.innerHTML = data
});

/** 
 * reciver atau penerima dari server socket.io 
 * event bernama send_to_bidang
 * */
socket.on("send_to_bidang", data => {
    console.log(data);
    if (data.idBidang == bidangID) {

        pesan.innerHTML = `Pesan : ${data.messages}`;
        idBidang.innerHTML = `ID Bidang : ${data.idBidang}`;
        unitKerja.innerHTML = `Dari Unit Kerja : ${data.fromInstalasi}`;
    }

})

/** jika terjadi terputus koneksi websocket client dengan server */
socket.on("disconnect", () => {
    statusServer.innerHTML = 'Disconnect'
})