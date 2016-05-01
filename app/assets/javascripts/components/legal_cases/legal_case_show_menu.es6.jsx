// class LegalCaseShowMenu extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
//     this.handleOnDeleteButtonClick = this.handleOnDeleteButtonClick.bind(this);
//   }
//
//   handleEditButtonClick(e) {
//     PubSub.publish('editModeButtonClicked');
//   }
//
//   handleOnDeleteButtonClick(e) {
//     e.preventDefault();
//     PubSub.publish('deleteButtonClicked');
//   }
//
//   render() {
//     return (
//       <div className="card card-block">
//         <ConfirmDeleteModal target="deleteLegalCase" subToPublish="deleteLegalCaseConfirmed" />
//         <div className="button-menu" role="group" aria-label="...">
//           <button className="btn btn-primary"
//             onClick={this.handleEditButtonClick}>Redigera ärende
//           </button>
//         </div>
//       </div>
//     );
//   }
// }
