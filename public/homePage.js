"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => setTimeout(() => {
	if (response.success) location.reload();
}, 2000));
ApiConnector.current(response => setTimeout(() => {
	if (response.success) ProfileWidget.showProfile(response.data);
}, 2000));

const ratesBoard = new RatesBoard();
function getCurrencyRates() {
	ApiConnector.getStocks(response => setTimeout(() => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	}, 2000));
}
setInterval(getCurrencyRates(), 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => setTimeout(() => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage(response.success, "Баланс успешно пополнен");
	} else {
		moneyManager.setMessage(response.success, response.error);
	};
}, 2000));
moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response => setTimeout(() => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage(response.success, "Конвертация выполнена успешно");
	} else {
		moneyManager.setMessage(response.success, response.error);
	}
}, 2000));
moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => setTimeout(() => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage(response.success, "Перевод денег выполнен успешно");
	} else {
		moneyManager.setMessage(response.success, response.error);
	}
}, 2000));

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => setTimeout(() => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
}, 2000));
favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => setTimeout(() => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
		favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен в список избранных");
	} else {
		favoritesWidget.setMessage(response.success, response.error);
	}
}, 2000));
favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => setTimeout(() => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
		favoritesWidget.setMessage(response.success, "Пользователь успешно удален из списка избранных");
	} else {
		favoritesWidget.setMessage(response.success, response.error);
	}
}, 2000));
