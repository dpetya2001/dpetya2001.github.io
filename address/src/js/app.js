
// g vars

let UserBook = new AddressBook()
UserBook.init()
UserBook.load()
UserBook.multiSel()


// ***************
// listeners

document.querySelector('#btn-add').addEventListener('click', () => { addBook() })
document.querySelector('#btn-delete').addEventListener('click', () => { UserBook.del() })
document.querySelector('#btn-open').addEventListener('click', () => { openAddI() })

function addBook () {

	let d = document
	let fname = d.querySelector('#first-name').value
	let lname = d.querySelector('#last-name').value
	let email = d.querySelector('#email').value
	let number = d.querySelector('#number').value
	let book = new BookItem(fname,lname,email,number)
	
	UserBook.append(book)
	
	openAddI()

}




