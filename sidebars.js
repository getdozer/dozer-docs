/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    'dozer',
    'architecture',
    'installation',

    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'doc',
        id: 'getting_started',
      },
      collapsed: true,
      items: [
        {
          type: 'html',
          value: 'DOZER CORE',
          defaultStyle: false,
          className: 'sidebar-item-group',
          customProps: {
            id: 'dozer-core',
          },
        },
        'getting_started/core/connecting-to-sources',
        'getting_started/core/adding-transformations',
        'getting_started/core/querying-data'
        // {
        //   type: 'html',
        //   value: 'DOZER CLOUD',
        //   defaultStyle: false,
        //   className: 'sidebar-item-group',
        //   customProps: {
        //     id: 'dozer-cloud',
        //   },
        // },
        // 'getting_started/cloud/installation',
      ]
    },

    'cli-reference',

    {
      type: 'category',
      label: 'Configuration',
      link: {
        type: 'doc',
        id: 'configuration',
      },
      collapsed: true,
      items: [
        'configuration/data-sources',
        'configuration/transformations',
        'configuration/api-endpoints',
        'configuration/other',
        'configuration/flags',
      ]
    },


    {
      type: 'category',
      label: 'Data Sources',
      link: {
        type: "generated-index",
        title: "Data Sources"
      },
      collapsed: true,
      items: [
        'sources/postgres',
        'sources/mongodb',
        'sources/mysql',
        'sources/snowflake',
        'sources/kafka',
        'sources/object-stores',
        'sources/ethereum',
        'sources/grpc',
      ],
    },

    {
      type: 'category',
      label: 'Transforming Data using SQL',
      link: {
        type: 'doc',
        id: 'transforming-data',
      },
      items: [
        'transforming-data/data-types',
        'transforming-data/operators',
        'transforming-data/scalar-functions',
        'transforming-data/aggregation-functions',
        'transforming-data/geospatial',
        'transforming-data/json',
        'transforming-data/windowing'
      ]
    },


    {
      type: 'category',
      label: 'Accessing Data',
      link: {
        type: 'doc',
        id: 'accessing-data',
      },
      items: [
        'accessing-data/rest',
        'accessing-data/typesafe-grpc',
        'accessing-data/common-grpc',
        'accessing-data/query-format',
        'accessing-data/authorization'
      ]
    },
    {
      type: 'category',
      label: 'Deployment',
      link: {
        type: 'doc',
        id: 'deployment',
      },
      items: []
    }

   
  ],
};

module.exports = sidebars;
