class ClientNew extends React.Component {
  displayName: 'ClientNew';
  render() {
    return (
      <div className="row">
        <div className="col-md-9 col-md-offset-2">
          <ClientEditForm header="Lägg till klient" />
        </div>
      </div>
    );
  }
}
