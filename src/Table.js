import React from "react";
import PropTypes from 'prop-types';

class Table extends React.Component {

  handleDelete = (id) => {
    if(confirm('Вы уверены?')) {
      this.props.delete(id)
    }
  }

  render() {
    return (
      <table className="table table-hover table-stripped table-bordered small">
        <thead>
          <tr>
            {
              this.props.header.map(item =>
                item.id === 'actions' && !this.props.actions ?
                  ''
                  :
                  <th key={item.id}>
                    {item.title}
                  </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(item =>
            <tr key={ item.id }>
              <td>{ item.id }</td>
              <td>{ item.name }</td>
              <td>{ item.value }{ item.type === '0' ? ' р.' : '%' }</td>
              <td>{ item.date }</td>
              {
                this.props.actions ?
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-xs"
                      style={{ marginRight: "2px" }}
                      onClick={ e => this.props.update(item) }
                    >
                      <i className="fa fa-pencil" />
                    </button>
                    <button
                      className="btn btn-danger btn-xs"
                      onClick={ e => this.handleDelete(item.id) }
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                : ''
              }
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

/* проверяем props */
Table.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
}

export default Table;
