import { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import useExpenses from '../store/use-expenses';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    expenses,
    deleteExpense: deleteExpenseCtxt,
    updateExpense: updateExpenseCtxt,
    addExpense: addExpenseCtxt,
  } = useExpenses();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    const res = await deleteExpense(editedExpenseId);
    setIsSubmitting(false);
    if (res) {
      deleteExpenseCtxt(editedExpenseId);
    } else {
      Alert.alert(
        'Delete Error',
        'Something went wrong deleting the expense, please try again.',
      );
      return;
    }
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      setIsSubmitting(true);
      const res = await updateExpense(editedExpenseId, expenseData);
      setIsSubmitting(false);
      if (res) {
        updateExpenseCtxt(editedExpenseId, expenseData);
      } else {
        Alert.alert(
          'Update Error',
          'Something went wrong updating the expense, please try again.',
        );
        return;
      }
    } else {
      setIsSubmitting(true);
      const id = await storeExpense(expenseData);
      setIsSubmitting(false);
      if (id) {
        addExpenseCtxt({ ...expenseData, id });
      } else {
        Alert.alert(
          'Expense Failed',
          'Something went wrong adding the expense, please try again.',
        );
        return;
      }
    }
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={selectedExpense}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitBtnLabel={isEditing ? 'Update' : 'Add'}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
