import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {

  dataSearch = (e) => {
    let value = e.target.value;
    let name = this.props.options.name;
    this.props.update(name, value);
  };

  render() {
    return (
      <div className={ this.props.options.validation }>
        <input
          type="text"
          className="form-control input-sm"
          placeholder={ this.props.options.placeholder }
          onChange={ this.dataSearch }
          value={ this.props.options.term }
        />
      </div>
    );
  }
};

/* проверяем props */
Input.propTypes = {
  options: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

export default Input;