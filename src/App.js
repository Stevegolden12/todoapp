import React from 'react';
import './App.css';

/*
 *Need to add an array in probably parent state to check which input we are on
 * When adding todo add one in the array
 * When deleting todo remove one in the array
 * Change input to reflect this
 * */


class App extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      listCount: 0,
      listItems: [],
      listCompleteStatus: [],
      listStatus: 0,
      checkAll: false,
      listChange: []
    }

    this.addItem = this.addItem.bind(this);
    this.changeCompleteStatus = this.changeCompleteStatus.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.checkboxAll = this.checkboxAll.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.listCompleteStatus !== prevProps.listCompleteStatus) {
      this.fetchData(this.props.listCompleteStatus);
    }
    if (this.props.changeValue !== prevProps.changeValue) {
      this.fetchData(this.props.changeValue);
    }
  }

  
  addItem(e) {
    
    let newItem = e.target.value; 
    let newStatus = false;
    let defaultChange = false
    //console.log("newItem: " + newItem)
    let keycode = e.keyCode ? e.keyCode : e.charCode;

 
    if (keycode === 13) {
     // console.log("WORKING")
 
      this.setState({
        listCount: this.state.listCount + 1,
        listItems: [...this.state.listItems, newItem],
        listCompleteStatus: [...this.state.listCompleteStatus, newStatus],
        listChange: [...this.state.listChange, defaultChange]
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

    this.setState(prevState=>{
      const newComplete = [...prevState.listCompleteStatus];
      newComplete[index] = !newComplete[index];
      return { listCompleteStatus: newComplete };
    })

    let getChangeStatusElement = document.getElementsByClassName('hideText')[0]
    //console.log(!this.state.listCompleteStatus[index])
    let striketodoText = document.getElementsByClassName('addedTodos')[index]
   
    if (!this.state.listCompleteStatus[index] === true) {
      getChangeStatusElement.classList.add("showText")
      striketodoText.classList.add('strikeText')
    } else {
      getChangeStatusElement.classList.remove("showText")
      striketodoText.classList.remove('strikeText')
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

    let keycode = e.keyCode ? e.keyCode : e.charCode;

    console.log("deleteItem keycode: " + keycode)

  

      let filteredItems = this.state.listItems.filter((item, ind) => ind !== i)
      let filterCompleteStatus = this.state.listCompleteStatus.filter((item, ind) => ind !== i)
      let filterListChange = this.state.listChange.filter((item, ind) => ind !== i)
      let reduceCount = this.state.listCount - 1
      console.table(filteredItems)
      console.table(filterCompleteStatus)
    console.log("reduceCount: " + reduceCount)

    console.log(typeof filteredItems)

      this.setState({
        listItems: filteredItems,
        listCompleteStatus: filterCompleteStatus,
        listCount: reduceCount,
        listChange: filterListChange
      });

      console.log("deleteItem index: " + i)

  }

  editItem(e, i, changedValue) {

      let allItems = this.state.listItems;
      allItems[i] = changedValue;
      console.table("editItem: " + allItems)

    this.setState({
        listItems: allItems,        
      })
  
     console.table(this.state.listItems)
  }

  checkboxAll(e) {
    let checkAll;
    let checkAllComplete;

  
    if (this.state.checkAll === false) {
      console.log("checkboxAll state: " + this.state.checkAll)
      checkAll = this.state.listCompleteStatus;
      console.table(checkAll)
      checkAllComplete = checkAll.map((check, ind) =>{
        return checkAll[ind] = true
      })
      
      this.setState({
        listCompleteStatus: checkAllComplete,
        checkAll: true,
      })
      e.target.classList.add('firstLabelCheckAll')
    } else {
      checkAll = this.state.listCompleteStatus;
      checkAllComplete = checkAll.map((check, ind) => {
        return checkAll[ind] = false
      })
      this.setState({
        listCompleteStatus: checkAllComplete,
        checkAll: false,
      })
      e.target.classList.remove('firstLabelCheckAll')    }
   
  }

  changeInputValue(boolVal, i) {
    console.log("changeInputValue is: " + boolVal)
    console.log("chnageInputValue index is: " + i)
    let newChangeValue = this.state.listChange;
    newChangeValue[i] = boolVal;


    this.setState({
      listChange: newChangeValue
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
              <label className="firstLabel" onClick={(e)=>this.checkboxAll(e)}></label>
              <input type="text" id="firstInput" placeholder="What needs to be done?" onKeyPress={this.addItem}></input>
            </div>
            <ListItem lCount={this.state.listCount} lItems={this.state.listItems} lFilter={this.state.listStatus} lStatus={this.state.listCompleteStatus} lCheck={this.setStatus} changeComplete={this.changeCompleteStatus} dItem={this.deleteItem} eItem={this.editItem} lChange={this.state.listChange} lChangeFunc={this.changeInputValue} />
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

      this.state={
        readOnly: true,
        changeValue: false,
        valueInput: '',
    }

    this.noBubblingChangeComplete = this.noBubblingChangeComplete.bind(this);
    this.noBubblingEditItem = this.noBubblingEditItem.bind(this);
    this.noBubblingDeleteItem = this.noBubblingDeleteItem.bind(this);
    this.editInput = this.editInput.bind(this);
    this.checkEnter = this.checkEnter.bind(this);

  }

  noBubblingChangeComplete(e, index) {
    e.persist();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation(); 

    this.props.changeComplete(e, index)
  }

  noBubblingEditItem(e, index) {
    e.preventDefault();
    e.persist();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();  
  
    this.props.eItem(e, index, this.state.valueInput)
    this.setState({
      changeValue: false,
      readOnly: true
    })
    e.target.classList.add('noFocusColor')
    this.props.lChangeFunc(false, index)
  }  

  noBubblingDeleteItem(e, index) {
   
 
    this.props.dItem(e, index)

  }

  editInput(e, index) {
 
    e.target.classList.remove('noFocusColor')  
    console.log("editINput index: " + index)
    this.props.lChangeFunc(true, index);
    console.log("should be True: " + this.props.lChange)
    
    this.setState({
      changeValue: true,
      readOnly: false,     
    })

    console.log("editInput readOnly: " + this.state.readOnly)

  }

  checkEnter(e) {
    var code = e.keyCode || e.which;
  
    if (code === 13) { 
      document.getElementById('firstInput').focus();
      e.preventDefault();   
    }  
  }

  changeValueInput(e) {
    this.setState({
      valueInput: e.target.value
    })
  }


  
  render() { 
    let items = <h1>No Matches found</h1>;
    let allItems = this.props.lItems;
    let onlyCorrectStatus = this.props.lStatus;
    let onlyCorrectChange = this.props.lChange;
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
      onlyCorrectChange = this.props.lChange.filter((val, i) => this.props.lStatus[i] === false)
      console.log("TESTING ACTIVE")
      console.log(allItems)
    } else if (this.props.lFilter === 3) {
      allItems = this.props.lItems.filter((val, i) => this.props.lStatus[i] === true)
      onlyCorrectStatus = this.props.lStatus.filter((val, i) => val === true)
      onlyCorrectChange = this.props.lChange.filter((val, i) => this.props.lStatus[i] === true)
      console.log("TESTING COMPLETE")
      console.log(allItems)
    }
 
  let todoCount = this.props.lCount;
    //console.log("lFILTER: " + this.props.lFilter)


    //console.table(this.props.lStatus)
    console.log("Before rendering: " + allItems)
    console.log(this.state.changeValue)
    items = allItems.map((task, index) =>  
    
      <div key={`todoWrapper${index}`} id={index} className="todoWrapper">
        <div key={`container${index}`} className="container">
          <label key={`checkboxLabel${index}`} className="checkboxLabel">         
          <div key={`checkWrapper${index}`} id="checkWrapper">
              {onlyCorrectStatus[index] === false && <input key={`check-box${index}`} type="checkbox" className="check-box" onChange={(e) => this.noBubblingChangeComplete(e, index)} />}
              {onlyCorrectStatus[index] === true && <input key={`check-box${index}`} type="checkbox" className="check-box" checked onChange={(e) => this.noBubblingChangeComplete(e, index)} />}
              <span key={`checkmark${index}`} className="checkmark"></span>
          </div>  
          </label>
        </div>
        {onlyCorrectStatus[index] === false && <input readOnly={this.state.readOnly} type="text" key={`addedTodos${index}`} className="addedTodos noFocusColor" value={(onlyCorrectChange[index] === false) ? task : this.state.valueInput} onKeyPress={(e) => this.checkEnter(e)} onDoubleClick={(e) => this.editInput(e, index)} onChange={(e)=>this.changeValueInput(e)} onBlur={(e) => this.noBubblingEditItem(e, index)} />}
        {onlyCorrectStatus[index] === true && <input readOnly={this.state.readOnly} type="text" key={`addedTodos${index}`} className="addedTodos strikeText noFocusColor" value={(onlyCorrectChange[index] === false) ? task : this.state.valueInput} onKeyPress={(e) => this.checkEnter(e)} onDoubleClick={(e) => this.editInput(e, index)} onChange={(e) => this.changeValueInput(e)} onBlur={(e) => this.noBubblingEditItem(e, index)} />}
        
        <div key={`deleteButtonWrapper${index}`} className="deleteButtonWrapper">
              <button key={`deleteButton${index}`} className="deleteButton" onClick={(e) => this.noBubblingDeleteItem(e, index)}>X</button>
            </div>
         
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
