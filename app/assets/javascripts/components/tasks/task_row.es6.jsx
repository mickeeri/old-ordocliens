class TaskRow extends React.Component {
  deleteTaskButtonClicked(e) {
    e.preventDefault();

    // Show modal with modal id, url for DELETE method and subscription to publish
    // on successful deletion.
    ReactDOM.render(
      <ConfirmDeleteModal
        target="deleteTask"
        subToPublish="tasksTouched"
        url={
          Routes.lawsuit_task_path(
            this.props.lawsuitId,
            this.props.task.id
          )
        }
      />,
      document.getElementById('editModalContainer')
    );
    $('#deleteTask').modal();
  }

  editTaskButtonClicked(e) {
    e.preventDefault();

    // Render modal...
    ReactDOM.render(
      <EditFormModal
        header="Redigera tidkort"
        form={
          <TaskForm
            lawsuitId={this.props.lawsuitId}
            initialTask={this.props.task}
          />
        }
      />,
      document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal(); // ...and display it.
  }

  render() {
    const task = this.props.task;
    return (
      <tr>
        <td className="text-nowrap">{task.date}</td>
        <td>{task.entry}</td>
        <td>{task.worked_hours}</td>
        <td className="text-nowrap">{task.priceCategory.name}</td>
        <td>
          <i
            className="fa fa-pencil-square-o"
            onClick={this.editTaskButtonClicked.bind(this)}
            aria-hidden="true"
          >
          </i>
        </td>
        <td className="text-nowrap">
          <i
            className="fa fa-times"
            onClick={this.deleteTaskButtonClicked.bind(this)}
            aria-hidden="true"
          >
          </i>
        </td>
      </tr>
    );
  }
}

TaskRow.propTypes = {
  task: React.PropTypes.object.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number,
  priceCategories: React.PropTypes.array.isRequired,
};
