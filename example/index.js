import '../styles/normalize.css';
import '../styles/component.css';
import './demo.css';
// import '../styles/icons.css';

import React from 'react'
import {render} from 'react-dom';
import PushMenu from '../src/index'
import Bars from 'react-icons/lib/fa/bars';

import Link from './LinkComponent';

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
            link: '/about',
            children: [
              {name: 'Mission', id: 11, link: null, children: []},
              {name: 'Objectives', id: 12, link: null, children: []},
              {
                name: 'Goals',
                id: 13,
                link:
                '/about/goals',
                children: [
                  {name: 'Charity', id: 131, link: null, children: []},
                  {name: 'Clean Environment Plan', id: 132, link: null, children: []},
                ]
              }
            ]
          },
          {name: 'Services', id: 2, link: '/services', children: []},
          {name: 'People', id: 3, link: '/people', children: []},
          {name: 'Careers', id: 4, link: '/careers', children: []},
          {name: 'Contact', id: 5, link: null, children: []},
        ]
      }
    }
  }
  render(){
    return (
      <PushMenu
        onNodeClick={(e, data) => {
          console.log(data);
          data.menu.tools.reset();
        }}
        linkComponent={Link}
        isOpen={false}
        nodes={this.state.menu}
        type={'cover'}
        propMap={{url: 'link'}}>

        <div className="rpm-trigger" id="rpm-trigger" >
          <Bars />
        </div>

      </PushMenu>
    );
  }
}

let rootElement = document.getElementById('root');

render(
    <Page  />,
    rootElement
);
