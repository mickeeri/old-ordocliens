class CounterpartLawsuitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lawsuits: props.lawsuits };
  }

  render() {
    return (
      <div className="row counterpart-client-card">
        {this.state.lawsuits.map(lawsuit =>
          <div className="col-md-12" key={lawsuit.id}>
            <div>
              <div>
                <a className="card-title" href={Routes.lawsuit_path(lawsuit.id)}>
                  {lawsuit.slug}
                </a>
                <span> ({lawsuit.createdAt = new Date().yyyymmdd()})</span><br />
                <span>{lawsuit.lawsuitType.name}</span>
              </div>
              <div>

                <strong> mot</strong>
                <ul>
                  {lawsuit.clients.map(client =>
                    <li key={lawsuit.id + client.id}>
                      <a href={Routes.client_path(client.id)}>
                        {client.lastName} {client.firstName}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <hr />
          </div>

        )}
      </div>
    );
  }
}

CounterpartLawsuitList.propTypes = {
  lawsuits: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    closed: React.PropTypes.bool.isRequired,
    court: React.PropTypes.string,
    lawsuitType: React.PropTypes.object.isRequired,
    slug: React.PropTypes.string.isRequired,
    clients: React.PropTypes.array.isRequired,
  })),
};
