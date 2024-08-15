/**
 * Javascript Bidang
 * ini client (dalam ruang lingkup socket.io)
 */

/** mengeget variable global pada browser */
const queryString = window.location.search;

/** variabel diatas diget queryparams */
const urlPramas   = new URLSearchParams(queryString);

/** mendapatkan query params bidang_id */
const bidangID    = urlPramas.get('bidang_id')

/** selector id html */
const idBidang    = document.querySelector("#id-bidang")
const pesan       = document.querySelector("#pesan")
const bodyDiv     = document.querySelector("#body-div")


if (!bidangID) {
    alert('query params bidang_id tidak ditemukan')
} else {
    bodyDiv.classList.replace('d-none', 'd-block')
}

/** coba connect ke server socket.io */
const socket = io("http://localhost:6969/notif-rendalev");

/** jika sukses koneksi websocket client dengan server */
socket.on('connect', () => {
    socket.emit('join_room_bidang', data)
})
 
/** 
 * reciver atau penerima dari server socket.io 
 * event bernama send_to_bidang
 * */
socket.on("send_to_bidang", data => {
    
    if (data.idBidang == bidangID) {
        console.log(data);
        pesan.innerHTML = `Pesan : ${data.messages}`;
        idBidang.innerHTML = `ID Bidang : ${data.idBidang}`;
    }

})

/** jika terjadi terputus koneksi websocket client dengan server */
socket.on("disconnect", () => {
    alert(`Status Koneksi ke server: ${socket.connected}`)
})