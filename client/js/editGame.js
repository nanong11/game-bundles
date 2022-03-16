const profile = `https://tranquil-caverns-53550.herokuapp.com/api/users/profile`
let params = new URLSearchParams(document.location.search)
const gameId = params.get(`gameId`)

const token =localStorage.getItem(`token`)

const gameName = document.querySelector(`#gameName`)
const description = document.querySelector(`#description`)
const price = document.querySelector(`#price`)
const stock = document.querySelector(`#stock`)

fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/${gameId}`, {
    method: "POST",
    headers: {
        "Authorization": token
    }
})
.then(result => result.json())
.then(result => {
    gameName.value = result.gameName
    description.value = result.description
    price.value = result.price
    stock.value = result.stock
})

const editGameForm = document.querySelector(`.editGameForm`)

editGameForm.addEventListener(`submit`, (e) => {
    e.preventDefault()
    if(token){
        fetch(profile, {
            method: "GET",
            headers: {"Authorization": token}

        })
        .then(result => result.json())
        .then(result => {
            if(result.isAdmin){

                const gameName = document.querySelector(`#gameName`).value
                const description = document.querySelector(`#description`).value
                const price = document.querySelector(`#price`).value
                const stock = document.querySelector(`#stock`).value
                
                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/${gameId}/update`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        gameName, description, price, stock
                    })
                })
                .then(result => result.json())
                .then(result => {
                    if(result){
                        alert(`${result.gameName} successfully edited.`)
                        window.location.replace(`./admin-view-games.html`)
                    }else{
                        return window.location.href = `../../error.html`
                    }
                })
            }else{
                return window.location.href = `../../error.html`
            }
        })
    }else{
        return window.location.href = `../../error.html`
    }
    
})