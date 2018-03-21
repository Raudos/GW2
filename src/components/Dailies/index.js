import React from 'react';
import { View } from "react-native";
import Container from 'react-data-container';

// Components
import Tabs from "src/components/TabChanger";
import DailyTab from "src/components/Dailies/DailyTab";
import Drawer from "src/router/Drawer";

// Other
import { downloadDailies } from "src/redux/actions/dailies";

@Container({
  isLoading: that => !that.props.dailies,
  onMount: that => that.props.downloadDailies(),
  Error: that => null,
  Loader: that => null,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      dailies: state.dailies
    }),
    actions: { downloadDailies }
  }
})
class Dailies extends React.Component {
  render() {
    return (
      <Drawer navigation={this.props.navigation}>
        <Tabs
          dailies={this.props.dailies}
          tabs={[
            {key: 'pve', title: "Pve"},
            {key: 'pvp', title: "Pvp"},
            {key: 'wvw', title: "Wvw"},
            {key: 'fractals', title: "Fractals"}
          ]}
          components={{
            pve: DailyTab,
            pvp: DailyTab,
            wvw: DailyTab,
            fractals: DailyTab
          }}
        />
      </Drawer>
    );
  };
};

export default Dailies;
