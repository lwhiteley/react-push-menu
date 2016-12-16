import React, {Component, PropTypes} from 'react';
var mlPushMenu = require('./lib/mlpushmenu');
import slugify from 'slugify';
import ChevronRight from 'react-icons/lib/fa/chevron-right';
import DefaultBackComponent from './DefaultBackButton';

const defaultPropMaps = {
  displayName: 'name',
  linkClasses: 'classes',
  expanderClasses: 'expClasses',
  url: 'url'
};

export default class PushMenu extends Component {
  constructor(props){
    super(props);
    this.classPrefix = 'rpm-';
  }

  static propTypes = {
    propMap: PropTypes.object,
    nodes: PropTypes.object,
    type: PropTypes.oneOf(['cover', 'overlap']),
    menuTrigger: PropTypes.string
  };

  componentDidMount(){
    new mlPushMenu(
        document.getElementById( 'rpm-mp-menu' ),
        document.getElementById( this.props.menuTrigger),
        {
          type : this.props.type
        }
    );
  }

  renderExpandLink = (node, propMap) => {
    return (
      <span className={`rpm-node-exp rpm-inline-block`}>
        <ChevronRight />
      </span>
    );
  }

  renderNode = (node, key, propMap) => {
    const hasChildren = node.children && node.children.length > 0;
    const nodeTitle = node[propMap.displayName];
    return (
      <li key={`${slugify(nodeTitle)}-${key}`}>
        <div className={`${this.classPrefix}node-cntr`} >
          <a
            className={ `rpm-node-link rpm-inline-block ${node[propMap.linkClasses] || ''}` }
            href={node[propMap.url] || "#"}>
            {nodeTitle}
          </a>
          {hasChildren && this.renderExpandLink(node, propMap) }
        </div>
        {node.children && node.children.length > 0 && this.renderSubMenu(node, nodeTitle, propMap)}
      </li>
    );
  }
  renderSubMenu = (node, nodeTitle, propMap) => {
    const BackComponent = DefaultBackComponent;
    return (
      <div className="rpm-mp-level">
        <h2>{nodeTitle}</h2>
        <BackComponent classPrefix={this.classPrefix} />
        <ul>
          {node.children && node.children.length > 0 && node.children.map((node, key) => {
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
    return (
      <div className="rpm-container" id="rpm-container">
        <div className={`${this.classPrefix}mp-pusher`} id={`${this.classPrefix}mp-pusher`}>

          <nav id="rpm-mp-menu" className="rpm-mp-menu">
  					<div className="rpm-mp-level">
  						<h2 className="icon icon-world">{this.props.nodes.header}</h2>

              <ul>
                {this.props.nodes.children && this.props.nodes.children.map((node, key) => {
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
  menuTrigger: 'rpm-trigger'
}
