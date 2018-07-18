// Start app
const app = new App()
app.start()


function addBook () {

	const d = document
	const fname = d.querySelector('#first-name').value
	const lname = d.querySelector('#last-name').value
	const email = d.querySelector('#email').value
	const number = d.querySelector('#number').value
	const place = d.querySelector('#livePlace').value
	const place2 = d.querySelector('#workPlace').value
	const book = new BookItem(fname,lname,email,number,place,place2)
	
	app.UserBook.append(book)
	addModal.toggle()

}
