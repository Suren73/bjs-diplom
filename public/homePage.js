"use strict";
let res;
const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => setTimeout(() => location.reload()), 2000);
