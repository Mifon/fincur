import { Component } from 'react';
import styles from './styles.module.scss';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';

import { httpGetCurrency } from '../../api/CIRestAPI/currencyService';
// import { getCurrencyList } from '../../api/localStorage/currencyService';


interface ICurrency {
	Id: number | null,
	Name: string,
    CharLetter: string,
    Code: string,
	DCreate: number,
	DUpdate: number,
	DDelete: number,
}

interface ICurrencyEditProps {
	id: number
}
interface ICurrencyEditState {
	isLoading: boolean,
	isShowForm: boolean,
	id: number | null,
	currency: ICurrency,
    currencySave: ICurrency,
}

class CurrencyEdit extends Component<ICurrencyEditProps, ICurrencyEditState> {

    private _default:ICurrency = {
		Id: null,
        Name: '',
        CharLetter: '',
        Code: '',
        DCreate: 0,
        DUpdate: 0,
        DDelete: 0,
    }

	constructor(props: ICurrencyEditProps) {
		super(props);
		this.state = {
			isLoading: true,
			isShowForm: true,
			id: props.id || null,
			currency: this._default,
			currencySave: this._default
		}
	}

	public componentDidMount = async () => {
		let currency = await httpGetCurrency(this.state.id || 0);
console.log('## Edit currancy -- ', currency);
		if (currency === null) currency = [];
		this.setState({
			isLoading: false,
			currency: Object.assign(this.state.currency, currency),
			currencySave: Object.assign(this.state.currencySave, currency)
		})
	}

	public onCloseForm = () => {
		alert('Close');
	}

	public changeInput = (ev: any) => {
		this.setState({
			currencySave: {
				...this.state.currencySave,
				[ev.target.id]: ev.target.value
			}
		});
	}

	public onSave = () => {
		
	}

	render() {
		return (
			<Dialog
				hidden={this.state.isShowForm}
				onDismiss={this.onCloseForm}
				dialogContentProps={{
					type: DialogType.largeHeader,
					title: 'Валюта (#' + this.state.id + ')',
					subText: '',
				}}
				modalProps={{
					isBlocking: false,
					styles: { main: { maxWidth: 450 } },
				}}
			>
				<TextField
					label="Название валюты"
					id="Name"
					value={this.state.currencySave.Name}
					onChange={this.changeInput}
					className={'filter-input'}
				/>
				<TextField
					label="Короткое название (обозначение)"
					id="CharLetter"
					value={this.state.currencySave.CharLetter}
					onChange={this.changeInput}
					className={'filter-input'}
				/>
				<TextField
					label="Код"
					id="Code"
					value={this.state.currencySave.Code}
					onChange={this.changeInput}
					className={'filter-input'}
				/>
				<DialogFooter>
					<PrimaryButton onClick={this.onSave} text="Save" />
					<DefaultButton onClick={this.onCloseForm} text="Cancel" />
				</DialogFooter>
			</Dialog>
		);
	}
}

export default CurrencyEdit;