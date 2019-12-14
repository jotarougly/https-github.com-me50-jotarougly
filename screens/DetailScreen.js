import React from 'react';
import {appStyles} from '../AppStyles';
import { View, Text, Image, ScrollView } from 'react-native';

  /**
 * 
 * @param {*} movieName 
 * This function load the omdb api with the parameter t (with is the parameter for specific movie)
 * with the name given for the Text Input which is the parameter
 * It return the result in json format
 */
const fetchMovie = async (movieName) => {
    const omdbApiCall = await fetch('http://www.omdbapi.com/?t='+movieName+'&apikey=1aab6ae8&r=json');
    const omdbApiResult = await omdbApiCall.json();
    return omdbApiResult;
    }

class DetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Detail',
    };
    
    /**
     * 
     * @param {*} props 
     * 
     * Variable detail_poste set the default movie poster.
     */
    constructor(props){
        super(props)
        this.state = {
        detail_poster:"http://www.valmorgan.com.au/wp-content/uploads/2016/06/default-movie-1-3.jpg"
        }
    }
    
    /**
     * 
     * @param {*} text 
     * This function calls the fetchMovie and provide data to set state variables.
     */
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