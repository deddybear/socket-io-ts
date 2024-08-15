/**
 * Javascript Unit Kerja
 * ini client (dalam ruang lingkup socket.io)
 */


/** mengambil id tombol button-send */
const buttonSend = document.querySelector("#button-send")

const statusServer = document.querySelector("#stateServer")

/** mengambil value dari html */
const toBidangID = document.querySelector("#id-bidang")
const pesan      = document.querySelector("#pesan")
const fromInstalasi = document.querySelector("#id-unit")
const data       = {
    messages: '',
    idBidang: '',
    fromInstalasi: ''
}

/** coba connect ke server socket.io */
const socket = io("http://localhost:6969/notif-rendalev");

/** jika sukses koneksi websocket client dengan server */
socket.on('connect', () => {
   statusServer.innerHTML = 'Connected'
})

/** fungsi untuk check room yg terkoneksi */
/** tidak perlu */
// socket.on('connectToRoom', (data) => {
//    statusRoom.innerHTML = data
// });

/** fungsi untuk mengakomodir mengirim data ke socket server */
const triggerButton = (e) => {
    e.preventDefault()
    data.messages = pesan.value;
    data.idBidang = toBidangID.value;
    data.fromInstalasi = fromInstalasi.value;

    /** mengirimkan ke event listerner_uuk */
    socket.emit("listener_uuk", data);
}

/** jika terjadi terputus koneksi websocket client dengan server */
socket.on("disconnect", () => {
    statusServer.innerHTML = 'Disconnect'
})

/** 
 *  mengimplementasi fungsi diatas ke tombol yang dipilih dengan
 *  event listener click
 */
buttonSend.addEventListener("click", triggerButton)