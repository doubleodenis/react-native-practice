import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ErrorMessage } from 'formik';

export const TextInputField = ({ field, form, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={field.value}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        {...props}
      />
      <ErrorMessage style={styles.error} name={field.name} component={Text} />
    </View>
  );
};

TextInputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    margin: 15
  },
  error: {
    color: '#FF0000'
  },
  input: {
    borderColor: '#d6d7da',
    borderRadius: 4,
    borderWidth: 0.5,
    height: 50,
    width: '100%'
  }
});
