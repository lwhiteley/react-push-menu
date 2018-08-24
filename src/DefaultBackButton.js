import React, {Component} from 'react';
// import {ChevronLeft} from 'react-icons/fa';

export default class DefaultBackComponent extends Component {
  render(){
    const {backIcon} = this.props;
    return (
        <a href="#">
          <span className={'rpm-back-item'} >
            {backIcon}
          </span>
          <span className={'rpm-back-item'}>back</span>
        </a>
    );
  }
}
