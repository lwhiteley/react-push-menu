import React, {Component, PropTypes} from 'react';
import ChevronLeft from 'react-icons/lib/fa/chevron-left';

export default class DefaultBackComponent extends Component {
  render(){
    return (
      <div>
        <a className={`rpm-inline-block ${this.props.classPrefix}mp-back`} href="#">
          <ChevronLeft className={'rpm-back-item'} />
          <span className={'rpm-back-item'}>back</span>
        </a>
      </div>
    );
  }
}
