import React from 'react';
import {appStyles} from '../AppStyles';
import renderIf from '../utils/controller';
import { View, TextInput, Text, Button, FlatList, TouchableOpacity, Image } from 'react-native';

/**
 * 
 * @param {*} movieName 
 * This function load the omdb api with the parameter s (with is the parameter for search movie)
 * with the name given for the Text Input which is the parameter
 * It return the result in json format
 */
const fetchMovies = async (movieName) => {
  const omdbApiCall = await fetch('http://www.omdbapi.com/?s='+movieName+'&apikey=1aab6ae8&r=json');
  const omdbApiResult = await omdbApiCall.json();
  return omdbApiResult;
  }

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  /**
   * 
   * @param {*} props 
   * 
   * Variable movieName is for the given movie name
   * Variable requestAnswer is to mention if data is provided.
   * Variable movies is for the data found by the movieName variable after searching.
   */
  constructor(props){
    super(props);
    this.state = {
      movieName : 'No movie name',
      requestAnswer : '',
      movies : [],
    }
  }

  /**
 * 
 * @param {*} text 
 * This function calls the fetchMovies and provide data to movies state variable.
 * It also use to controlle the information to display to the user if he gives no movie name
 * or if the given name do not return any data.
 */
  getMovies = async (text) => {
    if(this.state.movieName ==""){
      this.setState({
        requestAnswer: '',
        movieName : 'No movie name',
      });
    }else{
      const result = await fetchMovies(text)
      if(result.Response == 'True'){
        this.setState({
            movies: result.Search,
            requestAnswer: '',
        });
      }else{
        this.setState({
          requestAnswer: result.Error,
      });
      }
    }
  }

  renderItem = item => {
    return (
        <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row', padding: 10,}}
            onPress={() => {
            this.props.navigation.navigate('Profile', {movie: item.item});
          }}>
            <Image style={{ height: 50, width: 50, justifyContent: 'center' }} source={{ uri: item.item.Poster }} />
            <View style={{ flexDirection: "column", marginLeft: 12,}}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', justifyContent: 'center' }}>{item.item.Title}</Text>
            <Text style={{ fontSize: 14, justifyContent: 'center' }}>{item.item.Type} ({item.item.Year})</Text>
            </View>
        </TouchableOpacity>
    );
  }

  separateItem = () => {
    return (
        <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
        </View>
    );
  }

  render() {
    return (
      <View style = {[appStyles.mainContainer]}>
        <TextInput style = {[appStyles.textInput]}
        placeholder = "Your movie name"
        onChangeText={(text)=> this.setState({movieName:text})}
        />
        {renderIf(this.state.movieName == "No movie name",
          <Text>
          {this.state.movieName}
          </Text>
        )}
        <Button
        title="Go"
          onPress={() => this.getMovies(this.state.movieName)}
      />
      {renderIf(this.state.requestAnswer !== '',
          <Text>
          {this.state.requestAnswer}
          </Text>
        )}
        <View>
          <FlatList
              data={this.state.movies}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index}
              initialNumToRender={10}
              refreshing={true}
              ItemSeparatorComponent={this.separateItem}
          />
        </View>
      </View>
      
    );
  }
}