import '../styles/normalize.css';
import '../styles/component.css';
// import '../styles/icons.css';

import React from 'react'
import {render} from 'react-dom';
import PushMenu from '../src/index'

class Page extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      menu: {
        header: 'All Categories',
        children: [
          {
            name: 'About',
            id: 1,
            isOpen: true,
            children: [
              {name: 'Mission', id: 11, isOpen: false, children: []}
            ]
          },
          {name: 'Services', id: 2, isOpen: false, children: []},
          {name: 'People', id: 3, isOpen: false, children: []},
          {name: 'Careers', id: 4, isOpen: false, children: []},
          {name: 'Contact', id: 5, isOpen: false, children: []},
        ]
      }
    }
  }
  render(){
    return (
      <PushMenu
        nodes={this.state.menu}
        type={'cover'}
        propMap={{url: 'link'}}>

        <div className="rpm-trigger" id="rpm-trigger">trigger</div>
        
      </PushMenu>
    );
  }
}

let rootElement = document.getElementById('root');

render(
    <Page  />,
    rootElement
);
