import React from 'react';

class Button extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        clicked: false
      }
    }
      
    render(){
      const key = Object.keys(this.props.button)
      const id = Object.values(this.props.button)
      return(
        <div className='btn' id={id} onClick={this.props.click.bind(null,key)}>{key}</div>
      )
    }
  }

export default Button;