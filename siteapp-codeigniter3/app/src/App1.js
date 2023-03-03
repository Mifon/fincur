import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
		<div className="fincur-banks">
			<div className="fincur-banks__bank">
				<div className="fincur-banks__bank-title">Halyk bank</div>
				<div className="fincur-banks__exchange-type">ru - tg</div>
				<div className="fincur-banks__bank-sale"></div>
				<div className="fincur-banks__bank-buy"></div>
			</div>
			<div className="fincur-banks__add">Add</div>
		</div>
		<div className="fincur-convert">
			<div className="fincur-convert__group">
				<div className="fincur-convert__item">
					<div className="fincur-convert__item-title"></div>
					<div className="fincur-convert__item-first"></div>
					<div className="fincur-convert__item-res"></div>
				</div>
				<div className="fincur-convert__item-add">Add</div>
			</div>
			<div className="fincur-convert__group-add">Add group</div>
		</div>
    </div>
  );
}

export default App;
