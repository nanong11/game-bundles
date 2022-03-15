//API REQUESTS
const checkEmailRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users/check-email`
const signUpRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users/signup`

//FORM Element
const signUpForm = document.querySelector(`#signUpForm`)

//Sign up form onSubmit function
signUpForm.addEventListener(`submit`, (e) => {
    e.preventDefault()
    const firstName = document.querySelector(`#firstName`).value
    const lastName = document.querySelector(`#lastName`).value
    const email = document.querySelector(`#email`).value
    const password = document.querySelector(`#password`).value
    const confirmPassword = document.querySelector(`#confirmPassword`).value

    if(password === confirmPassword){
        fetch(checkEmailRequest, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName, lastName, email, password})
        })
        .then(result => result.json())
        .then(result => {
            if(result){
                alert(`Email is already in use.`)
            }else if(result === false){
                fetch(signUpRequest, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({firstName, lastName, email, password})
                })
                .then(result => result.json())
                .then(result => {
                    if(result){
                        alert(`Sign Up successful.`)
                        return window.location.href = "../pages/login.html"
                    }else{
                        alert(`Cannot create an account. Please try again.`)
                        return false
                    }
                })
            }
        })
    }
})