import React from 'react';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View>
          <TextInput style = {[appStyles.textInput]}
          placeholder = "Your movie name"
          onChangeText={(text)=> this.fetchData(text)
            // value={value}
            }
          />
          <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
        </View>
        
      );
    }
  }