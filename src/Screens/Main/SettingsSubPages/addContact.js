import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AddContactList from '../../../Components/AddContactList';
import addContactAction from '../../../Actions/actionCreator';
import { Card } from '../../../Components/common/Card';
import { CardSection } from '../../../Components/common/CardSection';
import * as actions from '../../../Actions/actionCreator';

class AddContact extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let contactAddress = {}
    this.props.tokens.map(token => contactAddress[token.title] = "")
    this.renderAddContact = this.renderAddContact.bind(this);

    this.state = {
      disabled: true,
      clear: false,
      contactName: "",
      contactAddress
    }
  }

  renderAddContact() {
    this.props.completeContact(this.state.contactName, this.state.contactAddress);
    this.setState({ contactName: "" })
    let newcontactAddress = {}
    this.props.tokens.map(token => newcontactAddress[token.title] = "")
    this.setState({ contactAddress: newcontactAddress })
  }

  clear() {
    this.setState({ contactName: "" })
    let newcontactAddress = {}
    this.props.tokens.map(token => newcontactAddress[token.title] = "")
    this.setState({ contactAddress: newcontactAddress })
  }

  renderName(name) {
    this.setState({ contactName: name })
    var contact = { name: name }
    this.props.addingContact(contact)
  }

  renderAddress(address, coinName, coin) {
    let copy = Object.assign({}, this.state.contactAddress)
    copy[coinName] = address
    this.setState({ contactAddress: copy })
    var coinAddress = {}
    coinAddress[coinName] = address
    this.props.addingContact(coinAddress)
  }

  isEmptyObject(o) {
    return Object.keys(o).every(function (x) {
      return o[x] === '' || o[x] === null;
    });
  }

  // clear button, types into inputs, that value should be passed to the parent, clear in parent state to null
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 3 }}>
        <ScrollView style={{ height: '75%' }} >
          <AddContactList
            contactName={this.state.contactName}
            dataSource={this.state.dataSource}
            renderAddress={this.renderAddress.bind(this)}
            renderName={this.renderName.bind(this)}
            contactAddress={this.state.contactAddress}
          />
        </ScrollView>

        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              small
              disabled={this.state.contactName === "" || this.isEmptyObject(this.state.contactAddress)}
              title='Add Contact'
              icon={{ size: 20 }}
              buttonStyle={{
                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100,
                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
              onPress={() => this.renderAddContact()}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              small
              title='Clear'
              icon={{ size: 20 }}
              buttonStyle={{
                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100,
                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
              onPress={() => this.clear()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  section: {
    flexDirection: 'column',
    backgroundColor: 'red'
  },
});

const mapStateToProps = state => {
  return {
    tokens: state.newWallet.tokens,
    currenctContact: state.contacts.currenctContact,
    current: state.contacts.currentContact,
  }
}

export default connect(mapStateToProps, actions)(AddContact)
//export default AddContact;