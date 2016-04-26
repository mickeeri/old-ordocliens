class TaskRow extends React.Component {
  deleteTaskButtonClicked (e) {
    e.preventDefault();

    // Show modal with modal id, url for DELETE method and subscription to publish
    // on successful deletion.
    ReactDOM.render(<ConfirmDeleteModal target="deleteTask"
      url={Routes.client_legal_case_task_path(
        this.props.clientId,
        this.props.legalCaseId,
        this.props.task.id)}
      subToPublish="tasksTouched"/>,
      document.getElementById('tasksModalContainer'));
    $('#deleteTask').modal();
  }

  render() {
    var task = this.props.task;
    return (
      <tr>
        <td className="nowrap">{task.date}</td>
        <td>{task.entry}</td>
        <td>{task.worked_hours}</td>
        <td className="nowrap">{task.price_category.name}</td>
        <td><a href="#" onClick={this.deleteTaskButtonClicked.bind(this)}>Ta bort</a></td>
      </tr>
    );
  }
}

TaskRow.propTypes = {
  task: React.PropTypes.object.isRequired,
  legalCaseId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number.isRequired,
};
