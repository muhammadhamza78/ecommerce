export const schema = {
    types: [
      {
        name: 'product',
        title: 'Product',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'name',
              maxLength: 90,
            },
          },
          {
            name: 'price',
            title: 'Price',
            type: 'number',
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
          },
          {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
            },
            fields: [
              {
                name: 'alt',
                title: 'Alt Text',
                type: 'string',
              },
            ],
          },
          {
            name: 'stock',
            title: 'Stock',
            type: 'number',
          },
          {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
          },
        ],
      },
      {
        name: 'category',
        title: 'Category',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',

          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'name',
              maxLength: 90,
            },
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
    
          },
        ],
      },
    ],
  };
  