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
    this.changeCompleteStatus = this.changeCompleteStatus.bind(this);
  }

  
  addItem(e) {
    
    let newItem = e.target.value; 
    console.log("newItem: " + newItem)
    let keycode = e.keyCode ? e.keyCode : e.charCode;

 
    if (keycode === 13) {
      console.log("WORKING")
      this.setState({
        listCount: this.state.listCount + 1,
        listItems: [...this.state.listItems, newItem],
  
      })
      e.preventDefault();
    }   
  }

  
changeCompleteStatus() {

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
            <ListItem lCount={this.state.listCount} lItems={this.state.listItems} changeComplete={this.changeCompleteStatus()} />
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
    let todoCount = props.lCount;
    console.log("todoCount: " + todoCount)
    const items = allItems.map((task, index) =>
      <div key={`todoWrapper${index}`} id={index} className="todoWrapper">
        <label key={`container${index}`} className="container">
          <div key={`checkWrapper${index}`} id="checkWrapper">
            <input key={`check-box${index}`} type="checkbox" className="check-box" onChange={props.changeCompleteStatus} />
            <span key={`checkmark${index}`} className="checkmark"></span>
          </div>
          <div key={`addedTodos${index}`} className="addedTodos">{task}</div>
        </label>
      </div>
    )

 


  return (
    <React.Fragment>   
        {items}
      {todoCount > 0 && <div id="todoInfoWrapper"><div id="todoInfo">{todoCount} items left
        <nav>
          <ul id="todoSelect">
            <li>All</li>
            <li>Active</li>
            <li>Completed</li>
          </ul>
        </nav>
        <span className="hideText">Clear Completed</span>
      </div>
        <div id="bookPagesImage"></div> <div id="bookPagesImage2"></div></div>}
     </React.Fragment>
    )
}



export default App;
