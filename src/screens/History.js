import moment from 'moment';
import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CardHistory} from '../components';
import {colors} from '../constant/colors';

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const {data, isProcess} = useSelector(state => state.babyReducer);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch({type: 'baby-get', payload: {navigation}});
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch({type: 'baby-get', payload: {navigation}});
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 40,
          marginBottom: -20,
          fontSize: 16,
          fontWeight: '500',
        }}>
        List Baby
      </Text>
      <ScrollView
        style={styles.scrollWrapper}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {data?.length > 0 && !isProcess ? (
            data?.map(baby => {
              return (
                <CardHistory
                  key={`baby-${baby.id}`}
                  title={baby.name}
                  bornDate={baby.born_date}
                  babyId={baby.id}
                  sex={baby.sex}
                  age={baby.baby_age || 0}
                  createdAt={moment(baby.createdAt)
                    .format('DD-MM-YYYY')
                    .toString()}
                  width="84%"
                  height="30%"
                  mb={10}
                  navigation={navigation}
                />
              );
            })
          ) : data?.length === 0 ? (
            <Text style={{marginTop: 200, fontSize: 16, color: 'grey'}}>
              Tidak ada data bayi...
            </Text>
          ) : (
            <Text style={{marginTop: 200, fontSize: 16, color: 'grey'}}>
              loading data bayi...
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollWrapper: {
    flex: 1,
    marginVertical: 30,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 30,
  },
});
