import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';

const style = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

export default class LineEllipsis extends Component {
  render() {
    const { customStyles, text } = this.props;
    return <View style={{ ...style, ...customStyles }}>{text}</View>;
  }
}

LineEllipsis.propTypes = {
  text: PropTypes.string.isRequired,
  customStyles: PropTypes.object
};

LineEllipsis.defaultProps = {
  customStyles: {}
};
