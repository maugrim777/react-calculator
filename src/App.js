import React from 'react';
import Button from './Button';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      formula: '',
      current: '0',
      previous: '',
      currentType: '',
    }
    
    this.click=this.click.bind(this);
    this.handleOperator=this.handleOperator.bind(this);
    this.handleEqual=this.handleEqual.bind(this)
    this.handleNumber=this.handleNumber.bind(this)
    this.handleClear=this.handleClear.bind(this)
    this.handleDecimal=this.handleDecimal.bind(this)
    this.execute=this.execute.bind(this)
    this.limit=this.limit.bind(this)
    
  }
  
  limit() {
    this.setState({current: 'Digit Limit Reached'})
  }
  
  execute(expression) {
    const result = Function('"use strict";return ' + expression)()
    // const check = toString(result)
    if (result=== parseInt(result)) {return parseInt(result)
    } else {
      const str=(result-parseInt(result)).toString()
      if (str.length<6) {
        return result.toFixed(str.length-2)
      } else {
        return result.toFixed(4)
      }
    }
    
  }
  
  handleOperator(key) {
    const operators = ['-','+','/','*']
    if (key === 'X') {key='*'}
    if (this.state.current === '0') {return}
    if (this.state.previous === 'operator' && key==='-' && this.state.formula[this.state.formula.length-1] !== '-') {
      this.setState(
      {
        formula: this.state.formula+key,
        current: key,
        previous: 'operator'
      }
      )
    } 
    
    else if (this.state.previous === 'operator' && this.state.formula[this.state.formula.length-1] === '-' && operators.includes(this.state.formula[this.state.formula.length-2]) ) {
      this.setState(
      {
        formula: this.state.formula.slice(0, this.state.formula.length-2) +key,
        current: key,
        previous: 'operator'
      }
      )
    } 
    
    else if (this.state.previous === 'operator' ) {
      this.setState(
      {
        formula: this.state.formula.slice(0, this.state.formula.length-1)+key,
        current: key,
        previous: 'operator'
      }
      )
    } else if (this.state.previous === 'equal') {
        this.setState(
        {
          formula: this.state.current+key,
          current: key,
          previous: 'operator'
        }
        )
      
    } else {
      this.setState(
      {
        formula: this.state.formula+key,
        current: key,
        previous: 'operator'
      }
      )
    }
    
  }
  
  handleEqual() {
    this.setState(
      {
        formula: this.state.formula+'='+this.execute(this.state.formula),
        current: this.execute(this.state.formula),
        previous: 'equal'        
      }
    ) 
  }
  
  handleNumber(key) {
    if (this.state.previous === 'operator') {
      this.setState(
      {
        formula: this.state.formula+key,
        current: key,
        previous: 'number'
      }
      )
    } else if (this.state.previous === 'equal') {
        this.setState(
      {
        formula: key,
        current: key,
        previous: 'number'
      }
      )                    
    } else if (this.state.current === '0' && key==='0') {
        this.setState(
      {
        formula: key,
        current: key,
        previous: 'number'
      }
      )
    } else if (this.state.current === '0.') {
      this.setState(
      {
        formula: (this.state.formula+key),
        current: (this.state.current + key),
        previous: 'number'
      }
      )
    }
    else {
      this.setState(
      {
        formula: (this.state.formula+key),
        current: (this.state.current + key).replace(/^0+/, ''),
        previous: 'number'
      }
      )
    }
  }
  
  handleClear() {
    this.setState({formula:'', current:'0', previous: '', currentType:''})
  }
  
  handleDecimal() {
    if (this.state.previous === 'equal') {
        this.setState(
        {
          formula: '0.',
          current: '0.',
          previous: 'decimal'
        }
      )
    }
      
    if (this.state.current.includes('.')) {
    } else if (this.state.previous === 'number') {
      console.log('hit2')
      this.setState(
        {
          formula: this.state.formula+'.',
          current: this.state.current+'.',
          previous: 'decimal'
        }
      )
    
    } else {
      this.setState(
        {
          formula: this.state.formula+'0.',
          current: this.state.current+'0.',
          previous: 'decimal'
        }
      )
    } 
  }
  
  
  click(key) {
    if (this.state.current.length >=15 && key[0]!='AC') {
      this.limit()
    } else {
      switch(key[0]){
      case 'AC' : this.handleClear(); break;
      case '/': case 'X': case '-': case '+': this.handleOperator(key[0]);break;
      case '=': this.handleEqual();break;
      case '.': this.handleDecimal();break;
      default: this.handleNumber(key[0]);
      }
    } 
  };
  
  render() {
    return(
      <div id='container'>
        <div id='disp'>
          <div className='disp'  id='formula'>{this.state.formula || ''}</div>
          <div className='disp' id='display'>{this.state.current}</div>
          
        </div>
        <div id='pad'>
          {this.props.buttons.map((key) => (
            <Button button={key} click={this.click}/>
          ))}
          
        </div>
      </div>
      
    )
  }
}

export default App;
