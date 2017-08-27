import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {

  render() {
    return (
      <div className="form-group">
        <button onClick={ e => this.props.click('apply') } className="btn btn-info btn-sm" style={{ width: '49%'}}>
          <i className="fa fa-filter" aria-hidden="true"></i> Применить
        </button>
        <button onClick={ e => this.props.click('reset') } className="btn btn-warning btn-sm pull-right" style={{ width: '49%'}}>
          <i className="fa fa-eraser" aria-hidden="true"></i> Сброс
        </button>
      </div>
    );	                
  }

}

/* проверяем props */
Filter.propTypes = {
  click: PropTypes.func.isRequired
}

export default Filter;