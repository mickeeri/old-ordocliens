class TaskRow extends React.Component {
  deleteTaskButtonClicked (e) {
    e.preventDefault();

    // Show modal with modal id, url for DELETE method and subscription to publish
    // on successful deletion.
    ReactDOM.render(
      <ConfirmDeleteModal
        target="deleteTask"
        subToPublish="tasksTouched"
        url={
          Routes.client_legal_case_task_path(
            this.props.clientId,
            this.props.legalCaseId,
            this.props.task.id
          )
        }
      />,
      document.getElementById('editModalContainer')
    );
    $('#deleteTask').modal();
  }

  editTaskButtonClicked (e) {
    e.preventDefault();

    // Render modal...
    ReactDOM.render(
      <EditFormModal
        header="Redigera tidkort"
        form={
          <EditTaskForm
            legalCaseId={this.props.legalCaseId}
            clientId={this.props.clientId}
            priceCategories={this.props.priceCategories}
            initialTask={this.props.task} />
        }
      />,
      document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal(); // ...and display it.
  }

  render() {
    var task = this.props.task;
    return (
      <tr>
        <td className="text-nowrap">{task.date}</td>
        <td>{task.entry}</td>
        <td>{task.worked_hours}</td>
        <td className="text-nowrap">{task.price_category.name}</td>
        <td>
          <a href="#" onClick={this.editTaskButtonClicked.bind(this)}>Redigera</a>
        </td>
        <td className="text-nowrap">
          <a href="#" onClick={this.deleteTaskButtonClicked.bind(this)}>Ta bort</a>
        </td>
      </tr>
    );
  }
}

TaskRow.propTypes = {
  task: React.PropTypes.object.isRequired,
  legalCaseId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number.isRequired,
  priceCategories: React.PropTypes.array.isRequired,
};
