import {Theme} from '@/classes/theme'

export const themes: Theme[] = [{
  id: 'one-dark',
  name: 'One Dark',
  schemes: [{
    id: 'default',
    name: 'Default',
    hex: '#98c379',
  },
    {
      id: 'blue',
      name: 'Blue',
      hex: '#5b98ff',
    }
  ],
  modes: [{
    id: 'dark',
    name: 'Dark',
  }, {
    id: 'light',
    name: 'Light',
  }],
}, {
  id: 'citrine',
  name: 'Citrine',
  schemes: [{
    id: 'green',
    name: 'green',
    hex: '#14cc4b'
  }, {
    id: 'yellow',
    name: 'yellow',
    hex: '#F8D648'
  }, {
    id: 'pink',
    name: 'pink',
    hex: '#ffb8c1'
  }, {
    id: 'purple',
    name: 'purple',
    hex: '#ff2070'
  }, {
    id: 'blue',
    name: 'blue',
    hex: '#5b98ff'
  }],
  modes: [{
    id: 'light',
    name: 'Light',
  }, {
    id: 'dark',
    name: 'Dark',
  }],
}]
