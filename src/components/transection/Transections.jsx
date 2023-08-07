import { useDispatch, useSelector } from "react-redux";
import Transection from "./Transection";
import { useEffect } from "react";
import { fetchTransactions } from "../../features/transaction/transactionSlice";

const Transections = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading, isError } = useSelector(
    (state) => state.transaction
  );

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>Somthing went wrong!</p>;
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <Transection key={transaction.id} transaction={transaction} />
    ));
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <p>No transactions found!</p>;
  }

  //to get data initially from the store. below function initially update the store by taking data from data base
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transections;
