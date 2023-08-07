import { useSelector } from "react-redux";
import { thousandSeparators } from "../../utilities/thousandSeparator";

const Balance = () => {
  const { transactions } = useSelector((state) => state.transaction);

  const calculateBalance = (balance) => {
    let income = 0;

    balance.forEach((transaction) => {
      const { type, amount } = transaction;
      if (type === "income") {
        income += amount;
      } else {
        income -= amount;
      }
    });

    return income;
  };
  return (
    <>
      <div className="top_card">
        <p>Your Current Balance</p>
        <h3>
          <span>৳ </span>
          {transactions?.length > 0 ? (
            <span>{thousandSeparators(calculateBalance(transactions))}</span>
          ) : (
            0
          )}
        </h3>
      </div>
    </>
  );
};

export default Balance;
