import React from 'react';
import styled from 'styled-components';

import { DefaultBackButton } from './DefaultBackButton';
import { usePushMenu } from './PushMenuContext';
import { Node } from './Node';
import slug from '../lib/slug';

// const menuEnter = keyframes`
//   from {
//     transform: translate3d(-100%, 0, 0);
//   }

//   to {
//     transform: translate3d(0, 0, 0);
//   }
// `;

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
  /* transform: translate3d(-100%, 0, 0); */
`;

export interface Props {
  children: React.ReactNode;
  backIcon: React.ReactNode;
  linkComponent?: Function;
  expanderComponent: Function;
  backComponent?: Function;
  onNodeClick?: Function;
}

export const PushMenu: React.FC<Props> = ({
  children,
  linkComponent,
  expanderComponent,
  backComponent: BackComponent = DefaultBackButton,
  backIcon,
  onNodeClick = () => {},
}) => {
  const { propMap, nodes, visibleMenus } = usePushMenu();
  const isOpen = visibleMenus.length > 0;

  if (!isOpen) {
    return <>{children}</>;
  }

  return (
    <Pusher className={`rpm-mp-pusher`} id={`rpm-mp-pusher`}>
      <Menu id="rpm-mp-menu" className="rpm-mp-menu" open={isOpen}>
        <div>
          {visibleMenus.map((child: Record<string, any> = {}, level: number) => {
            const items = (child && child[(propMap || {}).childPropName]) || [];

            return (
              <div key={level}>
                <Level className="rpm-mp-level">
                  <div>
                    <h2>{level === 0 ? nodes.header : child.nodeTitle}</h2>
                    {level > 0 && (
                      <div className={`rpm-inline-block rpm-mp-back`}>
                        <BackComponent data={{ child, propMap }} backIcon={backIcon} />
                      </div>
                    )}
                  </div>

                  {items.map((node: Record<string, any>, index: number) => {
                    const nodeTitle = node[propMap.displayName];
                    const key = node[propMap.id] || `${slug(nodeTitle)}-${index}`;
                    return (
                      <Node
                        key={key}
                        node={{ ...node, nodeTitle }}
                        index={index}
                        linkComponent={linkComponent}
                        expanderComponent={expanderComponent}
                        onNodeClick={onNodeClick}
                      />
                    );
                  })}
                </Level>
              </div>
            );
          })}
        </div>
      </Menu>

      <Scroller className="rpm-scroller" open={isOpen}>
        <ScrollerInner className="rpm-scroller-inner">{children}</ScrollerInner>
      </Scroller>
    </Pusher>
  );
};
