// Start app
const app = new App()
app.start()



// ****************
// Modal
const addModal = new Modal(document.querySelector('#fullModal'),{ keyboard: true })
const regModal = new Modal(document.querySelector('#regModal'))
const infoModal = new Modal(document.querySelector('#infoModal'))
// ***************
// listeners
document.querySelector('#btn-add').addEventListener('click', () => { addBook() })
document.querySelector('#btn-delete').addEventListener('click', () => { app.UserBook.del() })
document.querySelector('#btn-open').addEventListener('click', () => { addModal.toggle() })
document.querySelector('#btn-regModal').addEventListener('click', () => { regModal.toggle(); app.register() })
document.querySelector('#btn-exit').addEventListener('click', () => { app.exit() })
document.querySelector('#btn-info').addEventListener('click', () => { infoModal.toggle(); app.UserBook.fullView() })




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


// **********
// autocomplete
function complete () { 
	const input = document.querySelector('#livePlace')
	const autocomplete = new google.maps.places.Autocomplete(input,{ types: ['(cities)'] });
}


