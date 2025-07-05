import { useState, useEffect } from 'react';

function Results() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = {
      diagnosis: "COPD",
      severity: "Moderate",
      symptoms: "Shortness of breath, wheezing",
      crackles: 5,
      wheezes: 3,
      advice: ["Consult a doctor", "Avoid smoking", "Practice breathing exercises"],
      medicalAdvice: "Schedule a follow-up with a pulmonologist."
    };
    setResults(dummyData);
    setLoading(false);
  }, []);

  const exercises = [
    {
      name: "Deep Breathing",
      description: "Deep breathing prevents air from getting trapped in your lungs, which can cause you to feel short of breath. As a result, you can breathe in more fresh air.",
      steps: [
        "Sit or stand with your elbows slightly back. This allows your chest to expand more fully.",
        "Inhale deeply through your nose.",
        "Hold your breath as you count to 5.",
        "Release the air via a slow, deep exhale, through your nose, until you feel your inhaled air has been released."
      ],
      tip: "It’s best to do this exercise with other daily breathing exercises that can be performed for 10 minutes at a time, 3 to 4 times per day.",
      image: "/deep-breathing.jpeg"
    },
    {
      name: "Pursed Lip Breathing",
      description: "Pursed lip breathing has a range of benefits, including: reducing shortness of breath, increasing airflow to the lungs, helping with relaxation, releasing air trapped in the lungs.",
      steps: [
        "While keeping your mouth closed, take a deep breath through your nose, counting to 2. Follow this pattern by repeating in your head, 'Inhale, 1, 2.' The breath doesn’t have to be deep. A typical inhale will do.",
        "Put your lips together like you’re starting to whistle or blow out candles on a birthday cake. This is known as 'pursing' your lips.",
        "While keeping your lips pursed, slowly breathe out by counting to 4. Don’t try to force the air out. Breathe slowly through your mouth."
      ],
      tip: "Pursed lip breathing is best for performing strenuous activities, such as climbing stairs, and can help you increase your physical activity levels.",
      image: "/pursed-lip-breathing.jpeg"
    },
    {
      name: "Coordinated Breathing",
      description: "Feeling short of breath can cause anxiety that makes you hold your breath. To prevent this from occurring, you can practice coordinated breathing.",
      steps: [
        "Inhale through your nose before beginning an exercise.",
        "While pursing your lips, breathe out through your mouth during the most strenuous part of the exercise. An example could be when curling upward on a bicep curl."
      ],
      tip: "Coordinated breathing can be performed when you’re exercising or feeling anxious.",
      image: "/coordinated-breathing.jpeg"
    },
    {
      name: "Huff Cough",
      description: "When you have COPD, mucus can build up more easily in your lungs. The huff cough is a breathing exercise designed to help you cough up mucus effectively without making you feel too tired.",
      steps: [
        "Place yourself in a comfortable seated position. Inhale through your mouth, slightly deeper than you would when taking a normal breath.",
        "Activate your stomach muscles to blow the air out in three even breaths while making the sounds 'ha, ha, ha.' Imagine you’re blowing onto a mirror to cause it to steam."
      ],
      tip: "A huff cough should be less tiring than a traditional cough, and it can keep you from feeling worn out when coughing up mucus.",
      image: "/huff-cough.jpeg"
    },
    {
      name: "Diaphragmatic Breathing",
      description: "The diaphragm is the main muscle involved in breathing. People with COPD tend to rely more on the accessory muscles of the neck, shoulders, and back to breathe rather than on the diaphragm. Diaphragmatic or abdominal breathing helps to retrain this muscle to work more effectively.",
      steps: [
        "While sitting or lying down, with your shoulders relaxed, put a hand on your chest and place the other hand on your stomach.",
        "Take a breath in through your nose for 2 seconds, feeling your stomach move outward. You’re doing the activity correctly if your stomach moves more than your chest.",
        "Purse your lips and breathe out slowly through your mouth, pressing lightly on your stomach. This will enhance your diaphragm’s ability to release air.",
        "Repeat the exercise as you can."
      ],
      tip: "",
      image: "/diaphragmatic-breathing.jpeg"
    }
  ];

  if (loading) return <div className="results-content"><p>Loading...</p></div>;
  if (!results) return <div className="results-content"><p>No results available.</p></div>;

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'badge bg-success';
      case 'moderate':
        return 'badge bg-warning text-dark';
      case 'severe':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="results-content">
      <h2>Analysis Results</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5>Diagnosis Overview</h5>
          <p><strong>Diagnosis:</strong> {results.diagnosis || 'N/A'}</p>
          <p>
            <strong>Severity:</strong> {results.severity || 'N/A'}
            <span className={`ms-2 ${getSeverityClass(results.severity)}`}>
              {results.severity}
            </span>
          </p>
          <p><strong>Audio Analysis:</strong> Audio processed successfully.</p>
          <p><strong>Crackles Detected:</strong> {results.crackles || 'N/A'}</p>
          <p><strong>Wheezes Detected:</strong> {results.wheezes || 'N/A'}</p>
          <p><strong>Symptoms:</strong> {results.symptoms}</p>
          <p><strong>General Advice:</strong></p>
          <ul>
            {results.advice.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p><strong>Medical Advice:</strong> {results.medicalAdvice}</p>
        </div>
      </div>

      {results.diagnosis === "COPD" && (
        <div className="mb-4">
          <h5 className="exercises-heading mt-5">Suggested Exercises for COPD</h5>
          <div className="exercises-list">
            {exercises.map((exercise, index) => (
              <div key={index} className="exercise-wrapper">
                {/* <div className="section-number">{index + 1}</div> */}
                <div
                  className={`exercise-item ${index % 2 === 0 ? 'image-left' : 'image-right'}`}
                >
                  <div className="exercise-image-container">
                    <img src={exercise.image} alt={exercise.name} className="exercise-image" />
                  </div>
                  <div className="exercise-content">
                    <h6>{exercise.name}</h6>
                    <p>{exercise.description}</p>
                    <h6>Steps:</h6>
                    <ol>
                      {exercise.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                    {exercise.tip && (
                      <>
                        <h6>Exercise Tip:</h6>
                        <p>{exercise.tip}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <a href="/progress" className="btn btn-primary">View Progress</a>
      </div>
    </div>
  );
}

export default Results;