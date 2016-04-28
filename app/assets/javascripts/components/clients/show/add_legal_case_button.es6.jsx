class AddLegalCaseButton extends React.Component {

  // componentDidMount() {
  //   //PubSub.subscribe('tasksTouched', this.refreshTasks);
  //
  // }
  //
  // componentWillUnmount() {
  //   //PubSub.unsubscribe('tasksTouched');
  //
  // }

  handleAddLegalCaseClick(e) {
    e.preventDefault();
    ReactDOM.render(
      <EditTaskModal
        form={<LegalCaseEditForm
        clientId={this.props.clientId}/>}
      />,
      document.getElementById('tasksModalContainer')
    );
    $('#editTaskModal').modal();
  }

  render() {
    return (
      <div className="card">
        <div id="tasksModalContainer"></div>
        <div className="card-block">
          <div className="row">
          <div className="col-md-8">
          </div>
          <div className="col-md-4">
            <a onClick={this.handleAddLegalCaseClick.bind(this)}
              className="btn btn-success-outline">Lägg till mål
            </a>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
AddLegalCaseButton.propTypes = {
  clientId: React.PropTypes.number.isRequired,
};
