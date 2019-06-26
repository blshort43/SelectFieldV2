/* eslint-disable indent */
/**
 *
 * SelectField
 *
 */
// NOTE Use 'required' on SelectField and <option value="" hidden/> to display a faded default value
// NOTE Example:

// handleChange = e => {
//   e.preventDefault();
//   const { name, value } = e.target;
//   this.setState({ [name]: value });
// };

// <SelectField
//  required
//  label="PTO Type"
//  name="ptoType"
//  value={ptoType || ''}
//  border={this.state.typeBorder}
// onChange={this.handleChange}
//  >
//  <option value="" hidden />
//  {data.map(type => (
//    <option key={type.PTOID} value={type.PTOID}>
//     {type.NameX}
//    </option>
//  ))}
// </SelectField>;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'rebass';

const StyledSelectField = styled.select`
  outline: none;
  font-family: inherit;
  padding: ${props => (props.padding ? props.padding : '12px')};
  transition: all 0.25s linear;
  margin: 0;
  box-sizing: border-box;
  border: ${props => (props.border ? props.border : '1px solid #909090')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  height: ${props => (props.height ? props.height : '45px')};
  width: 100%;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '300px')};
  min-width: 144px;
  :invalid {
    color: gray;
  }
  :hover {
    border: solid 1px black;
    color: black;
    ::placeholder {
      color: black;
      opacity: 1;
    }
  }
  :focus {
    outline-offset: 0;
    border: solid 1px #2e66ff;
    ::placeholder {
      opacity: 0;
    }
  }
`;

const StyledLegend = styled.legend`
  outline: none;
  pointer-events: none;
  font-size: 12px;
  transition: all 0.25s ease-in-out;
  position: absolute;
  box-sizing: border-box;
`;

class SelectField extends React.PureComponent {
  state = {
    focused: false,
    showPlaceholder: true,
  };

  handleFocus = () => {
    this.setState({ focused: true, showPlaceholder: false });
  };

  handleBlur = () => {
    if (this.props.value) {
      this.setState({ showPlaceholder: true });
    } else {
      this.setState({ focused: false, showPlaceholder: true });
    }
  };

  render() {
    const { ...props } = this.props;

    return (
      <Card
        m={props.margin || props.m || 0}
        mt={props.mt || 3}
        p={0}
        bg={props.bg}
        borderRadius={props.borderRadius || '6px'}
        width={props.width}
        height="30px"
      >
        <StyledLegend
          style={{
            opacity: `${this.state.focused ? 1 : 0}`,
            transform: `${
              this.state.focused ? 'translate(0, -18px)' : 'translate(10px, 0)'
            }`,
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {props.label}
        </StyledLegend>
        <StyledSelectField
          {...props}
          value={props.value}
          name={props.name}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {this.state.showPlaceholder && (
            <option value="">{props.label}</option>
          )}

          {props.children}
        </StyledSelectField>
      </Card>
    );
  }
}

SelectField.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SelectField;
