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

const StyledCard = styled(Card)`
  width: ${props => (props.width ? props.width : '200px')};
  height: ${props => (props.height ? props.height : '55px')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
`;

const StyledSelectField = styled.select`
  color: ${props => (props.color ? props.color : '#000000')};
  outline: none;
  font-family: inherit;
  padding: ${props => (props.padding ? props.padding : '12px')};
  transition: all 0.25s linear;
  box-sizing: border-box;
  border: ${props => (props.border ? props.border : '1px solid #909090')};
  background-color: ${props => props.background};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  width: 100%;
  height: 100%;
  :invalid {
    color: gray;
  }
  ::placeholder {
    color: ${props => (props.color ? props.color : '#000000')};
  }

  :hover {
    color: ${props => (props.color ? props.color : '#000000')};
    border: ${props =>
      props.borderHovered ? props.borderHovered : '1px solid #000000'};
    cursor: text;
    ::placeholder {
      color: ${props => (props.color ? props.color : '#000000')};
      opacity: 1;
    }
  }

  :focus {
    color: ${props => (props.color ? props.color : '#000000')};
    outline-offset: 0;
    border: ${props =>
      props.borderFocused ? props.borderFocused : '1px solid #2e66ff'};
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
    const {
      color,
      value,
      type,
      name,
      onFocus,
      onBlur,
      label,
      border,
      borderFocused,
      borderHovered,
      placeholder,
      padding,
      background,
      bg,
      borderRadius,
      min,
      required,
      children,
      onChange,
      ...rest
    } = this.props;

    return (
      <StyledCard {...rest}>
        <StyledLegend
          style={{
            opacity: `${this.state.focused ? 1 : 0}`,
            transform: `${
              this.state.focused ? 'translate(0, -18px)' : 'translate(10px, 0)'
            }`,
          }}
        >
          {label}
        </StyledLegend>
        <StyledSelectField
          // ref="yearSelect"
          required={required}
          color={color}
          background={background || bg}
          padding={padding}
          // border="1px solid green"
          border={border}
          borderFocused={borderFocused}
          borderHovered={borderHovered}
          borderRadius={borderRadius}
          placeholder={placeholder || ''}
          value={value || ''}
          type={type || 'text'}
          name={name}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={onChange}
        >
          {this.state.showPlaceholder && <option value="">{label}</option>}
          {children}
        </StyledSelectField>
      </StyledCard>
    );
  }
}

SelectField.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SelectField;
