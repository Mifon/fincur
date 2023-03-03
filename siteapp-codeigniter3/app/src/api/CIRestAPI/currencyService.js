
const urlBase = "/currency/";
const opt = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
	mode: 'no-cors'
}

export const getCurrencyList = async () => {
	let list = [];
	await fetch(urlBase + 'currencylist/', opt)
		.then(res => res.json())
		.then(
			(result) => {
				list = result;
			},
			(error) => {
				console.log('### error - ', error);
			}
		)
		.catch(err => {
			console.log('# error - catch - ', err);
		});
	return list;
}

export const setCurrencyList = (currencyList) => {
	return localStorage.setItem('fincCur_CurrencyList', JSON.stringify(currencyList));
}


export const httpGetCurrency = async(id) => {
	let item = [];
	await fetch(urlBase + 'get/?id=' + id, opt)
		.then(res => res.json())
		.then(
			(result) => {
				item = result;
			},
			(error) => {
				console.log('### error - ', error);
			}
		)
		.catch(err => {
			console.log('# error - catch - ', err);
		});
	return item;
}

export const httpCreateCurrency = async(item) => {
	let res;
	await fetch(urlBase + 'create/', Object.assign(opt, {
		method:'POST',
		cache: 'no-cache',
		credentials: 'same-origin',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(item)
	}))
	.then(res => res.json())
	.then(
		(result) => {
			res = result;
		},
		(error) => {
			console.log('### error - ', error);
		}
	)
	.catch(err => {
		console.log('# error - catch - ', err);
	});
	return res;
}
