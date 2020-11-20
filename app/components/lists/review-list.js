import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Link } from '../link';
import { Text } from '../text';
import { Icon } from '../icon';
import { Button } from '../button';
import { styles, color, placeHolderImage, icons, typography } from '../../theme';
import { style } from './style'
import { withNavigation } from 'react-navigation';
import { imageUrl } from '../../utils/helpers';

const ICON_SIZE = { height: 10, width: 12 };

export const ReviewList = withNavigation(
  class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { item } = this.props;
      console.tron.log('review',item);

      const imageStyle = item.image ? style.REAL_IMAGE : {};
      const image = item.image ? imageUrl(item.image) : placeHolderImage;
      const ratingUI = [];

      for (let i = 0; i < 5; i++) {
        if (i < Math.floor(item.rating)) {
          ratingUI.push(
            <Icon icon="star_x" style={ICON_SIZE} />
          )
        } else {
          ratingUI.push(
            <Icon icon="star" style={ICON_SIZE} />
          )
        }
      }

      return (
        <View style={style.REVIEW_CONTAINER}>
          <TouchableOpacity /* onPress={() => this.props.navigation.navigate('saloon', { vendor_id: item.vendor_id })} */ >
            <View style={styles.FLEX_ROW}>
              <View style={style.SERVICE_SMALL_IMAGE_CONTENT}>
                
                <View style={{ paddingRight: 10 }}>
                  {item.image &&
                    <Image source={image} style={[imageStyle]} />
                  }
                  {!item.image &&
                    <View style={{  }}>
                      <Image source={image} style={[imageStyle]} />
                    </View>
                  }
                </View>

                <View style={{flex:1}}>
                  <View style={styles.FLEX_ROW}>
                    <Text text={item.customer_name} style={style.REVIEW_NAME} />
                    <Text text={item.formatted_dob} style={style.REVIEW_DATE} />
                  </View>

                  <View style={[styles.FLEX_ROW,{justifyContent:'flex-start'}]}>
                    {ratingUI}
                  </View>
                  <View>
                    <Text style={style.REVIEW_TEXT} text={item.review_message} />
                  </View>
                </View>

              </View>
            </View>
          </TouchableOpacity>
        </View>
      )

    }
  },
);
