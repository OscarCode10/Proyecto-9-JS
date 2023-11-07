let events = []
let arr = []

const nameEvent = document.getElementById("nameEvent")
const dateEvent = document.getElementById("dateEvent")
const btnAdd = document.getElementById("add")
const listEvents = document.getElementById("listEvents")

let load = () => {
    return localStorage.getItem("list")
}

let showEvents = () => {
    const eventsHtml = events.map((even) => {
        return  `
        <div class="even">
            <div class="days">
                <span class="daysMissing">${differentDate(even.dateEvent)}</span>
                <span class="text">días para</span>
            </div>
            <div class="nameEvent">${even.nameEvent}</div>
            <div class="dateEvent">${even.dateEvent}</div>
            <div class="actions">
                <button data-id="${even.id}" class="delete">Eliminar</button>
            </div>
        </div>
        `
    })
    listEvents.innerHTML = eventsHtml.join("")
    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", e => {
            const id = button.getAttribute("data-id")
            events = events.filter(even => even.id !== id)
            save(JSON.stringify(events))
            showEvents()
        })
    })
}

let addEvent = () => {
    if (nameEvent.value === "" || dateEvent.value === "") {
        return
    }

    if (differentDate(dateEvent.value) < 0) {
        return
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        nameEvent: nameEvent.value,
        dateEvent: dateEvent.value
    }

    events.unshift(newEvent)
    save(JSON.stringify(events))
    nameEvent.value = ""
    dateEvent.value = ""
    showEvents()
}

let differentDate = (date) => {
    let dateUser = new Date(date)
    let dateNow = new Date()
    let diferent = dateUser.getTime() - dateNow.getTime()
    return Math.ceil(diferent / (1000 * 3600 * 24))
}

let save = (data) => {
    localStorage.setItem("list", data)
}

const json = load()

try {
    arr = JSON.parse(json)
} catch (error) {
    arr = []
}
events = arr ? [...arr] : []

showEvents()

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    addEvent()
})