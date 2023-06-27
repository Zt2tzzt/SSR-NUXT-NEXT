import React, { PureComponent } from 'react'

export class LifecycleClass extends PureComponent {
  constructor(props: any) {
    super(props)
    console.log('constructor~')
  }

  UNSAFE_componentWillMount(): void {
    console.log('UNSAFE_componentWillMount~')
  }

  componentDidMount(): void {
    console.log('componentDidMount~')
  }

  componentWillUnmount(): void {
    console.log('componentWillUnmount~')
  }

  render() {
    console.log('render~');
    
    return <div>LifecycleClass</div>
  }
}

export default LifecycleClass
