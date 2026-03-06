"use client";


interface PredictionPropType {
  prediction: number;
}


export default function PredictionCard(
  { prediction }: PredictionPropType
) {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  });
  const formattedPrediction = formatter.format(prediction);

  return (
    <div className="prediction-card">
      <h3 className="prediction-title">
        Predicted Spending
      </h3>
      <div className="prediction-tab">
        <p className="text-prediction">
          Next Month Predicted Spending: <span>{ formattedPrediction }</span>
        </p>
      </div>
    </div>
  )
}
