
// g vars
let app = new App()
	app.start()


// ****************
// Modal
let addModal = new Modal(document.querySelector('#fullModal'),{ keyboard: true })
let regModal = new Modal(document.querySelector('#regModal'))
// ***************
// listeners
document.querySelector('#btn-add').addEventListener('click', () => { addBook() })
document.querySelector('#btn-delete').addEventListener('click', () => { app.UserBook.del() })
document.querySelector('#btn-open').addEventListener('click', () => { addModal.toggle() })
document.querySelector('#btn-regModal').addEventListener('click', () => { regModal.toggle(); app.register() })
document.querySelector('#btn-exit').addEventListener('click', () => { app.exit() })



function addBook () {

	let d = document
	let fname = d.querySelector('#first-name').value
	let lname = d.querySelector('#last-name').value
	let email = d.querySelector('#email').value
	let number = d.querySelector('#number').value
	let book = new BookItem(fname,lname,email,number)
	
	app.UserBook.append(book)
	addModal.toggle()

}




