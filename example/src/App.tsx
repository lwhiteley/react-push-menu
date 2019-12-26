import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import Link from './LinkComponent';
import Content from './Content';
import { PushMenu } from './reactComponentLib';

function App() {
  const data = {
    menu: {
      header: 'All Categories',
      children: [
        {
          name: 'About',
          id: 1,
          link: '/about',
          children: [
            { name: 'Mission', id: 11, link: null, children: [] },
            { name: 'Objectives', id: 12, link: null, children: [] },
            {
              name: 'Goals',
              id: 13,
              link: '/about/goals',
              children: [
                { name: 'Charity', id: 131, link: null, children: [] },
                { name: 'Clean Environment Plan', id: 132, link: null, children: [] },
              ],
            },
          ],
        },
        { name: 'Services', id: 2, link: '/services', children: [] },
        { name: 'People', id: 3, link: '/people', children: [] },
        { name: 'Careers', id: 4, link: '/careers', children: [] },
        { name: 'Contact', id: 5, link: null, children: [] },
      ],
    },
  };

  return (
    <PushMenu
      backIcon={<FaChevronLeft />}
      expanderComponent={FaChevronRight}
      // onNodeClick={(e, { menu, node }) => {
      //   console.log(node);
      //   menu.tools.reset();
      // }}
      linkComponent={Link}
      // isOpen={false}
      nodes={data.menu}
      // type={'cover'}
      propMap={{ url: 'link' }}
    >
      <Content />
    </PushMenu>
  );
}

export default App;
