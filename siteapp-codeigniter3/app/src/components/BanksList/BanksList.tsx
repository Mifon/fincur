import { Component } from 'react';
import styles from './styles.module.scss';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

// import { getBanksList } from '../../api/CIRestAPI/bankService';
import { getBanksList, setBanksList } from '../../api/localStorage/bankService';


interface IBank {
	Id: number | null,
	Title: string,
	DCreate: number,
	DUpdate: number,
	DDelete: number,
}

interface IBanksListState {
	isLoading: boolean,
	banksList: IBank[],
}

class BanksList extends Component<any, IBanksListState> {

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
			banksList: []
		}
	}

	public componentDidMount = async () => {
		let banksList = getBanksList();

		if (banksList === null) banksList = [];
		this.setState({
			isLoading: false,
			banksList: banksList
		})
	}

	public onOpenEdit = async () => {
		alert('Editing!');
	}

	render() {
		return (
			<div className={"bBankList " + styles.bBankList}>

				<div className={styles.bBankList__head}>
					Banks list
				</div>


				{this.state.banksList.length > 0 && this.state.banksList.map((bank) => {
					return (
						<div className={"bBankList__item " + styles["bBankList__item"]} key={"bBankList-item-" + bank.Id}>
							<div className="bBankList__item-icon"></div>
							<div className="bBankList__item-title">{bank.Title}</div>
							<div className="bBankList__item-country"></div>
							<div>
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
						text={'Add bank'}
					/>
				</div>

			</div>
		);
	}
	
}

export default BanksList;