import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Icon } from 'react-native-elements';

const MenuButton = props => {
  const { route, currentRoute, account } = props;
  const hasKey = account;
  const needsKey = route.key;
  const hasPermissions = needsKey ? (hasKey && account.permissions.filter(permission => route.permissions.includes(permission)).length === route.permissions.length) : true;
  const isActive = currentRoute === route.routeName;

  return (
    <TouchableOpacity onPress={() => props.onPress(route.routeName)} style={{flexDirection: "row", padding: 5, marginBottom: 10, alignItems: "center"}}>
      <Icon
        {...route.icon}
        color='white'
      />

      {hasPermissions ?
        <Text style={{color: "white", marginLeft: 10, borderBottomWidth: isActive ? 1 : 0, borderBottomColor: "white"}}>{route.buttonText}</Text>

        :

        <Text style={{color: "white", marginLeft: 10, borderBottomWidth: isActive ? 1 : 0, borderBottomColor: "white"}}>No key or required permissions</Text>
      }
    </TouchableOpacity>
  );
};

const routes = [{
  routeName: "KeyManager",
  buttonText: "Your API Key",
  key: false,
  permissions: [],
  icon: {
    type: "material-community",
    name: "key"
  }
}, {
  routeName: "CharactersList",
  buttonText: "Characters",
  key: true,
  permissions: ["builds", "characters", "inventories"],
  icon: {
    type: "material-community",
    name: "account-multiple"
  }
}, {
  routeName: "ItemsSearch",
  buttonText: "Your Items",
  key: true,
  permissions: ["builds", "characters", "inventories"],
  icon: {
    type: "material-community",
    name: "sword"
  }
}, {
  routeName: "GuildsList",
  buttonText: "Guilds",
  key: true,
  permissions: [],
  icon: {
    type: "material-community",
    name: "domain"
  }
}, {
  routeName: "Raids",
  buttonText: "Raids",
  key: false,
  permissions: ["progression"],
  icon: {
    type: "material-community",
    name: "gamepad-variant"
  }
}, {
  routeName: "Exchange",
  buttonText: "Gem/Gold Exchange",
  key: false,
  permissions: [],
  icon: {
    type: "material-community",
    name: "diamond"
  }
}, {
  routeName: "Dailies",
  buttonText: "Daily Quests",
  key: false,
  permissions: [],
  icon: {
    type: "material-community",
    name: "calendar-today"
  }
}];

export default props => {
  const changeRoute = routeName => {
    props.closeDrawer();
    props.navigation.navigate(routeName);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, zIndex: 10, padding: 10}}>
        <View style={{marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Image source={require("src/assets/images/Gw2_logo.png")} style={{height: 50, width: 50, marginRight: 10}} />
          <Text style={{color: "white", fontWeight: "bold"}}>GW2 API Playground</Text>
        </View>

        {routes.map(route => (
          <MenuButton
            key={route.routeName}
            route={route}
            currentRoute={props.navigation.state.routeName}
            onPress={changeRoute}
            account={props.account}
          />
        ))}
      </View>

      <Image source={require("src/assets/images/bg.jpg")} style={{top: 0, left: 0, right: 0, bottom: 0, position: "absolute"}} />
    </View>
  );
};
