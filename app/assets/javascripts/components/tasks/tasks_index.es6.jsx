class TasksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: this.props.initialTasks };
    this.refreshTasks = this.refreshTasks.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('taskAdded', this.refreshTasks);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('taskAdded');
  }

  refreshTasks() {
    var url = Routes.client_legal_case_tasks_path(this.props.clientId, this.props.legalCaseId);
    makeGetRequest(url)
      .success(response=> {
        this.setState({ tasks: response.tasks });
        $('#editTaskModal').modal('hide');
        $('#editTaskModal').find('form').trigger('reset');
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    var taskRows = this.state.tasks.map(task=>
      <TaskRow key={task.id} task={task} legalCaseId={this.props.legalCaseId }/>
    );

    return (
      <div className="col-md-12">
        <EditTaskModal legalCaseId={this.props.legalCaseId} clientId={this.props.clientId} />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Specifikation avseende arbeten</h3>
          </div>
          <table className="panel-body table table-hover">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Notering</th>
                <th className="nowrap">Arbetad tid</th>
              </tr>
            </thead>
            <tbody>
              {taskRows}
            </tbody>
          </table>
          <div className="panel-footer">
            <a href="#" data-toggle="modal" data-target="#editTaskModal">Lägg till uppgift</a>
          </div>
        </div>
      </div>
    );
  }
}

TasksIndex.propTypes = {
  initialTasks: React.PropTypes.array.isRequired,
  legalCaseId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number.isRequired,
};
