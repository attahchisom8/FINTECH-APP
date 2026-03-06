"use client";


interface HealthScorePropType {
  score: number;
}

export default function  HealthScore(
  { score } : HealthScorePropType
) {
  return (
    <div className="healh-score-card">
      <h2 className="health-score-title">
        Financial Health Score
      </h2>
      <div className="healh-score-tab">
        <p className="text-healh-score">
          { score }: <span>/100</span>
        </p>
      </div>
    </div>
  );
}
