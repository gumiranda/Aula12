import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';
import {Shadow} from 'react-native-neomorph-shadows';
import {darken} from 'polished';
import {Container, Text} from './styles';

export default function ShadowButton({
  children,
  textColor,
  loading,
  color,
  ...rest
}) {
  return (
    <View style={{alignItems: 'center'}}>
      <Shadow
        inner
        useArt
        style={{
          shadowOffset: {width: 8, height: 8},
          shadowOpacity: 1,
          shadowColor: darken(0.3, color),
          shadowRadius: 9,
          borderRadius: 10,
          backgroundColor: color,
          width: 250,
          height: 40,
        }}>
        <Container {...rest}>
          {loading ? (
            <ActivityIndicator size="small" color={textColor} />
          ) : (
            <Text>{children}</Text>
          )}
        </Container>
      </Shadow>
    </View>
  );
}

ShadowButton.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

ShadowButton.defaultProps = {
  loading: false,
};
