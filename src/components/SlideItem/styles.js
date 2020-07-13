import {StyleSheet} from 'react-native';
import {appColors} from '../../utils/appColors';
import appMetrics from '../../utils/appMetrics';

const elementHeight = appMetrics.NAV_HEIGHT + 99;
const itemWidth = appMetrics.DEVICE_WIDTH - 85;
const itemHeight = appMetrics.DEVICE_HEIGHT - elementHeight - 70;
export default StyleSheet.create({
  slide: {
    alignItems: 'center',
    width: itemWidth,
    height: itemHeight,
    borderRadius: 8,
    backgroundColor: appColors.fourth,
  },
  text: {
    fontSize: 48,
    color: appColors.white,
  },
  textPerMonth: {
    fontSize: 15,
    opacity: 0.6,
    color: appColors.white,
  },
  headerText: {
    fontSize: 18,
    lineHeight: 50,
    color: appColors.white,
  },
  priceContainer: {
    alignItems: 'center',
    marginTop: itemHeight * 0.06,
    marginBottom: itemHeight * 0.09,
  },
  servicesContainer: {
    alignItems: 'center',
  },
});
