const idBidang   = document.querySelector("#id-bidang")
const pesan      = document.querySelector("#pesan")

const socket = io("http://localhost:9001/notif");


socket.on("send_to_bidang", data => {
    console.log(data);
    pesan.innerHTML(data.messages)
    idBidang.innerHTML(data.idBidang)
})