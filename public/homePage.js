"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => setTimeout(() => {
	if (response.success) location.reload();
}, 2000));
// ApiConnector.current(response => setTimeout(() => {
// 	if (response.success) ProfileWidget.showProfile(response.data);
// }, 2000));
ApiConnector.current(response => {
	if (response.success) ProfileWidget.showProfile(response.data);
});
const ratesBoard = new RatesBoard();
function getCurrencyRates() {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	})
}
setInterval(getCurrencyRates(), 60000);
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
	// console.log(response.error);

	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage(response.success, "Баланс успешно пополнен");
	} else {
		moneyManager.setMessage(response.success, response.error);
	};
});  