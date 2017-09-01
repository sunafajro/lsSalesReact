import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import Input from './Input';
import Select from './Select';

class CreateSale extends React.Component {
	constructor(props) {
		super(props);
	  this.state = {
	    sending: false,
	  	serverError: false,
	  	clientError: false,
      errorCode: '',
      errorMessage: '',
	  	data: {
	  		name: '',
	  		type: '',
	  		value: ''
	  	},
	    validation: {
	      name: 'form-group',
	      type: 'form-group',
	      value: 'form-group'
	    }
	  }

    this.initialState = { ...this.state }
  }

  updateState = (name, value) => {
    let data = { ...this.state.data };
    let validation = { ...this.state.validation };
    data[name] = value;
    validation[name] = ((value !== '' && value !== 'all') ? 'form-group has-success' : 'form-group has-error');

    this.setState({
      data,
      validation
    });
  }

  /* метод валидирует поля формы перед отправкой */
  fieldsValidation = () => {
    let isValid = true;
    let validation = { ...this.state.validation };
    /* создаем массив из ключей объекта state */
    let arr = Object.keys(this.state.data);
    /* проходим по массиву */
    arr.map(item => {
      if(this.state.data[item] !== '' && this.state.data[item] !== 'all') {
        validation[item] = 'form-group has-success';
      } else {
        validation[item] = 'form-group has-error';
        isValid = false;
      }
    });
    this.setState({ validation });
    return isValid;
  }

  handleClose = () => {
  	this.props.close();
    /* сбрасываем состояние на дефолтное */
    this.setState(this.initialState);
  }

  /* метод отправляет данные на сервер */
  sendData = () => {
  	const body = JSON.stringify({
      Sale: this.state.data
  	});
  	this.setState({
  		sending: true,
	  	serverError: false,
	  	clientError: false,
      errorCode: '',
      errorMessage: '',
  	});
    fetch('/sale/create', {
      method: 'POST',
      accept: 'application/json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    })
    .then(response => response.json())
    .then(json => {
      if(json.code === 200) {
        /* передаем услугу в родительское состояние */
        //this.props.alert(json.code, json.message);
        this.setState({ sending: false });
        this.handleClose();
        this.props.refresh();
      } else {
        this.setState({
        	sending: false,
          serverError: true,
          errorCode: json.code,
          errorMessage: json.message
        });
      }
    })
    .catch(err => {
      this.setState({
      	sending: false,
        clientError: true,
        errorCode: 'Ошибка!',
        errorMessage: 'Не удалось создать услугу.'
      });
    });
  }

  /* метод обработки отправки формы */
  handleSubmit = () => {
    if(this.fieldsValidation()) {
      this.sendData();
    } else {
    	this.setState({
    		clientError: true,
        errorCode: 'Ошибка!',
        errorMessage: 'Поля формы должны быть заполнены.'
    	});
    }
  }

  render () {
    return (
		  <Modal isOpen={ this.props.open } onRequestHide={ this.handleClose }>
		    <ModalHeader>
		      <ModalClose onClick={ this.handleClose }/>
		      <ModalTitle>Создать скидку</ModalTitle>
		    </ModalHeader>
		    <ModalBody>
          <Input
            options={{ 
              placeholder: 'Введите название...', 
              term: this.state.data.name, 
              name: 'name',
              validation: this.state.validation.name,
              disabled: this.state.sending,
              }}
            update={ this.updateState }
          />
          <Select
            options={{ 
              term: this.state.data.type,
              name: 'type',
              validation: this.state.validation.type,
              disabled: this.state.sending,
            }}
            update={ this.updateState }
            filter={ this.props.types }                
          />
          <Input
            options={{ 
              placeholder: 'Введите значение...', 
              term: this.state.data.value, 
              name: 'value',
              validation: this.state.validation.value,
              disabled: this.state.sending,
              }}
            update={ this.updateState }
          />
          { this.state.serverError ?
            <div className="alert alert-danger"><b>{ this.state.errorCode }</b> { this.state.errorMessage }</div>
            : ''
          }
          { this.state.clientError ?
            <div className="alert alert-danger"><b>{ this.state.errorCode }</b> { this.state.errorMessage }</div>
            : ''
          }
		    </ModalBody>
		    <ModalFooter>
		      <button className="btn btn-primary" onClick={ e => this.handleSubmit() }>
		        Сохранить
		      </button>
		    </ModalFooter>
		  </Modal>
    )
  }
}

CreateSale.propTypes = {  
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  types: PropTypes.array.isRequired
}

export default CreateSale;
