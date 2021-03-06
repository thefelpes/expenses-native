
import React, { Component } from 'react'
import { Platform, StyleSheet, View, Text, TextInput, Button } from 'react-native'
import expenseRepository from 'repositories/expenses' // /src/respositories/expenses.js
import { today } from 'util/date'

export default class Expense extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amount: '',
      description: '',
      date: today()
    }
  }
  componentDidMount () {
    amountField.focus()
  }
  doSave () {
    const { amount, date, description } = this.state
    if (amount !== '' && description !== '' && date !== '') {
      expenseRepository.save({
        amount,
        date,
        description,
        archived: false
      }).then(() => {
        this.reset()
        this.props.back()
      })
    }
  }
  reset () {
    this.setState({
      amount: '',
      description: '',
      date: today()
    })
  }
  render () {
    return (
      <View style={{flex: 4}}>
        <View style={{padding: 10}}>
          <TextInput
            ref={e => amountField = e}
            placeholder="Valor (Ex. 10,00)"
            keyboardType="numeric"
            style={styles.expenseInput}
            onChangeText={(amount) => this.setState({amount: amount.toString()})}
            value={this.state.amount} />
          <TextInput
            placeholder="Descrição (Ex. 'Gasolina')"
            style={styles.expenseInput}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description} />
          <TextInput
            placeholder="Data (dd/mm/aaaa)"
            style={styles.expenseInput}
            onChangeText={(date) => this.setState({date})}
            value={this.state.date} />
          <Button title="Salvar" onPress={() => this.doSave()} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  expenseInput: {
    height: 40,
    paddingLeft: 10,
    marginBottom: 5,
    borderColor: Platform.OS === 'ios' ? '#ccc' : null,
    borderWidth: Platform.OS === 'ios' ? 1 : null,
  }
})
