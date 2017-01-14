import React, {Component, PropTypes} from 'react';
var mlPushMenu = require( './lib/mlpushmenu');
import slug from 'simple-slug';
import ChevronRight from 'react-icons/lib/fa/chevron-right';
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

  static propTypes = {
    propMap: PropTypes.object,
    nodes: PropTypes.object,
    isOpen: PropTypes.bool,
    type: PropTypes.oneOf(['cover', 'overlap']),
    onNodeClick: PropTypes.func,
    getRef: PropTypes.func,
    menuTrigger: PropTypes.string,
    linkComponent: PropTypes.func,
    backComponent: PropTypes.func,
    expanderComponent: PropTypes.func
  };

  componentDidMount(){
    this.state.pushInstance = new mlPushMenu(
        document.getElementById( 'rpm-mp-menu' ),
        document.getElementById( this.props.menuTrigger),
        {
          type : this.props.type,
          open: this.props.isOpen
        }
    );
    this.setState({pushInstance: this.state.pushInstance});
    this.props.getRef(this.state.pushInstance)
  }

  renderExpandLink = (nodeData) => {
    const ExpanderComponent = this.props.expanderComponent || ChevronRight;
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
    const BackComponent = this.props.backComponent || DefaultBackComponent;
    return (
      <div className="rpm-mp-level">
        <h2>{nodeTitle}</h2>
        <div className={`rpm-inline-block ${this.classPrefix}mp-back`}>
          <BackComponent classPrefix={this.classPrefix} data={nodeData} />
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
    const nodeChildren = this.props.nodes[propMap.childPropName];
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

PushMenu.defaultProps = {
  propMap: defaultPropMaps,
  type: 'overlap',
  menuTrigger: 'rpm-trigger',
  isOpen: false,
  getRef: () => {},
  onNodeClick: () => {}
}
