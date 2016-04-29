class AddCounterpartButton extends React.Component {
  handleOnClick(e) {
    e.preventDefault();
    ReactDOM.render(
      <EditFormModal
        form={<CounterPartForm clientId={this.props.clientId}/>}
        header="Lägg till motpart"
      />,
    document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal();
  }

  render() {
    return (
      <div>
        <div id="editModalContainer"></div>
          <div className="content-right">
            <hr/>
            <a onClick={this.handleOnClick.bind(this)}
              className="btn btn-success-outline">Lägg till motpart
            </a>
          </div>
      </div>
    );
  }
}
AddCounterpartButton.propTypes = {
  clientId: React.PropTypes.number.isRequired,
};
