interface Dog {
    _id: String;
    name: String;
    breed: String;
    gender: String;
    birthday: Date
}

async function listDogs () :Promise<void>{
    const response: Response = await fetch("/list", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok == true) {
        const data: Dog[] = await response.json();
        const dogs: HTMLElement | null = document.getElementById("doglist");
        dogs!.innerHTML = "";
        data.forEach((dog: Dog) => {
            let b:Date = new Date(dog.birthday);
            dogs!.innerHTML += `
                    <li class="card" id="${dog._id}">
                      <div class="card__id" style="display: none;">${dog._id}</div>
                      <img src="/img/dog_icon.png" style="width: 12vmin">
                      <h2 style="margin: 0">${dog.name}</h2>
                      <p>Breed: ${dog.breed}</p>
                      <p>Gender: ${dog.gender}</p>
                      <p>Birthday: ${b.toLocaleDateString()}</p>
                      <button type="button" onclick="editDog(this)">EDIT</button>
                      <button type="button" onclick="deleteDog(this)">DELETE</button>
                    </li>`
        });
    }
}

listDogs()

async function getDog(id:string):Promise<Dog>{
    const response: Response = await fetch(`/list/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if(response.ok == true){
        const dog: Dog = await response.json();
        return dog;
    }
    else return {_id:"",name: "",breed: "",gender: "",birthday: new Date()}
}

async function editDog(el:HTMLElement):Promise<void>{
    const id:string = el.parentElement!.querySelector(".card__id")!.innerHTML;
    const card: HTMLElement | null = document.getElementById(id);
    const dog: Dog = await getDog(id);
    if(dog._id!=""){
        let d:Date = new Date(dog.birthday);
        d = new Date(d.getTime() - (d.getTimezoneOffset()*60*1000));
        let b: string = d.toISOString().split('T')[0];
        card!.innerHTML = `
      <div class="card__id" style="display: none;">${id}</div>
      <img src="/img/dog_icon.png" style="width: 12vmin">
      <br/>
      <form name="editForm${id}" id="editForm${id}">
      <label for="name-input">Name: </label>
      <input type="text" id="name-input"  name="name" value="${dog.name}" size="12">
      <label for="breed-input"><br/>Breed: </label>
      <input type="text" id="breed-input" name="breed" value="${dog.breed}" size="12">
      <label for="gender-input"><br/>Gender: </label>
      <select id="gender-input" name="gender" style="width:120px">
        <option value="Female">Female</option>
        <option id="male${id}" value="Male">Male</option>
      </select>
      <label for="brth-input"><br/>Birthday: </label>
      <input type="date" id="brth-input" name="birthday" value="${b}">
      <br/>
      <button type="button" onclick="cancel(this)">CANCEL</button>
      <button type="submit">SUBMIT</button></form>`
        if(dog.gender==="Male") document.getElementById(`male${id}`)!.setAttribute('selected', 'selected')
        document.getElementById(`editForm${id}`)!.addEventListener("submit",async (e:SubmitEvent):Promise<void> => {
            e.preventDefault();
            const form: HTMLFormElement = e.currentTarget as HTMLFormElement;
            const n: HTMLInputElement = form.elements[0] as HTMLInputElement;
            const b: HTMLInputElement = form.elements[1] as HTMLInputElement;
            const g: HTMLSelectElement = form.elements[2] as HTMLSelectElement;
            const d: HTMLInputElement = form.elements[3] as HTMLInputElement;
            const response: Response = await fetch("/update", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    _id: id,
                    name: n.value,
                    breed: b.value,
                    gender: g.value,
                    birthday: d.value
                })
            });
            if (response.ok == true) {
                const data: Dog = await response.json();
                let bd: Date = new Date(data.birthday);
                card!.innerHTML = `
                      <div class="card__id" style="display: none;">${id}</div>
                      <img src="/img/dog_icon.png" style="width: 12vmin">
                      <h2 style="margin: 0">${data.name}</h2>
                      <p>Breed: ${data.breed}</p>
                      <p>Gender: ${data.gender}</p>
                      <p>Birthday: ${bd.toLocaleDateString()}</p>
                      <button onclick="editDog(this)">EDIT</button>
                      <button onclick="deleteDog(this)">DELETE</button>`
            }
        });
    }
}

function addDog():void {
    const list: HTMLElement | null = document.getElementById("doglist");
    const id:Number = Math.random();
    list!.innerHTML+=`
      <li class="card" id="${id}">
      <img src="/img/dog_icon.png" style="width: 12vmin">
      <br/>
      <form name="addForm${id}" id="addForm${id}">
      <label for="name-input">Name: </label>
      <input type="text" id="name-input"  name="name" size="12">
      <label for="breed-input"><br/>Breed: </label>
      <input type="text" id="breed-input" name="breed" size="12">
      <label for="gender-input"><br/>Gender: </label>
      <select id="gender-input" name="gender" style="width:120px">
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
      <label for="brth-input"><br/>Birthday: </label>
      <input type="date" id="brth-input" name="birthday">
      <br/>
      <button type="button" onclick="cancelAdd(${id})">CANCEL</button>
      <button type="submit">SUBMIT</button></form></li>`
      document.getElementById(`addForm${id}`)!.addEventListener("submit",async (e:SubmitEvent):Promise<void> => {
        e.preventDefault();
          const form: HTMLFormElement = e.currentTarget as HTMLFormElement;
          const n: HTMLInputElement = form.elements[0] as HTMLInputElement;
          const b: HTMLInputElement = form.elements[1] as HTMLInputElement;
          const g: HTMLSelectElement = form.elements[2] as HTMLSelectElement;
          const d: HTMLInputElement = form.elements[3] as HTMLInputElement;
        const response: Response = await fetch("/insert", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                name: n.value,
                breed: b.value,
                gender: g.value,
                birthday: d.value
            })
        });
        if (response.ok == true) {
            await cancelAdd(id);
            const data:Dog = await response.json();
            let bd: Date = new Date(data.birthday);
            list!.innerHTML += `
                    <li class="card" id="${data._id}">
                      <div class="card__id" style="display: none;">${data._id}</div>
                      <img src="/img/dog_icon.png" style="width: 12vmin">
                      <h2 style="margin: 0">${data.name}</h2>
                      <p>Breed: ${data.breed}</p>
                      <p>Gender: ${data.gender}</p>
                      <p>Birthday: ${bd.toLocaleDateString()}</p>
                      <button onclick="editDog(this)">EDIT</button>
                      <button onclick="deleteDog(this)">DELETE</button>
                    </li>`
        }
    });
}

async function deleteDog(el:HTMLElement):Promise<void> {
    const id:string = el.parentElement!.querySelector(".card__id")!.innerHTML
    const response: Response = await fetch("/delete", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            _id: id
        })
    });
    if (response.ok == true) {
        document.getElementById(`${id}`)!.remove();
    }
}

async function cancel(el:HTMLElement):Promise<void>{
    const id:string = el.parentElement!.parentElement!.querySelector(".card__id")!.innerHTML;
    const card: HTMLElement | null = document.getElementById(id);
    const dog: Dog = await getDog(id);
    if(dog._id!=""){
        let b: Date = new Date(dog.birthday);
        card!.innerHTML = `
                      <div class="card__id" style="display: none;">${id}</div>
                      <img src="/img/dog_icon.png" style="width: 12vmin">
                      <h2 style="margin: 0">${dog.name}</h2>
                      <p>Breed: ${dog.breed}</p>
                      <p>Gender: ${dog.gender}</p>
                      <p>Birthday: ${b.toLocaleDateString()}</p>
                      <button onclick="editDog(this)">EDIT</button>
                      <button onclick="deleteDog(this)">DELETE</button>`
    }
}

async function cancelAdd(id:Number):Promise<void>{
    document.getElementById(`${id}`)!.remove();
}