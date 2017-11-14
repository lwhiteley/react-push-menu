import React, {Component} from 'react';
import ChevronLeft from 'react-icons/lib/fa/chevron-left';

export default class DefaultBackComponent extends Component {
  render(){
    return (
        <a href="#">
          <ChevronLeft className={'rpm-back-item'} />
          <span className={'rpm-back-item'}>back</span>
        </a>
    );
  }
}
