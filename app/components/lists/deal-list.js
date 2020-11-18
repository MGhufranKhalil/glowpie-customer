import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Link } from '../link';
import { Text } from '../text';
import { Button } from '../button';
import { Icon } from '../icon';
import { styles, color, servicePlaceholder, icons, typography} from '../../theme';

import { style } from './style'
import { withNavigation } from 'react-navigation';

export const DealList = withNavigation(
  class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { item } = this.props;
      const imageStyle = item.image ? style.REAL_IMAGE : style.PLACEHOLDER_IMAGE;
      const image = item.image ? imageUrl(item.image) : servicePlaceholder;
      return (
        <View style={style.SERVICE_SMALL}>
          <TouchableOpacity /* onPress={() => this.props.navigation.navigate('saloon', { vendor_id: item.vendor_id })} */ >
            <View style={style.SERVICE_HEADER}>
              <View style={style.SERVICE_HEADER_HEADING}>
                <Text text={item.business_name} style={{ fontFamily: typography.bold }} preset="h3" />
              </View>
            </View>

            <View style={styles.FLEX_ROW}>
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
                  <Text text={'Total Services'} style={style.DEAL_NAME} />
                  <Text text={'14 Services'} preset={'message'} style={style.DEAL_SERVICES} />

                  <Text text={'Total Cost'} style={style.DEAL_COST} />
                  <Text text={'$1000'} preset={'message'} style={style.DEAL_COST_PRICE} />
                </View>
              </View>
              <View style={{flexDirection:'column',justifyContent:'space-evenly'}}>
                
                <View style={styles.FLEX_ROW}>
                  <View style={style.DEAL_DISCOUNT}>
                    <View style={style.DEAL_DISCOUNT_STICKER}>
                      <Text text="15%" style={style.DEAL_DISCOUNT_PERCENT} />
                      <Text text=" OFF" style={style.DEAL_DISCOUNT_OFF}/>
                    </View>
                  </View>

                  <View style={style.DEAL_DISCOUNT_AMOUNT}>
                    <Text text="$700" style={style.DEAL_DISCOUNT_AMOUNT_PRICE} />
                  </View>
                </View>

                <View style={{}}>
                  <Button
                    testID="book-button"
                    preset="primary"
                    text="BOOK NOW"
                    style={{ paddingVertical:5, paddingHorizontal:7, justifyContent: 'center' }}
                    textStyle={{ fontSize: 10 }}
                    onPress={() => { console.log('Book pressed') }}
                    // icon="next"
                    /* disabled={loading || uploading}
                    loading={loading || uploading} */
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )

    }
  },
);
