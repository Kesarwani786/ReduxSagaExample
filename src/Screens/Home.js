//import liraries
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import actions from '../redux/actions';

const Home = props => {
  const [data, setData] = useState([]);
    useEffect(() => {
    (async () => {
      try {
        let res = await actions.getPosts();
        console.log('res' ,res);
        setData(res);
      } catch (error) {
        console.log('error raised', error);
      }
    })();
  }, []);

   const renderItem = ({item, index}) => {
    return (
      <View style={styles.boxView}>
        <Image source={{uri: item.urlToImage}} style={styles.backgroundImage} />
        <Text style={styles.heading}>Title : {item.title}</Text>
        <Text style={styles.Text}>Content : {item.content}</Text>
        <Text style={styles.TextAuthor}>Author : {item.author}</Text>
      </View>
    );
  };
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <FlatList
                    data={data.articles}
                    renderItem={renderItem}
                    keyExtractor={item => item.publishedAt.toString()}
                    ItemSeparatorComponent={() => <View style={{marginBottom: 16}} />}
                />
            </SafeAreaView>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginTop:16
    },
    backgroundImage:{
      height:200,
      marginBottom:16,
    width: useWindowDimensions.width,
    },
    TextAuthor:{
      width: useWindowDimensions.width,
      alignSelf:'flex-end',
      fontSize: 12,
      fontWeight:'500',
      marginBottom: 4,

    },
    boxView: {
   borderWidth: 1,
        padding: 16,
        borderRadius: 8,
    },

    heading: {
        fontSize: 12,
        fontWeight:'500',
        marginBottom: 4,

    },
    Text: {
      fontSize: 12,
      marginBottom: 4
  },
    btnStyle: {
        marginTop: 10,
        alignSelf:'flex-end',
        backgroundColor:'red',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
});

//make this component available to the app
export default Home;
