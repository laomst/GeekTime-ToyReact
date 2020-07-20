import {ToyReact, Component} from './toyreact/toyreact'

class MyComponent extends Component{
  constructor() {
    super();
    this.root = <div>
      <span>Hello </span>
      <span>World !</span>
    </div>
  }
  render() {
    return this.root
  }
}

let a = <div name="a" id="ida">
  <MyComponent name="child">
  </MyComponent>
</div>

ToyReact.render(a, document.getElementById("app"))