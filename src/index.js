/// Fetch ///
const ticketBtn = document.querySelector('.ui orange button')
const url = "http://localhost:3000/films"

// const fetchAll = () => {
//     fetch('http://localhost:3000/films')
//     .then(res => res.json())
//     .then(data => data.map(film => buildFilm(film)))
//     }
//     fetchAll()

const fetchOne = (id) => {
    fetch(`http://localhost:3000/films/1`)
    .then(res => res.json())
    .then(film => buildSelectedFilm(film))
    }
    fetchOne()

/// Builders ///

const buildSelectedFilm = (film) => {
    let filmImage = document.getElementById('poster')
    let title = document.getElementById('title')
    let runtime = document.getElementById('runtime')
    let description = document.getElementById('film-info')
    let showtime = document.getElementById('showtime')
    let tickets = document.getElementById('ticket-num')
    let btn = document.querySelector('.ui orange button')

    filmImage.src = film.poster
    title.textContent = film.title
    runtime.textContent = film.runtime + " minutes"
    description.textContent = film.description
    showtime.textContent = film.showtime
    tickets.textContent = film.capacity
    btn.addEventListener('click', (e)=> updateTickets(film))
}
// GRADING COMMENT - spent too much time trying to figure out why the button wasn't working only to realize that a button needs to be added (the class ui orange button is not a button)

// =- to tickets available upon "Buy Ticket" button click
// when film.capacity - tickets sold = 0, toggle button to "Sold Out"

/// Functions ///

const updateTickets = (film) => {
    let data = {tickets: film.capacity-= 1}
    fetch(`http://localhost:3000/films/1`,{
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(json => {
      let tickets = document.getElementById('ticket-num')
      tickets.textContent = `${json.capacity}`
    })
  }