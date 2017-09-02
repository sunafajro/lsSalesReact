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

class UpdateSale extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    sending: false,
	  	error: false,
        errorMessage: '',
	  	data: {
	  		id: '',
	  		name: ''
	  	},
	    validation: {
	      name: 'form-group'
	    }
	  }

    this.initialState = { ...this.state }
  }

  componentWillReceiveProps (newProps) {
    this.setState({data: newProps.sale});
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
    fetch('/sale/update', {
      method: 'POST',
      accept: 'application/json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    })
    .then(response => {
  	  if (response.ok) {
  	  	return response.json();
  	  }
      let r = response.json();
  	  throw new Error(r.message);
    })
    .then(json => {
      /* передаем услугу в родительское состояние */
      //this.props.alert(json.code, json.message);
      this.setState({ sending: false });
      this.handleClose();
      this.props.refresh({
          Sale: {
            name: null,
            type: null
          }
        }, false);
    })
    .catch(err => {
      this.setState({
      	sending: false,
        error: true,
        errorMessage: err.message
      });
    });
  }

  /* метод обработки отправки формы */
  handleSubmit = () => {
    if(this.fieldsValidation()) {
      this.sendData();
    } else {
    	this.setState({
    	  error: true,
          errorMessage: 'Поля формы должны быть заполнены.'
    	});
    }
  }

  render () {
    return (
		  <Modal isOpen={ this.props.open } onRequestHide={ this.handleClose }>
		    <ModalHeader>
		      <ModalClose onClick={ this.handleClose }/>
		      <ModalTitle>Изменить название скидки</ModalTitle>
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
          { this.state.error ?
            <div className="alert alert-danger"><b>Ошибка!</b> { this.state.errorMessage }</div>
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

UpdateSale.propTypes = {  
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  sale: PropTypes.object.isRequired
}

export default UpdateSale;
