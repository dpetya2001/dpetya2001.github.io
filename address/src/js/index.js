// Start app
const app = new App()
app.start()



function addBook () {

	
	const d = document
	const fname = d.querySelector('#first-name').value
	const lname = d.querySelector('#last-name').value
	const email = d.querySelector('#email').value
	const number = d.querySelector('#number').value
	const place = d.querySelector('#place').value
	const place2 = d.querySelector('#place2').value
	const book = new BookItem(fname,lname,email,number,place,place2)


	document.querySelector('#addForm').reset()
	app.UserBook.append(book)

}


// ***************
// validate

const form1 = document.getElementsByClassName('needs-validation');
    
    let validation = Array.prototype.filter.call(form1, function(form) {
      document.querySelector('#btn-add').addEventListener('click', function(event) {
      	
      	if (form.checkValidity() === true) {
      		const arr = []
      		const number = document.querySelector('#number').value
      		const email = document.querySelector('#email').value

      		

      		if (app.UserBook.items.length == 0) { addBook(); return false }
      		for (var i = 0; i < app.UserBook.items.length; i++) {
      			if (app.UserBook.items[i].number == number||app.UserBook.items[i].email == email){
      				arr.push({uid:i,item: app.UserBook.items[i]})
      			}

      		}
      			if (arr.length > 0) {
      				addModal.hide()
      				matchesModal.show()
      				app.UserBook.showMatches(arr)
      			} else {

      				addModal.hide()
      				addBook()
      				
      			}
      	}

      		form.classList.add('was-validated');
      	}, false);
  });

const form2 = document.getElementsByClassName('needs-validation2');
    
    let validation2 = Array.prototype.filter.call(form2, function(form) {
      document.querySelector('#btn-save').addEventListener('click', function(event) {
        if (form.checkValidity() === true) {
          	app.UserBook.edit()
        }
        form.classList.add('was-validated');
      }, false);
    });
