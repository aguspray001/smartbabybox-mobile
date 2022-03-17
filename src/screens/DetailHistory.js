import React from 'react';
import {
  RefreshControl, ScrollView, StyleSheet,
  Text,
  View
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardMeasurement, Legend } from '../components';
import { colors } from '../constant/colors';
import { downloadFile } from '../constant/utils';

const DetailHistory = ({route, navigation}) => {
  const {babyId} = route.params;
  const {data, isProcess} = useSelector(state => state.measurementReducer);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({type: 'measurement-get', payload: {babyId}});
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch({type: 'measurement-get', payload: {babyId}});
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const downloadData = babyId => {
  //   dispatch({type: 'measurement-download', payload: {babyId}});
  // };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: RFPercentage(2),
          fontWeight: '500',
          textAlign: 'center',
          marginTop: 30,
          marginBottom: 20,
        }}>
        History Pengukuran Bayi
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-around', marginHorizontal: wp('10%')}}>
        <Legend title={"Over"}/>
        <Legend title={"Under"}/>
        <Legend title={"Normal"}/>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 9999,
          right: wp('5%'),
          bottom: wp('3%'),
        }}>
        {/* if data exist, then show button */}
        {data?.rows?.length > 0 && (
          <Button
            title="Download data"
            width="35%"
            height="6%"
            onPress={() => downloadFile(babyId, data?.rows)}
          />
        )}
      </View>
      <ScrollView
        style={styles.scrollWrapper}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {data?.rows?.length > 0 && !isProcess ? (
            data?.rows?.map(baby => {
              return (
                <CardMeasurement
                  key={`measurement-${baby.baby_id}`}
                  babyId={baby.baby_id}
                  measurementDate={baby.createdAt}
                  name={baby.baby.name}
                  sex={baby.sex}
                  age={baby?.baby?.baby_age}
                  head_size={baby?.head_size}
                  height_body={baby?.height}
                  weight={baby?.weight}
                  temperature={baby?.temperature}
                  width="84%"
                  height="30%"
                  mb={10}
                />
              );
            })
          ) : data?.rows?.length === 0 ? (
            <Text style={{marginTop: 200, fontSize: RFPercentage(2), color: 'grey'}}>
              Tidak ada data pengukuran...
            </Text>
          ) : (
            <Text style={{marginTop: 200, fontSize: RFPercentage(2), color: 'grey'}}>
              loading data pengukuran...
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollWrapper: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 30,
  },
});
