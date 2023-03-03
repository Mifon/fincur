import { Component } from 'react';
import styles from './styles.module.scss';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

import { getCurrencyList } from '../../api/CIRestAPI/currencyService';
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

interface ICurrenciesListState {
	isLoading: boolean,
	currenciesList: ICurrency[],
}

class CurrenciesList extends Component<any, ICurrenciesListState> {

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
			currenciesList: []
		}
	}

	public componentDidMount = async () => {
		let currenciesList = await getCurrencyList();

		if (currenciesList === null) currenciesList = [];
		this.setState({
			isLoading: false,
			currenciesList: currenciesList
		})
	}

    public onOpenEdit = async () => {
		alert('Editing!');
	}

    render() {
		return (
			<div className={"bCurrenciesList " + styles.bCurrenciesList}>

				<div className={styles.bCurrenciesList__head}>
					Currencies list
				</div>


				{this.state.currenciesList.length > 0 && this.state.currenciesList.map((currnecy) => {
					return (
						<div className={"bCurrenciesList__item " + styles["bCurrenciesList__item"]} key={"bCurrenciesList-item-" + currnecy.Id}>
							<div className={styles["bCurrenciesList__item-icon"]}>{currnecy.Code}</div>
							<div className={styles["bCurrenciesList__item-title"]}>{currnecy.Name}</div>
							<div style={{marginTop:'20px'}}>
								<PrimaryButton
									// iconProps={{iconName:'Add'}}
									onClick={this.onOpenEdit}
									text={'Edit'}
								/>
							</div>
						</div>
					);
				})}

				<br />

				<div>
					<PrimaryButton
						// iconProps={{iconName:'Add'}}
						onClick={this.onOpenEdit}
						text={'Add currency'}
					/>
				</div>

			</div>
		);
	}
}

export default CurrenciesList;