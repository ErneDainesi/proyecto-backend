document.addEventListener("DOMContentLoaded", () => {
	const socket = io();
	const chatTemplate = document.querySelector("#chat-template");
	const renderChat = document.querySelector("#render-chat");
	const submitMessageBtn = document.querySelector("#send-chat");

    const getDate = currentDate => {
        return date = {
            day: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
        };
    }

    const getTime = currentDate => {
        return time = {
            hours:currentDate.getHours(),
            minutes: currentDate.getMinutes(),
            seconds: currentDate.getSeconds()
        };
    }

    const buildDate = _ => {
		const currentDate = new Date();
		const date = getDate(currentDate);
		const time = getTime(currentDate);
        return `${date.day}/${date.month}/${date.year} ${time.hours}:${time.minutes}:${time.seconds}`;
    };

	const agregarMensaje = _ => {
		const email = document.querySelector("#chat-email").value;
		const body = document.querySelector("#chat-message").value;
        const date = buildDate();
        const message = {email, date, body};
		socket.emit("new-message", message);
	};

	socket.on("show-new-message", data => {
		const template = ejs.compile(chatTemplate.innerHTML);
		renderChat.innerHTML = template({messages: data});
	});

	socket.on("new-chat-user", data => {
		const template = ejs.compile(chatTemplate.innerHTML);
		renderChat.innerHTML = template({messages: data});
	})

	submitMessageBtn.addEventListener("click", e => {
		e.preventDefault();
		agregarMensaje();
	});
});
