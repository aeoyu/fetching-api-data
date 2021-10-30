window.onload = function () {
	const inputElem = document.querySelector(".input");
	const buttonElem = document.querySelector(".button");
	let inputValue = "";

	inputElem.addEventListener("input", function () {
		inputValue = inputElem.value;
	});

	buttonElem.onclick = makeAPIRequest;

	function makeAPIRequest() {
		fetch(
			`https://openlibrary.org/api/books?bibkeys=ISBN:${inputValue}&jscmd=details&format=json`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const bookData = data[`ISBN:${inputValue}`];
				console.log(data);
				const titleElem = document.querySelector(".title");
				const coverElem = document.querySelector(".cover");
				const publishElem = document.querySelector(".date");
				const linkElem = document.querySelector(".link");
				const revisionElem = document.querySelector(".revision");

				titleElem.innerHTML = bookData.details.title;
				coverElem.setAttribute("src", bookData.thumbnail_url);
				publishElem.innerHTML = bookData.details.publish_date;
				linkElem.setAttribute("href", bookData.info_url);
				revisionElem.innerHTML = bookData.details.revision;
			})
			.catch((err) => {
				console.log("ERROR: ", err);
			});
	}
};
