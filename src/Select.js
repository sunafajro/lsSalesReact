import React from "react";
import PropTypes from 'prop-types';

class Select extends React.Component {

  dataSearch = (e) => {
    let value = e.target.value;
    let name = this.props.options.name;
    this.props.update(name, value);
  };

  render() {
    return (
      <div className={ this.props.options.validation }>
        <select
          className="form-control input-sm"
          onChange={this.dataSearch}
          value={ this.props.options.term }
          disabled={ this.props.options.disabled}
        >
          { this.props.filter.map(item =>
            <option key={ item.key } value={ item.key }>
              { item.value }
            </option>
          ) }               
        </select>
      </div>
    );
  }
};

/* проверяем props */
Select.propTypes = {
  options: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  filter: PropTypes.array.isRequired
}

export default Select;