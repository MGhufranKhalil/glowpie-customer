import * as React from 'react';
import { View, Image, TouchableOpacity} from 'react-native';
import {Link} from '../link';
import { Text } from '../text';
import { Button } from '../button';
import { styles, color, servicePlaceholder, icons  } from '../../theme';
import { style } from './style'
import {withNavigation} from 'react-navigation';
import { imageUrl } from '../../utils/helpers';

export const SmallList = withNavigation(
  class extends React.Component {
    constructor(props) {
      super(props);
    }
     
    render() {
      const { item } = this.props; 
      const imageStyle = item.image ? style.REAL_IMAGE : style.PLACEHOLDER_IMAGE;
      const image = item.image ? imageUrl(item.image) : servicePlaceholder;
      {console.tron.log('small list',item)}
      return (
        <View style={style.SERVICE_SMALL}>
          <TouchableOpacity /* onPress={() => this.props.navigation.navigate('saloon', { vendor_id: item.vendor_id })} */ >
            <View style={{ flexDirection: 'row' }}>
              <View style={style.SERVICE_SMALL_IMAGE_CONTENT}>
                <View style={{ width: '40%' }}>
                  {item.image &&
                    <Image source={image} style={[imageStyle]} />
                  }
                  {!item.image &&
                    <View style={style.SMALL_LIST_IMAGE}>
                      <Image source={image} style={[imageStyle]} />
                    </View>
                  }
                </View>
                <View>
                  <View style={[styles.FLEX_ROW,{  justifyContent: 'flex-start' }]}>
                    <Text text={item.service_name} style={style.SERVICE_NAME} />
                    <Text text={item.duration + "m"} style={style.SMALL_LIST_DURATION} />
                  </View>
                  <View style={style.ROW_SMALL}>
                    <Image source={icons.currency} style={style.ICON} />
                    <Text text={ '$ '+ item.price} style={style.ICON_TEXT} />
                  </View>
                </View>
              </View>
              <View style={[style.SERVICE_SMALL_ICON, { flexDirection: 'column', justifyContent: 'center' }]}>
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
