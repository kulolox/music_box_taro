import Taro, { Component } from '@tarojs/taro';
import { Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import moment from 'moment';

const getDate = seconds => {
  return new Date(seconds * 1000);
};

export default class Duration extends Component {
  render() {
    const { customStyles, seconds } = this.props;
    return <Text style={customStyles}>{moment(getDate(seconds)).utcOffset(0).format('HH:mm:ss')}</Text>;
  }
}

Duration.propTypes = {
  customStyles: PropTypes.object,
  seconds: PropTypes.number.isRequired
};

Duration.defaultProps = {
  customStyles: {}
};
