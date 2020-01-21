import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import { DefaultBackButton } from './DefaultBackButton';
import { usePushMenu } from './PushMenuContext';
import { Node } from './Node';
import slug from '../lib/slug';
import { getNodeChildren, getNodeTitle } from '../lib/helpers';

const Scroller = styled.div<{ open?: boolean }>`
  height: 100%;
  min-height: 640px;
  min-height: 100vh;
  overflow-y: scroll;
  position: relative;
  transition: all 0.5s;
  ${({ open }) =>
    open &&
    `
    transform: translate3d(308px, 0px, 0px)
  `}
`;

const ScrollerInner = styled.div`
  position: relative;
`;

const Menu = styled.div<{ open?: boolean }>`
  position: absolute; /* we can't use fixed here :( */
  top: 0;
  left: 0;
  z-index: 1;
  width: 300px;
  height: 100%;

  a {
    text-decoration: none;
    color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const PusherBase = styled.div`
  transition: all 0.5s;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    content: '';
    opacity: 0;
  }

  &::after {
    background: rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s, width 0.1s 0.3s, height 0.1s 0.3s;
  }
`;

const Pusher = styled(PusherBase)`
  position: relative;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 1;
  transition: opacity 0.3s;
`;

const Level = styled(PusherBase)`
  ::after {
    z-index: -1;
  }

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #336ca6;
  padding-left: 8px;
`;

export interface Props {
  children: React.ReactNode;
  backIcon: React.ReactNode;
  linkComponent?: Function;
  expanderComponent: Function;
  backComponent?: Function;
  onNodeClick?: Function;
  onMenuExpand?: Function;
  openOnMount?: Boolean;
}

export const PushMenu: React.FC<Props> = ({
  children,
  linkComponent,
  expanderComponent,
  backComponent: BackComponent = DefaultBackButton,
  backIcon,
  onNodeClick = () => {},
  onMenuExpand = () => {},
  openOnMount = false,
}) => {
  const menuContext = usePushMenu();
  const { propMap, nodes, visibleMenus, openMenu } = menuContext;
  const isOpen = visibleMenus.length > 0;

  React.useEffect(() => {
    if (openOnMount) {
      openMenu();
    }
  }, [openOnMount]);

  if (!isOpen) {
    return <>{children}</>;
  }

  return (
    <Pusher className={clsx(`rpm-mp-pusher`, { 'rpm-mp-pushed': isOpen })} id={`rpm-mp-pusher`}>
      <Menu id="rpm-mp-menu" className="rpm-mp-menu" open={isOpen}>
        {visibleMenus.map((menuNode: Record<string, any> = {}, level: number) => {
          const items = getNodeChildren(menuNode, propMap);

          return (
            <Level key={level} className={`rpm-mp-level rpm-mp-level-${level}`}>
              <div>
                <h2 className="rpm-mp-header">{level === 0 ? nodes.header : getNodeTitle(menuNode, propMap)}</h2>
                {level > 0 && (
                  <div className={`rpm-inline-block rpm-mp-back`}>
                    <BackComponent data={{ node: menuNode, ...menuContext }} backIcon={backIcon} />
                  </div>
                )}
              </div>

              {items.map((node: Record<string, any>, index: number) => {
                const nodeTitle = getNodeTitle(node, propMap);
                const key = node?.[propMap?.id] || `${slug(nodeTitle)}-${index}`;
                return (
                  <Node
                    key={key}
                    node={{ ...node, nodeTitle }}
                    linkComponent={linkComponent}
                    expanderComponent={expanderComponent}
                    onNodeClick={onNodeClick}
                    onMenuExpand={onMenuExpand}
                  />
                );
              })}
            </Level>
          );
        })}
      </Menu>

      <Scroller className="rpm-scroller" open={isOpen}>
        <ScrollerInner className="rpm-scroller-inner">{children}</ScrollerInner>
      </Scroller>
    </Pusher>
  );
};
