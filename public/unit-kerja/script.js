const buttonSend = document.querySelector("#button-send")
const idBidang   = document.querySelector("#id-bidang")
const pesan      = document.querySelector("#pesan")
const data       = {
    messages: '',
    idBidang: ''
}
const socket = io("http://localhost:9001/notif");


const triggerButton = (e) => {
    e.preventDefault()
    data.messages = pesan.value;
    data.idBidang = idBidang.value;
    socket.emit("listener_uuk", data);
}

buttonSend.addEventListener("click", triggerButton)