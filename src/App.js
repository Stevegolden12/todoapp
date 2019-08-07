import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      listCount: 0,
      listItems: [],
      listCompleteStatus: [],
      listStatus: 0,
    }

    this.addItem = this.addItem.bind(this);
    this.changeCompleteStatus = this.changeCompleteStatus.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.listCompleteStatus !== prevProps.listCompleteStatus) {
      this.fetchData(this.props.userID);
    }
  
  }

  
  addItem(e) {
    
    let newItem = e.target.value; 
    let newStatus = false;
    console.log("newItem: " + newItem)
    let keycode = e.keyCode ? e.keyCode : e.charCode;

 
    if (keycode === 13) {
      console.log("WORKING")
      this.setState({
        listCount: this.state.listCount + 1,
        listItems: [...this.state.listItems, newItem],
        listCompleteStatus: [...this.state.listCompleteStatus, newStatus]
      })
      e.preventDefault();
    }   
    console.log(newStatus)
    console.table(this.state.listCompleteStatus)
  }
  
  changeCompleteStatus(index) {
    this.setState(prevState=>{
      const newComplete = [...prevState.listCompleteStatus];
      newComplete[index] = !newComplete[index];
      return { listCompleteStatus: newComplete };
    })

    let getChangeStatusElement = document.getElementsByClassName('hideText')[0]
    console.log(!this.state.listCompleteStatus[index])
    
    console.log(getChangeStatusElement)
    if (!this.state.listCompleteStatus[index] === true) {
      getChangeStatusElement.classList.add("showText")
    } else {
      getChangeStatusElement.classList.remove("showText")
    }
  }

  setStatus(e) {
    e.preventDefault();
  
    this.setState({
      listStatus: parseInt(e.target.value)
    })

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
            <ListItem lCount={this.state.listCount} lItems={this.state.listItems} lFilter={this.state.listStatus} lStatus={this.state.listCompleteStatus} lCheck={this.setStatus} changeComplete={this.changeCompleteStatus} />
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


class ListItem extends React.Component{ 
  constructor(props) {
    super(props)
  }

  
  render() { 
    let items = <h1>No Matches found</h1>;

    /*  this.prop.lFilter has 3 ranges 1,2,3 and lStatus is boolean with true or false
     *  if statement to ignore all/1,
     *  make if statement to translate lStatus to either 0 or 1
     * 
     * */
  const allItems = this.props.lItems.filter((val, i)=>this.props.lFilter === this.props.lStatus[i])
  let todoCount = this.props.lCount;
    console.log("lFILTER: " + this.props.lFilter)

    if (this.props.lFilter === 1) {
      console.log("All")
    } else if (this.props.lFilter === 2) {
      console.log("Active")
    } else if (this.props.lFilter === 3) {
      console.log("Complete")
    }

    console.table(this.props.lStatus)

      items = allItems.map((task, index) =>  
        <div key={`todoWrapper${index}`} id={index} className="todoWrapper">
          <label key={`container${index}`} className="container">
            <div key={`checkWrapper${index}`} id="checkWrapper">
              <input key={`check-box${index}`} type="checkbox" className="check-box" onChange={() => this.props.changeComplete(index)} />
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
            <li><button className="statusButton" value="1" onClick={(e)=> this.props.lCheck(e)}>All</button></li>
            <li><button className="statusButton" value="2" onClick={(e) => this.props.lCheck(e)}>Active</button></li>
            <li><button className="statusButton" value="3" onClick={(e)=> this.props.lCheck(e)}>Completed</button></li>
          </ul>
        </nav>
        <span className="hideText">Clear Completed</span>
      </div>
        <div id="bookPagesImage"></div> <div id="bookPagesImage2"></div></div>}
     </React.Fragment>
    )
}
}



export default App;
