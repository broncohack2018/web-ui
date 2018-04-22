function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function openModal() {
	var d = document.getElementById("modal-ter");
	d.classList.add("is-active");
}

function closeModal() {
	var d = document.getElementById("modal-ter");
	d.classList.remove("is-active");
}