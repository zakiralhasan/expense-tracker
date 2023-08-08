import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  usePostTransactionMutation,
  useUpdateTransactionMutation,
} from "../../services/apiRTK";
import { editInactive } from "../../features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editForm, setEditForm] = useState(false);

  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.transaction);

  const [postTransaction] = usePostTransactionMutation();
  const [updateTransaction, { isLoading, isError }] =
    useUpdateTransactionMutation();

  //below function for get/fetching editing data from the state (used for rerender issue)
  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditForm(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditForm(false);
      resetForm();
    }
  }, [editing]);

  //below function for rest the form inputs
  const resetForm = () => {
    setName("");
    setType("");
    setAmount("");
  };

  //below function for create new form data
  const handleForm = (event) => {
    event.preventDefault();
    postTransaction({ name, type, amount: Number(amount) });
    resetForm();
  };

  //below function for update editing form data
  const handleUpdateForm = (event) => {
    event.preventDefault();
    updateTransaction({
      id: editing.id,
      data: {
        name,
        type,
        amount: Number(amount),
      },
    });
    resetForm();
    setEditForm(false);
  };

  //below function for cancle editing form
  const cancleEditForm = () => {
    resetForm();
    setEditForm(false);
    dispatch(editInactive());
  };

  return (
    <>
      <div className="form">
        <h3>Add new transaction</h3>
        <form onSubmit={editForm ? handleUpdateForm : handleForm}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter title"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group radio">
            <label>Type</label>
            <div className="radio_group">
              <input
                type="radio"
                value="income"
                name="type"
                required
                checked={type === "income"}
                onChange={() => setType("income")}
              />
              <label>Income</label>
            </div>
            <div className="radio_group">
              <input
                type="radio"
                value="expense"
                name="type"
                checked={type === "expense"}
                onChange={() => setType("expense")}
              />
              <label>Expense</label>
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              name="amount"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button className="btn" type="submit" disabled={isLoading}>
            {!editForm ? "Add Transaction" : "Update Transaction"}
          </button>
          {!isLoading && isError && (
            <p className="error" style={{ color: "red", marginTop: "9px" }}>
              There was an error occured
            </p>
          )}
        </form>
        {editForm && (
          <button className="btn cancel_edit" onClick={cancleEditForm}>
            Cancel Edit
          </button>
        )}
      </div>
    </>
  );
};

export default Form;
