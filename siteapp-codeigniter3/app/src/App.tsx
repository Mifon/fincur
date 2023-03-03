import { Component } from 'react';
import './App.css';

import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { isThisTypeNode } from 'typescript';

import { getBanksList, setBanksList } from './api/localStorage/bankService';
import { getCurrencyList, setCurrencyList } from './api/localStorage/currencyService';


import CurrenciesList from './components/CurrenciesList';

export interface IBank {
    title: string,
    currencyFrom: string,
    currencyTo: string,
    valueSale: string,
    valueBuy: string
}
export interface IFinConvert {
    Bank: IBank,
    valueFrom: string,
	currencyFrom: string,
    // valueRes: string
	currencyTo: string,
	valueTo: string
}
export interface IFinConvertGroup {
	title: string;
	valueFrom: string;
	currencyFrom: string;
	valueTo: string;
	currencyTo: string;
    FinConvertsList: IFinConvert[]
}
export interface ICurrency {
	title: string
}

export interface IAppState {
    isLoading: boolean,
    banksList: IBank[],
    finConvertGroupList: IFinConvertGroup[],
	currencyList: string[],
	isShowFormAddBank: boolean,
	formAddBank: IBank,
	isHideFormAddFinConvert: boolean,
	formAddFinConvert: IFinConvert,
	formEditGroupIndex: number | null,
}

class App extends Component<any, IAppState> {
	private _defaultBank = {
		title: '',
		currencyFrom: '',
		currencyTo: '',
		valueSale: '',
		valueBuy: ''
	}
	private _defaultFinConvert = {
		Bank: this._defaultBank,
		valueFrom: '',
		currencyFrom: '',
		valueTo: '',
		currencyTo: ''
	}

    constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
            banksList: [],
            finConvertGroupList: [],
			currencyList: [],
			isShowFormAddBank: true,
			formAddBank: this._defaultBank,
			isHideFormAddFinConvert: true,
			formAddFinConvert: this._defaultFinConvert,
			formEditGroupIndex: null
		}
	}

	public componentDidMount = async () => {
		let banksList = getBanksList();
		let currencyList = await getCurrencyList();
		console.log('!INIT -componentDidMount -- ', banksList);
        console.log('!INIT -componentDidMount -- currencyList --', currencyList);
		if (banksList === null) banksList = [];
		this.setState({
			banksList: banksList,
			currencyList: currencyList
		})
	}

	public onOpenAddBank = () => {
		this.setState({
			isShowFormAddBank: false
		});
    }
	public onCloseAddBank = () => {
		this.setState({
			isShowFormAddBank: true
		});
	}
	public changeBankInput = (ev: any) => {
		this.setState({
			formAddBank: {
				...this.state.formAddBank,
				[ev.target.id]: ev.target.value
			}
		});
	}
	public onSaveAddBank = () => {
		let form = Object.assign({}, this.state.formAddBank);
		let banksList = this.state.banksList;
		let currencyList = this.state.currencyList;

		banksList.push(form);
		if (currencyList.indexOf(form.currencyFrom) === -1) {
			currencyList.push(form.currencyFrom);
		}
		if (currencyList.indexOf(form.currencyTo) === -1) {
			currencyList.push(form.currencyTo);
		}
		this.setState({
			banksList: banksList,
			formAddBank: this._defaultBank,
			currencyList: currencyList
		});
		setBanksList(banksList);
		setCurrencyList(currencyList);
		this.onCloseAddBank();
	}

	public renderFormAddBank = () => {
		return (<Dialog
			hidden={this.state.isShowFormAddBank}
			onDismiss={this.onCloseAddBank}
			dialogContentProps={{
				type: DialogType.largeHeader,
				title: 'Банк',
				subText: '',
			}}
			modalProps={{
				isBlocking: false,
				styles: { main: { maxWidth: 450 } },
			}}
		>
			<TextField
				label="Название банка"
				id="title"
				value={this.state.formAddBank.title}
				onChange={this.changeBankInput}
				className={'filter-input'}
			/>
			<TextField
				label="Валюта, начальная"
				id="currencyFrom"
				value={this.state.formAddBank.currencyFrom}
				onChange={this.changeBankInput}
				className={'filter-input'}
			/>
			<TextField
				label="Валюта, конечная"
				id="currencyTo"
				value={this.state.formAddBank.currencyTo}
				onChange={this.changeBankInput}
				className={'filter-input'}
			/>
			<TextField
				label="Продажа"
				id="valueSale"
				value={this.state.formAddBank.valueSale}
				onChange={this.changeBankInput}
				className={'filter-input'}
			/>
			<TextField
				label="Покупка"
				id="valueBuy"
				value={this.state.formAddBank.valueBuy}
				onChange={this.changeBankInput}
				className={'filter-input'}
			/>
			<DialogFooter>
				<PrimaryButton onClick={this.onSaveAddBank} text="Save" />
				<DefaultButton onClick={this.onCloseAddBank} text="Cancel" />
			</DialogFooter>
		</Dialog>);
	}


	//#####################################################


	public onAddGroup = () => {
		let finConvertGroupList = this.state.finConvertGroupList;
		let FinConvertsList:IFinConvert[] = [];
		// FinConvertsList.push(this._defaultFinConvert);
		let finConvertGroup:IFinConvertGroup = {
			title: '1',
			valueFrom: '0',
			currencyFrom: '',
			valueTo: '0',
			currencyTo: '',
			FinConvertsList:FinConvertsList
		};
		finConvertGroupList.push(finConvertGroup);
		this.setState({
			finConvertGroupList: finConvertGroupList
		});
	}

	public onOpenAddFinConvert = (indexGroup: number) => {
		this.setState({isHideFormAddFinConvert: false, formEditGroupIndex: indexGroup});
    }
	public onCloseAddFinConvert = () => {
		this.setState({isHideFormAddFinConvert: true, formEditGroupIndex: null});
	}
	public changeFinConvertInput = (ev: any) => {
		this.setState({
			formAddFinConvert: {
				...this.state.formAddFinConvert,
				[ev.target.id]: ev.target.value
			}
		});
	}
	public changeFinConvertBankDropdown = (ev: any, item?: IDropdownOption | undefined, index?: number | undefined): void => {
		//(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
		let banksList = this.state.banksList;
		let formBank = this.state.formAddFinConvert.Bank;

		if (item !== undefined && banksList[Number(item.key)]) {
			formBank = banksList[Number(item.key)];
		}

		console.log(item);
		this.setState({
			formAddFinConvert: {
				...this.state.formAddFinConvert,
				Bank: formBank
			}
		});
	}
	public changeFinConvertCurrencyDropdown = (ev: any, item?: IDropdownOption | undefined, index?: number | undefined): void => {
		if (item === undefined) {
			return;
		}
		if (ev.target.id === 'From') {
			this.setState({
				formAddFinConvert: {
					...this.state.formAddFinConvert,
					currencyFrom: item.text
				}
			})
		}
		if (ev.target.id === 'To') {
			this.setState({
				formAddFinConvert: {
					...this.state.formAddFinConvert,
					currencyTo: item.text
				}
			})
		}
	}
	public onSaveAddFinConvert = () => {
		let form = Object.assign({}, this.state.formAddFinConvert);
		let finConvertGroupList = this.state.finConvertGroupList;

		for (let index = 0; index < finConvertGroupList.length; index++) {
			if (index === this.state.formEditGroupIndex) {

				// finConvertGroupList[index].currencyFrom
				// finConvertGroupList[index].valueFrom
				if (finConvertGroupList[index].FinConvertsList.length === 0) {
					finConvertGroupList[index].currencyFrom = form.currencyFrom;
					finConvertGroupList[index].valueFrom = form.valueFrom;
				}

				// if (form.Bank.title) {
				// 	// form.Bank.valueSale
				// 	// form.Bank.valueBuy
				// 	let summ = Number(form.valueFrom) / Number(form.Bank.valueSale)
				// 	form.valueTo = summ.toString();
				// }

				finConvertGroupList[index].FinConvertsList.push(form);

				for (let indexConvert = 0; indexConvert < finConvertGroupList[index].FinConvertsList.length; indexConvert++) {
					let convert = finConvertGroupList[index].FinConvertsList[indexConvert];

					if (indexConvert === 0) {
						// convert.Bank.currencyFrom
						// convert.Bank.currencyTo

						// convert.currencyFrom
						if (convert.currencyFrom === convert.Bank.currencyFrom &&
							convert.currencyTo === convert.Bank.currencyTo
						) {
							convert.valueTo = (Number(convert.valueFrom) / Number(convert.Bank.valueSale)).toString();
						}
						else if (convert.currencyFrom === convert.Bank.currencyTo &&
							convert.currencyTo === convert.Bank.currencyFrom
						) {
							convert.valueTo = (Number(convert.valueFrom) / ( 1 /Number(convert.Bank.valueBuy))).toString();
						}
					}
					else {
						convert.currencyFrom = finConvertGroupList[index].currencyTo;
						convert.valueFrom = finConvertGroupList[index].valueTo;

						if (convert.currencyFrom === convert.Bank.currencyFrom &&
							convert.currencyTo === convert.Bank.currencyTo
						) {
							convert.valueTo = (Number(convert.valueFrom) / Number(convert.Bank.valueSale)).toString();
						}
						else if (convert.currencyFrom === convert.Bank.currencyTo &&
							convert.currencyTo === convert.Bank.currencyFrom
						) {
							convert.valueTo = (Number(convert.valueFrom) / ( 1 /Number(convert.Bank.valueBuy))).toString();
						}
					}

					finConvertGroupList[index].FinConvertsList[indexConvert] = convert;
					finConvertGroupList[index].currencyTo = convert.currencyTo;
					finConvertGroupList[index].valueTo = convert.valueTo;
				}
			}
		}

		console.log(';finConvertGroupList --- ', finConvertGroupList);
		this.setState({
			finConvertGroupList: finConvertGroupList,
			formAddFinConvert: this._defaultFinConvert
		})
		this.onCloseAddFinConvert();
	}
	public renderFormAddFinConvert = () => {
		let optionDropdownBanks: IDropdownOption[] = [];
		for (let i = 0; i < this.state.banksList.length; i++) {
			let item = this.state.banksList[i];
			optionDropdownBanks.push({
				key: i, text: item.title
			})
		}
		let optionDropdownCurrency: IDropdownOption[] = [];
        console.log('# renderFormAddFinConvert -- item -- ', this.state.currencyList);
		for (let i = 0; i < this.state.currencyList.length; i++) {
			let item:any = this.state.currencyList[i];
			optionDropdownCurrency.push({
				key: Number(item.Id), text: item.CharLetter
			})
		}
		let firstFinConvert = true;
		if (this.state.formEditGroupIndex &&
			this.state.finConvertGroupList[this.state.formEditGroupIndex] &&
			this.state.finConvertGroupList[this.state.formEditGroupIndex].FinConvertsList.length > 0
		) {
			firstFinConvert = false;
		}
		return (<Dialog
			hidden={this.state.isHideFormAddFinConvert}
			onDismiss={this.onCloseAddFinConvert}
			dialogContentProps={{
				type: DialogType.largeHeader,
				title: 'Конвертация',
				subText: '',
			}}
			modalProps={{
				isBlocking: false,
				styles: { main: { maxWidth: 450 } },
			}}
		>
			<Dropdown
				label="Банк"
				placeholder="выбрать"
				options={optionDropdownBanks}
				// defaultSelectedKey={'key'}
				onChange={this.changeFinConvertBankDropdown}
			/>
			{firstFinConvert && (
				<>
					<Dropdown
						label="Валюта, начальная"
						placeholder="выбрать"
						options={optionDropdownCurrency}
						id='From'
						// defaultSelectedKey={'key'}
						onChange={this.changeFinConvertCurrencyDropdown}
					/>
					<TextField
						label="Сумма"
						id="valueFrom"
						value={this.state.formAddFinConvert.valueFrom}
						onChange={this.changeFinConvertInput}
					/>
					<br /><br />
				</>
			)}
			<Dropdown
				label="Валюта, конечная"
				placeholder="выбрать"
				options={optionDropdownCurrency}
				id="To"
				// defaultSelectedKey={'key'}
				onChange={this.changeFinConvertCurrencyDropdown}
			/>
			<DialogFooter>
				<PrimaryButton onClick={this.onSaveAddFinConvert} text="Save" />
				<DefaultButton onClick={this.onCloseAddFinConvert} text="Cancel" />
			</DialogFooter>
		</Dialog>);
	}

    render() {
		return (
            <div className="App">
                <div className="fincur-banks">
					<div className="fincur-banks__head">
						Banks list
					</div>

					{this.state.banksList.length > 0 && this.state.banksList.map((bank, index) => {
						return (<div className="fincur-banks__bank" data-index={index} key={'banksListItem' + index}>
							<div className="fincur-banks__bank-title">{bank.title}</div>
							<div className="fincur-banks__exchange-type">{bank.currencyFrom} {'-->'} {bank.currencyTo}</div>
							<div className="fincur-banks__bank-sale">{bank.valueSale}</div>
							<div className="fincur-banks__bank-buy">{bank.valueBuy}</div>
						</div>);
					})}

					<div>
						<PrimaryButton
							className={"fincur-banks__add"}
							// iconProps={{iconName:'Add'}}
							onClick={this.onOpenAddBank}
							text={'Add bank'}
						/>
					</div>
					{this.renderFormAddBank()}
                </div>

				<hr />

                <div className="fincur-convert" key={'convertblock-' + this.state.currencyList.length}>
					<div className="fincur-convert__head">
						Convert
					</div>
					{this.state.finConvertGroupList.length > 0 && this.state.finConvertGroupList.map((finConvertGroup: IFinConvertGroup, index) => {
						return (<div className="fincur-convert__group" key={'FinConvertsListItem' + index}>
							{finConvertGroup.FinConvertsList.length > 0 && finConvertGroup.FinConvertsList.map((finConvert, indexConv) => {
								return (<div className="fincur-convert__item"  key={'finConvert' + indexConv}>
									<div className="fincur-convert__item-title">{finConvert.Bank.title}</div>
									<div className="fincur-convert__item-first">{finConvert.valueFrom}</div>
									<div className="fincur-convert__item-res">{finConvert.valueTo}</div>
								</div>);
							})}
							<div>
								<PrimaryButton
									className={"fincur-convert__item-add"}
									onClick={() => this.onOpenAddFinConvert(index)}
									text={'Add convert'}
								/>
							</div>
						</div>);
					})}
					{this.renderFormAddFinConvert()}


					<div>
						<PrimaryButton
							className={"fincur-convert__group-add"}
							onClick={this.onAddGroup}
							text={'Add group'}
						/>
					</div>

                </div>

				<hr />
				
				TEST <br />
				<CurrenciesList />

            </div>
        );
    }
}

export default App;
