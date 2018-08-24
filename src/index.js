import React, {Component} from 'react';
import PropTypes from 'prop-types';
var mlPushMenu = require( './lib/mlpushmenu');
import slug from './lib/slug';
// import {ChevronRight} from 'react-icons/lib/fa';
import DefaultBackComponent from './DefaultBackButton';
import DefaultLinkComponent from './DefaultLinkComponent'

const defaultPropMaps = {
  displayName: 'name',
  linkClasses: 'classes',
  childPropName: 'children',
  expanderClasses: 'expClasses',
  url: 'url'
};

export default class PushMenu extends Component {
  constructor(props){
    super(props);
    this.classPrefix = 'rpm-';
    this.state = {
      pushInstance: null
    }
  }

  componentDidMount(){
    this.state.pushInstance = new mlPushMenu(
        document.getElementById( 'rpm-mp-menu' ),
        document.getElementById( this.props.menuTrigger),
        {
          type : this.props.type,
          open: this.props.isOpen,
          autoHide: this.props.autoHide,
          onMenuOpen: this.props.onMenuOpen,
          onMenuClose: this.props.onMenuClose,
        }
    );
    this.setState({pushInstance: this.state.pushInstance});
    this.props.getRef(this.state.pushInstance)
  }

  renderExpandLink = (nodeData) => {
    const ExpanderComponent = this.props.expanderComponent;
    const {node, nodeTitle, propMap} = nodeData;
    return (
      <span className={`rpm-node-exp rpm-inline-block`}>
        <ExpanderComponent
          data={nodeData}
        />
      </span>
    );
  }

  renderNode = (node, key, propMap) => {
    const hasChildren = node.children && node.children.length > 0;
    const nodeTitle = node[propMap.displayName];
    const nodeChildren = node[propMap.childPropName];
    const nodeData = {
      menu: this.state.pushInstance,
      node,
      propMap,
      rootNode: this.props.nodes
    };
    const LinkComponent = this.props.linkComponent || DefaultLinkComponent;
    return (
      <li key={`${slug(nodeTitle)}-${key}`}>
        <div className={`${this.classPrefix}node-cntr`} >
          <LinkComponent
            onNodeClick={this.props.onNodeClick}
            data={nodeData}
          />
          {hasChildren && this.renderExpandLink(nodeData) }
        </div>
        {nodeChildren && nodeChildren.length > 0 && this.renderSubMenu(nodeData)}
      </li>
    );
  }
  renderSubMenu = (nodeData) => {
    const {node, nodeTitle, propMap} = nodeData;
    const nodeChildren = node[propMap.childPropName];
    const { backComponent, backIcon } = this.props;
    const BackComponent = backComponent || DefaultBackComponent;
    return (
      <div className="rpm-mp-level">
        <h2>{nodeTitle}</h2>
        <div className={`rpm-inline-block ${this.classPrefix}mp-back`}>
          <BackComponent classPrefix={this.classPrefix} data={nodeData} backIcon={backIcon} />
        </div>
        <ul>
          {nodeChildren && nodeChildren.length > 0 && nodeChildren.map((node, key) => {
            return (
              this.renderNode(node, key, propMap)
            );
          })}
        </ul>
      </div>
    );
  }

  render(){
    const propMap = Object.assign({}, defaultPropMaps, this.props.propMap);
    const nodeChildren = this.props.nodes[propMap.childPropName] || [];
    return (
      <div className="rpm-container" id="rpm-container">
        <div className={`${this.classPrefix}mp-pusher`} id={`${this.classPrefix}mp-pusher`}>

          <nav id="rpm-mp-menu" className="rpm-mp-menu">
  					<div className="rpm-mp-level">
  						<div className="rpm-mp-header">{this.props.nodes.header}</div>
              <ul>
                {nodeChildren && nodeChildren.map((node, key) => {
                  return (
                    this.renderNode(node, key, propMap)
                  );
                })}
              </ul>


  					</div>
  				</nav>

          <div className="rpm-scroller">
  					<div className="rpm-scroller-inner">
              {this.props.children}
            </div>
          </div>

        </div>
      </div>
    );
  }
}


PushMenu.propTypes = {
  propMap: PropTypes.object,
  backIcon: PropTypes.node,
  forwardIcon: PropTypes.node,
  propMap: PropTypes.object,
  nodes: PropTypes.object,
  isOpen: PropTypes.bool,
  type: PropTypes.oneOf(['cover', 'overlap']),
  onNodeClick: PropTypes.func,
  getRef: PropTypes.func,
  menuTrigger: PropTypes.string,
  linkComponent: PropTypes.func,
  backComponent: PropTypes.func,
  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
  expanderComponent: PropTypes.func.isRequired
};

PushMenu.defaultProps = {
  propMap: defaultPropMaps,
  type: 'cover',
  menuTrigger: 'rpm-trigger',
  isOpen: false,
  getRef: () => {},
  onNodeClick: () => {},
  nodes: {},
  onMenuClose: () => {},
  onMenuOpen: () => {},
}
