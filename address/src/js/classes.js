class App {
	constructor() {
		this.UserBook = null
	}

	page(data) {
		let sp = document.querySelector('#startPage')
		let lp = document.querySelector('#LoginedSide')

		if (data == 0) {
			if (sp.classList.contains('open')){sp.classList.remove('open')}
			if (lp.classList.contains('open')){lp.classList.remove('open')}
		} else if ( data == 1 ) {
			if (!sp.classList.contains('open')){sp.classList.add('open')}
			if (lp.classList.contains('open')){lp.classList.remove('open')}
		} else {
			if (sp.classList.contains('open')){sp.classList.remove('open')}
			if (!lp.classList.contains('open')){lp.classList.add('open')}
		}		
	}

	start() {
		this.page(0)

		if (localStorage.getItem('user') == null) {
			if (localStorage.getItem('Data') == null) { app.init() } else { return app.login() }
		} else { return app.load() }
	}

	load () {
		let obj = JSON.parse(localStorage.getItem('user'))

		this.page(2)
		this.UserBook = new AddressBook(obj)
		this.UserBook.load()
		this.UserBook.multiSel()

	}


	init() {
			let obj = JSON.stringify({users: [{ Username: "root",Password: "",Books: []}]})
			localStorage.setItem('Data', obj)
			localStorage.setItem('user', JSON.stringify({uid: 0, obj: []}))

			return this.load() 
	}

	login() {
		this.page(1)
		document.querySelector('#SignIn').addEventListener('click', () => { 
			

			let u = document.querySelector('#lUserLogin').value
			let p = document.querySelector('#lUserPass').value
			let obj = JSON.parse(localStorage.getItem('Data'))
			
			for (var i = 0; i < obj.users.length; i++) {
  				if (obj.users[i].Username == u) {
    				
    				if (obj.users[i].Password == p) {

    					let list = JSON.parse(localStorage.getItem('Data'));
    					localStorage.setItem('user',JSON.stringify({uid:i,obj:list.users[i].Books}))
    					
    					return this.load()

    				} else { 
    					alert('Неправильный пароль!') 
    					return false
    				}
  				} 
			}

			alert('Taкого паользователя нет, можете зарегистрироваться')
			return false			


		})				
	}

	register() {
		document.querySelector('#SignUp').addEventListener('click', () =>{
			let u = document.querySelector('#UserLogin').value
			let p = document.querySelector('#UserPass').value
			let obj = {Username: u,Password: p,Books: []}

			let data = JSON.parse(localStorage.getItem('Data'))
			data.users.push(obj)
			localStorage.setItem('Data',JSON.stringify(data))
			localStorage.setItem('user',JSON.stringify({uid:data.users.length-1,obj:[]}))

			regModal.toggle()
			return this.load()

		})
		

	}

	exit () {
		let obj = JSON.parse(localStorage.getItem('Data'))
		let userObj = JSON.parse(localStorage.getItem('user'))
		
		obj.users[userObj.uid].Books = userObj.obj

		localStorage.setItem('Data',JSON.stringify(obj))
		localStorage.removeItem('user')

		document.querySelector('#LoginedSide').classList.toggle('open')

		return this.start()
	}
}


class AddressBook {
	constructor(book) {
		this.items = book.obj
		this.uid = book.uid
		this.checkedList = []
		this.list = []
	}

	append(data) {
		this.items.push(data)
		let del = document.querySelector('#btn-delete')
		let upd = document.querySelector('#btn-upd')
		if (upd.classList.contains('open')){upd.classList.toggle('open')}
	    if (del.classList.contains('open')){del.classList.toggle('open')}
	    this.checkedList = []
		this.list = []
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
		this.list = []
		this.multiSel()	
	}

	save() {
		localStorage.setItem('user', JSON.stringify({uid:this.uid,obj: this.items}))
	}

	multiSel() {
		let box = document.querySelectorAll('.form-check-input')
		let result;
	
		for (var i = 0; i < box.length; i++) {
		    result = box[i];
		  
		    if (this.list.indexOf(parseInt(result.getAttribute('bid'),10)) < 0) {
		    	this.list.push(parseInt(result.getAttribute('bid'),10))
	
		    	result.addEventListener('change', (e) => {
		    	let bid = parseInt(e.target.getAttribute('bid'))

		    		// check
		    		if (e.target.checked) {
		    			if (this.checkedList.indexOf(bid) < 0) { this.checkedList.push(bid) }
		    		} else {
		    			this.checkedList.splice(this.checkedList.indexOf(bid),1)
		    		}

		    		// show/hide buttons
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