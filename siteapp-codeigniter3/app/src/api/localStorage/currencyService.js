
export const getCurrencyList = () => {
    return JSON.parse(localStorage.getItem('fincCur_CurrencyList'));
}

export const setCurrencyList = (currencyList) => {
    return localStorage.setItem('fincCur_CurrencyList', JSON.stringify(currencyList));
}