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
doc.querySelector('#btn-delete').addEventListener('click', () => { app.UserBook.del() })
doc.querySelector('#btn-open').addEventListener('click', () => { addModal.toggle() })
doc.querySelector('#btn-regModal').addEventListener('click', () => { regModal.show(); app.register() })
doc.querySelector('#btn-exit').addEventListener('click', () => { app.exit() })
doc.querySelector('#btn-info').addEventListener('click', () => { infoModal.toggle(); app.UserBook.fullView() })
doc.querySelector('#byF').addEventListener('click', () => { app.UserBook.filter('f') })
doc.querySelector('#byL').addEventListener('click', () => { app.UserBook.filter('l') })
doc.querySelector('#btn-search').addEventListener('click', () => { 
	
	const sel = document.querySelector('#iSelect')
	const val = sel.options[sel.selectedIndex].value
	console.log(val,' v ')
	if (val == 0) { app.UserBook.filter('i') } else { app.UserBook.filter('s')}

})

// **********
// autocomplete

function complete () {
	const input = document.querySelector('#i5')
	const autocomplete = new google.maps.places.Autocomplete(input,{ types: ['(cities)'] })
}

