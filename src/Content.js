import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

class Content extends React.Component {

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
            update={ this.props.update }
            delete={ this.props.delete }
          />
  		</div>
  	);
  }
}

Content.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
}

export default Content;