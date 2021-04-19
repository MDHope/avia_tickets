class Favorites {
  constructor() {
    this.container = document.querySelector(".dropdown-content");
    this.favoriteTickets = [];
  }

  async addFavoriteTicket(ticket) {
    this.favoriteTickets.push(ticket);
    console.log(this.favoriteTickets);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  renderFavoriteTickets(tickets) {
    this.clearContainer()
    let fragment = "";
    tickets.forEach((ticket, i) => {
      const numberInArray = i;
      const template = Favorites.favoriteTicketTemplate(ticket, numberInArray);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  async removeFavoriteTicket(number) {
    this.favoriteTickets.splice(number, 1);
    // console.log(sliced);
    console.log(this.favoriteTickets);
  }

  static favoriteTicketTemplate(ticket, number) {
    return `
    <div class="favorite-item  d-flex align-items-start">
    <img
      src="${ticket.airline_logo}"
      class="favorite-item-airline-img"
    />
    <div class="favorite-item-info d-flex flex-column">
      <div
        class="favorite-item-destination d-flex align-items-center"
      >
        <div class="d-flex align-items-center mr-auto">
          <span class="favorite-item-city">${ticket.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favorite-item-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price ml-auto">$${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
      </div>
      <a
        class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" data-number="${number}"
        >Delete</a
      >
    </div>
  </div>
    `;
  }
}

const favorites = new Favorites();

export default favorites;
