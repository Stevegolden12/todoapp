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
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
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
    //console.log("newItem: " + newItem)
    let keycode = e.keyCode ? e.keyCode : e.charCode;

 
    if (keycode === 13) {
     // console.log("WORKING")
      this.setState({
        listCount: this.state.listCount + 1,
        listItems: [...this.state.listItems, newItem],
        listCompleteStatus: [...this.state.listCompleteStatus, newStatus]
      })
      e.preventDefault();
    }   
   // console.log(newStatus)
   // console.table(this.state.listCompleteStatus)
  }
  
  changeCompleteStatus(e, index) {

    e.persist();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation(); 

    console.log(e.target)

    this.setState(prevState=>{
      const newComplete = [...prevState.listCompleteStatus];
      newComplete[index] = !newComplete[index];
      return { listCompleteStatus: newComplete };
    })

    let getChangeStatusElement = document.getElementsByClassName('hideText')[0]
    //console.log(!this.state.listCompleteStatus[index])
    
   
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

  deleteItem(e, i) {
    e.preventDefault();
 
    let filteredItems = this.state.listItems.filter((item, ind) => ind !== i)
    let filterCompleteStatus = this.state.listCompleteStatus.filter((item, ind)=> ind !== i)
    let reduceCount = this.state.listCount - 1
    console.table(filteredItems)
    console.table(filterCompleteStatus)
    console.log("reduceCount: " + reduceCount)

  this.setState({
    listItems: filteredItems,
    listCompleteStatus: filterCompleteStatus,
    listCount: reduceCount
  });

    console.log("deleteItem index: " + i)
  }

  editItem(e, i) {
    e.preventDefault();
    console.log("editItem function")
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
            <ListItem lCount={this.state.listCount} lItems={this.state.listItems} lFilter={this.state.listStatus} lStatus={this.state.listCompleteStatus} lCheck={this.setStatus} changeComplete={this.changeCompleteStatus} dItem={this.deleteItem} eItem={this.editItem} />
          </form>
        </section>
        <footer id="footerPage">
          <p className="footerPageText">Double-click to edit a todo</p>       
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
    let allItems = this.props.lItems;
    let onlyCorrectStatus = this.props.lStatus;
    /*  this.prop.lFilter has 3 ranges 1,2,3 and lStatus is boolean with true or false
     *  if statement to ignore all/1,
     *  make if statement to translate lStatus to either 0 or 1
     * 
     * */
    if (this.props.lFilter === 1) {
      
    } else if (this.props.lFilter === 2) {
      console.table(this.props.lStatus)
      allItems = this.props.lItems.filter((val, i) => this.props.lStatus[i] === false)
      onlyCorrectStatus = this.props.lStatus.filter((val, i) => val === false)
      console.log("TESTING ACTIVE")
      console.log(allItems)
    } else if (this.props.lFilter === 3) {
      allItems = this.props.lItems.filter((val, i) => this.props.lStatus[i] === true)
      onlyCorrectStatus = this.props.lStatus.filter((val, i) => val === true)
      console.log("TESTING COMPLETE")
      console.log(allItems)
    }
 
  let todoCount = this.props.lCount;
    //console.log("lFILTER: " + this.props.lFilter)


    //console.table(this.props.lStatus)

    items = allItems.map((task, index) =>  
        
        <div key={`todoWrapper${index}`} id={index} className="todoWrapper">
          <label key={`container${index}`} className="container">
          <div key={`checkWrapper${index}`} id="checkWrapper">
            {onlyCorrectStatus[index] === false && <input key={`check-box${index}`} type="checkbox" className="check-box" onChange={(e) => this.props.changeComplete(e, index)} />}
            {onlyCorrectStatus[index] === true && <input key={`check-box${index}`} type="checkbox" className="check-box" checked onChange={(e) => this.props.changeComplete(e, index)} />}
              <span key={`checkmark${index}`} className="checkmark"></span>
          </div>  
          <div key={`addedTodos${index}`} className="addedTodos" onDoubleClick={(e)=>this.props.eItem(e, index)}>{task}</div>
          <div key={`deleteButtonWrapper${index}`} className="deleteButtonWrapper">
            <button key={`deleteButton${index}`} className="deleteButton" onClick={(e) => this.props.dItem(e, index)}>X</button>
          </div>
        </label>
        </div>
    )  



  return (
    <React.Fragment>   
        {items}
      {todoCount > 0 && <div id="todoInfoWrapper"><div id="todoInfo">{todoCount} 
        {todoCount === 1 && " item left"}
        {todoCount >1 && " items left"}
        <nav className="filterButtons">
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
