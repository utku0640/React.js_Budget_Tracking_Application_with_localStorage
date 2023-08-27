import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
const Home = () => {
  let itemArray = localStorage.getItem("value")
    ? JSON.parse(localStorage.getItem("value"))
    : [];
  const [object, setObject] = useState(itemArray);
  const [objectValue, setObjectValue] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setObjectValue((prevValue) => {
      return { ...prevValue, [name]: value, id: uuidv4() };
    });
  };
  const handleSubmit = (e) => {
    if (!objectValue.price || !objectValue.name) {
      return;
    }
    setObject((prevValue) => [...prevValue, objectValue]);
    setObjectValue({ price: "", name: "" });
    e.preventDefault();
  };
  useEffect(() => {
    localStorage.setItem("value", JSON.stringify(object));
  }, [object]);
  const handleDelete = (index) => {
    itemArray.splice(index, 1);
    localStorage.setItem("value", JSON.stringify(itemArray));
    window.location.reload();
  };
  let budget = object
    .map((item) => +item.price)
    .reduce((acc, value) => (acc += value), 0);
  let findExpense = object
    .filter((item) => item.price < 0)
    .map((item) => +item.price)
    .reduce((acc, value) => (acc += value), 0);
  let findIncome = object
    .filter((item) => item.price > 0)
    .map((item) => +item.price)
    .reduce((acc, value) => (acc += value), 0);

  let budgetColor = budget > 0 ? "green" : "red";

  const handleOnMouseEnter = (e) => {
    e.currentTarget.children[2].classList.add(styles.showDeleteButton);
  };
  const handleOnMouseLeave = (e) => {
    e.currentTarget.children[2].classList.remove(styles.showDeleteButton);
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeContainer}>
        <div className={styles.budget}>
          <h1>Budget</h1>
          <h2 style={{ color: budgetColor }}>{budget} $</h2>
        </div>
        <div className={styles.incomeAndExpense}>
          <div className={styles.income}>
            <h2>Income</h2>
            <h4>{findIncome} $</h4>
          </div>
          <div className={styles.expense}>
            <h2>Expense</h2>
            <h4>{findExpense} $</h4>
          </div>
        </div>
        <div className={styles.data_of_income_and_expense}>
          {object?.map((item, index) => (
            <div
              key={index}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              className={styles.data}
            >
              <p>{item.price} $</p>
              <p>{item.name}</p>
              <button
                className={styles.data_button_delete}
                onClick={() => handleDelete(index)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.addingDataPart}>
          <form className={styles.formDiv} onSubmit={handleSubmit}>
            <label htmlFor="price">Amount:</label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              value={objectValue.price}
              id="price"
            />
            <label htmlFor="price">Name:</label>
            <input
              name="name"
              onChange={handleChange}
              value={objectValue.name}
              id="price"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
