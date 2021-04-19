import "../css/style.css";
import "./plugins";
import locations from "./store/locations";

import favorites from "./store/favorites";

import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";

document.addEventListener("DOMContentLoaded", (e) => {
  const form = formUI.form;
  const mainContainer = document.querySelector(".tickets-sections");
  const dropdownContainer = document.querySelector(".dropdown-content");

  // Events
  initApp();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-favorite")) {
      const element = e.target;
      onAddToFavorite(element);
    }
  });

  dropdownContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-favorite")) {
      const element = e.target;
      console.log("qq");
      onDeleteFavorite(element);
    }
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    console.log(locations.lastSearch);
    ticketsUI.renderTickets(locations.lastSearch);
  }

  async function onAddToFavorite(element) {
    const numberOfTicket = element.dataset.number;
    const favoriteTicket = locations.lastSearch[numberOfTicket];

    await favorites.addFavoriteTicket(favoriteTicket);

    const favoriteTicketss = favorites.favoriteTickets;
    
    favorites.renderFavoriteTickets(favoriteTicketss);
  }

  async function onDeleteFavorite(element) {
    const numberOfFavoriteTicket = element.dataset.number;
    
    await favorites.removeFavoriteTicket(numberOfFavoriteTicket);
    const favoriteTicketss = favorites.favoriteTickets;
    favorites.renderFavoriteTickets(favoriteTicketss);
    console.log(favoriteTicketss);
  }
});
