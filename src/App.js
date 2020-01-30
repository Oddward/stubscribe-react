import React from 'react';
// import logo from './logo.svg';
import './App.css';
import './assets/icofont.min.css';

/*
Parts:
-Board
--subs
--detailsPane
---memberslist
-Settings
*/

class SubMember extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: false,
      newBalance: this.props.balance,
    };
  }

  handleClick(){
    this.setState({ selected: !this.state.selected,});
  }

  render(){
    let memberdesign = "member " + this.props.colour;
    let newBalance = this.state.newBalance;

    let balanceInc = () => (this.setState({ newBalance: this.state.newBalance + 1}));
    let balanceDec = () => (this.setState({ newBalance: this.state.newBalance - 1}));

    return (
      <div className="member-container">
        <div className={memberdesign} onClick={this.handleClick.bind(this)}>
          <p>{this.props.value}</p>
          <span className="balance">{this.props.balance}</span>
        </div>
        <div className={"mod-member" + (this.state.selected ? " selected":"")}>
          <span className="action-butt del-member"><i className="icofont-ui-delete"></i></span>
          <span className="action-butt edit-member"><i className="icofont-ui-edit"></i></span>
          <span className="action-butt send-member"><i className="icofont-paper-plane"></i></span>
          <button className="action-butt check" disabled={(this.state.newBalance === this.props.balance ? true:false)}><i className="icofont-check-circled"></i></button>
          <span className="action-butt inc-member" onClick={balanceInc}><i className="icofont-plus"></i></span>
          <span className="action-butt new-balance">{newBalance}</span>
          <span className="action-butt dec-member" onClick={balanceDec}><i className="icofont-minus"></i></span>
        </div>
      </div>
    );
  }
}

function Subscription(props) {
  const sub = "sub ";

  return(
    <button className={sub + props.subclass} onClick={props.onClick}>
      <span></span>
      <p className="sub-name">{props.value}</p>
      <div className={props.status ? 'sub-status isactive' : 'sub-status'}>{props.billDay}</div>
    </button>);
}

// class SubMemberContainer extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       selected: false,
//     };

//   }

//   render(){

//     return(
//       <div className="member-container">
//       <div className={memberdesign} onClick={() => onClick()}>
//         <p>{props.value}</p>
//         <span className="balance">{props.balance}</span>
//       </div>
//       <div className="mod-member">
//         <span className="action-butt del-member"></span>
//         <span className="action-butt edit-member"></span>
//         <span className="action-butt dec-member"></span>
//         <span className="action-butt inc-member"></span>
//       </div>
//     </div>
//     )
//   }
// }

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        subs: [{
          id: '1',
          name: "Spotify",
          billDay: new Date().getDate(),
          monthlyPrice: 9.99,
          isActive: true,
          // isSelected: false,
          members: [
            { id: 1, name: "Gboi", balance: -2, colour: "lightblue",},
            { id: 2, name: "Bebo", colour: "yellow", balance: -3,}
          ],
        },
        {
          id: '2',
          name: "Netflix",
          billDay: new Date().getDate() + 5,
          monthlyPrice: 9.99,
          isActive: false,
          // isSelected: false,
          members: [
            { id: 1, name: "Yutttta", balance: 1, colour: "yellow",},
            { id: 2, name: "Mamoth", colour: "white", balance: 3,}
          ],
        }],
      }],
      selectedI: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    console.log(event);
    // let index = event.target.getAttribute("data-index");
    this.setState({ selectedI: event, });
  }

  render(){
    const history = this.state.history;
    const current = history[history.length - 1];
    let selectcheck = this.state.selectedI;
    console.log(selectcheck);
    // const subs = current.subs;
    
    const SubsList = () => (
      <ul>
        {current.subs.map((item,index) => (
          <li key={item.id} onClick={() => this.handleClick(index)} >
            <Subscription subclass={index === this.selected ? "sub-selected" + item.name:item.name} value={item.name} status={item.isActive} billDay={item.billDay} data-index={index} />
          </li>))}
      </ul>);

    let Details = () => (<p className="no-selection">Please select a subscription from your list.</p>);
    let Subheader = () => (<h1>Welcome, Mugtaba!</h1>);
    if(this.state.selectedI !== null){
      Details = () => (
        <>
        <ul>
          {current.subs[this.state.selectedI].members.map((item,index) => (
            <li key={item.id}>
              <SubMember value={item.name} colour={item.colour} balance={item.balance} data-index={index} />
            </li>))}
        </ul>
        <button className="add-new">+</button>
        </>);
      Subheader = () => (
        <>
          <h1>{current.subs[this.state.selectedI].name}</h1>
          <div style={{display: 'flex',justifyContent: 'space-around',}}>
            <small>{"Plan: $" + current.subs[this.state.selectedI].monthlyPrice}</small>
            <small>{"Next bill date: " + current.subs[this.state.selectedI].billDay + " Feb"}</small>
            <small>{"Status: " + (current.subs[this.state.selectedI].isActive ? "Active":"Inactive")}</small>
          </div>
        </>
      )
    }

    return(
      <>
        <div className="subs-pane">
          <SubsList />
          <button className="add-new">+</button>
        </div>
        <div className="subhead">
          <Subheader />
        </div>
        <div className="sub-details">
          <Details />
        </div>
      </>);
  }
}

function App() {
  return (
    <div className="App">
      <header className="head shadow"><h1>StubScribe</h1></header>
      <Board />
      <footer className="foot">
        <small>© Mohammed Almugtaba Garoot</small>
      </footer>
    </div>
  );
}

export default App;