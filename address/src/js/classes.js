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
			if (localStorage.getItem('Data') == null) { app.init() } else { return this.page(1) }
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
			

			const u = document.querySelector('#lUserLogin').value
			const p = document.querySelector('#lUserPass').value
			const obj = JSON.parse(localStorage.getItem('Data'))

			document.querySelector('#loginForm').reset()
			let f = 0

			for (var i = 0; i < obj.users.length; i++) {
  				if (obj.users[i].Username == u) {
    				
    				if (obj.users[i].Password == p) {

    					const list = JSON.parse(localStorage.getItem('Data'));
    					localStorage.setItem('user',JSON.stringify({uid:i,obj:list.users[i].Books}))
    					f = 1

    					return this.load()
    				}
  				} 
			}

			if (f == 0) {
				alert('логин или пароль введены неверно проверьте вводимые данные')
				return false
			} else {
				return false
			}
						

			
	}

	register() {

			const u = document.querySelector('#UserLogin').value
			const p = document.querySelector('#UserPass').value
			const obj = {Username: u,Password: p,Books: []}

			const data = JSON.parse(localStorage.getItem('Data'))
			data.users.push(obj)
			localStorage.setItem('Data',JSON.stringify(data))
			localStorage.setItem('user',JSON.stringify({uid:data.users.length-1,obj:[]}))

			document.querySelector('#regForm').reset()
			regModal.hide()

			return this.load()
		

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
		this.click = ''
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

		document.querySelector('#btn-edit').addEventListener('click', () => { 

			const i = this.checkedList[0]

			infoModal.hide()		
		
			document.querySelector('#i1').value = this.items[i].fname
			document.querySelector('#i2').value = this.items[i].lname
			document.querySelector('#i3').value = this.items[i].number
			document.querySelector('#i4').value = this.items[i].email
			document.querySelector('#i5').value = this.items[i].place
			document.querySelector('#i6').value = this.items[i].place2

			editModal.show()

		})

	}
	edit () {

			editModal.hide()
			const i = this.checkedList[0]
			const d = document
			const fname = d.querySelector('#i1').value
			const lname = d.querySelector('#i2').value
			const number = d.querySelector('#i3').value
			const email = d.querySelector('#i4').value
			const place = d.querySelector('#i5').value
			const place2 = d.querySelector('#i6').value

			this.items[i] = new BookItem(fname,lname,email,number,place,place2)
			this.save()
			this.load()
	}
	matchesEdit(event) {
		const uid = event.target.getAttribute('bid')
		matchesModal.hide()

		document.querySelector('#i1').value = this.items[uid].fname
		document.querySelector('#i2').value = this.items[uid].lname
		document.querySelector('#i3').value = this.items[uid].number
		document.querySelector('#i4').value = this.items[uid].email
		document.querySelector('#i5').value = this.items[uid].place
		document.querySelector('#i6').value = this.items[uid].place2
		this.checkedList[0] = uid

		editModal.show()

	}
	showMatches(arr) {
		const table = document.querySelector('#ui2')
			table.innerHTML = ''

			for (var i = 0; i < arr.length; i++) {
				const tr = document.createElement('tr')
				tr.innerHTML = `<tr>
				<th scope="row"><div onclick="app.UserBook.matchesEdit(event)" class="btn btn-primary" bid="${arr[i].uid}">edit</div></th>
				<td>${arr[i].item.fname}</td>
				<td>${arr[i].item.lname}</td>
				<td>${arr[i].item.email}</td>
				<td>${arr[i].item.number}</td>
				</tr>`;
				table.append(tr)
			}


	}
	filter (method) {
		const items = this.items
		const arr = []

		let load = () => {
			const table = document.querySelector('tbody')
			table.innerHTML = ''

			for (var i = 0; i < arr.length; i++) {
				const tr = document.createElement('tr')
				tr.innerHTML = `<tr>
				<th scope="row"><input type="checkbox" class="form-check-input" bid="${arr[i].uid}"></th>
				<td>${arr[i].item.fname}</td>
				<td>${arr[i].item.lname}</td>
				<td>${arr[i].item.email}</td>
				<td>${arr[i].item.number}</td>
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

			let f = () => {
				if (this.click == 'f') { 
					this.items = items.reverse()
					this.save()
					this.load()
					return}
				this.click = 'f'
				items.sort(function(a, b){
					let nameA=a.fname.toLowerCase(), nameB=b.fname.toLowerCase()
					if (nameA < nameB) 
						return -1 
					if (nameA > nameB)
						return 1
					return 0 
				})

				this.items = items
				this.save()
				this.load()
			}

			let l = () => {

				if (this.click == 'l') { 
					this.items = items.reverse()
					this.save()
					this.load()
					return}

				this.click = 'l'
				items.sort(function(a, b){
					let nameA=a.lname.toLowerCase(), nameB=b.lname.toLowerCase()
					if (nameA < nameB) 
						return -1 
					if (nameA > nameB)
						return 1
					return 0 
				})

				this.items = items
				this.save()
				this.load()
			}

			let e = () => {
				if (this.click == 'e') { 
					this.items = items.reverse()
					this.save()
					this.load()
					return}

				this.click = 'e'
	
				items.sort(function(a, b){
					let nameA=a.email.toLowerCase(), nameB=b.email.toLowerCase()
					if (nameA < nameB) 
						return -1 
					if (nameA > nameB)
						return 1
					return 0 
				})

				this.items = items
				this.save()
				this.load()

			}

			let n = () => {
				if (this.click == 'n') { 
					this.items = items.reverse()
					this.save()
					this.load()
					return}
				this.click = 'n'
				
				items.sort(function(a, b){
					let nameA=a.number.toLowerCase(), nameB=b.number.toLowerCase()
					if (nameA < nameB) 
						return -1 
					if (nameA > nameB)
						return 1
					return 0 
				})

				this.items = items
				this.save()
				this.load()

			}

			let i = () => {

				let search = document.querySelector('#search').value
				if (search == '') {
					search = ' '
				}

				let f = 0

				for (var i = 0; i < items.length; i++) {
					let str = items[i].fname + ' ' +  items[i].lname

					if (!(str.match(eval('{' + ('/' + search + '/gi') + '}')) == null)) {
						let obj = {uid:i,item:items[i]}
						arr.push(obj)
						f +=  1
						load()
					}
				}

				if (f === 0) { alert('Ничего не найдено') }


			}
		let searchName = () => {
			
			let search = document.querySelector('#search').value
			if (search == '') {
				search = ' '
			}
			let f = 0
			for (var i = 0; i < items.length; i++) {
				let str = items[i].place
				
				if (!(str.match(eval('{' + ('/' + search + '/gi') + '}')) == null)) {
					
					let obj = {uid:i,item:items[i]}
					f +=  1
					arr.push(obj)
					load()
				}
			}

			if (f === 0) { alert('Ничего не найдено') }
		}

	let searchData = () => {

		let search = document.querySelector('#search').value.replace('+','')

		if (search == '') {
			search = ' '
		}
		let f = 0
		for (var i = 0; i < items.length; i++) {
			let str = items[i].number + ' ' + items[i].email

			if (!(str.match(eval('{' + ('/' + search + '/gi') + '}')) == null)) {
				
				let obj = {uid:i,item:items[i]}
				f +=  1
				arr.push(obj)
				load()
			}
		}

		if (f === 0) { alert('Ничего не найдено') }

	}

	let searchWork = () => {

		let search = document.querySelector('#search').value

		if (search == '') {
			search = ' '
		}
		let f = 0
		for (var i = 0; i < items.length; i++) {
			let str = items[i].place2 + ' '

			if (!(str.match(eval('{' + ('/' + search + '/gi') + '}')) == null)) {
				
				let obj = {uid:i,item:items[i]}
				f +=  1
				arr.push(obj)
				load()
			}
		}

		if (f === 0) { alert('Ничего не найдено') }

	}

switch (method) {

	case 'f': f(); break
	case 'l': l(); break
	case 'i': i(); break
	case 'sN': searchName(); break
	case 'sE': searchData(); break
	case 'e': e(); break
	case 'n': n(); break
	case 'w': searchWork(); break

}

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
