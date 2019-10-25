import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';

class ListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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

    if (this.state.valueInput !== '') {
      this.props.eItem(e, index, this.state.valueInput)
    } else {
      this.props.dItem(e, index)
    }

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

  changeValueInput(e, index) {
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
    //console.log("Before rendering: " + allItems)
    //console.log(this.state.changeValue)
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
        {onlyCorrectStatus[index] === false && <input readOnly={this.state.readOnly} type="text" key={`addedTodos${index}`} className="addedTodos noFocusColor" value={(onlyCorrectChange[index] === false) ? task : this.state.valueInput} onKeyPress={(e) => this.checkEnter(e)} onDoubleClick={(e) => this.editInput(e, index)} onChange={(e) => this.changeValueInput(e, index)} onBlur={(e) => this.noBubblingEditItem(e, index)} />}
        {onlyCorrectStatus[index] === true && <input readOnly={this.state.readOnly} type="text" key={`addedTodos${index}`} className="addedTodos strikeText noFocusColor" value={(onlyCorrectChange[index] === false) ? task : this.state.valueInput} onKeyPress={(e) => this.checkEnter(e)} onDoubleClick={(e) => this.editInput(e, index)} onChange={(e) => this.changeValueInput(e, index)} onBlur={(e) => this.noBubblingEditItem(e, index)} />}

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
          {todoCount > 1 && " items left"}
          <nav className="filterButtons">
            <ul id="todoSelect">
              <li><button className="statusButton" value="1" onClick={(e) => this.props.lCheck(e)}>All</button></li>
              <li><button className="statusButton" value="2" onClick={(e) => this.props.lCheck(e)}>Active</button></li>
              <li><button className="statusButton" value="3" onClick={(e) => this.props.lCheck(e)}>Completed</button></li>
            </ul>
          </nav>
          <span className="hideText">Clear Completed</span>
        </div>
          <div id="bookPagesImage"></div> <div id="bookPagesImage2"></div></div>}
      </React.Fragment>
    )
  }
}


ListItem.propTypes = {
  readOnly: PropTypes.bool,
  changeValue: PropTypes.bool,
  valueInput: PropTypes.string,
  noBubblingChangeComplete: PropTypes.func,
  noBubblingEditItem: PropTypes.func,
  noBubblingDeleteItem: PropTypes.func,
  editInput: PropTypes.func,
  checkEnter: PropTypes.func,
}


export default ListItem