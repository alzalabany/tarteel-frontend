import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Item = styled.li`
  padding: 0
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Link = styled.a`
  display: block;
  width: 100%;
  padding: 1rem 2rem;
  > span {
    position: relative;
    top: 2px;
    min-width: 2rem;
    margin-right: 0.5rem;
  }
`;

class MenuItem extends React.PureComponent {
  render() {
    const { label, icon, ...props } = this.props;

    return (
      <Item>
        <Link {...props} as={props.to && NavLink}>
          {icon && <span>{icon}</span>}
          {label}
        </Link>
      </Item>
    );
  }
}

MenuItem.propTypes = {
  label: T.string.isRequired,
  icon: T.node,
};

export default MenuItem;
