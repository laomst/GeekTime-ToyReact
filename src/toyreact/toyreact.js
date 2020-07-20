export class Component {
  render() {
    throw new Error("请在子类中实现")
  }

  setAttribute(name, value) {
    this[name] = value
  }

  appendChild(child) {
    child.mount(this.render())
  }

  mount(parent) {
    this.render().mount(parent)
  }
}

/**
 * 因为是基于实dom的，所以最后的挂载动作和渲染动作最终都会递归到这个类的实例上
 */
class ElementWrapper extends Component {
  constructor(type) {
    super();
    this.root = document.createElement(type)
  }

  render() {
    return this.root
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild(vchild) {
    vchild.mount(this.render())
  }

  mount(parent) {
    parent.appendChild(this.render())
  }
}

class TextWrapper extends Component {
  constructor(content) {
    super();
    this.root = document.createTextNode(content)
  }

  render() {
    return this.root
  }

  mount(parent) {
    parent.appendChild(this.render())
  }
}


export const ToyReact = {
  createElement(type, attributes = {}, ...children) {
    console.log('====================================================================')
    console.log(type, attributes, children)
    let element;
    // 如果传进来的是个string，我们就认为它是一个html tag，就应该使用ElementWrapper进行包装
    if (typeof type === 'string') {
      element = new ElementWrapper(type)
    } else {
      element = new type
    }
    for (const [name, value] of Object.entries(attributes || {})) {
      element.setAttribute(name, value)
    }
    let insertChildren = (children) => {
      for (let child of children) {
        if (Array.isArray(child)) {
          insertChildren(child)
        } else {
          if (!(child instanceof Component)) {
            child = new TextWrapper(String(child))
          }
          element.appendChild(child)
        }
      }
    }
    insertChildren(children)
    return element
  },
  render(vdom, element) {
    vdom.mount(element)
  }
}