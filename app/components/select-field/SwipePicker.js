import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '../../components/text';
import {typography, font, color} from '../../theme/styles';

const ListItem = React.memo(({label, style}) => (
  <View style={style}>
    <Text>{label}</Text>
  </View>
));

/**
 *
 * @param {Object} props
 *
 * @param {Array} props.items
 * @param {Function} props.onChange
 * @param {Number} [props.initialSelectedIndex]
 * @param {Number} [props.width]
 * @param {Number} [props.height]
 */
const SwipePicker = ({items, onValueChange, selectedValue, width, height}) => {
  let itemHeight = 40;
  let listHeight = 200;

  if (height) {
    listHeight = height;
    itemHeight = listHeight / 5;
  }

  const styles = StyleSheet.create({
    list: {
      height: listHeight,
      width: width,
      backgroundColor: color.light,
    },
    listItem: {
      height: itemHeight,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    listItemText: {
      height: itemHeight,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: font.h3,
      fontFamily: typography.bold,
      color: color.gray,
    },
    listItemSelText: {
      height: itemHeight,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: font.h3,
      fontFamily: typography.bold,
      color: color.secondary,
    },
    pickerGradient: {
      position: 'absolute',
      height: 2 * itemHeight,
      width: '100%',
      backgroundColor: color.light,
    },
    topGradient: {
      top: 0,
    },
    bottomGradient: {
      bottom: 0,
    },
  });

  const flatList = useRef(null);

  let extendedItems = [
    {
      value: '0',
      label: '',
    },
    {
      value: '0',
      label: '',
    },
    ...items,
    {
      value: '0',
      label: '',
    },
    {
      value: '0',
      label: '',
    },
  ];

  const initialSelectedIndex = items.findIndex(o => o.value === selectedValue);

  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          let index = Math.round(
            event.nativeEvent.contentOffset.y / itemHeight,
          );
          if (index >= 0 && index < items.length) {
            onValueChange(items[index].value);
          }
        }}
        initialScrollIndex={initialSelectedIndex}
        ref={flatList}
        data={extendedItems.map(item => ({
          key: item.value.toString(),
          ...item,
        }))}
        renderItem={item => (
          <View style={styles.listItem}>
            <Text
              text={item.item.label}
              style={
                selectedValue === item.item.value
                  ? styles.listItemSelText
                  : styles.listItemText
              }
            />
          </View>
        )}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: index * itemHeight,
          index,
        })}
        snapToInterval={itemHeight}
        ListEmptyComponent={() => <Text text="No Items" />}
      />
    </View>
  );
};

SwipePicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
  value: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default SwipePicker;
