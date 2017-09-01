import React from 'react';
import SideBar from './SideBar';
import Content from './Content';

class Sales extends React.Component {
  /* описываем первоначальное состояние */
  state = {
    tableHeader: [],
    tableData: [],
    tableActions: false,
    fetchingContentError: false,
    fetchingContentErrText: '',
    fetchingAllError: false,
    fetchingAllErrText: '',
    fetchingContent: false,
    fetchingAll: false,
    showCreateButton: false,
    name: '',
    type: 'all',
    typeList: [],
    userData: {},
  }

  componentDidMount () {
    this.getData();
  }

  /* получает набор данных для формирования странички */
  getData = (filter = {}, getAll = true) => {
    if (getAll) { 
      this.setState({ fetchingAll: true });
    } else {
      this.setState({ fetchingContent: true });
    }
    const body = JSON.stringify(filter);
    /* запрашиваем список элементов навигации */
    fetch('/sale/getsales', 
    {
      method: 'POST',
      accept: 'application/json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    .then(response => {
      /* проверяем на наличии 200 кода в ответе */
      if (!response.ok) {
        throw Error(response.statusText);
        return response;
      } else {
        return response.json();
      }
    })
    .then(json => {
      /* при успешном ответе, раскидываем данные в состояние */
      if (getAll) {
        this.setState({
          userData: json.userData ? json.userData : {}, 
          fetchingAll: false,
          showCreateButton: json.showCreateButton ? json.showCreateButton : false,
          typeList: json.typeList ? json.typeList : [],
          tableHeader: json.tableHeader ? json.tableHeader : [],
          tableData: json.tableData ? json.tableData : [],
          tableActions: json.tableActions ? json.tableActions : []
        });
      } else {
        this.setState({ 
          fetchingContent: false,
          tableData: json.tableData ? json.tableData : [],
          tableActions: json.tableActions ? json.tableActions : []
        });
      }
    })
    .catch(err => {
      /* если ошибка, выставляем флаг и сохраняем текст ошибки */
      if (getAll) {
        this.setState({
          fetchingAllError: true,
          fetchingAllErrText: err,
          fetchingAll: false
        });
      } else {
        this.setState({
          fetchingContentError: true,
          fetchingContentErrText: err,
          fetchingContent: false
        });
      }
    });
  }

  /* создает новую скидку */
  createSale = () => {

  }

  /* редактирует скидку по id */
  updateSale = (id) => {

  }

  /* удаляет скидку по id */
  deleteSale = (id) => {

  }

  /* обновлет значения фильтров при вводе */
  updateFilterValue = (name, value) => {
    this.setState({ [name]: value });
  }

  /* применяет или сбрасывает фильтры */
  handleFilter = (action) => {
    switch (action) {
      case 'apply':
        this.getData({
          formData: {
            name: this.state.name !== '' ? this.state.name : null,
            type: this.state.type !== 'all' ? this.state.type : null
          }
        }, false);
        break;
      case 'reset':
        this.setState({
          name: '',
          type: 'all'
        });
        this.getData({
          formData: {
            name: null,
            type: null
          }
        }, false);
    }
  }

  render () {
    return (
        <div className="col-sm-12">
        { 
          this.state.fetchingAll ?
            <div className="alert alert-warning"><b>Подождите.</b> Идет загрузка скидок...</div>
            :
            this.state.fetchingAllError ?
              <div className="alert alert-danger"><b>Ошибка!</b> Не удалось загрузить скидки.</div>
              :
              <div className="row row-offcanvas row-offcanvas-left schedule-index">
                <SideBar
                  refresh={ this.getData }
                  filter={ this.handleFilter }
                  create={ this.state.showCreateButton }
                  values={{ name: this.state.name, type: this.state.type }}
                  types={ this.state.typeList }
                  update={ this.updateFilterValue }
                  user={ this.state.userData }
                />
                {
                  this.state.fetchingContent ?
                    <div id="content" className="col-sm-10">
                      <div className="alert alert-warning"><b>Подождите.</b> Идет загрузка скидок...</div>
                    </div>
                    :
                    this.state.fetchingContentError ?
                      <div id="content" className="col-sm-10">
                        <div className="alert alert-danger"><b>Ошибка!</b> Не удалось загрузить скидки.</div>
                      </div>
                      :
                      <Content
                        header={ this.state.tableHeader }
                        data={ this.state.tableData }
                        actions={ this.state.tableActions }
                        update={ this.updateSale }
                        delete={ this.deleteSale }
                      />
                }
              </div>
        }
        </div>
    );
  }
}

export default Sales;
