import React from 'react';
import {appStyles} from './AppStyles';
import renderIf from './utils/controller';
import { View, TextInput, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const fetchMovies = async (movieName) => {
  const omdbApiCall = await fetch('http://www.omdbapi.com/?s='+movieName+'&apikey=1aab6ae8&r=json');
  const omdbApiResult = await omdbApiCall.json();
  return omdbApiResult;
  }
  const fetchMovie = async (movieName) => {
    const omdbApiCall = await fetch('http://www.omdbapi.com/?t='+movieName+'&apikey=1aab6ae8&r=json');
    const omdbApiResult = await omdbApiCall.json();
    return omdbApiResult;
    }

class HomeScreen extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      movieName : 'No movie name',
      requestAnswer : '',
      movies : [],
    }
  }

  static navigationOptions = {
    title: 'Home',
  };

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
    const {navigate} = this.props.navigation;
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
class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail',
  };

  constructor(props){
    super(props)
    this.state = {
      // detail_title:"",
      // detail_released:"",
      // detail_year:"",
      // detail_type:"",
      // detail_actors:"",
      // detail_director:"",
      // detail_production:"",
      // detail_awards:"",
      // detail_runtime:"",
      // detail_plot:"",
      detail_poster:"http://www.valmorgan.com.au/wp-content/uploads/2016/06/default-movie-1-3.jpg"
    }
  }

getMovieSelected = async (text) => {
    const result = await fetchMovie(text)
    this.setState({
    detail_title:result.Title,
    detail_released:result.Released,
    detail_year:result.Year,
    detail_type:result.Type,
    detail_actors:result.Actors,
    detail_director:result.Director,
    detail_production:result.Production,
    detail_awards:result.Awards,
    detail_runtime:result.Runtime,
    detail_plot:result.Plot,
    detail_poster:result.Poster
    });
}

  render() {
    const param = this.props.navigation.getParam('movie');
    this.getMovieSelected(param.Title);
    return (
      <ScrollView>
        <View style={{margin:10 }}>
          <View style={{justifyContent: 'center', alignItems: 'center', display: "flex" }}>
            <Image style={{ height: 300, width: 300, margin:20 }} source={{ uri: this.state.detail_poster }} />
          </View>
          <View style={[appStyles.sectionTitleStyle]}>
            <Text>{this.state.detail_type} Information</Text>
          </View>
            <Text style={[appStyles.informationStyle]}>
              Title : {this.state.detail_title} ({this.state.detail_year})
            </Text>
            <Text style={[appStyles.informationStyle]}>
            Released year : {this.state.detail_released}
          </Text>
            <Text style={[appStyles.informationStyle]}>
              Duration : {this.state.detail_runtime}
            </Text>
            <Text style={[appStyles.informationStyle]}>
              Description : {this.state.detail_plot}
            </Text>
          <View style={[appStyles.sectionTitleStyle]}>
            <Text>Production and worth</Text>
          </View>
          <Text style={[appStyles.informationStyle]}>
            Production house : {this.state.detail_production}
          </Text>
          <Text style={[appStyles.informationStyle]}>
            Director : {this.state.detail_director}
          </Text>
          <Text style={[appStyles.informationStyle]}>
            Actors : {this.state.detail_actors}
          </Text>
          <Text style={[appStyles.informationStyle]}>
            Awards : {this.state.detail_awards}
          </Text>
        </View>
      </ScrollView>
      
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
});

const App = createAppContainer(MainNavigator);

export default App;