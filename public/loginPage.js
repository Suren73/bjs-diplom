"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = data => {
	ApiConnector.login(data, response => {
		setTimeout(() => {
			(response.success) ? location.reload() : userForm.setLoginErrorMessage(response.error);
		}, 1500);
	});
};

userForm.registerFormCallback = data => {
	ApiConnector.register(data, response => {
		setTimeout(() => {
			(response.success) ? location.reload() : userForm.setRegisterErrorMessage(response.error);
		}, 1500);
	});
};