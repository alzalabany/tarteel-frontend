import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import MenuItem from './menuItem';

const DropDownContainer = styled.div`
  position: relative;
  width: 200px;
  > *:first-child {
    margin: 0;
    margin-bottom: 0;
  }
`;

const DropDownMenu = styled.ul`
  background-color: #fff;
  border: 1px solid #ccc;
  display: flex;
  flex-flow: column nowrap;
  flex-bases: 100%;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  height: ${({ visible }) => (visible ? '20rem' : '0')};
  overflow: auto;
  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
  position: absolute;
  right: 0;
  width: 100%;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: none;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.11), 0 3px 10px rgba(0, 0, 0, 0.05),
    0 2px 3px rgba(0, 0, 0, 0.06);
  color: #5a6169;
  list-style: none;
`;

DropDownMenu.propTypes = {
  visible: T.bool.isRequired,
};

DropDownMenu.defaultProps = {
  visible: false,
};

const Divider = styled.li`
  background-color: #e9ecef;
  max-height: 2px;
  display: block;
  clear: both;
  width: 100%;
  padding: 0;
  margin: 0;
  min-height: 2px;
`;

/**
 * Usage:
 * 
 * ``` 
  <DropDown 
    onSelect={console.table} 
    items={[{label:'one',icon:<Fa500Px />, to:'/home'}]}
    render={fn?}>
    {(toggle)=><h4 onClick={toggle} > open </h4>}
  </DropDown>
   ```
 */

class DropDown extends React.PureComponent {
  state = { open: false };
  componentWillUnmount() {
    this.stop();
  }
  toggle = () =>
    this.setState({ open: !this.state.open }, () => {
      this.state.open ? this.start() : this.stop();
    });
  onSelect(item, event) {
    const { onSelect } = this.props;
    // event.preventDefault();
    event.stopPropagation();

    onSelect && onSelect(item);
  }

  start = () => document.addEventListener('click', this.toggle);
  stop = () => document.removeEventListener('click', this.toggle);

  render() {
    const { items, renderItem, children } = this.props;
    const { open } = this.state;

    return (
      <DropDownContainer>
        {children(this.toggle)}
        <DropDownMenu visible={open}>
          {renderItem
            ? items.map(renderItem)
            : items.map(({ divider, ...item }, idx) =>
                divider ? (
                  <Divider key={idx} />
                ) : (
                  <MenuItem
                    key={item.label}
                    {...item}
                    onClick={this.onSelect.bind(this, item)}
                  />
                )
              )}
        </DropDownMenu>
      </DropDownContainer>
    );
  }
}

DropDown.protoTypes = {
  onSelect: T.func.isRequired,
  children: T.func.isRequired,
  renderItem: T.func,
  items: T.arrayOf(
    T.shape({
      label: T.string.isRequired,
      icon: T.node,
    })
  ),
};

DropDown.defaultProps = {
  children: () => null,
  items: [],
};

export default DropDown;
