export function getAccessTokenFromCookie() {
	const cookies = document.cookie.split(';');

	const accessTokenCookie = cookies.find((cookie) =>
		cookie.trim().startsWith('access_token=')
	);

	if (accessTokenCookie) {
		const accessToken = accessTokenCookie.split('=')[1];
		return accessToken;
	} else {
		return null;
	}
}

export function setAccessToken(accessToken) {
	const expires = new Date();
	expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
	document.cookie =
		'access_token=' +
		accessToken +
		';expires=' +
		expires.toUTCString() +
		';path=/';
}

export function setUsernameInCookie(username) {
	document.cookie = 'username=' + username + ';path=/';
}

export function getUsernameFromCookie() {
	const cookies = document.cookie.split(';');
	const usernameCookie = cookies.find((cookie) =>
		cookie.trim().startsWith('username=')
	);
	if (usernameCookie) {
		const username = usernameCookie.split('=')[1];
		return username;
	} else {
		return null;
	}
}

export function isLoggedIn() {
	const accessToken = getAccessTokenFromCookie();
	if (accessToken) {
		return true;
	} else {
		return false;
	}
}

export function clearOnLogout() {
	document.cookie.split(";").forEach(function(c) { 
		document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
	});
	return true;
}
