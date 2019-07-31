import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      listCount: 0,
      listItems: [],
    }
    this.addItem = this.addItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    let newItem = e.target.value;   
    let keycode = e.keyCode ? e.keyCode : e.charCode;

 
    if (keycode === 13) {
      console.log("WORKING")
      this.setState({
        listCount: this.state.listCount + 1,
        listItems: [...this.state.listItems, newItem]
      })
    }   
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>todos</h1>
        </header>
        <section>
          <form id="todoForm">
            <div id="todoFormWrapper">
              <label id="firstLabel"></label>
              <input type="text" id="firstInput" placeholder="What needs to be done?" onKeyPress={this.addItem}></input>
            </div>
            <ListItem lCount={this.state.listCount} lItems={this.state.listItems}/>
          </form>
        </section>
        <footer id="footerPage">
          <p className="footerPageText">Double-click to edit a todo</p>
          <p className="footerPageText">Created by petehunt</p>
        </footer>
      </div>
    );
  }
}

function ListItem(props) {
  const allItems = props.lItems;


  const items = allItems.map((task, key) => <div>{task}</div>);

  return (
    <React.Fragment>
   
        {items}
     
     </React.Fragment>
    )
}

export default App;
