class BookItem {

  		constructor(fname,lname,email,number,place,place2) {
    		this.fname = fname
    		this.lname = lname
    		this.email = email
    		this.number = number
    		this.place = place
    		this.place2 = place2
  		}
  		
}

class App {
	constructor() {
		this.UserBook = null
	}

	page(data) {
		const sp = document.querySelector('#startPage')
		const lp = document.querySelector('#LoginedSide')

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
		const obj = JSON.parse(localStorage.getItem('user'))

		this.page(2)
		this.UserBook = new AddressBook(obj)
		this.UserBook.load()
		this.UserBook.multiSel()

	}


	init() {
			const obj = JSON.stringify({users: [{ Username: "root",Password: "",Books: []}]})
			localStorage.setItem('Data', obj)
			localStorage.setItem('user', JSON.stringify({uid: 0, obj: []}))

			return this.load() 
	}

	login() {
		this.page(1)
		document.querySelector('#SignIn').addEventListener('click', () => { 
			

			const u = document.querySelector('#lUserLogin').value
			const p = document.querySelector('#lUserPass').value
			const obj = JSON.parse(localStorage.getItem('Data'))
			let f = 0

			for (var i = 0; i < obj.users.length; i++) {
  				if (obj.users[i].Username == u) {
    				
    				if (obj.users[i].Password == p) {

    					const list = JSON.parse(localStorage.getItem('Data'));
    					localStorage.setItem('user',JSON.stringify({uid:i,obj:list.users[i].Books}))
    					
    					return this.load()

    				} else { 
    					alert('Неправильный пароль!') 
    					f = 1
    					break
    				}
  				} 
			}

			if (f == 1) {
				return false
			} else {
				alert('Taкого паользователя нет, можете зарегистрироваться')
				return false
			}
						


		})				
	}

	register() {
		document.querySelector('#SignUp').addEventListener('click', () =>{
			const u = document.querySelector('#UserLogin').value
			const p = document.querySelector('#UserPass').value
			const obj = {Username: u,Password: p,Books: []}

			const data = JSON.parse(localStorage.getItem('Data'))
			data.users.push(obj)
			localStorage.setItem('Data',JSON.stringify(data))
			localStorage.setItem('user',JSON.stringify({uid:data.users.length-1,obj:[]}))

			regModal.toggle()
			return this.load()

		})
		

	}

	exit () {
		const obj = JSON.parse(localStorage.getItem('Data'))
		const userObj = JSON.parse(localStorage.getItem('user'))
		
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
		this.save()
		this.load()
	}


	del() {
		this.checkedList.sort()
		for (var i = this.checkedList.length - 1; i > -1 ; i--) {
			console.log(i)
			this.items.splice(this.checkedList[i],1)
		}
		
		this.save()
		this.load()
	}
	load() {
		const table = document.querySelector('tbody')
		table.innerHTML = ''
		
		for (var i = 0; i < this.items.length; i++) {
			const tr = document.createElement('tr')
			tr.innerHTML = `<tr>
      							<th scope="row"><input type="checkbox" class="form-check-input" bid="${i}"></th>
      							<td>${this.items[i].fname}</td>
      							<td>${this.items[i].lname}</td>
      							<td>${this.items[i].email}</td>
      							<td>${this.items[i].number}</td>
    						</tr>`;
			table.append(tr)


		}
		const del = document.querySelector('#btn-delete')
		const upd = document.querySelector('#btn-info')
		if (upd.classList.contains('open')){upd.classList.remove('open')}
	    if (del.classList.contains('open')){del.classList.remove('open')}


		this.list = []
		this.checkedList = []
		this.multiSel()	
	}

	save() {
		localStorage.setItem('user', JSON.stringify({uid:this.uid,obj: this.items}))
	}

	fullView () {
		const i = this.checkedList[0]

		document.querySelector('.values').innerHTML = 
					`
					<span>${this.items[i].fname}</span>
					<span>${this.items[i].lname}</span>
					<span>${this.items[i].email}</span>
					<span>${this.items[i].number}</span>
					<span>${this.items[i].place}</span>
					<span>${this.items[i].place2}</span> 
					<div class="btn btn-primary" id="btn-edit">Edit</div>`

		document.querySelector('#btn-edit').addEventListener('click', () => { this.edit() })

	}
	edit () {
		const i = this.checkedList[0]


		document.querySelector('.values').innerHTML = 
					`
					<input id="i1" type="text" value="${this.items[i].fname}">
					<input id="i2" type="text" value="${this.items[i].lname}">
					<input id="i3" type="text" value="${this.items[i].email}">
					<input id="i4" type="text" value="${this.items[i].number}">
					<input id="i5" type="text" value="${this.items[i].place}">
					<input id="i6" type="text" value="${this.items[i].place2}">
					<div class="btn btn-primary" id="btn-save">Save</div> `

		document.querySelector('#btn-save').addEventListener('click', () => { 
			infoModal.toggle() 
			const d = document
			const fname = d.querySelector('#i1').value
			const lname = d.querySelector('#i2').value
			const email = d.querySelector('#i3').value
			const number = d.querySelector('#i4').value
			const place = d.querySelector('#i5').value
			const place2 = d.querySelector('#i6').value

			this.items[i] = new BookItem(fname,lname,email,number,place,place2)
			this.save()
			this.load()


		})





	}
	multiSel() {
		const box = document.querySelectorAll('.form-check-input')
		let result;
	
		for (var i = 0; i < box.length; i++) {
		    result = box[i];
		  
		    if (this.list.indexOf(parseInt(result.getAttribute('bid'),10)) < 0) {
		    	this.list.push(parseInt(result.getAttribute('bid'),10))
	
		    	result.addEventListener('change', (e) => {
		    	const bid = parseInt(e.target.getAttribute('bid'))

		    		// check
		    		if (e.target.checked) {
		    			if (this.checkedList.indexOf(bid) < 0) { this.checkedList.push(bid) }
		    		} else {
		    			this.checkedList.splice(this.checkedList.indexOf(bid),1)
		    		}

		    		// show/hide buttons
		    		const del = document.querySelector('#btn-delete')
		    		const upd = document.querySelector('#btn-info')

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
