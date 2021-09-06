import moment from "moment";
import { useState } from "react";
import HeartImg from "./heart.png";

const Date = ({ from, to, onFromChange, onToChange }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          From Date
        </label>
        <input
          value={from}
          onChange={({ target }) => onFromChange(target.value)}
          type="date"
          className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="p-5"></div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          To Date
        </label>
        <input
          value={to}
          onChange={({ target }) => onToChange(target.value)}
          type="date"
          className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

function App() {
  const [dates, setDates] = useState([{ from: "", to: "" }]);
  const [result, setResult] = useState({ years: "", months: "", days: "" });

  const calculate = () => {
    let years = 0,
      months = 0,
      days = 0;

    dates.forEach((date) => {
      if (date.from && date.to) {
        const from = moment(date.from, "YYYY-MM-DD");
        const to = moment(date.to, "YYYY-MM-DD");
        years += to.diff(from, "years");
        months += to.diff(from, "months");
        days += to.diff(from, "days");
      }
    });

    setResult({ months, years, days });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-10 min-w-screen bg-gray-200">
      <div>
        <h1 className="justify-center text-4xl flex items-center mb-6">
          For you - Pahi <img alt="love" className="h-10 ml-5" src={HeartImg} />
        </h1>
        <div className="bg-white mx-auto p-5 rounded-lg border-2">
          {dates.map((date, i) => {
            return (
              <Date
                key={i}
                from={date.from}
                to={date.to}
                onFromChange={(value) => {
                  const newDate = [...dates];
                  newDate[i] = { ...newDate[i], from: value };
                  setDates(newDate);
                }}
                onToChange={(value) => {
                  const newDate = [...dates];
                  newDate[i] = { ...newDate[i], to: value };
                  setDates(newDate);
                }}
              />
            );
          })}
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setDates(dates.concat({ from: "", to: "" }))}
              type="button"
            >
              Add another date
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 ml-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={calculate}
            >
              Calculate
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 ml-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setDates([{ from: "", to: "" }]);
                setResult({ months: "", days: "", years: "" });
              }}
              type="button"
            >
              Reset
            </button>
          </div>
          {result.years !== "" && result.months !== "" && result.days !== "" && (
            <div className="mt-5 text-gray-700">
              <p className="flex items-center">
                <span className="font-medium mr-3">Total Years:</span>
                <span className="font-bold">{result.years}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-3">Total Months:</span>
                <span className="font-bold">{result.months}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-3">Total Days:</span>
                <span className="font-bold">{result.days}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
