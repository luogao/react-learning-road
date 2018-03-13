import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';
import Search from './Search';
import Button from './Button';
import Table from './Table';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });


describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <App />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Search', () => {
  const props = {
    value: '',
    onChange() { console.log(1) },
    onSubmit() { console.log(1) }
  }
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search {...props}> Search </Search>, div)
  })

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search {...props}> Search </Search>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Button', () => {
  const props = {
    onClick() { console.log(1) }
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button {...props}>Give Me More</Button>, div);
  });
  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button {...props}>Give Me More</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' }
    ],
    onDismiss() { console.log(1) },
    sortKey: 'TITLE',
    isSortReverse: false,
  }

  it('shows two items in list', () => {
    const element = shallow(
      <Table {...props} />
    )
    expect(element.find('.table-row').length).toBe(2);
  })

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table {...props} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})