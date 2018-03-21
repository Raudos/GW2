import React from 'react';
import { View, Text, BackHandler } from "react-native";
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import Container from 'react-data-container';
import PropTypes from 'prop-types';

// Components
import KeyManager from "src/components/KeyManager/index";
import Dailies from 'src/components/Dailies/index';
import Exchange from 'src/components/Exchange/index';
import CharactersList from "src/components/Characters/CharactersList";
import CharactersDetails from "src/components/Characters/CharactersDetails";
import Raids from "src/components/Raids/index";
import GuildsList from "src/components/Guilds/GuildsList";
import GuildsDetails from "src/components/Guilds/GuildsDetails";
import ItemsSearch from "src/components/Items/ItemsSearch";
import ItemsDetails from "src/components/Items/ItemsDetails";

// Other
import { addKey, deleteKey, addDefaultKey, retrieveKey } from "src/redux/actions/key";
import { navigate } from "src/redux/actions/navigation";
import { addNavigationListener } from 'src/redux/store';

const Navigator = StackNavigator({
  CharactersList: {
    screen: CharactersList
  },
  CharactersDetails: {
    screen: CharactersDetails
  },
  GuildsList: {
    screen: GuildsList
  },
  GuildsDetails: {
    screen: GuildsDetails
  },
  ItemsSearch: {
    screen: ItemsSearch
  },
  ItemsDetails: {
    screen: ItemsDetails
  },
  Raids: {
    screen: Raids
  },
  Exchange: {
    screen: Exchange
  },
  Dailies: {
    screen: Dailies
  },
  KeyManager: {
    screen: KeyManager
  }
}, {
  initialRouteName: "KeyManager",
  navigationOptions: {
    header: null
  }
});

@Container({
  isLoading: that => that.props.apiKey === null,
  onMount: that => that.props.retrieveKey(),
  Error: that => null,
  Loader: that => null,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      apiKey: state.apiKey,
      account: state.account,
      navigation: state.navigation
    }),
    actions: { addKey, deleteKey, addDefaultKey, retrieveKey, navigate }
  }
})
class NavigatorWithKey extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackNavigation);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackNavigation);
  };

  handleBackNavigation = () => {
    const { navigation, navigate } = this.props;

    if (navigation.index === 0) {
      return false;
    }

    navigate(NavigationActions.back());
    return true;
  };

  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.navigate,
          state: this.props.navigation,
          addListener: addNavigationListener
        })}
        screenProps={{
          addKey: this.props.addKey,
          deleteKey: this.props.deleteKey,
          addDefaultKey: this.props.addDefaultKey,
          apiKey: this.props.apiKey,
          account: this.props.account,
          reduxNavigation: this.props.navigation
        }}
      />
    );
  };
};

export { Navigator };

export default NavigatorWithKey;
