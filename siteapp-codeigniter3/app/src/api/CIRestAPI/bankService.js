
export const getBanksList = () => {
    return JSON.parse(localStorage.getItem('fincCur_BanksList'));
}

export const setBanksList = (banksList) => {
    return localStorage.setItem('fincCur_BanksList', JSON.stringify(banksList));
}