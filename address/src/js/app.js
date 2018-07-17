function openAddI(event) {
	let addI = document.querySelector('#addI')

	addI.classList.toggle('open')
}

// g vars
let checkedList = []
let list = []
let arr = openApp()
loadApp(arr[0].userBooks)
multiSel()

// multiselect
function multiSel() {
	let box = document.querySelectorAll('.form-check-input')
	let result;

	for (var i = 0; i < box.length; i++) {
	    result = box[i];
	  
	    if (list.indexOf(parseInt(result.getAttribute('bid'),10)) < 0) {
	    	list.push(parseInt(result.getAttribute('bid'),10))
	    	console.log(111111111111)
	    	result.addEventListener('change', (e) => {
	    	let bid = parseInt(e.target.getAttribute('bid'))
	    	if (e.target.checked) {
	    		if (checkedList.indexOf(bid) < 0) {
	    		checkedList.push(bid)}
	    	} else {
	    		checkedList.splice(checkedList.indexOf(bid),1)
	    	}
	    	let del = document.querySelector('#btn-delete')
	    	let upd = document.querySelector('#btn-upd')
	    	if (checkedList.length == 1) {
	    		if (!del.classList.contains('open')){del.classList.toggle('open')}
	    		upd.classList.toggle('open')
	    	} else if(checkedList.length > 1) {   
	    			if (upd.classList.contains('open')){upd.classList.toggle('open')}	
	    	} else if (checkedList.length == 0) {
	    		if (upd.classList.contains('open')){upd.classList.toggle('open')}
	    		if (del.classList.contains('open')){del.classList.toggle('open')}
	    	}

	    	console.log(checkedList)
			})
	    }
	    
	}

}

class book {

  		constructor(fname,lname,email,number) {
  			this.bid = arr[0].userBooks.length
    		this.fname = fname
    		this.lname = lname
    		this.email = email
    		this.number = number
  		}

  		get dataa() {
  			return { 
  				bid: this.bid,
  				first_name: this.fname, 
  				last_name: this.lname, 
  				email: this.email, 
  				number: this.number }
  		}
  		set data(newdata) {
  			this.fname = newdata[0];
    		this.lname = newdata[1]
    		this.email = newdata[2];
    		this.number = newdata[3];
  		}

}

function addBook () {

	let d = document
	let fname = d.querySelector('#first-name').value
	let lname = d.querySelector('#last-name').value
	let email = d.querySelector('#email').value
	let number = d.querySelector('#number').value
	let new_book = new book(fname,lname,email,number)
	let data = new_book.dataa
	arr[0].userBooks.push(data)
	let table = d.querySelector('tbody')
	let tr = d.createElement('tr')
	tr.innerHTML = `<tr>
      					<th scope="row"><input type="checkbox" class="form-check-input" bid="${new_book.bid}"></th>
      					<td>${new_book.fname}</td>
      					<td>${new_book.lname}</td>
      					<td>${new_book.email}</td>
      					<td>${new_book.number}</td>
    				</tr>`
	table.append(tr)
	saveApp(arr)
	multiSel()
	openAddI()


}

function delBook() {
	for (var i = 0; i < checkedList.length; i++) {
		arr[0].userBooks.splice(checkedList[i],1)
		
	}
	checkedList = []
	list = []
	saveApp(arr)
	loadApp(arr[0].userBooks)
}


function saveApp(arr) {
	localStorage.setItem('Data', JSON.stringify(arr))
}

function openApp () {
	let list;

	if (localStorage.getItem('Data') !== null) { 
		
		list = JSON.parse(localStorage.getItem('Data'))

		 //load app
		return list; //return list

	} else {
		alert('Регистрация')
		var obj = [{
			userInfo: {
				login: "Admin",
				pass: "123123"
			},
			userBooks: []
		}]
		let listToSave = JSON.stringify(obj)
		localStorage.setItem('Data', listToSave)
		list = JSON.parse(localStorage.getItem('Data'));

		 //load app
		return list; //return list
	}
}

function loadApp(arr) {
	let len = arr.length
	let table = document.querySelector('tbody')
	table.innerHTML = ''

	for (var i = 0; i < len; i++) {
		let tr = document.createElement('tr')
		tr.innerHTML = `<tr>
      <th scope="row"><input type="checkbox" class="form-check-input" bid="${i}"></th>
      <td>${arr[i].first_name}</td>
      <td>${arr[i].last_name}</td>
      <td>${arr[i].email}</td>
      <td>${arr[i].number}</td>
    </tr>`;
		table.append(tr)
	}

	multiSel()
}
