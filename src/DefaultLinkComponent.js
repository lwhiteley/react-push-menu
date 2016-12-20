import React, {Component} from 'react';

export default class DefaultLinkComponent extends Component {
  render(){
    const {propMap, node} = this.props.data;
    const nodeTitle = node[propMap.displayName];
    return (
      <a
        onClick={(e) => {
          this.props.onNodeClick(e, this.props.data);
        }}
        className={ `rpm-node-link rpm-inline-block ${node[propMap.linkClasses] || ''}` }
        href={node[propMap.url] || "#"}>
        {nodeTitle}
      </a>
    );
  }
}
