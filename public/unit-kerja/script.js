/**
 * Javascript Unit Kerja
 * ini client (dalam ruang lingkup socket.io)
 */


/** mengambil id tombol button-send */
const buttonSend = document.querySelector("#button-send")

/** mengambil value dari html */
const idBidang   = document.querySelector("#id-bidang")
const pesan      = document.querySelector("#pesan")
const data       = {
    messages: '',
    idBidang: 1
}

/** coba connect ke server socket.io */
const socket = io("http://localhost:6969/notif-rendalev");

/** jika sukses koneksi websocket client dengan server */
socket.on('connect', () => {
   socket.emit('join_room_bidang', data)
})

/** fungsi untuk mengakomodir mengirim data ke socket server */
const triggerButton = (e) => {
    e.preventDefault()
    data.messages = pesan.value;
    data.idBidang = idBidang.value;

    /** mengirimkan ke event listerner_uuk */
    socket.emit("listener_uuk", data);
}

/** jika terjadi terputus koneksi websocket client dengan server */
socket.on("disconnect", () => {
    alert(`Koneksi pada server websocket terputus : ${socket.connected}`)
})

/** 
 *  mengimplementasi fungsi diatas ke tombol yang dipilih dengan
 *  event listener click
 */
buttonSend.addEventListener("click", triggerButton)