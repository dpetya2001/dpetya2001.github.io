
class AddressBook {
	constructor() {
		this.user =  {}
		this.items = []
		this.checkedList = []
		this.list = []
	}

	g() {
		return {userInfo: this.user, userBooks: this.items}
	}

	append(data) {
		this.items.push(data)
		this.save()
		this.load()
	}

	del() {
		this.checkedList.sort()
		for (var i = this.checkedList.length - 1; i > -1 ; i--) {
			console.log(i)
			this.items.splice(this.checkedList[i],1)
		}
	
		this.checkedList = []
		this.list = []
		
		this.save()
		this.load()
	}

	load() {
		let table = document.querySelector('tbody')
		table.innerHTML = ''

		for (var i = 0; i < this.items.length; i++) {
			let tr = document.createElement('tr')
			tr.innerHTML = `<tr>
      							<th scope="row"><input type="checkbox" class="form-check-input" bid="${i}"></th>
      							<td>${this.items[i].fname}</td>
      							<td>${this.items[i].lname}</td>
      							<td>${this.items[i].email}</td>
      							<td>${this.items[i].number}</td>
    						</tr>`;
			table.append(tr)
		}	

		this.multiSel()
	}

	init() {
		let list;

		if (localStorage.getItem('Data') !== null) { 
			list = JSON.parse(localStorage.getItem('Data'))
			this.items = list.userBooks //return list
		} else {
			alert('Регистрация')
			var obj = {
				userInfo: {
					login: "Admin",
					pass: "123123"
					},
				userBooks: []
				}
			let listToSave = JSON.stringify(obj)
			localStorage.setItem('Data', listToSave)
			list = JSON.parse(localStorage.getItem('Data'));
	
			this.items =  list.userBooks;
			this.user = list.userInfo
		}
	}

	save() {
		localStorage.setItem('Data', JSON.stringify(this.g()))
	}

	multiSel() {
		let box = document.querySelectorAll('.form-check-input')
		let result;
	
		for (var i = 0; i < box.length; i++) {
		    result = box[i];
		  
		    if (this.list.indexOf(parseInt(result.getAttribute('bid'),10)) < 0) {
		    	this.list.push(parseInt(result.getAttribute('bid'),10))
	
		    	result.addEventListener('change', (e) => {
		    	console.log(11111111111)
		    	console.log('list',this.list)
		    	console.log('check',this.checkedList)
		    	let bid = parseInt(e.target.getAttribute('bid'))
		    	if (e.target.checked) {
		    		if (this.checkedList.indexOf(bid) < 0) {
		    		this.checkedList.push(bid)}
		    	} else {
		    		this.checkedList.splice(this.checkedList.indexOf(bid),1)
		    	}
		    	let del = document.querySelector('#btn-delete')
		    	let upd = document.querySelector('#btn-upd')
	    	if (this.checkedList.length == 1) {
	    		if (!del.classList.contains('open')){del.classList.toggle('open')}
	    		upd.classList.toggle('open')
	    	} else if(this.checkedList.length > 1) {   
	    			if (upd.classList.contains('open')){upd.classList.toggle('open')}	
	    	} else if (this.checkedList.length == 0) {
	    		if (upd.classList.contains('open')){upd.classList.toggle('open')}
	    		if (del.classList.contains('open')){del.classList.toggle('open')}
	    	}


			})
	    }
	    
	}

}


}
class BookItem {

  		constructor(fname,lname,email,number) {
    		this.fname = fname
    		this.lname = lname
    		this.email = email
    		this.number = number
  		}

  		edit(fname,lname,email,number) {
			this.fname = fname
    		this.lname = lname
    		this.email = email
    		this.number = number
		}
}

function openAddI(event) {
	let addI = document.querySelector('#addI')

	addI.classList.toggle('open')
}