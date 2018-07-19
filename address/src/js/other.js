const doc = document

// ****************
// Modal
const addModal = new Modal(doc.querySelector('#fullModal'),{ keyboard: true })
const regModal = new Modal(doc.querySelector('#regModal'))
const infoModal = new Modal(doc.querySelector('#infoModal'))
const editModal = new Modal(doc.querySelector('#editModal'))
const matchesModal = new Modal(doc.querySelector('#matchesModal'))
// ***************
// listeners
// doc.querySelector('#btn-add').addEventListener('click', () => { addBook() })
doc.querySelector('#btn-delete').addEventListener('click', () => { if(confirm("Удалить?")) {app.UserBook.del() }})
doc.querySelector('#btn-open').addEventListener('click', () => { addModal.show() })
doc.querySelector('#btn-regModal').addEventListener('click', () => { regModal.show() })
doc.querySelector('#SignIn').addEventListener('click', () => { app.login() })
doc.querySelector('#SignUp').addEventListener('click', () =>{ app.register() })
doc.querySelector('#btn-exit').addEventListener('click', () => { app.exit() })
doc.querySelector('#btn-info').addEventListener('click', () => { infoModal.toggle(); app.UserBook.fullView() })

// filters
doc.querySelector('#byF').addEventListener('click', () => { app.UserBook.filter('f') })
doc.querySelector('#byL').addEventListener('click', () => { app.UserBook.filter('l') })
doc.querySelector('#byE').addEventListener('click', () => { app.UserBook.filter('e') })
doc.querySelector('#byN').addEventListener('click', () => { app.UserBook.filter('n') })
doc.querySelector('#btn-search').addEventListener('click', () => { 
	
	const sel = document.querySelector('#iSelect')
	const val = sel.options[sel.selectedIndex].value
	if (val == 0) { app.UserBook.filter('i') } 
		else if (val == 1) { app.UserBook.filter('sN')} 
		else if (val == 2)	{ app.UserBook.filter('sE') }
		else { app.UserBook.filter('w') }

})

document.querySelector('#btn-allow').addEventListener('click', () => { matchesModal.hide();  addBook() })

// **********
// autocomplete

function complete () {
	const input = document.querySelector('#i5')
	const autocomplete = new google.maps.places.Autocomplete(input,{ types: ['(cities)'] })
}

