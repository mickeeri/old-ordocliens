class TasksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: this.props.initialTasks };
    this.refreshTasks = this.refreshTasks.bind(this);
    this.addTaskClicked = this.addTaskClicked.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('tasksTouched', this.refreshTasks);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('tasksTouched');
  }

  refreshTasks() {
    const url = Routes.lawsuit_tasks_path(this.props.lawsuitId);
    makeGetRequest(url)
      .success(response => {
        this.setState({ tasks: response.tasks });
        PubSub.publish('dismissEdit');
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  addTaskClicked(e) {
    e.preventDefault();

    // Render modal...
    ReactDOM.render(
      <EditFormModal
        header="Lägg till tidkort"
        form={<TaskForm lawsuitId={this.props.lawsuitId} />}
      />,
      document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal(); // ...and display it.
  }

  render() {
    const taskRows = this.state.tasks.map(task =>
      <TaskRow
        key={task.id}
        task={task}
        lawsuitId={this.props.lawsuitId}
        clientId={this.props.clientId}
        priceCategories={this.props.priceCategories}
      />
    );

    return (
      <div>
        <div id="editModalContainer"></div>
        <h3>Arbeten</h3>
        <div className="content-right">
          <a
            href={`/report/${this.props.lawsuitId}.docx`}
            className="btn btn-primary"
          >Rapport .docx</a>
          <button
            className="btn btn-success"
            onClick={this.addTaskClicked}
          >Lägg till arbete</button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Notering</th>
                <th className="text-nowrap">Arbetad tid</th>
                <th className="text-nowrap">Priskategori</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {taskRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

TasksIndex.propTypes = {
  initialTasks: React.PropTypes.array.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number,
  priceCategories: React.PropTypes.array.isRequired,
};
