import React, {Component} from 'react';
import styled from 'emotion/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Button, Input, Title, } from './';
import Modal from 'react-modal';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const CardsAddStyle = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-40%, -40%)'
	}
};
const CardLayout = styled.div`
	position: relative;
	width: 260px;
	height: 164px;
	box-sizing: border-box;
	margin-bottom: ${({isSingle}) => (isSingle ? 0 : '15px')};
	padding: 25px 20px 20px 25px;
	border-radius: 4px;
	background-color: ${({bgColor, active}) => (active ? bgColor : 'rgba(255, 255, 255, 0.1)')};
`;
const NewCardLayout = styled(CardLayout)`
	background-color: transparent;
	background-image: url('/assets/cards-add.svg');
	background-repeat: no-repeat;
	background-position: center;
	box-sizing: border-box;
	border: 2px dashed rgba(255, 255, 255, 0.2);
`;
const ModalTitle = styled(Title)`
	background:dimgray;
	color:#fff;
	position: absolute;
    left: 0;
    top: 0;
    padding:.2em;
    text-align:center;
    width:100%;
`;
const InputField = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 26px;
`;

const Label = styled.div`
	font-size: 15px;
	color: dimgray;
	width:100%;
`;
const Currency = styled.span`
	font-size: 13px;
	color: dimgray;
	margin-left: 12px;
`;
const InputCardNumber = styled(Input)`
	width: 225px;
`;

const InputBalance = styled(Input)`
	width: 160px;
`;
const ButtonClose = styled(Button)`
	text-align:center;
	margin:0 2em 0 1em;
`;
const ButtonSuccess = styled(Button)`
	text-align:center;
	margin:0 1em 0 2em;

`;
const FormContent = styled.div`
	padding-top: 5em;
`;
class CardsAdd extends Component {
	/**
	 * Конструктор
	 *
	 * @param {Object} props свойства компонента
	 */
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false,
			cardNumber: "",
			balance: "0",
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

	}

	openModal() {
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}
	onChangeInputValue(event) {
		if (!event) {
			return;
		}

		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
	}
	onSubmitForm(event) {
		if (event) {
			event.preventDefault();
		}

		const {cardNumber, balance} = this.state;
		console.log(cardNumber + ' ' + balance);
		axios
			.post(`/cards/`, {
				balance: balance,
				cardNumber: cardNumber,
			})
			.then(data => {
				if(data.status === 201) {
					console.log(data.status);
					this.closeModal();
					NotificationManager.success('Карта успешно создана', 'Title here');
					this.props.onAddCardSuccess({balance, cardNumber});
				} else {
					NotificationManager.error('Ошибка создания карты', 'Click me!');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		return (
			<NewCardLayout
				onClick={this.openModal}
			>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={CardsAddStyle}
				>
					<ModalTitle>Новая карта</ModalTitle>
					<FormContent>
						<div>Введите номер карты или активируйте камеру</div>
						<form onSubmit={(event) => this.onSubmitForm(event)}>
							<InputField>
								<Label>Номер карты</Label>
								<InputCardNumber
									value={this.state.cardNumber}
									onChange={(event) => this.onChangeInputValue(event)}
									placeholder="1000 2000 3000 4000"
									name="cardNumber"/>
							</InputField>
							<InputField>
								<Label>Текущий баланс</Label>
								<InputBalance
									value={this.state.balance}
									onChange={(event) => this.onChangeInputValue(event)}
									placeholder="1000"
									name="balance"/>
								<Currency>₽</Currency>
							</InputField>
							<ButtonSuccess bgColor='#108051' textColor='#fff'>Создать</ButtonSuccess>
						</form>
						<ButtonClose bgColor='#c22f24' textColor='#fff' onClick={this.closeModal} type="reset">Закрыть</ButtonClose>
					</FormContent>
				</Modal>
			</NewCardLayout>
		);
	}
}
CardsAdd.propTypes = {
	onAddCardSuccess: PropTypes.func.isRequired
};
export default CardsAdd;


