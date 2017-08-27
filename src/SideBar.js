import React from 'react';
import PropTypes from 'prop-types';
import UserBlock from './UserBlock';
import Filter from './Filter';
import Input from './Input';
import Select from './Select';

class SideBar extends React.Component {

  render () {
  	return (
  	  <div id="sidebar" className="col-xs-6 col-sm-2 sidebar-offcanvas">
        <UserBlock user={ this.props.user } />
        { this.props.create ?
          <h4>Действия</h4>
          :
          '' 
        }
        { this.props.create ? 
          <button
            className="btn btn-success btn-sm btn-block"
            onClick={ e => this.props.create() }
          >
            <i className="fa fa-plus" aria-hidden="true"></i> Добавить
          </button>
          :
          ''
        }
        <h4>Фильтры</h4>
        <Input
          options={{
            term: this.props.values.name,
            name: 'name',
            validation: 'form-group',
            placeholder: 'Введите название...'
          }}
          update={ this.props.update }
        />
        <Select
          options={{
            term: this.props.values.type,
            name: 'type',
            validation: 'form-group'
          }}
          update={ this.props.update }
          filter={ this.props.types }
        />
        <Filter click={this.props.filter} />
  	  </div>
  	);
  }
}

SideBar.propTypes = {  
  create: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  types: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,  
}

export default SideBar;