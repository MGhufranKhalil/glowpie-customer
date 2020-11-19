import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Link } from '../link';
import { Text } from '../text';
import { Button } from '../button';
import { Icon } from '../icon';
import { styles, color, servicePlaceholder, icons} from '../../theme';

import { style } from './style'
import { withNavigation } from 'react-navigation';

export const LargeList = withNavigation(
  class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { item,onPress } = this.props;
      const imageStyle = item.image ? style.REAL_IMAGE : style.PLACEHOLDER_IMAGE;
      const image = item.image ? imageUrl(item.image) : servicePlaceholder;
      return (
        <View style={style.SERVICE_SMALL}>
          <TouchableOpacity onPress={onPress}>
            <View style={style.SERVICE_HEADER}>
              <View style={style.SERVICE_HEADER_HEADING}>
                <Text text={item.business_name} style={{ fontWeight: 'bold' }} preset="h3" />
              </View>

              <View style={style.SERVICE_HEADER_RATING}>
                <Text text={' (' + item.rating + ')'} style={{ fontSize: 10, color: color.gray }} preset="message" />
                <Icon icon={'star_x'} style={{ width: 15, height: 15 }} />
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={style.SERVICE_SMALL_IMAGE_CONTENT}>
                <View style={{ width: '40%' }}>
                  {item.image &&
                    <Image source={image} style={[imageStyle]} />
                  }
                  {!item.image &&
                    <View style={{ backgroundColor: color.gray, paddingTop: 10 }}>
                      <Image source={image} style={[imageStyle]} />
                    </View>
                  }
                </View>
                <View>
                  <Text text={item.service_name} style={style.SERVICE_NAME} />
                  <View style={style.ROW_SMALL}>
                    <Image source={icons.datetime} style={style.ICON} />
                    <Text
                      text={item.duration}
                      style={style.ICON_TEXT}
                    />
                  </View>
                  <View style={style.ROW_SMALL}>
                    <Image source={icons.currency} style={style.ICON} />
                    <Text text={item.price} style={style.ICON_TEXT} />
                  </View>
                  <View style={style.ROW_SMALL}>
                    <Image source={item.gender == 'female' ? icons.female : icons.male} style={style.ICON} />
                    <Text text={item.gender} style={style.ICON_TEXT} />
                  </View>
                </View>
              </View>
              <View style={style.SERVICE_SMALL_ICON}>
                <View style={[style.ROW_SMALL, { height: 50 }]}></View>
                <Button
                  testID="book-button"
                  preset="primary"
                  text="BOOK"
                  style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 0, paddingRight: 0, justifyContent: 'center' }}
                  textStyle={{ fontSize: 10 }}
                  onPress={() => { console.log('Book pressed') }}
                // icon="next"
                /* disabled={loading || uploading}
                loading={loading || uploading} */
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )

    }
  },
);
