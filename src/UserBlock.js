import React from 'react';
import PropTypes from 'prop-types';

class UserBlock extends React.Component {

  render() {
    return (
        <div className="well well-sm small">
		  <p style={{ margin: 0 }}><b>{ this.props.user.name }</b>
          {
          	this.props.user.teacherId ?
              <a
                href={ '/teacher/view?id=' + this.props.user.teacherId }
                className="fa fa-user btn btn-default btn-xs"
                style={{ marginLeft: '2px'}}
              ></a>
              : ''
          }
          </p>
          <p style={{ margin: 0 }}>{ this.props.user.role }</p>
          { 
          	this.props.user.office ? 
              <p style={{ margin: 0 }}>{ this.props.user.office }</p>
              : ''
          }
        </div>
    );
  }
}

UserBlock.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserBlock;
