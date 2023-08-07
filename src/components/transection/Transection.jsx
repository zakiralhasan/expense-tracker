import edigImage from "../../assets/images/edit.svg";
import deleteImage from "../../assets/images//delete.svg";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction,
} from "../../features/transaction/transactionSlice";
import { thousandSeparators } from "../../utilities/thousandSeparator";

const Transection = ({ transaction }) => {
  const { id, name, type, amount } = transaction;
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  return (
    <>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {thousandSeparators(amount)}</p>
          <button className="link" onClick={handleEdit}>
            <img className="icon" src={edigImage} />
          </button>
          <button className="link" onClick={handleDelete}>
            <img className="icon" src={deleteImage} />
          </button>
        </div>
      </li>
    </>
  );
};

export default Transection;
