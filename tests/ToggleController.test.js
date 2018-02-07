import React from 'react';
import { mount } from 'enzyme';
import ToggleController from '../src/ToggleController';

const items = [
  { id: 'cl', name: 'Chile', capitalCity: 'Santiago' },
  { id: 'cu', name: 'Cuba', capitalCity: 'Havana' },
  { id: 'us', name: 'USA', capitalCity: 'Washington' },
];

const render = ({ isOn, onToggle, getLabel }) =>
  items.map(item => {
    const isChecked = isOn(item);
    return (
      <label
        key={item.id}
        className={isChecked ? 'checked' : 'unchecked'}
        onClick={() => onToggle(item)}
      >
        {getLabel ? getLabel(item) : item.name}
      </label>
    );
  });

describe('ToggleController', () => {
  it('toggles on and off per id', () => {
    const wrapper = mount(<ToggleController>{render}</ToggleController>);
    expect(wrapper.find('.checked')).toHaveLength(0);
    wrapper
      .find('label')
      .at(0)
      .simulate('click');
    expect(wrapper.find('.checked')).toHaveLength(1);
    expect(wrapper.find('.checked').text()).toEqual('Chile');
    wrapper
      .find('label')
      .at(2)
      .simulate('click');
    expect(wrapper.find('.checked')).toHaveLength(2);
    expect(wrapper.find('.unchecked').text()).toEqual('Cuba');
    wrapper
      .find('label')
      .at(0)
      .simulate('click');
    expect(wrapper.find('.checked').text()).toEqual('USA');
  });

  it('passes on any extra props to the render prop', () => {
    const wrapper = mount(
      <ToggleController getLabel={item => item.capitalCity}>
        {render}
      </ToggleController>
    );
    expect(
      wrapper
        .find('label')
        .at(0)
        .text()
    ).toEqual('Santiago');
  });
});
