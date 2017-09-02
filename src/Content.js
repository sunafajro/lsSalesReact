import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import UpdateSale from './UpdateSale';

class Content extends React.Component {
  state = {
    isOpen: false,
    sale: {
      id: '',
      name: ''
    }
  }

  /* закрывает модальное окно */
  closeModal = () => {
    this.setState({
      isOpen: false
    });
  }

  /* заполняет данные скидки в состояние и открывает модальное окно */
  updateSale = (sale) => {
    let updatedSale = { ...this.state.sale }
    updatedSale.id = sale.id;
    updatedSale.name = sale.name;

    this.setState({
      isOpen: true,
      sale: updatedSale
    });
  }

  /* отправляет на сервер запрос на удаление скидки */
  sendDelete = (id) => {
    const body = JSON.stringify({
      Sale: {
        id: id
      }
    });

    fetch('/sale/delete', {
      method: 'POST',
      accept: 'application/json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
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
      this.props.refresh({
          Sale: {
            name: null,
            type: null
          }
        }, false);
      console.log(json.message);
    })
    .catch(err => {
      /* передаем услугу в родительское состояние */
      /* this.props.alert(500, err.message); */
      console.log(err.message);
    });
  }

  deleteSale = (id) => {
    this.sendDelete(id);
    this.props.refresh({
      Sale: {
        name: null,
        type: null
      }
    }, false);
  }

  render () {
  	return (
  		<div id="content" className="col-sm-10">
    		<p className="pull-left visible-xs">
    			<button type="button" className="btn btn-primary btn-xs" data-toggle="offcanvas">Toggle nav</button>
    		</p>
          <Table
            header={ this.props.header }
            data={ this.props.data }
            actions={ this.props.actions }
            update={ this.updateSale }
            delete={ this.deleteSale }
          />
          <UpdateSale
            open={ this.state.isOpen }
            close={ this.closeModal }
            sale={ this.state.sale }
            refresh={ this.props.refresh }
          />
  		</div>
  	);
  }
}

Content.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired
}

export default Content;