import React from 'react';
import '../App.css';
import ListItem from './ListItem'

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

   console.log("keycode: " + keycode)
    if (keycode === 13) {
     // console.log("WORKING")
      if (e.target.value !== '') {
        this.setState({
          listCount: this.state.listCount + 1,
          listItems: [...this.state.listItems, newItem],
          listCompleteStatus: [...this.state.listCompleteStatus, newStatus],
          listChange: [...this.state.listChange, defaultChange]
        })

        e.preventDefault();
      } else {
        e.preventDefault();
      }
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

   // console.log("deleteItem keycode: " + keycode)

  

      let filteredItems = this.state.listItems.filter((item, ind) => ind !== i)
      let filterCompleteStatus = this.state.listCompleteStatus.filter((item, ind) => ind !== i)
      let filterListChange = this.state.listChange.filter((item, ind) => ind !== i)
      let reduceCount = this.state.listCount - 1
   //   console.table(filteredItems)
   //   console.table(filterCompleteStatus)
   //   console.log("reduceCount: " + reduceCount)

   // console.log(typeof filteredItems)

      this.setState({
        listItems: filteredItems,
        listCompleteStatus: filterCompleteStatus,
        listCount: reduceCount,
        listChange: filterListChange
      });

  //    console.log("deleteItem index: " + i)
    if (this.state.listCount === 1) { 
      let checkAllSelector = document.getElementsByClassName('firstLabel')[0]
      checkAllSelector.classList.remove('firstLabelCheckAll')
    }
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

    if (this.state.listCount > 0) {
      if (this.state.checkAll === false) {
        console.log("checkboxAll state: " + this.state.checkAll)
        checkAll = this.state.listCompleteStatus;
        console.table(checkAll)
        checkAllComplete = checkAll.map((check, ind) => {
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
        e.target.classList.remove('firstLabelCheckAll')
      }
    }
   
  }

  changeInputValue(boolVal, i) {
   // console.log("changeInputValue is: " + boolVal)
   // console.log("chnageInputValue index is: " + i)
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








export default App;
