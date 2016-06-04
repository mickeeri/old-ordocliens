class TaskRow extends React.Component {
  constructor(props) {
    super(props);
    this.editTaskButtonClicked = this.editTaskButtonClicked.bind(this);
    this.deleteTaskButtonClicked = this.deleteTaskButtonClicked.bind(this);
  }

  deleteTaskButtonClicked(e) {
    e.preventDefault();

    // Show modal with modal id, url for DELETE method and subscription to publish
    // on successful deletion.
    ReactDOM.render(
      <ConfirmDeleteModal
        target="deleteTask"
        subToPublish="tasksTouched"
        resourceName="arbete"
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
        header="Redigera arbete"
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
        <td>{task.workedHours}</td>
        <td className="text-nowrap">{task.priceCategory.name}</td>
        <td className="center-content">
          <i
            className="fa fa-pencil-square-o"
            onClick={this.editTaskButtonClicked}
            aria-hidden="true"
          >
          </i>
        </td>
        <td className="center-content">
          <i
            className="fa fa-times"
            onClick={this.deleteTaskButtonClicked}
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
};
