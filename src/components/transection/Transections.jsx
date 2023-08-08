import Transection from "./Transection";
import { useGetTransactionsQuery } from "../../services/apiRTK";

const Transections = () => {
  const { data: transactions, isLoading, isError } = useGetTransactionsQuery();

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
