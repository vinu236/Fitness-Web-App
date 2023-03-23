import BmiForm from "./BmiForm";
import { useState } from "react";
import BmiScoreBox from "./BmiScoreBox";
const Bmi = () => {
  const bmiRanges = {
    underWeight: { low: "" },
    normal: { low: "", high: "" },
    obesityOne: { low: "", high: "" },
    obesityTwo: { low: "", high: "" },
    obesityThree: { low: "", high: "" },
  };

  const [bmi, setBmi] = useState("00");
  const [bmiType, setBmiType] = useState("Not Calculated");
  const [bmiRange, setBmiRange] = useState(bmiRanges);
  const [changeWeight, setChangeWeight] = useState({ weight: "", type: "" });

  const onFormSub = (w, h) => {
    let b = calBmi(w, h);
    setBmi(b);

    let bType = weightType(b);
    setBmiType(bType);

    const range = {
      //range is an object
      underWeight: { low: calWeight(18.5, h) },
      normal: { low: calWeight(18.5, h), high: calWeight(24.9, h) },
      overWeight: { low: calWeight(25, h), high: calWeight(29.9, h) },
      obesityOne: { low: calWeight(30, h), high: calWeight(34.9, h) },
      obesityTwo: { low: calWeight(35, h), high: calWeight(39.9, h) },
      obesityThree: { high: calWeight(40, h) },
    };

    setBmiRange(range)
    setChangeWeight(weightChange(b, w, range));

  };

  const weightType = (bmi) => {
    console.log("bmi value", { bmi });
    if (bmi < 18.5) {
      return "UnderWeight";
    } else if (18.5 < bmi && bmi < 24.9) {
      return "Normal";
    } else if (24.9 < bmi && bmi < 29.9) {
      return "OverWeight";
    } else if (29.9 < bmi && bmi < 34.9) {
      return "Obesity Class I";
    } else if (34.9 < bmi && bmi < 39.9) {
      return "Obesity Class II";
    } else if (bmi > 39.9) {
      return "Obesity Class III";
    }
  };

  const calBmi = (w, h) => {
    return (w / (h * h)).toFixed(2);
  };

  const calWeight = (b, h) => {
    console.log(b)
    console.log(h)
    console.log(b * h * h)
    return (b * h * h).toFixed(2);
  };

    const weightChange = (b, w, range) => {
        let changeObj;
        if (b > 24.9) {
          changeObj = {
            weight: (w - range.normal.high).toFixed(2),
            type: "positive",
          };
          return changeObj;
        } else if (b < 18.5) {
          changeObj = {
            weight: (range.normal.low - w).toFixed(2),
            type: "negative",
          };
          return changeObj;
        } else {
          changeObj = { weight: 0, type: "normal" };
          return changeObj;
        }
      };


  return (
    <div className="h-[510px] flex justify-around items-center">
      <BmiForm getData={onFormSub} />
      <BmiScoreBox bmi={bmi} bmiName={bmiType} />
    </div>
  );
};

export default Bmi;
